var winston = require('winston');
var WinstonDailyRotateFile = require('winston-daily-rotate-file');

var logsFormatter = function(args) {
	var d = new Date();
	var m = '' + (d.getUTCMonth() + 1);
	if(m.length == 1) m = '0' + m;
	var dd= '' + d.getUTCDate();
	if(dd.length == 1) dd = '0' + dd;
	var hh = '' + d.getUTCHours();
	if(hh.length == 1) hh = '0' + hh;
	var mm = '' + d.getUTCMinutes();
	if(mm.length == 1) mm = '0' + mm;
	var ss = '' + d.getUTCSeconds();
	if(ss.length == 1) ss = '0' + ss;
	var t = d.getUTCFullYear() + '-' + m + '-' + dd + ' ' + hh + ':' + mm + ':' + ss;
	var s = t + ' ' + args.level + ' ' + args.message;
	if(args.meta != null) {
		if(typeof(args.meta) != 'object' || Object.keys(args.meta).length > 0) {
			s += (' ' + JSON.stringify(args.meta));
		}
	}
	return s;
};

var logger = new (winston.Logger)({
	level: 'info',
	transports: 
	[
	 new (winston.transports.Console)({
		 name: 'console-logger',
		 level: 'info',
		 handleExceptions: true,
		 humanReadableUnhandledException: true
	 }),
	 new WinstonDailyRotateFile({
		 name: 'main-logger',
		 level: 'info',
		 filename: './logs/haley-ai-portal-front.log',
		 zippedArchive: false,
		 maxDays: 30,
		 json: false,
		 formatter: logsFormatter,
		 handleExceptions: true,
		 humanReadableUnhandledException: true
    }),
    new WinstonDailyRotateFile({
		 name: 'error-logger',
		 level: 'error',
		 filename: './logs/errors.log',
		 zippedArchive: false,
		 maxDays: 30,
		 json: false,
		 formatter: logsFormatter,
		 handleExceptions: true,
		 humanReadableUnhandledException: true
   })
  ]
});

var maskPassword = function(s) {
	
	if(s == null) return 'null';
	
	var output = "";

	for( var i = 0 ; i < s.length; i++) {
			
		if(s.length < 12 || ( i >= 3 && i < (s.length - 3) ) ) {
			output += '*';
		} else {
			output += s.substring(i, i+1);
		}
			
	}
	
	return output
}

process.on('uncaughtException', function(err) {
    logger.log('error', 'uncaught exception crashed server: ' + err, arguments, function(err, level, msg, meta) {
        process.exit(1);
    });
});


if(!process.env.configFile) {
	throw new Error("Specify configFile in environment");
}

var configFile = process.env.configFile;

logger.info("configFile (path): ", configFile);

var parseHocon = require('hocon-parser');
var fs = require('fs');

var contents = fs.readFileSync(configFile).toString();
var config = parseHocon(contents);

var webserver = config.webserver;
if(!webserver) {
	throw new Error("No webserver");
}

logger.info("webserver", webserver);
if(webserver.host == null) {
	throw new Error("No webserver.host");
}
if(webserver.port == null) {
	throw new Error("No webserver.port");
}

if(!config.sessionDomain) {
	throw new Error("No sessionDomain");
}

if(!config.cookiePrefix) {
	throw new Error("No cookiePrefix");
}

if(config.cookieSecure == null) {
	throw new Error("No cookieSecure");
}

if(!config.websiteURL) {
	throw new Error("No websiteURL");
}

if(!config.httpsURL) {
	throw new Error("No httpsURL");
}

if(config.webappConnected == null) {
	throw new Error("No webappConnected");
}

if(!config.webappURL) {
	throw new Error("No webappURL");
}

if(!config.saasServerURL) {
	throw new Error("No saasServerURL");
}

if(!config.eventbusURL) {
	throw new Error("No eventbusURL");
}

if(!config.appID) {
	throw new Error("No appID");
}

if(!config.pathPrefix) {
	throw new Error("No pathPrefix");
}

if(config.dialogBotScriptURL == null) {
	throw new Error("No dialogBotScriptURL");
}

if(config.formBotScriptURL == null) {
	throw new Error("No formBotScriptURL");
}

if(!config.accountIDMode) {
	throw new Error("No accountIDMode");
}

if(config.accountIDMode == 'preset' && !config.accountID) {
	throw new Error("No accountID, required when accountIDMode == " + config.accountIDMode);
}

if(config.rolesCheckEnabled == null) {
	throw new Error("No rolesCheckEnabled")
}

var devMode = process.env.devMode == 'true';

var mockui = process.env.mockui == 'true';


if(config.haley == null) {
	throw new Error("No haley config object");
}

var haleyConfig = config.haley;

var haley_username = haleyConfig.username;
if(!haley_username) {
	throw new Error("No haley.username");
}
var haley_password = haleyConfig.password;
if(!haley_password) {
	throw new Error("No haley.password");
}
var haley_appID = config.appID;
var haley_eventbusURL = config.eventbusURL;
var haley_endpointURI = haleyConfig.endpointURI;
if(!haley_endpointURI) {
	throw new Error("No haley.endpointURI")
}
var haley_channelURI = haleyConfig.channelURI;
if(!haley_channelURI) {
	throw new Error("No haley.channelURI");
}
var haley_waitingListChannelURI = haleyConfig.waitingListChannelURI;
if(!haley_waitingListChannelURI) {
	throw new Error("No haley.waitingListChannelURI");
}

var googleAnalyticsPropertyID = process.env.googleAnalyticsPropertyID

logger.info("server host: ", webserver.host);
logger.info("server port: ", webserver.port);
logger.info("sessionDomain: ", config.sessionDomain);
logger.info("cookiePrefix: ", config.cookiePrefix);
logger.info("cookieSecure: ", config.cookieSecure);
logger.info("websiteURL: ", config.websiteURL);
logger.info("httpsURL: ", config.httpsURL);
logger.info("webappConnected: ", config.webappConnected);
logger.info("webappURL: ", config.webappURL);
logger.info("saasServerURL: ", config.saasServerURL);
logger.info("eventbusURL: ", config.eventbusURL);
logger.info("appID: ", config.appID);
logger.info("pathPrefix: ", config.pathPrefix);
logger.info("dialogBotScriptURL: ", config.dialogBotScriptURL);
logger.info("formBotScriptURL: ", config.formBotScriptURL);
logger.info("accountIDMode: ", config.accountIDMode);
logger.info("accountIDMode: ", config.accountIDMode);
logger.info("accountID: ", config.accountID);
logger.info("rolesCheckEnabled: ", config.rolesCheckEnabled);


logger.info("haley_username: ", haley_username);
logger.info("haley_password: ", maskPassword(haley_password));
logger.info("haley_appID: ", haley_appID);
logger.info("haley_eventbusURL: ", haley_eventbusURL);
logger.info("haley_endpointURI: ", haley_endpointURI);
logger.info("haley_channelURI: ", haley_channelURI);
logger.info("googleAnalyticsPropertyID: ", googleAnalyticsPropertyID);
logger.info("mockui: " + mockui);
logger.info("devMode", devMode);


var entityPropertyURIToLabel = null;

var relationshipPropertyURIToLabel = null;

var entitySetURI = '';

var entitySetName = '';

var relationshipSetURI = '';

var relationshipSetName = '';

var descriptionPropertyURI = '';
var urlPropertyURI = '';
var endpointPropertyURI = '';
var imageURLPropertyURI = '';
var categoryPropertyURI = '';
var slugPropertyURI = '';
var promotedPropertyURI = '';
var endpointURIPropertyURI = '';
var publishedPropertyURI = '';
var categoriesPropertyURI = '';
var approvedPropertyURI = '';
var keywordsPropertyURI = '';


var headerImageURLPropertyURI = '';
var descriptionHTMLPropertyURI = '';



//entitySetName = 'Global.Bots';

entitySetName = 'HarborSearchEntity'

var saasServerURL = 'https://harbor-saas-prod-server.vital.ai';

//var miniChatIFrameID = 'jaqfivrwtdmtqcgv';

//var miniChatEndpointURI = 'http://vital.ai/haley.ai/haley-saas/IFrameEndpoint/1498859002239_2081878988';


var cached_promotedEntities = null;

if(devMode) {
	/*
	saasServerURL = 'https://dev.haley-ai-mini.vital.ai';
	miniChatIFrameID = 'ujhjnuliwdfanrrh';
	miniChatEndpointURI = 'http://vital.ai/vital.ai/haley-anonymous/IFrameEndpoint/1498861450928_646940038';
	
	entitySetURI = 'http://vital.ai/vital.ai/haley-anonymous/EntitySet/1498853163447_646940002';
	
	descriptionPropertyURI = 'http://vital.ai/vital.ai/haley-anonymous/EntityProperty/1498853173615_646940003';
	urlPropertyURI = 'http://vital.ai/vital.ai/haley-anonymous/EntityProperty/1498853183624_646940005';
	endpointPropertyURI = 'http://vital.ai/vital.ai/haley-anonymous/EntityProperty/1498853193388_646940007';
	imageURLPropertyURI = 'http://vital.ai/vital.ai/haley-anonymous/EntityProperty/1498853203322_646940009';
	categoryPropertyURI = 'http://vital.ai/vital.ai/haley-anonymous/EntityProperty/1498853214518_646940011';
	slugPropertyURI = 'http://vital.ai/vital.ai/haley-anonymous/EntityProperty/1499092834929_1815929561';
	promotedPropertyURI = 'http://vital.ai/vital.ai/haley-anonymous/EntityProperty/1499092859495_1815929563';
	endpointURIPropertyURI = 'http://vital.ai/vital.ai/haley-anonymous/EntityProperty/1499093229508_1815929582';
	publishedPropertyURI = 'http://vital.ai/vital.ai/haley-anonymous/EntityProperty/1499097190033_1065638416';
	categoriesPropertyURI = 'http://vital.ai/vital.ai/haley-anonymous/EntityProperty/1499097852914_1065638418';
	approvedPropertyURI = 'http://vital.ai/vital.ai/haley-anonymous/EntityProperty/1499374644213_2136799637';
	keywordsPropertyURI = 'http://vital.ai/vital.ai/haley-anonymous/EntityProperty/1499976306313_199294605';
	*/
    entitySetURI = 'http://vital.ai/haley.ai/haley-saas/EntitySet/1526062810460_268723484';
	
	descriptionPropertyURI = 'http://vital.ai/haley.ai/haley-saas/EntityProperty/1526062810413_268723472';
	urlPropertyURI = 'http://vital.ai/haley.ai/haley-saas/EntityProperty/1526062810415_268723483';
	endpointPropertyURI = 'http://vital.ai/haley.ai/haley-saas/EntityProperty/1497662260262_69682974';
	imageURLPropertyURI = 'http://vital.ai/haley.ai/haley-saas/EntityProperty/1526062810413_268723475';
	categoryPropertyURI = 'http://vital.ai/haley.ai/haley-saas/EntityProperty/1526062810412_268723471';
	slugPropertyURI = 'http://vital.ai/haley.ai/haley-saas/EntityProperty/1526062810415_268723482';
	promotedPropertyURI = 'http://vital.ai/haley.ai/haley-saas/EntityProperty/1526062810414_268723477';
	endpointURIPropertyURI = 'http://vital.ai/haley.ai/haley-saas/EntityProperty/1526062810413_268723473';
	publishedPropertyURI = 'http://vital.ai/haley.ai/haley-saas/EntityProperty/1526062810414_268723478';
	categoriesPropertyURI = 'http://vital.ai/haley.ai/haley-saas/EntityProperty/1526062810412_268723470';
	approvedPropertyURI = 'http://vital.ai/haley.ai/haley-saas/EntityProperty/1526062810412_268723469';
	keywordsPropertyURI = 'http://vital.ai/haley.ai/haley-saas/EntityProperty/1526062810413_268723476';
    
	relationshipSetURI = 'http://vital.ai/vital.ai/haley-anonymous/RelationshipSet/1497454988399_650377519';
	relationshipSetName = 'Foaf';
	relationshipPropertyURIToLabel = 
	[{
		label: 'String 1',
		property: 'string1',
		URI: 'http://vital.ai/vital.ai/haley-anonymous/RelationshipProperty/1497455013803_650377522',
		type: 'StringProperty'
	}, {
		label: 'Date',
		property: 'date',
		URI: 'http://vital.ai/vital.ai/haley-anonymous/RelationshipProperty/1497454996703_650377520',
		type: 'DateProperty'
	}];
	
} else {
/*
	entitySetURI = 'http://vital.ai/haley.ai/haley-saas/EntitySet/1497662203741_69682969';
	
	descriptionPropertyURI = 'http://vital.ai/haley.ai/haley-saas/EntityProperty/1497662213885_69682970';
	urlPropertyURI = 'http://vital.ai/haley.ai/haley-saas/EntityProperty/1497662225625_69682972';
	endpointPropertyURI = 'http://vital.ai/haley.ai/haley-saas/EntityProperty/1497662260262_69682974';
	imageURLPropertyURI = 'http://vital.ai/haley.ai/haley-saas/EntityProperty/1497662274105_69682976';
	categoryPropertyURI = 'http://vital.ai/haley.ai/haley-saas/EntityProperty/1497662290124_69682978';
	slugPropertyURI = 'http://vital.ai/haley.ai/haley-saas/EntityProperty/1499085089155_2081879077';
	promotedPropertyURI = 'http://vital.ai/haley.ai/haley-saas/EntityProperty/1499089191667_2081879079';
	endpointURIPropertyURI = 'http://vital.ai/haley.ai/haley-saas/EntityProperty/1499093308327_2081879082';
	publishedPropertyURI = 'http://vital.ai/haley.ai/haley-saas/EntityProperty/1499097239796_2081879084';
	categoriesPropertyURI = 'http://vital.ai/haley.ai/haley-saas/EntityProperty/1499097903222_2081879086';
	approvedPropertyURI = 'http://vital.ai/haley.ai/haley-saas/EntityProperty/1499373145519_745002011';
	keywordsPropertyURI = 'http://vital.ai/haley.ai/haley-saas/EntityProperty/1499976163361_1370478891';
*/	
    
    // haley saas dev
    
    /*
    entitySetURI = 'http://vital.ai/haley.ai/haley-saas/EntitySet/1526062810460_268723484';
	
	descriptionPropertyURI = 'http://vital.ai/haley.ai/haley-saas/EntityProperty/1526062810413_268723472';
	urlPropertyURI = 'http://vital.ai/haley.ai/haley-saas/EntityProperty/1526062810415_268723483';
	endpointPropertyURI = 'http://vital.ai/haley.ai/haley-saas/EntityProperty/1497662260262_69682974';
	imageURLPropertyURI = 'http://vital.ai/haley.ai/haley-saas/EntityProperty/1526062810413_268723475';
	categoryPropertyURI = 'http://vital.ai/haley.ai/haley-saas/EntityProperty/1526062810412_268723471';
	slugPropertyURI = 'http://vital.ai/haley.ai/haley-saas/EntityProperty/1526062810415_268723482';
	promotedPropertyURI = 'http://vital.ai/haley.ai/haley-saas/EntityProperty/1526062810414_268723477';
	endpointURIPropertyURI = 'http://vital.ai/haley.ai/haley-saas/EntityProperty/1526062810413_268723473';
	publishedPropertyURI = 'http://vital.ai/haley.ai/haley-saas/EntityProperty/1526062810414_268723478';
	categoriesPropertyURI = 'http://vital.ai/haley.ai/haley-saas/EntityProperty/1526062810412_268723470';
	approvedPropertyURI = 'http://vital.ai/haley.ai/haley-saas/EntityProperty/1526062810412_268723469';
	keywordsPropertyURI = 'http://vital.ai/haley.ai/haley-saas/EntityProperty/1526062810413_268723476';
    
	relationshipSetURI = 'http://vital.ai/haley.ai/haley-saas/RelationshipSet/1498664376382_69683927';
	relationshipSetName = 'Global.BotInCategory';
	relationshipPropertyURIToLabel = [];
	*/
    
    
    // harbor production
    /*
     entitySetURI = 'http://vital.ai/haley.ai/harbor-saas-prod/EntitySet/1530385258937_457060991';
	
	descriptionPropertyURI = 'http://vital.ai/haley.ai/harbor-saas-prod/EntityProperty/1530385258726_457060979';
    
	urlPropertyURI = 'http://vital.ai/haley.ai/harbor-saas-prod/EntityProperty/1530385258729_457060990';
    
	endpointPropertyURI = 'http://vital.ai/haley.ai/harbor-saas-prod/EntityProperty/1530385258727_457060980';
    
	imageURLPropertyURI = 'http://vital.ai/haley.ai/harbor-saas-prod/EntityProperty/1530385258727_457060982';
    
	categoryPropertyURI = 'http://vital.ai/haley.ai/harbor-saas-prod/EntityProperty/1530385258726_457060978';
    
    
	slugPropertyURI = 'http://vital.ai/haley.ai/harbor-saas-prod/EntityProperty/1530385258729_457060989';
    
    
	promotedPropertyURI = 'http://vital.ai/haley.ai/harbor-saas-prod/EntityProperty/1530385258727_457060984';
    
    
	endpointURIPropertyURI = 'http://vital.ai/haley.ai/harbor-saas-prod/EntityProperty/1530385258727_457060981';
    
    
	publishedPropertyURI = 'http://vital.ai/haley.ai/harbor-saas-prod/EntityProperty/1530385258728_457060985';
    
	categoriesPropertyURI = 'http://vital.ai/haley.ai/harbor-saas-prod/EntityProperty/1530385258726_457060977';
    
	approvedPropertyURI = 'http://vital.ai/haley.ai/harbor-saas-prod/EntityProperty/1530385258725_457060976';
    
	keywordsPropertyURI = 'http://vital.ai/haley.ai/harbor-saas-prod/EntityProperty/1530385258727_457060983';
    
    // not in use
	relationshipSetURI = 'http://vital.ai/haley.ai/haley-saas/RelationshipSet/1498664376382_69683927';
    
    // not in use
	relationshipSetName = 'Global.BotInCategory';
    
    // not in use
	relationshipPropertyURIToLabel = [];
    
    */
    
    
    
    // divrisk web entities
    

    entitySetURI = 'http://vital.ai/haley.ai/harbor-saas-prod/EntitySet/1530418628364_457062114';
	descriptionPropertyURI = 'http://vital.ai/haley.ai/harbor-saas-prod/EntityProperty/1530418628201_457062102';
	urlPropertyURI = 'http://vital.ai/haley.ai/harbor-saas-prod/EntityProperty/1530418628222_457062113';
	endpointPropertyURI = 'http://vital.ai/haley.ai/harbor-saas-prod/EntityProperty/1530418628201_457062103';    
	imageURLPropertyURI = 'http://vital.ai/haley.ai/harbor-saas-prod/EntityProperty/1530418628202_457062105';
	categoryPropertyURI = 'http://vital.ai/haley.ai/harbor-saas-prod/EntityProperty/1530418628201_457062101';
	slugPropertyURI = 'http://vital.ai/haley.ai/harbor-saas-prod/EntityProperty/1530418628222_457062112';
	promotedPropertyURI = 'http://vital.ai/haley.ai/harbor-saas-prod/EntityProperty/1530418628221_457062107';
	endpointURIPropertyURI = 'http://vital.ai/haley.ai/harbor-saas-prod/EntityProperty/1530418628201_457062104';
    publishedPropertyURI = 'http://vital.ai/haley.ai/harbor-saas-prod/EntityProperty/1530418628221_457062108';
	categoriesPropertyURI = 'http://vital.ai/haley.ai/harbor-saas-prod/EntityProperty/1530418628200_457062100';
	approvedPropertyURI = 'http://vital.ai/haley.ai/harbor-saas-prod/EntityProperty/1530418628199_457062099';
	keywordsPropertyURI = 'http://vital.ai/haley.ai/harbor-saas-prod/EntityProperty/1530418628221_457062106';
    
    
    headerImageURLPropertyURI = 'http://vital.ai/haley.ai/harbor-saas-prod/EntityProperty/1530422207929_457063169';
    
    descriptionHTMLPropertyURI = 'http://vital.ai/haley.ai/harbor-saas-prod/EntityProperty/1530423094682_457063172';
    
    
    
    
    
    // not in use
	relationshipSetURI = 'http://vital.ai/haley.ai/haley-saas/RelationshipSet/1498664376382_69683927';
    
    // not in use
	relationshipSetName = 'Global.BotInCategory';
    
    // not in use
	relationshipPropertyURIToLabel = [];

    
    
    
    
}

entityPropertyURIToLabel = 
[{
	label: 'Description',
	property: 'Description',
	URI: descriptionPropertyURI,
	type: 'StringProperty'
}, {
	label: 'URL',
	property: 'URL',
	URI: urlPropertyURI,
	type: 'StringProperty'
}, {
	label: 'Endpoint',
	property: 'Endpoint',
	URI: endpointPropertyURI,
	type: 'StringProperty'
}, {
	label: 'ImageURL',
	property: 'ImageURL', 
	URI: imageURLPropertyURI,
	type: 'StringProperty'
}, {
	label: 'Category',
	property: 'Category',
	URI: categoryPropertyURI,
	type: 'StringProperty'
}, {
	label: 'Slug',
	property: 'Slug',
	URI: slugPropertyURI,
	type: 'StringProperty'
},{
	label: 'Promoted',
	property: 'Promoted',
	URI: promotedPropertyURI,
	type: 'BooleanProperty'
}, {
	label: 'EndpointURI',
	property: 'EndpointURI',
	URI: endpointURIPropertyURI,
	type: 'URIProperty'
}, {
	label: 'Published',
	property: 'Published',
	URI: publishedPropertyURI,
	type: 'BooleanProperty'
}, {
	label: 'Categories',
	property: 'Categories',
	URI: categoriesPropertyURI,
	type: 'StringProperty',
	multivalue: true
//do not expose the approved property
}, {
	label: 'headerImageURL',
	property: 'headerImageURL',
	URI: headerImageURLPropertyURI,
	type: 'StringProperty'
//do not expose the approved property
}, {
	label: 'descriptionHTML',
	property: 'descriptionHTML',
	URI: descriptionHTMLPropertyURI,
	type: 'StringProperty'
//do not expose the approved property
}];

logger.info('saasServerURL: ', saasServerURL);
//logger.info('miniChatIFrameID: ', miniChatIFrameID);
//logger.info('miniChatEndpointURI: ', miniChatEndpointURI);
logger.info("entitySetURI: ", entitySetURI);
logger.info("entitySetName: ", entitySetName);
logger.info("entityPropertyURIToLabel:", entityPropertyURIToLabel);

logger.info("relationshipSetURI: ", relationshipSetURI);
logger.info("relationshipSetName: ", relationshipSetName);
logger.info("relationshipPropertyURIToLabel: ", relationshipPropertyURIToLabel);

//import haley api with dependencies publicly
logger.info("Importing vital dependencies publicly ...");

var VitalService = require('./lib-vital/vitalservice-js/vitalservice-0.2.304.js');
var HaleyAPI = require('./lib-vital/haley-js-api/haley-js-api-0.0.1.js');
var HaleyAPIVitalServiceImpl = require('./lib-vital/haley-js-api/haley-js-vitalservice-implementation-0.0.1.js');


var haleyApi = null;
var haleySession = null;


var vitalService = null;

var endpointsDao = null;
var entitiesDao = null;



//set session expired callback to automatically exit and restart the app
VITAL_SESSION_EXPIRED_CALLBACK = function(msg) {
	logger.error('Session expired callback, message: ', msg);
	setTimeout(function(){
		throw new Error("Session expired!");
	}, 1);
	return true;
}


if(mockui) {
	logger.warn("MockUI mode - haley not connected");
	
	var vitalLibDir = __dirname + '/lib-vital/vitalservice-js';
	
	VITAL_LOGGING = true;
	VITAL_JSON_SCHEMAS = [];
	
	require(vitalLibDir + '/vital-core-0.2.304.js')
	require(vitalLibDir  + '/vital-0.2.304.js')
	require(vitalLibDir  + '/vital-nlp-0.2.304.js')
	require(vitalLibDir  + '/vital-social-0.2.304.js')
	require(vitalLibDir  + '/vital-aimp-0.1.0.js')
	require(vitalLibDir  + '/haley-0.1.0.js')
	require(vitalLibDir  + '/haley-shopping-0.1.0.js')
	
	tv4 = require(vitalLibDir  + '/tv4.min.js');
	
	LRUCache = require(vitalLibDir  + '/lru.js').LRUCache;
	
	var import1 = require(vitalLibDir  + '/vitalservice-json-0.2.304.js');
	
	vitaljs = import1.vitaljs;
	VitalServiceJson = import1.VitalServiceJson;
	
	VitalServiceJson.SINGLETON = new VitalServiceJson();
	VitalServiceJson.SINGLETON.dynamicPropertiesClasses.push('http://vital.ai/ontology/vital-aimp#Entity');
	VitalServiceJson.SINGLETON.dynamicPropertiesClasses.push('http://vital.ai/ontology/vital-aimp#Edge_hasRelationship');
	
	//generate some test entities for search
	var endpoint = vitaljs.graphObject({type: 'http://vital.ai/ontology/vital-aimp#IFrameEndpoint'});
	endpoint.URI = 'urn:endpoint-0';
	endpoint.set('name', 'Mock IFrame Endpoint');
	endpoint.set('endpointID', 'abcdefghijkl');
	endpointsDao = [endpoint];
	
	entitiesDao = [];
	
	for(var i = 0 ; i < 24; i++) {
		
		var entity = vitaljs.graphObject({type: 'http://vital.ai/ontology/vital-aimp#Entity'});
		entity.URI = 'urn:entity-' + i;
		entity.set('name', 'Bot #' + (i+1));
		entity[descriptionPropertyURI] = {value: 'Description ' + (i+1)};
		entity[urlPropertyURI] = {value: 'http://example.org/' + (i+1)};
		entity[imageURLPropertyURI] = {value: '/images/bot.png'};
		entity[approvedPropertyURI] = {value: true, _type: 'ai.vital.vitalsigns.model.property.BooleanProperty'};
		if(i % 3 == 0 ) {
			entity[endpointURIPropertyURI] = {value: endpoint.URI};
			entity[publishedPropertyURI] = {value: i % 6 == 0};
		}
		
		if(i % 4 == 0) {
			entity[categoriesPropertyURI] = {value: ['Brokers', 'Insurance Providers']};
		} else if(i % 4 == 1) {
			entity[categoriesPropertyURI] = {value: ['Industry'] };
		} else if(i % 4 == 2) {
			entity[categoriesPropertyURI] = {value: ['Commercial'] };
		} else {
			entity[categoriesPropertyURI] = {value: ['Life/Health'] };
		}
		
		entity[slugPropertyURI] = {value: 'bot-' + i};
		entity[promotedPropertyURI] = {value: i % 8 == 0};
		entitiesDao.push(entity);
	}
	
	onSessionAuthenticated();
	
} else {
	
  var vitalService = new VitalService('endpoint.' + haley_appID, haley_eventbusURL, function(){
	//success
	logger.info("vitalservice ready");
	
	
	logger.info('adding entity and relationship classes as exceptions for json validation');
	VitalServiceJson.SINGLETON.dynamicPropertiesClasses.push('http://vital.ai/ontology/vital-aimp#Entity');
	VitalServiceJson.SINGLETON.dynamicPropertiesClasses.push('http://vital.ai/ontology/vital-aimp#Edge_hasRelationship');

	
	
	var haleyApiImpl = new HaleyAPIVitalServiceImpl(vitalService);
	haleyApiImpl.logEnabled = false;
	haleyApiImpl.addReconnectListener(function(){
		
		logger.info("Reconnect listener called");
		
	});
	
	//HaleyAPI = function(implementation, syncdomains, callback) {
	new HaleyAPI(haleyApiImpl, false, function(error, _haleyInstance){
		if(error) {
			logger.error("Error when creating haley API instance: " + error);
			return;
		}
		logger.info("Haley API instance created");
		haleyApi = _haleyInstance;
		

		
		haleyApi.openSession(function(error, _haleySession){
			
			if(error) {
				vital.error("Error when checking session: " + error);
				
				app.onLoggedOut();
				
				return;
			}
			
			logger.info("haley session opened");
			
			haleySession = _haleySession;
		
			/*
			try {
				
				var r = haleyApi.registerCallback(haleySession, 'http://vital.ai/ontology/vital-aimp#AIMPMessage', true, messagesHandler);
				
				if(!r) throw "Messages handler not registered!";
				
			} catch(e) {
				logger.error("Couldn't register handler: " + e);
			}
			*/
			
			
			
			if( haleySession.isAuthenticated() ) {

				var data = haleySession.getAuthAccount();
				
				logger.info("Session already authenticated: ", data);
				
				onSessionAuthenticated();
				
			} else {
				
//				logger.warn("Session not authenticated - anonymous access to haley facebook endpoint");
//				botkitMain();
				
				logger.info("Session not authenticated - authenticating");
				
				haleyApi.authenticateSession(haleySession, haley_username, haley_password, function(error, loginObject){
					
					if(error) {
						logger.error("Error when authenticating user: " + error);
						return;
					}
					
					logger.info("session authenticated: ", loginObject);
					
					onSessionAuthenticated();
					
				});
				
			}
			
		});
		
		
		
	}, logger);
	
  }, function(error){
	logger.error("vitalservice error");
  }, { logger: logger, loggingEnabled: false});
}

var fs = require('fs');

function onSessionAuthenticated() {
	
	logger.info("Haley session ready");
	
	// Load the http module to create an http server.
	var http = require('http');

	var cachedFiles = {};
	
	// Configure our HTTP server to respond with Hello World to all requests.
	var server = http.createServer(function (request, response) {
		var url = request.url;
		var method = request.method;
		//static files
		logger.info('request:', method + ' ' + url);
		
		if(method == 'GET') {
			
			if(url == '/status') {

				var closure = function(_ok, _msg) {
					var resObj = {ok: _ok, message: _msg};
					response.writeHead(200, { 'Content-Type': 'application/json' });
					response.end(JSON.stringify(resObj));
				};
				
				var onStatusResponse = function(error) {

					if(error) {
						closure(false, error);
						return;
					}

					var message = "session check OK ";
					
					var diskspace = require('diskspace');
					diskspace.check(process.platform == 'win32' ? 'C' : '/', function (err, result) {

						if(err) {
							logger.error("error when checking disk usage", err);
							message += (' ' + err);
							closure(false, message);
							return;
						}
					
						var percent = ( result.used / result.total * 100 ).toFixed(1);
					
						if(percent <= 90) {
							message += ( ' disk usage OK: ' + percent + '%' );
						} else {
							closure(false, 'session check OK, disk usage high: ' + percent + '%');
							return;
						}
					
						//TODO memory usage
						//	process.memoryUsage();
						closure(true, message);
					
					});
					
					
				}
				
				/* TODO restore session ping flow
				if(mockui) {
					mock_status(onStatusResponse);
				} else {
					status(onStatusResponse)
				}
				*/
				
				onStatusResponse();
				
				return;
				
			}
			
			var file = url.substring(1);
			
			if(file.indexOf('..') >= 0) {
				response.writeHead(400);
				response.end("URL must not have parent directory references: " + url);
				return;
			}

			var qmark = file.indexOf('?');
			if(qmark >= 0) {
				file = file.substring(0, qmark);
			}
			
			if(file.length == 0) file = 'index.html';
			
			//SPA redirect
			if(file.indexOf('detail/') == 0 || file.indexOf('content/') == 0 || file.indexOf('bot/') == 0 || file.indexOf('searchresults') == 0 || file.indexOf('submitentity') == 0) {
				file = 'index.html';
			}
			
			var binary = true;

			//all html is cached
			var isHtml = file.endsWith('.html');
			var isJs = file.endsWith('.js');
			var contentType = 'text/plain';
			
			var isConfig = file == 'js/config.js';
			
			if(isHtml) {
				contentType = 'text/html';
				binary = false;
			} else if(isJs) {
				contentType = 'application/json';
				binary = false;
			} else if(file.endsWith('.css')) {
				contentType = 'text/css';
				binary = false;
			} else if(file.endsWith('.png')) {
				contentType = 'image/png';
				binary = true;
			} else if(file.endsWith('.ico')) {
				contentType = 'image/x-icon';
				binary = true;
			}
			
			var filename = './www/' + file;
			
			if(binary) {

			    fs.exists(filename, function(exists) {
			        if(!exists) {
			            logger.info("not exists: " + file);
			            response.writeHead(404, {'Content-Type': 'text/plain'});
			            response.write('404 Not Found\n');
			            response.end();
			            return;
			        }
			        
			        var fileStream = fs.createReadStream(filename);
			        fileStream.pipe(response);
			        
			    });
				
			} else {

				//cached index html
				if(isHtml || isConfig) {
					
					var cachedData = cachedFiles[file];
					
					if(cachedData != null) {
						logger.info("returning cached file");
						response.writeHead(200, { 'Content-Type': contentType });
						response.end(cachedData);
						return;
					}
					
				}
				
				fs.readFile(filename, 'utf8', function (err,data) {
				  if (err) {
				    logger.info(err);
				    response.writeHead(404);
				    response.end('Not found!');
				    return;
				  }
				  
				  if(isConfig) {
					  
					  data = data.replace("${APP_ID}", config.appID);
				        
					  data = data.replace("${HTTPS_URL}", config.httpsURL);
					  
					  data = data.replace("${WEBSITE_URL}", config.websiteURL);
					  
					  data = data.replace("${WEBAPP_CONNECTED}", '' + config.webappConnected);
					  
					  data = data.replace("${WEBAPP_URL}", config.webappURL);
					  
					  data = data.replace("${SAAS_SERVER_URL}", config.saasServerURL);
					  
					  data = data.replace("${EVENTBUS_URL}", config.eventbusURL);
					  
					  data = data.replace("${SESSION_DOMAIN}", config.sessionDomain);
					  
					  data = data.replace("${COOKIE_PREFIX}", config.cookiePrefix);
					  
					  data = data.replace("${COOKIE_SECURE}", '' + config.cookieSecure);
					  
					  data = data.replace("${ACCOUNT_ID_MODE}", config.accountIDMode);
					  
					  data = data.replace("${ACCOUNT_ID}", config.accountID);
					  
					  data = data.replace("${ROLES_CHECK_ENABLED}", '' + config.rolesCheckEnabled);
					  
					  data = data.replace("${DIALOG_BOT_SCRIPT_URL}", config.dialogBotScriptURL);

					  data = data.replace("${FORM_BOT_SCRIPT_URL}", '' + config.formBotScriptURL);
					  
				  }
				  
				  if(isHtml) {
					  
					  //inject config
					  
					  data = data.replace(/\$\{PREFIX\}/g, config.pathPrefix);
					  
					  data = data.replace("${GOOGLE_ANALYTICS_PROPERTY_ID}", googleAnalyticsPropertyID);
					  data = data.replace("${SAAS_SERVER_URL}", saasServerURL);
					  //data = data.replace("${MINI_CHAT_ENDPOINT_URI}", miniChatEndpointURI);
					  //data = data.replace("${MINI_CHAT_IFRAME_ID}", miniChatIFrameID);
					  //data = data.replace("${MINI_CHAT_ENABLED}", '' + (!mockui));
					  
				  }
				  
				  if(isHtml || isConfig) {
					
					  if(!devMode && !mockui) {
						  logger.info("caching file", file);
						  cachedFiles[file] = data;
					  }
					  
				  }
				  
				  response.writeHead(200, { 'Content-Type': contentType });
				  response.end(data);
				});

			}
			
			return;
			
		} else if(method == 'POST' && ( 
				url == '/search' ||
				url == '/getentitybyslug' ||
				url == '/getentitybyuri' ||
				url == '/getendpointbyuri' ||
				url == '/entityform' || 
				url == '/createentity' ||
				url == '/joinwaitinglist'
			)) {
			
			//handle sear
			var queryData = "";
	        request.on('data', function(data) {
	            queryData += data;
	            if(queryData.length > 1e6) {
	                queryData = "";
	                response.writeHead(413, {'Content-Type': 'text/plain'}).end();
	                request.connection.destroy();
	            }
	        });

	        request.on('end', function() {
	            
	        	var requestObj = JSON.parse(queryData);
	        	logger.info('request object', requestObj)
	        	
	        	if(url == '/search') {
	        		
	        		var onEnttiesReady = function(error, results){
	        			
	        			var resp = {ok: error == null, results: []};
	        			
	        			if(error) {
	        				logger.error(error);
	        				resp.message = error;
	        			} else {
	        				
	        				var entities = results.entities;
	        				var scoresMap = results.scoresMap;
	        				
	        				resp.promoted = results.promoted;
	        				resp.offset = results.offset;
	        				resp.limit = results.limit;
	        				resp.totalResults = results.totalResults;
	        				resp.query = results.query;
	        				resp.sortProperty = results.sortProperty;
	        				resp.sortDirection = results.sortDirection;
	        				resp.category = results.category;
	        				
	        				logger.info("entity search results", entities);
	        				
	        				for(var i = 0 ; i < entities.length; i++) {
	        					var entity = entities[i];
	        					var r = entityToResult(entity);
	        					r.score = scoresMap[entity.URI];
	        					resp.results.push(r);
	        				}
	        				
	        				if(cached_promotedEntities == null && requestObj.promoted == true) {
	        					logger.info("Caching promoted entities");
	        					cached_promotedEntities = results;
	        				}
	        				
	        			}
	        			
	    	        	response.writeHead(200, {'Content-Type': 'application/json'});
	    	        	response.end(JSON.stringify(resp));
	        			
	        		};
	        		
	        		if(requestObj.promoted == true) {
	        			if(cached_promotedEntities != null) {
	        				logger.info("Returning cached promoted entities");
	        				onEnttiesReady(null, cached_promotedEntities);
	        				return;
	        			} else {
	        				logger.info("No cached promoted entities yet");
	        			}
	        		}
	        		
	        		//force approved bots
	        		requestObj.approved = true;
	        		
	        		if(mockui) {
	        			mock_entitySearch(requestObj, onEnttiesReady);
	        		} else {
	        			entitySearch(requestObj, onEnttiesReady);
	        		}
	        		
	        		
	        		return;
	        		
	        	} else if(url == '/getentitybyuri') {

	        		var onEntityResults = function(error, entity, endpoint){
	        			
	        			var resp = {ok: error == null, results: []};
	        			
	        			if(error) {
	        				logger.error(error);
	        				resp.message = error;
	        			} else {
	        				logger.info("getentity", entity);
	        				
	        				if(entity != null) {
	        					var r = entityToResult(entity);
	        					resp.results.push(r);
	        				}

	        				if(endpoint != null) {
	        					var r = {
	        						URI: endpoint.URI,
	        						type: 'endpoint',
	        						endpointType: endpoint.type,
	        						name: endpoint.get('name'),
	        						endpointID: endpoint.get('endpointID')
	        					}
	        					resp.results.push(r);
	        				}
	        			}
	        			
	    	        	response.writeHead(200, {'Content-Type': 'application/json'});
	    	        	response.end(JSON.stringify(resp));
	        			
	        		};
	        		
	        		if(mockui) {
	        			
	        			mock_getentity(requestObj.entityURI, onEntityResults);
	        			
	        		} else {
	        			getentity(requestObj.entityURI, onEntityResults);
	        		}
	        		
	        		return;
	        		
	        	} else if(url == '/getentitybyslug') {

	        		
	        		var onEntityResults = function(error, entity, endpoint){
	        			
	        			var resp = {ok: error == null, results: []};
	        			
	        			if(error) {
	        				logger.error(error);
	        				resp.message = error;
	        			} else {
	        				logger.info("getentitybyslug object", entity);
	        				
	        				if(entity != null) {
	        					var r = entityToResult(entity);
	        					resp.results.push(r);
	        				}
	        			
	        				if(endpoint != null) {
	        					var r = {
	        						URI: endpoint.URI,
	        						type: 'endpoint',
	        						endpointType: endpoint.type,
	        						name: endpoint.get('name'),
	        						endpointID: endpoint.get('endpointID')
	        					}
	        					resp.results.push(r);
	        				}
	        				
	        				
	        			}
	        			
	    	        	response.writeHead(200, {'Content-Type': 'application/json'});
	    	        	response.end(JSON.stringify(resp));
	        			
	        		};
	        		
	        		if(mockui) {
	        			
	        			mock_getentitybyslug(requestObj.slug, onEntityResults);
	        			
	        		} else {
	        			getentitybyslug(requestObj.slug, onEntityResults);
	        		}
	        		
	        		return;
	        		
	        	} else if(url == '/getendpointbyuri') {
	        		
	        		var onEndpointResults = function(error, endpoint){
	        			
	        			var resp = {ok: error == null, results: []};
	        			
	        			if(error) {
	        				logger.error(error);
	        				resp.message = error;
	        			} else {
	        				logger.info("getendpointbyuri object", endpoint);
	        				
	        				if(endpoint != null) {
	        					var r = {
		        					URI: endpoint.URI,
		        					name: endpoint.get('name'),
		        					endpointID: endpoint.get('endpointID')
		        				};
	        					resp.results.push(r);
	        				}
	        				
	        			}
	        			
	    	        	response.writeHead(200, {'Content-Type': 'application/json'});
	    	        	response.end(JSON.stringify(resp));
	        			
	        		};
	        		
	        		if(mockui) {
	        			
	        			mock_getendpointbyuri(requestObj.endpointURI, onEntityResults);
	        			
	        		} else {
	        			
	        			getendpointbyuri(requestObj.endpointURI, onEntityResults);
	        			
	        		}
	        		
	        		return;
	        		
	        	} else if(url == '/entityform') {

	        		entityform(function(error, fields){
	        			
	        			var resp = {ok: error == null, fields: fields, entitySetURI: entitySetURI, entitySetName: entitySetName};
	        			
	        			if(error) {
	        				logger.error(error);
	        				resp.message = error;
	        			}
	        			
	        			response.writeHead(200, {'Content-Type': 'application/json'});
	        			response.end(JSON.stringify(resp));
	        			
	        		});
	        		
	        		return;
	        		
	        	} else if(url == '/createentity') {
	        		
	        		var onCreateEntityResponse = function(error, entities){
	        			
	        			var resp = {ok: error == null, results: []};
	        			
	        			if(error) {
	        				logger.error(error);
	        				resp.message = error;
	        			} else {
		        			for(var i = 0 ; i < entities.length; i++) {
		        				resp.results.push(entityToResult( entities[i]) );
		        			}
	        			}	        			
	        			response.writeHead(200, {'Content-Type': 'application/json'});
	        			response.end(JSON.stringify(resp));
	        			
	        		};
	        		
	        		if(mockui) {
	        			
	        			mock_createentity(requestObj, onCreateEntityResponse);
	        			
	        		} else {

		        		createentity(requestObj, onCreateEntityResponse);
		        		
	        		}
	        		
	        		return;
	        		
	        	} else if(url == '/joinwaitinglist') {
	        		
	        		var onJoinWaitingListResponse = function(error) {
	        			
	        			var resp = {ok: error == null, results: []};
	        			if(error) {
	        				logger.error(error);
	        				resp.message = error;
	        			}
	        			response.writeHead(200, {'Content-Type': 'application/json'});
	        			response.end(JSON.stringify(resp));
	        		}

	        		var email = requestObj.email;
	        		if(email != null) email = email.trim();
	        		var telephone = requestObj.telephone;
	        		if(telephone != null) telephone = telephone.trim();
	        		if(( email == null || email == '' ) && (telephone == null || telephone == '')) {
	        			onJoinWaitingListResponse("Email and/or telephone required");
	        			return;
	        		}
	        		
	        		if(email != null) {
	        			
	        			var validator = require("email-validator");
	        			if(! validator.validate(email) ) {
	        				onJoinWaitingListResponse('Email is invalid');
	        				return;
	        			}
	        		}
	        		
	        		if(mockui) {
	        			
	        			mock_joinwaitinglist(requestObj, onJoinWaitingListResponse);
	        			
	        		} else {
	        			
	        			joinwaitinglist(requestObj, onJoinWaitingListResponse);
	        			
	        		}
	        		
	        		return;
	        		
	        	}
	        	
	        	response.writeHead(500, {});
	        	response.end('UNHANDLED POST URL: ' + url);
	        	
	        });
			return;
		}
		response.writeHead(404, {});
		response.end("NOT FOUND");
	});

	// Listen on port 8000, IP defaults to 127.0.0.1
	server.listen(webserver.port);

	// Put a friendly message on the terminal
	logger.info("Server running at http://127.0.0.1:" + webserver.port + "/");
	
	/*
	haleyApi.listChannels(haleySession, function(error, channelsRL){
		
		if(error) {
			throw error;
		}
		
		var channels = channelsRL.iterator('http://vital.ai/ontology/vital-aimp#Channel');
		
		var loginChannel = null;
		
		for(var i = 0; i < channels.length; i++) {
			
			var c = channels[i];
			if(c.get('name') == haley_username) {
				loginChannel = c;
				break;
				
			}
			
		}
		
		if(loginChannel == null) {
			throw "no login channel found";
		}
		logger.info("login channel", loginChannel);
		
		
		var fileQuestionMsg = null;
		
		var msg = vitaljs.graphObject({type: 'http://vital.ai/ontology/vital-aimp#IntentMessage'});
		msg.URI = 'http://vital.ai/message/IntentMessage/msg-' + new Date().getTime() + '-' + Math.round( 10000 * Math.random());  
		msg.set('channelURI', loginChannel.URI);
		msg.set('intent', 'fileupload');
		var scope = 'Public';
		msg.set('propertyValue', scope);
		
		var onFileQuestionMsg = function(){

			var fileObject = {
				filePath: 'C:\\Temp\\file.txt',
				accountURIs: null,
				parentNodeURI: null
			};
				
			
			haleyApi.uploadFile(haleySession, fileQuestionMsg, fileObject, function(error, fileNode){
				
				if(error) {
					logger.error("Error when uploading file: ", error);
				} else {
					
					logger.info("File uploaded successfully", fileNode);
					
				}

				var d1 = haleyApi.getFileNodeDownloadURL(haleySession, fileNode);

				logger.info("DownloadUR 1: " + d1);
				
				var d2 = haleyApi.getFileNodeURIDownloadURL(haleySession, fileNode.URI);
				logger.info("DownloadURL 2: " + d2);

				
			});
			
		}
		
		haleyApi.sendMessageWithRequestCallback(haleySession, msg, [], function(error){
			
			if(error) {
				logger.error("Error when sending intent request", error);
				uploadPanelButton.removeAttr('disabled');
				if(_this.uploadButtonStateListener != null) {
					_this.uploadButtonStateListener(true);
				}
				fileScopeRadio.removeAttr('disabled');
			} else {
				logger.info('fileupload request message sent');
			}
			
		}, function(msgRL){
			
			var msg = msgRL.first();
			
			if(msg.type != 'http://vital.ai/ontology/vital-aimp#QuestionMessage') {
				logger.warn("Ignoring message of type: " + msg.type);
				return true;
			}
			
			var objs = msgRL.iterator();
			
			if(objs.length > 1 && objs[1].type != 'http://vital.ai/ontology/vital-aimp#FileQuestion') {
				return false;
			}
			
//			if(resTimeout == null) {
//				logger.warn('already timed out!');
//				return false;
//			}
			
			logger.info("file question received", objs);
			
			fileQuestionMsg = objs;
			
			onFileQuestionMsg();
			
			return false;
			
		});
		
	});
	*/
	
}

//onSessionAuthenticated();

function entitySearch(requestObject, closure) {
	
	var query = requestObject.query;
	
	var category = requestObject.category;
	
	var entityCommandMessage = vitaljs.graphObject({type: 'http://vital.ai/ontology/vital-aimp#EntityCommandMessage'});
	entityCommandMessage.URI = 'urn:' + new Date().getTime() + '_' + Math.round(Math.random() * 10000);
	entityCommandMessage.set('command', 'query');
	entityCommandMessage.set('channelURI', haley_channelURI);

	
	var typeCriterion = vitaljs.graphObject({type: 'http://vital.ai/ontology/vital-aimp#QueryCriterion'});
	typeCriterion.URI = 'urn:criterion-' + new Date().getTime() + '_' + Math.round(Math.random() * 10000);
	typeCriterion.set('propertyName', 'type');
	typeCriterion.set('comparator', 'EQ');
	typeCriterion.set('propertyValue', '"' + entitySetURI + '"');

	
	var payload = [typeCriterion];
	
	var approved = requestObject.approved;
	
	if( approved != null ) {
		
		var approvedCriterion = vitaljs.graphObject({type: 'http://vital.ai/ontology/vital-aimp#QueryCriterion'});
		approvedCriterion.URI = 'urn:criterion-' + new Date().getTime() + '_' + Math.round(Math.random() * 10000);
		approvedCriterion.set('propertyName', approvedPropertyURI);
		approvedCriterion.set('comparator', 'EQ');
		approvedCriterion.set('propertyValue', '' + approved);
		
		payload.push(approvedCriterion);
		
	}
	
   
	if(query) {
		
		var nameCriterion = vitaljs.graphObject({type: 'http://vital.ai/ontology/vital-aimp#QueryCriterion'});
		nameCriterion.URI = 'urn:criterion-' + new Date().getTime() + '_' + Math.round(Math.random() * 10000);
//		nameCriterion.set('propertyName', 'http://vital.ai/ontology/vital-core#hasName');
		nameCriterion.set('propertyName', keywordsPropertyURI);
//	nameCriterion.set('comparator', 'REGEXP');
//	nameCriterion.set('propertyValue', '".*' + query + '.*"');
		nameCriterion.set('comparator', 'KEYWORDS_SEARCH');
		nameCriterion.set('propertyValue', '"' + query + '"');
		
		payload.push(nameCriterion);
		
	}
	
	
	if(category) {
		
		var categoryCriterion = vitaljs.graphObject({type: 'http://vital.ai/ontology/vital-aimp#QueryCriterion'});
		categoryCriterion.URI = 'urn:criterion-' + new Date().getTime() + '_' + Math.round(Math.random() * 10000);
		categoryCriterion.set('propertyName', categoriesPropertyURI);
		categoryCriterion.set('comparator', 'CONTAINS');
		categoryCriterion.set('propertyValue', '"' + category + '"');
		
		payload.push(categoryCriterion);
		
	}
	
	var offset = requestObject.offset;
	if(offset != null) {
		var offsetCriterion = vitaljs.graphObject({type: 'http://vital.ai/ontology/vital-aimp#QueryCriterion'});
		offsetCriterion.URI = 'urn:criterion-' + new Date().getTime() + '_' + Math.round(Math.random() * 10000);
		offsetCriterion.set('propertyName', 'offset');
		offsetCriterion.set('comparator', 'EQ');
		offsetCriterion.set('propertyValue', '' + offset);
		payload.push(offsetCriterion);
	}
	
	var limit = requestObject.limit;
	if(limit != null) {
		var limitCriterion = vitaljs.graphObject({type: 'http://vital.ai/ontology/vital-aimp#QueryCriterion'});
		limitCriterion.URI = 'urn:criterion-' + new Date().getTime() + '_' + Math.round(Math.random() * 10000);
		limitCriterion.set('propertyName', 'limit');
		limitCriterion.set('comparator', 'EQ');
		limitCriterion.set('propertyValue', '' + limit);
		payload.push(limitCriterion);
	}
	
	if(requestObject.promoted == true) {
		var promotedCriterion = vitaljs.graphObject({type: 'http://vital.ai/ontology/vital-aimp#QueryCriterion'});
		promotedCriterion.URI = 'urn:criterion-' + new Date().getTime() + '_' + Math.round(Math.random() * 10000);
		promotedCriterion.set('propertyName', promotedPropertyURI);
		promotedCriterion.set('comparator', 'EQ');
		promotedCriterion.set('propertyValue', '' + true);
		payload.push(promotedCriterion);
	}
	
	var sortProperty = requestObject.sortProperty;
	if(sortProperty != null) {
		var sortPropertyCriterion = vitaljs.graphObject({type: 'http://vital.ai/ontology/vital-aimp#QueryCriterion'});
		sortPropertyCriterion.URI = 'urn:criterion-' + new Date().getTime() + '_' + Math.round(Math.random() * 10000);
		sortPropertyCriterion.set('propertyName', 'sortproperty');
		sortPropertyCriterion.set('comparator', 'EQ');
		sortPropertyCriterion.set('propertyValue', '"' + sortProperty + '"');
		payload.push(sortPropertyCriterion);		
	}
	
	var sortDirection = requestObject.sortDirection;
	if(sortDirection != null) {
		var sortDirectionCriterion = vitaljs.graphObject({type: 'http://vital.ai/ontology/vital-aimp#QueryCriterion'});
		sortDirectionCriterion.URI = 'urn:criterion-' + new Date().getTime() + '_' + Math.round(Math.random() * 10000);
		sortDirectionCriterion.set('propertyName', 'sortdirection');
		sortDirectionCriterion.set('comparator', 'EQ');
		sortDirectionCriterion.set('propertyValue', '"' + sortDirection + '"');
		payload.push(sortDirectionCriterion);		
	}
	
	var timeout = setTimeout(function(){
		closure('Search request timed out (10000ms)', null);
		timeout = null;
	}, 10000);
	
	haleyApi.sendMessageWithRequestCallback(haleySession, entityCommandMessage, payload, function(error){
		
		if(error) {
			logger.error("Error when sending entity query request message: ", error);
			closure(error, null);
		} else {
			logger.info("entity query request sent successfully.");
		}
		
	}, function(msgRL){
		
		//VirtualLoginResponseMessage 
		var res = msgRL.first();
		
		//ignoring dialog begins and similar messages
		if(res.type != 'http://vital.ai/ontology/vital-aimp#MetaQLResultsMessage') {
			//keep waiting
			logger.warn("Ignoring message of type: ", res.type);
			return true;
		}
		
		if(timeout != null) {
			clearTimeout(timeout);
			timeout = null;
		} else {
			logger.warn("Already timed out");
			return false;
		}
		
		var status = res.get('status');
		if(status == null) status = '';
		
		if(status.toLowerCase() !== 'ok') {
			var error = status ? status : '(unknown error)';
			logger.error(error);
			closure(error, null);
			return false; 
		}

		
		var entities = msgRL.iterator('http://vital.ai/ontology/vital-aimp#Entity');
		
		var scoresMap = {};
		
		//collect scores
		var hedges = msgRL.iterator('http://vital.ai/ontology/vital-aimp#HyperEdge_hasListFactElement');
		for(var i = 0 ; i < hedges.length; i++) {
			var hedge = hedges[i];
			var score = hedge.get('score');
			scoresMap[hedge.get('hyperEdgeDestination')] = score;
		}
		
		logger.info("scores map", scoresMap);
		
		var totalResultsOut = res.get('totalResults');
		var limitOut = res.get('limit');
		var offsetOut = res.get('offset');
		
		logger.info("totalResults:", totalResultsOut);
		
		closure(null, {entities: entities, scoresMap: scoresMap, offset: offsetOut, limit: limitOut, totalResults: totalResultsOut, query: query, sortProperty: sortProperty, sortDirection: sortDirection,
			promoted: requestObject.promoted});
		
		//no more messages expected
		return false;
		
	});
	
	
}

function mock_entitySearch(requestObject, closure) {

	var entities = [];
	
	var promoted = requestObject.promoted;
	
	var query = requestObject.query;
	var category = requestObject.category;
	var offset = requestObject.offset;
	var limit= requestObject.limit;
	if(offset == null) offset = 0;
	if(limit == null) limit = 10;
	var sortProperty = requestObject.sortProperty;
	if(sortProperty == null) sortProperty = 'relevance';
	var sortDirection = requestObject.sortDirection;
	if(sortDirection == null) sortDirection = 'descending';

	if(query) {
		query = query.toLowerCase();
	} 
	
	var scoresMap = {};
	
	for(var i = 0 ; i < entitiesDao.length; i++) {
		
		var entity = entitiesDao[i];
		
		var score = null;
		
		if(query) {
			
			if(entity.get('name').toLowerCase().indexOf(query) >= 0) {
				
				score = entitiesDao.length - i;
				
			}
		}
		
		if(category) {
			
			if(entity[categoriesPropertyURI] && entity[categoriesPropertyURI].value.indexOf(category) >= 0) {
				
				score = entitiesDao.length - i;
				
			}
			
		}
			
		if(promoted) {
			
			if(entity[promotedPropertyURI] && entity[promotedPropertyURI].value == true) {
				
				score = entitiesDao.length - i;
				
			}
			
		}
		
		if(score) {
			
			entities.push(entity);
			scoresMap[entity.URI] = entitiesDao.length - i;
			
		}
		
		
	}
	
	var totalResults = entities.length;
	entities = entities.slice(Math.min(offset, entities.length), Math.min(offset + limit, entities.length));
	
	closure(null, {entities: entities, scoresMap: scoresMap, offset: offset, limit: limit, totalResults: totalResults, query: query, sortProperty: sortProperty, sortDirection: sortDirection,
		promoted: promoted, category: category});
	
}


function getentity(entityURI, closure) {
	
	logger.info('getentity', entityURI);
	
	var entityCommandMessage = vitaljs.graphObject({type: 'http://vital.ai/ontology/vital-aimp#EntityCommandMessage'});
	entityCommandMessage.URI = 'urn:' + new Date().getTime() + '_' + Math.round(Math.random() * 10000);
	entityCommandMessage.set('command', 'getentity');
	entityCommandMessage.set('channelURI', haley_channelURI);
	entityCommandMessage.set('objectURI', entityURI);
	
	var timeout = setTimeout(function(){
		closure('getentity request timed out (10,000ms)', null);
		timeout = null;
	}, 10000);

	haleyApi.sendMessageWithRequestCallback(haleySession, entityCommandMessage, [], function(error){
		
		if(error) {
			logger.error("Error when sending getentity request message: ", error);
			closure(error, null);
		} else {
			logger.info("getentity request sent successfully.");
		}
		
	}, function(msgRL){

		//VirtualLoginResponseMessage 
		var res = msgRL.first();
		
		//ignoring dialog begins and similar messages
		if(res.type != 'http://vital.ai/ontology/vital-aimp#EntityMessage') {
			//keep waiting
			return true;
		}
		
		if(timeout != null) {
			clearTimeout(timeout);
			timeout = null;
		} else {
			logger.warn("Already timed out");
			return false;
		}
		
		var status = res.get('text');
		if(status == null) status = '';
		
		if(status.toLowerCase() !== 'ok') {
			var error = status ? status : '(unknown error)';
			logger.error(error);
			closure(error, null);
			return false; 
		}

		
		//dialog returns target nodes (categories)
		var entities = msgRL.iterator('http://vital.ai/ontology/vital-aimp#Entity');
		
		var entity = entities.length > 0 ? entities[0] : null;
		
		if(entity && entity[endpointURIPropertyURI] != null && entity[publishedPropertyURI] && entity[publishedPropertyURI].value == true) {
			
			//also lookup endpointURI
			getEndpointByURI(entity[endpointURIPropertyURI].value, function(error, endpoint){
				if(error) {
					closure(error);
					return;
				} else {
					closure(null, entity, endpoint);
				}
			});
			
		} else {
			
			closure(null, entity);
			
		}
		
		
		//no more messages expected
		return false;
		
	});
}

function getentitybyslug(slug, closure) {
	
	logger.info('getentitybyslug', slug);
	
	var entityCommandMessage = vitaljs.graphObject({type: 'http://vital.ai/ontology/vital-aimp#EntityCommandMessage'});
	entityCommandMessage.URI = 'urn:' + new Date().getTime() + '_' + Math.round(Math.random() * 10000);
	entityCommandMessage.set('command', 'query');
	entityCommandMessage.set('channelURI', haley_channelURI);

	var typeCriterion = vitaljs.graphObject({type: 'http://vital.ai/ontology/vital-aimp#QueryCriterion'});
	typeCriterion.URI = 'urn:criterion-' + new Date().getTime() + '_' + Math.round(Math.random() * 10000);
	typeCriterion.set('propertyName', 'type');
	typeCriterion.set('comparator', 'EQ');
	typeCriterion.set('propertyValue', '"' + entitySetURI + '"');

	var slugCriterion = vitaljs.graphObject({type: 'http://vital.ai/ontology/vital-aimp#QueryCriterion'});
	slugCriterion.URI = 'urn:criterion-' + new Date().getTime() + '_' + Math.round(Math.random() * 10000);
	slugCriterion.set('propertyName', slugPropertyURI);
	slugCriterion.set('comparator', 'EQ');
	slugCriterion.set('propertyValue', '"' + slug + '"');
	
	var payload = [typeCriterion];
	
	payload.push(slugCriterion);
	
	var timeout = setTimeout(function(){
		closure('Search request timed out (10000ms)', null);
		timeout = null;
	}, 10000);
	
	haleyApi.sendMessageWithRequestCallback(haleySession, entityCommandMessage, payload, function(error){
		
		if(error) {
			logger.error("Error when sending getentitybyslug search request message: ", error);
			closure(error, null);
		} else {
			logger.info("getentitybyslug search request sent successfully.");
		}
		
	}, function(msgRL){

		//VirtualLoginResponseMessage 
		var res = msgRL.first();
		
		//ignoring dialog begins and similar messages
		if(res.type != 'http://vital.ai/ontology/vital-aimp#MetaQLResultsMessage') {
			//keep waiting
			logger.warn("Ignoring message of type: ", res.type);
			return true;
		}
		
		if(timeout != null) {
			clearTimeout(timeout);
			timeout = null;
		} else {
			logger.warn("Already timed out");
			return false;
		}
		
		var status = res.get('status');
		if(status == null) status = '';
		
		if(status.toLowerCase() !== 'ok') {
			var error = status ? status : '(unknown error)';
			logger.error(error);
			closure(error, null);
			return false; 
		}

		
		var entities = msgRL.iterator('http://vital.ai/ontology/vital-aimp#Entity');
		
		if(entities.length > 1) {
			var error = 'More than 1 [' + entities.length + '] entity for slug: ' + slug + ' found';
			return false;
		}
		
		var entity = entities.length > 0 ? entities[0] : null;
		
		if(entity && entity[endpointURIPropertyURI] != null && entity[publishedPropertyURI] && entity[publishedPropertyURI].value == true) {
			
			//also lookup endpointURI
			getEndpointByURI(entity[endpointURIPropertyURI].value, function(error, endpoint){
				if(error) {
					closure(error);
					return;
				} else {
					closure(null, entity, endpoint);
				}
			});
			
		} else {
			
			closure(null, entity);
			
		}
		
		
		//no more messages expected
		return false;
		
	});
}


/**
 * closure called with error|null
 * @param closure
 */
function status(closure) {
	
	var failIfListElementsDifferent = false;
	
	haleyApi.validateDomainModels(failIfListElementsDifferent, function(error) {
		if(error) {
			logger.error("Error when validating domains", error);
			closure(error);
			return;
		}
		onDomainsOK(closure);
	});
	
}	
function onDomainsOK(closure) {
	
	var entityCommandMessage = vitaljs.graphObject({type: 'http://vital.ai/ontology/vital-aimp#EntityCommandMessage'});
	entityCommandMessage.URI = 'urn:' + new Date().getTime() + '_' + Math.round(Math.random() * 10000);
	entityCommandMessage.set('command', 'ping');
	entityCommandMessage.set('channelURI', haley_channelURI);

	var timeout = setTimeout(function(){
		closure('ping request timed out (10000ms)');
		timeout = null;
	}, 10000);
	
	haleyApi.sendMessageWithRequestCallback(haleySession, entityCommandMessage, [], function(error){
		
		if(error) {
			logger.error("Error when sending ping request message: ", error);
			closure(error);
		} else {
			logger.info("getendpoint request sent successfully.");
		}
		
	}, function(msgRL){

		//VirtualLoginResponseMessage 
		var res = msgRL.first();
		
		//ignoring dialog begins and similar messages
		if(res.type != 'http://vital.ai/ontology/vital-aimp#EntityMessage') {
			//keep waiting
			return true;
		}
		
		if(timeout != null) {
			clearTimeout(timeout);
			timeout = null;
		} else {
			logger.warn("Already timed out");
			return false;
		}
		
		var status = res.get('text');
		if(status == null) status = '';
		
		if(status.toLowerCase() !== 'ok') {
			var error = status ? status : '(unknown error)';
			logger.error(error);
			closure(error);
			return false; 
		}
		
		closure(null);
		
		//no more messages expected
		return false;
		
	});
	
}

function mock_status(closure) {
	closure(null);
}


function getEndpointByURI(endpointURI, closure) {
	
	
	logger.info('getEndpointByURI', endpointURI);
	
	var entityCommandMessage = vitaljs.graphObject({type: 'http://vital.ai/ontology/vital-aimp#EntityCommandMessage'});
	entityCommandMessage.URI = 'urn:' + new Date().getTime() + '_' + Math.round(Math.random() * 10000);
	entityCommandMessage.set('command', 'getendpoint');
	entityCommandMessage.set('objectURI', endpointURI);
	entityCommandMessage.set('channelURI', haley_channelURI);

	var timeout = setTimeout(function(){
		closure('Search request timed out (10000ms)', null);
		timeout = null;
	}, 10000);
	
	haleyApi.sendMessageWithRequestCallback(haleySession, entityCommandMessage, [], function(error){
		
		if(error) {
			logger.error("Error when sending getendpoint request message: ", error);
			closure(error, null);
		} else {
			logger.info("getendpoint request sent successfully.");
		}
		
	}, function(msgRL){

		//VirtualLoginResponseMessage 
		var res = msgRL.first();
		
		//ignoring dialog begins and similar messages
		if(res.type != 'http://vital.ai/ontology/vital-aimp#EntityMessage') {
			//keep waiting
			return true;
		}
		
		if(timeout != null) {
			clearTimeout(timeout);
			timeout = null;
		} else {
			logger.warn("Already timed out");
			return false;
		}
		
		var status = res.get('text');
		if(status == null) status = '';
		
		if(status.toLowerCase() !== 'ok') {
			var error = status ? status : '(unknown error)';
			logger.error(error);
			closure(error, null);
			return false; 
		}
		
		var endpoints = msgRL.iterator('http://vital.ai/ontology/vital-aimp#Endpoint');
		
		var endpoint = endpoints.length > 0 ? endpoints[0] : null;
		
		logger.info("getEndpointByURI " + endpointURI + " response: "  , endpoint);
		
		closure(null, endpoint);
		
		//no more messages expected
		return false;
		
	});
	
}

function mock_getentity(entityURI, closure) {
	
	logger.info('getentity', entityURI);
	
	var entity = null;
	
	for(var i = 0 ; i < entitiesDao.length ; i++) {
	
		var e = entitiesDao[i];
		
		if(e.URI == entityURI) {
			entity = e;
			break;
		}
		
	}
	
	if(entity && entity[endpointURIPropertyURI] != null && entity[publishedPropertyURI] && entity[publishedPropertyURI].value == true) {
		
		var endpointURI = entity[endpointURIPropertyURI].value;
		
		var endpoint = null;
		
		for(var i = 0 ; i < endpointsDao.length; i++) {
			var ep = endpointsDao[i];
			if(ep.URI == endpointURI) {
				endpoint = ep;
				break;
			}
		}
		
		closure(null, entity, endpoint);
		
	} else {
		
		closure(null, entity);
		
	}
	
	
}

function mock_getentitybyslug(slug, closure) {
	
	logger.info('getentitybyslug', slug);
	
	var entity = null;
	
	for(var i = 0 ; i < entitiesDao.length ; i++) {
	
		var e = entitiesDao[i];
		
		if(e[slugPropertyURI] && e[slugPropertyURI].value == slug) {
			entity = e;
			break;
		}
		
	}
	
	
	
	if(entity && entity[endpointURIPropertyURI] != null && entity[publishedPropertyURI] && entity[publishedPropertyURI].value == true) {
		
		var endpointURI = entity[endpointURIPropertyURI].value;
		
		var endpoint = null;
		
		for(var i = 0 ; i < endpointsDao.length; i++) {
			var ep = endpointsDao[i];
			if(ep.URI == endpointURI) {
				endpoint = ep;
				break;
			}
		}
		
		closure(null, entity, endpoint);
		
	} else {
		
		closure(null, entity);
		
	}
	
}

function entityform(closure) {
	var l = [{
		label: 'URI',
		property: 'URI',
		URI: 'URI'
	},{
		label: 'Name',
		property: 'Name',
		URI: 'http://vital.ai/ontology/vital-core#hasName'
	}];
	for(var i = 0 ; i < entityPropertyURIToLabel.length; i++) {
		var p = entityPropertyURIToLabel[i];
		if(p.type == 'StringProperty') {
			l.push(entityPropertyURIToLabel[i]);
		}
	}
	closure(null, l);
}


function createentity(requestObj, closure) {
	
	logger.info('createentity', requestObj);
	
	var entityCommandMessage = vitaljs.graphObject({type: 'http://vital.ai/ontology/vital-aimp#EntityCommandMessage'});
	entityCommandMessage.URI = 'urn:' + new Date().getTime() + '_' + Math.round(Math.random() * 10000);
	entityCommandMessage.set('command', 'createentity');
	entityCommandMessage.set('channelURI', haley_channelURI);

	var entity = requestObjectToEntity(requestObj, closure);
	if(entity == null) return;
	//force approved = false
	entity[approvedPropertyURI] = {value: false, _type: 'ai.vital.vitalsigns.model.property.BooleanProperty'};
	
	var slug = entity[slugPropertyURI].value
	
//	getentitybyslug(slug, closure)
	
	var onEntitySlugLookup = function(error, existingEntity){
		
		if(error) {
			closure("Error when checking existing entity: " + error);
			return;
		}
		
		if(existingEntity != null) {
			closure("Entity with slug exists: " + slug)
			return;
		}
		
		logger.info("slug available, creating entity ", entity);
		
		var timeout = setTimeout(function(){
			closure('createentity request timed out (10,000ms)', null);
			timeout = null;
		}, 10000);

		haleyApi.sendMessageWithRequestCallback(haleySession, entityCommandMessage, [entity], function(error){
			
			if(error) {
				logger.error("Error when sending createentity request message: ", error);
				closure(error, null);
			} else {
				logger.info("createentity request sent successfully.");
			}
			
		}, function(msgRL){

			//VirtualLoginResponseMessage 
			var res = msgRL.first();
			
			//ignoring dialog begins and similar messages
			if(res.type != 'http://vital.ai/ontology/vital-aimp#EntityMessage') {
				//keep waiting
				return true;
			}
			
			if(timeout != null) {
				clearTimeout(timeout);
				timeout = null;
			} else {
				logger.warn("Already timed out");
				return false;
			}
			
			var status = res.get('text');
			if(status == null) status = '';
			
			if(status.toLowerCase() !== 'ok') {
				var error = status ? status : '(unknown error)';
				logger.error(error);
				closure(error, null);
				return false; 
			}

			
			//dialog returns target nodes (categories)
			var entities = msgRL.iterator('http://vital.ai/ontology/vital-aimp#Entity');
			
			closure(null, entities);
			
			//no more messages expected
			return false;
			
		});
	};
	
	logger.info('looking up entity first', slug);
	getentitybyslug(slug, onEntitySlugLookup);
	
	

}


function requestObjectToEntity(requestObj, closure) {
	
	var entity = vitaljs.graphObject({type: 'http://vital.ai/ontology/vital-aimp#Entity'});
	entity.URI = requestObj.URI;
	entity.set('name', requestObj['http://vital.ai/ontology/vital-core#hasName']);
	entity.set('entitySetURI', [entitySetURI]);
	
	var slug = null;
	
	var keys = Object.keys(requestObj);
	for(var k in keys) {
		var key = keys[k];
		
		if(key == 'URI' || key == 'http://vital.ai/ontology/vital-core#hasName') {
			continue;
		}
		
		var val = requestObj[key];
		

		
		logger.info('k: ' +key + " val: " + val);
		var epData = null;
		for(var i = 0 ; i < entityPropertyURIToLabel.length; i++) {
			var d = entityPropertyURIToLabel[i];
			if(d.URI == key) {
				epData = d;
				break;
			}
		}
		
		if(epData == null) {
			closure("entity property metadata not found: " + key);
			return null;
		}
		
		if(!val) continue;
		if(key == 'http://vital.ai/ontology/vital-core#hasName' || key == 'type' || key == 'URI') continue;
		
		try {

			if(epData.multivalue == true) {
				
				val = JSON.parse(val);
				if( ! Array.isArray(val) ) {
					throw "multivalue property must be encoded as json array of strings";
				}
				
				if(val.length == 0) {
					throw "multivalue property array must not be empty";
				}
				
				for(var i = 0 ; i < val.length; i++) {
					if(typeof( val[i]) != "string" ) {
						throw "multivalue property array element must be a string";
					}
				}
			}
			
		} catch(e) {
			closure(e);
			return null;
		}

		
		entity[key] = {value: val, _type: 'ai.vital.vitalsigns.model.property.StringProperty'};
		
		if(key == slugPropertyURI) {
			slug = val;
		}
		
	}
	
	if(!entity.URI) {
		closure('no entity URI');
		return null;
	}
	
	if(entity.URI.indexOf(':') <= 0 || entity.URI.lastIndexOf(':') == entity.URI.length-1) {
		closure('invalid entity URI: ' + entity.URI);
		return null;
	}
	
	if(!entity.get('name')) {
		closure('entity name is required');
		return null;
	}
	
	if( !slug ) {
		closure('slug is required');
		return null;
	}
	
	return entity;
}

function mock_createentity(requestObj, closure) {
	
	logger.info('mock_createentity', requestObj);
	
	var entity = requestObjectToEntity(requestObj, closure);
	
	if(entity == null) return;
	
	//force approved = false
	entity[approvedPropertyURI] = {value: false, _type: 'ai.vital.vitalsigns.model.property.BooleanProperty'};
	
	logger.info("creating mock entity ", entity);
	
	var index = -1;
	for(var i = 0; i < entitiesDao.length; i++) {
		if( entitiesDao[i].URI == entity.URI ) {
			index = i;
			break;
		}
	}
	
	if(index < 0) {
		entitiesDao.push(entity);
	} else {
		entitiesDao[i] = entity;
	}
		
	closure(null, [entity]);
	
}

function mock_joinwaitinglist(requestObj, closure) {
	
	logger.info('mock_joinwaitinglist', requestObj);
	
	if(requestObj.email == 'derek@vital.ai') {
		closure(null);
	} else {
		closure("only 'derek@vital.ai' email supported.");
	}
	
}

function joinwaitinglist(requestObj, closure) {
	
	var intentMessage = vitaljs.graphObject({type: 'http://vital.ai/ontology/vital-aimp#IntentMessage'});
	intentMessage.URI = 'urn:joinwaitinglist-' + new Date().getTime() + '_' + Math.round(Math.random() * 10000);
	intentMessage.set('channelURI', haley_waitingListChannelURI);
	intentMessage.set('intent', 'joinwaitinglist');
	intentMessage.set('propertyValue', JSON.stringify(requestObj));

	var timeout = setTimeout(function(){
		closure('joinwaitinglist request timed out (10,000ms)');
		timeout = null;
	}, 10000);

	haleyApi.sendMessageWithRequestCallback(haleySession, intentMessage, [], function(error){
			
		if(error) {
			logger.error("Error when sending joinwaitinglist request message: ", error);
			closure(error);
		} else {
			logger.info("joinwaitinglist sent successfully.");
		}
			
	}, function(msgRL){

		//VirtualLoginResponseMessage 
		var res = msgRL.first();
			
		//ignoring dialog begins and similar messages
		if(res.type != 'http://vital.ai/ontology/vital-aimp#MetaQLResultsMessage') {
			//keep waiting
			return true;
		}
			
		if(timeout != null) {
			clearTimeout(timeout);
			timeout = null;
		} else {
			logger.warn("Already timed out");
			return false;
		}
			
		var status = res.get('status');
		if(status == null) status = '';
			
		if(status.toLowerCase() !== 'ok') {
			var error = res.get('statusMessage');
			if(!error) error = 'unknown error';
			logger.error(error);
			closure(error, null);
			return false; 
		}

		closure(null);
		//no more messages expected
		return false;
			
	});
	
}

function entityToResult(entity) {

	var r = {
		type: 'entity',
		URI: entity.URI,
		name: entity.get('name'),
		description: entity[descriptionPropertyURI] ? entity[descriptionPropertyURI].value : null,
		url: entity[urlPropertyURI] ? entity[urlPropertyURI].value : null,
		endpoint: entity[endpointPropertyURI] ? entity[endpointPropertyURI].value : null,
		imageURL: entity[imageURLPropertyURI] ? entity[imageURLPropertyURI].value : null,
		approved: entity[approvedPropertyURI] ? entity[approvedPropertyURI].value : null,
		category: entity[categoryPropertyURI] ? entity[categoryPropertyURI].value : null,
		categories: entity[categoriesPropertyURI] ? entity[categoriesPropertyURI].value : null,
		slug: entity[slugPropertyURI] ? entity[slugPropertyURI].value : null,
		promoted: entity[promotedPropertyURI] ? entity[promotedPropertyURI].value : null,
		endpointURI: entity[endpointURIPropertyURI] ? entity[endpointURIPropertyURI].value : null,
		published: entity[publishedPropertyURI] ? entity[publishedPropertyURI].value : null,
        descriptionHTML: entity[descriptionHTMLPropertyURI] ? entity[descriptionHTMLPropertyURI].value : null,
        headerImageURL: entity[headerImageURLPropertyURI] ? entity[headerImageURLPropertyURI].value : null 
	};
	
	return r;
}
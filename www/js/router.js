//global navigo router
var router = null;

//router is activated after the vitalservice is connected

var mc = $('#main-content');

var currentPanel = null;

var botPanel = new BotPanel(mc);

var entityDetailsPanel = new EntityDetailsPanel(mc);

var homePanel = new HomePanel(mc);

var searchResultsPanel = new SearchResultsPanel(mc);

var submitEntityPanel = new SubmitEntityPanel(mc);

//var relationshipPropertyEditPanel = new RelationshipPropertyPanel(mc, false, true);

//a better way to use navigo links, no need to refresh
$(document).on('click', '[data-navigo2]', function(event){

	
	if(router == null) {
		console.warn("router not ready, ignoring nav event");
		return false;
	}
	//hide dropdowns
	$('[data-toggle="dropdown"]').parent().removeClass('open');
	
	
	var href = $(this).attr('href');

	if(href == '-') {
		return false;
	}
	
	try {
		router.navigate(href);
	} catch(e) {
		console.error(e);
	}
		
	return false;
	
});

function sendGARequest(page) {
	
	ga('set', 'page', page);
	ga('send', 'pageview');
	
}

function initRouter() {
	
	var port = '' + window.location.port;
	
	if(port.length > 0) port = ':' + port;
		
	var urlPrefix = '/';
	
	if(urlPrefix.substring(urlPrefix.length -1, urlPrefix.length ) === '/') {
		urlPrefix = urlPrefix.substring(0, urlPrefix.length -1);
	}
	
	var rootURL = window.location.protocol + '//' + window.location.hostname + port + urlPrefix;
	console.log('root URL: ', rootURL);
	
	router = new Navigo(rootURL, false);
	
	router.on({
		
		'/bot/:slug/:conversationID' : function(params){
			
			var slug = params.slug;
			
			var conversationID = params.conversationID;
			
			var page = "/bot/" + slug + '/' + conversationID;
			
			console.log("Navigate: " + page);
			
			botPanel.slug = decodeURIComponent(slug);
			botPanel.conversationID = decodeURIComponent(conversationID);
			
            
			openPanel(botPanel);
			
			sendGARequest(page);
			
			//notifyMiniChatIFrame();
			
		},
		
		'/bot/:slug' : function(params){
			
			var slug = params.slug;
			
			var page = "/bot/" + slug;
			
			console.log("Navigate: " + page);
			
			botPanel.slug = decodeURIComponent(slug);
			botPanel.conversationID = null;
			
            
			openPanel(botPanel);
			
			sendGARequest(page);
			
			//notifyMiniChatIFrame();
			
		},
		
		'/detail/:slug' : function(params) {
			
			if(currentPanel == searchResultsPanel) {
				entityDetailsPanel.backToSearchResultsURL = SearchResultsPanel.getSearchResultsLink(searchResultsPanel);
			} else {
				entityDetailsPanel.backToSearchResultsURL = null;
			}
			
			var slug = params.slug;
			
			var page = "/entity/" + slug;
			
			console.log("Navigate: " + page);
			
			entityDetailsPanel.slug = decodeURIComponent(slug);
			
            
			openPanel(entityDetailsPanel);
			
			sendGARequest(page);
			
			//notifyMiniChatIFrame();
			
		},
        
		'/content/:slug/:category/:product' : function(params) {
			
			if(currentPanel == searchResultsPanel) {
				entityDetailsPanel.backToSearchResultsURL = SearchResultsPanel.getSearchResultsLink(searchResultsPanel);
			} else {
				entityDetailsPanel.backToSearchResultsURL = null;
			}
			
			var slug = params.slug;
			
			var page = "/entity/" + slug;
			
			console.log("Navigate: " + page);
			
			entityDetailsPanel.slug = decodeURIComponent(slug);
			
            
			openPanel(entityDetailsPanel);
			
			sendGARequest(page);
			
			//notifyMiniChatIFrame();
			
		},

		'/index.html' : function(params) {

			console.log("Navigate: /index.html");
			
			console.log("redirecting to /");
			
			router.navigate('/');
		},

		'/searchresults' : function(params, query) {
			
			var page = "/searchresults";
			
			console.log("Navigate: " + page + " , query", query);
			console.log('arguments:', arguments);
			
			searchResultsPanel.query = getUrlParameter('q');
			searchResultsPanel.sortProperty = getUrlParameter('sortProperty');
			searchResultsPanel.sortDirection = getUrlParameter('sortDirection');
			searchResultsPanel.offset = getUrlParameter('offset');
			searchResultsPanel.limit = getUrlParameter('limit');
			searchResultsPanel.category = getUrlParameter('category');
			
			
            
			
			//if search results already active, don't re-refresh it
			if(currentPanel == searchResultsPanel) {
				
				searchResultsPanel.doSearch();
				
			} else {
				
				openPanel(searchResultsPanel);
				
			}
			
			sendGARequest(page);
			
			//notifyMiniChatIFrame();
		},
		
		'/submitentity' : function(params) {
			
			var page = "/submitentity";
			
			console.log("Navigate: " + page);
			
            
			openPanel(submitEntityPanel);
			
			sendGARequest(page);
			
			//notifyMiniChatIFrame();
		},
		
		'/' : function(params) {
			
			var page = "/";
			
			console.log("Navigate: " + page);
			
            
			openPanel(homePanel);
			
			sendGARequest(page);
			
			//notifyMiniChatIFrame();
			
		},
		
		'*': function (params) {
			  
			console.warn('Navigate: *');
			
//			openPanel(homePanel);
//			
//			notifyMiniChatIFrame();
			  
		}   
		
	});
	
	router.resolve();
    
    //if(!router.lastRouteResolved().url) {
    //    router.navigate('/');
    //}
	
}

function openPanel(newPanel) {
	
	if(currentPanel != null && typeof(currentPanel.cleanupAsync) === 'function') {
		
		console.log('async cleanup');
		currentPanel.cleanupAsync(function(){
			
			console.log('async cleanup complete');
			
			_openPanel(newPanel);
			
		}, currentPanel == newPanel);
		
	} else if(currentPanel != null && typeof(currentPanel.cleanup) === 'function') {
		currentPanel.cleanup(currentPanel == newPanel);
		_openPanel(newPanel);
	} else {
		_openPanel(newPanel);
	}
}

function _openPanel(newPanel) {
	
	var title = newPanel.title;
	var subtitle = newPanel.subtitle;

	$('title').text(TITLE + ' | ' + title);
	
	mc.empty();
	
	currentPanel = newPanel;
	
	/* TODO connect menus breadcrumbs if necessary
	$('.current-panel-title').text(title);
	$('.current-panel-subtitle').text(subtitle != null ? subtitle  : '');
	
	
	
	var bEl = $('#breadcrumb-panel');

	var b = newPanel.getBreadcrumbs(bEl);
	
	bEl.empty();

	if( b == null) b = [];
	
	for(var i = 0 ; i < b.length; i++) {
		
		var br = b[i];
		
		var li = $('<li>');
		
		var url = br.url;
		var p = null;
		if(url != null && i < b.length -1) {
			p = $('<a>', {'data-navigo2': '', href: url});
			li.append(p);
		} else {
			p = li;
		}
		
		if(i == b.length -1) {
			li.addClass('active');
		}
		
		p.html(br.label);
		
		bEl.append(li);
		
	}
	
	
	var navMenu = $('#nav-sidebar-menu');
	
	navMenu.find('li[data-menu]').removeClass('active');
	
	var menu = newPanel.menu;
	
	if(menu != null) {
	
		var menus = menu.split(' ');

		for(var i = 0 ; i < menus.length; i++) {
			var m = menus[i];
			navMenu.find('[data-menu="' + m + '"]').addClass('active');
		}
		
	}
	
	*/
	
	$( "html, body" ).scrollTop( 0 );
	newPanel.render();
	
}


function getUrlParameter(sParam) {
	
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if(sParameterName.length < 2) return null;
        if (sParameterName[0] == sParam) {
            var v = sParameterName[1];
            if(v.length == 0) return null;
            return  decodeURIComponent(v);
        }
    }
    
    return null;
    
}
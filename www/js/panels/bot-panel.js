BotPanel = function(parentEl) {
	this.parentEl = parentEl;
	this.title = 'Bot';
	this.menu = 'home';
	// this.subtitle = null;
	
	this.slug = null;
	this.conversationID = null;
	
}

BotPanel.prototype = new AbstractPanel();
BotPanel.prototype.constructor = BotPanel;

BotPanel.prototype.cleanup = function() {
	
	//unload the script
	$('#center-iframe-script').remove();
	
}

BotPanel.prototype.render = function(){

	var _this = this;
	
	console.log('slug: ' + this.slug);
	console.log('conversationID: ', this.conversationID);
	
	//look bot entity up based on slug
	
	var _this = this;
	
	var req = {slug: this.slug};
	
	$.post('/getentitybyslug', JSON.stringify(req), function(data, textStatus, jqXHR) {

		if (data.ok != true) {
			
			console.error("Request error:" + data.message);
			return;
		}
		
		var results = data.results;
		if(results.length == 0) {
			console.error("Entity not found, slug " + _this.slug);
			return;
		}

		var entity = results[0];
		
		var endpoint = results[1];
		
		console.log("entity", entity);
		console.log("endpoint", endpoint);
		
		if(endpoint == null) {
			console.error("endpoint object not found for entity endpointURI: " + entity.endpointURI);
			return;
		}
		
		AbstractPanel.renderTemplate(_this.parentEl, 'templates/entity-details.hbs', entity);
		
		
		AbstractPanel.renderTemplate(_this.parentEl, 'templates/bot-panel.hbs', {
			detailsURL: EntityDetailsPanel.getEntityDetailsURL(_this.slug)
		});
		
		window.HALEY_TARGET_ELEMENT_CLASS = "haley-target-iframe";
		window.HALEY_CONVERSATION_ID = _this.conversationID ? _this.conversationID : null;
		
	  	var script = document.createElement('script');
	  	script.setAttribute('id', 'center-iframe-script');
	  	script.setAttribute('src', SAAS_SERVER_URL + '/iframe/'+ endpoint.endpointID + '/index.js');
	  	document.body.append(script);
		
	}).fail(function() {
		
		console.error("ERROR", arguments[2]);
			
	});
	
  	
}


BotPanel.getBotURL = function(slug) {
	return '/bot/' + encodeURIComponent(slug); 
}


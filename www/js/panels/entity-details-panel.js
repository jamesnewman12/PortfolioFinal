EntityDetailsPanel = function(parentEl) {
	this.parentEl = parentEl;
	this.title = 'Entity Details';
	this.menu = 'home';
	// this.subtitle = null;
	
	this.slug = null;
	
	this.dataTable = null;
	
	this.backToSearchResultsURL = null;
	
}

EntityDetailsPanel.prototype = new AbstractPanel();
EntityDetailsPanel.prototype.constructor = EntityDetailsPanel;

EntityDetailsPanel.prototype.cleanup = function() {
}

EntityDetailsPanel.prototype.render = function(){

	var _this = this;
	
	console.log('entity slug: ' + this.slug);
	
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

        // this fixes encoding issues
        entity["descriptionHTML"] = entity["descriptionHTML"].replace(/\n/g, "\\n");
        
        //console.log("descriptionHTML" + entity["descriptionHTML"]);
        
        
        
		var endpoint = results[1];
		
		console.log("entity", entity);
		
		if(endpoint != null) {
			entity.botDetailsURL = BotPanel.getBotURL(_this.slug);
		}
		
		entity.backToSearchResultsURL = _this.backToSearchResultsURL;
		
		AbstractPanel.renderTemplate(_this.parentEl, 'templates/entity-details.hbs', entity);
		
        
         var header = _this.parentEl.find('.top-header');
    
        AbstractPanel.renderTemplate(header, 'templates/header_partial.hbs', entity);	
   
        
        
	}).fail(function() {
		
		console.error("ERROR", arguments[2]);
			
	});
	
	
}


EntityDetailsPanel.getEntityDetailsURL = function(slug) {
	return '/detail/' + encodeURIComponent(slug); 
}

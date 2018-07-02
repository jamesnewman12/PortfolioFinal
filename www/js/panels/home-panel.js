HomePanel = function(parentEl) {
	this.parentEl = parentEl;
	this.title = 'Home';
	this.menu = 'home';
	// this.subtitle = null;
	
	AbstractPanel.registerPartial('search-bar_partial');
	
    //AbstractPanel.registerPartial('header_partial');
    
    
	this.promotedError = null;
	this.promotedItems = null;
	
	this.topResultsError = null;
	this.topResultsCtx = null;
}

HomePanel.prototype = new AbstractPanel();
HomePanel.prototype.constructor = HomePanel;

HomePanel.prototype.cleanup = function() {
	
	this.promotedError = null;
	this.promotedItems = null;
	
	this.topResultsError = null;
	this.topResultsCtx = null;
	
}

HomePanel.prototype.render = function() {

	var _this = this;
	

    console.log('after header render');
    
    
	var req = {
		query : null,
		category: 'Top',
		sortProperty : 'relevance',
		sortDirection : 'descending',
		offset : 0,
		limit : 10
	};
	
	SearchResultsPanel.executeSearch(req, function(error, resultsCtx){
		
		console.log('search callback, error?', error);
		
		_this.topResultsError = error;
		_this.topResultsCtx = resultsCtx;
		
		_this.onTopResultsReady();
		
		
	});
	
}

HomePanel.prototype.onTopResultsReady = function() {
	
	var _this = this;
	
	var req = {
		promoted: true,
		offset : 0,
		limit : 3
	};
	
	$.post('/search', JSON.stringify(req), function(data, textStatus, jqXHR) {
		
		console.log('search promoted response', data);

		if (data.ok != true) {
			
			console.error("Request error:" + data.message);

			_this.promotedError = 'ERROR: ' + data.message;

			
		} else {
			
			_this.promotedItems = data.results;
			
			for(var i = 0 ; i < _this.promotedItems.length; i++) {
				
				var d = _this.promotedItems[i];
				
				d.detailsURL = EntityDetailsPanel.getEntityDetailsURL(d.slug); 
				
			}
			
		}

		_this.onPromotedContentReady();
		
	}).fail(function() {
		
		console.error("ERROR", arguments[2]);
		_this.promotedError = 'ERROR: ' + arguments[2];
		
		_this.onPromotedContentReady();
		
	});
	

	
}

HomePanel.prototype.onPromotedContentReady = function() {
	
	AbstractPanel.renderTemplate(this.parentEl, 'templates/home.hbs', {
		promotedError: this.promotedError,
		promotedItems: this.promotedItems,
		categories: APP_CATEGORIES
	});

	var searchPanel = this.parentEl.find('.search-panel');
	HomePanel.initSearchBar(searchPanel);
	
	var productCategory = searchPanel.find('.product-category');
	productCategory.val('Top');
	
    
    var header = this.parentEl.find('.top-header');
    
    AbstractPanel.renderTemplate(header, 'templates/header_partial.hbs', null);	
   
    
    
	
	//also 
	var searchResults = this.parentEl.find('.search-results');
	
	if(this.topResultsError) {
		
		searchResults.text('ERROR: ' + this.topResultsError);

	} else {

		AbstractPanel.renderTemplate(searchResults, 'templates/search-results-list_partial.hbs', this.topResultsCtx);
		
	}
}

HomePanel.initSearchBar = function(searchPanel) {
	
//	var navigateTo
	
	var productSearchActive = searchPanel.find('.product-search-active');
	
	var productInputText = searchPanel.find('.product-input-text');

	var productCategory = searchPanel.find('.product-category');
	
	var productSortProperty = searchPanel.find('.product-sort-property');
	
	var productSortDirection = searchPanel.find('.product-sort-direction');

	var productOffset = searchPanel.find('.product-offset');
	
	var productLimit = searchPanel.find('.product-limit');

	var searchButton = searchPanel.find('.search-button');
	
	var navigateToSearchResults = function(){

		var query = productInputText.val();
		var category = productCategory.val();
		
		if(!query && ! category) {
			console.warn("no query nor category");
			return;
		}
		
		var url = SearchResultsPanel.getSearchResultsLink({
			offset: productOffset.val(),
			limit: productLimit.val(),
			query: query,
			category: category,
			sortProperty: productSortProperty.val(),
			sortDirection: productSortDirection.val(),
		});
			
		router.navigate(url);
	};
	
	productInputText.keypress(function(e){
		
		if(e.keyCode == 13) {
			
			navigateToSearchResults();
			
		}
		
	});
	
	searchButton.click(navigateToSearchResults);
	
}

HomePanel.homeBreadcrumb = {
	url : '/',
	label : '<i class="fa fa-home"></i> Home'
};

HomePanel.prototype.getBreadcrumbs = function() {

	return [ HomePanel.homeBreadcrumb ];

}

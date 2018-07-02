SearchResultsPanel = function(parentEl) {
	this.parentEl = parentEl;
	this.title = 'Home';
	this.menu = 'home';
	// this.subtitle = null;
	
	AbstractPanel.registerPartial('search-bar_partial');

	//params
	this.query = null;
	this.offset = null;
	this.limit = null;
	this.sortProperty = null;
	this.sortDirection = null;
	this.category = null;
	
}

SearchResultsPanel.prototype = new AbstractPanel();
SearchResultsPanel.prototype.constructor = SearchResultsPanel;

SearchResultsPanel.prototype.cleanup = function() {
	
}


SearchResultsPanel.prototype.render = function() {

	var _this = this;
	
	AbstractPanel.renderTemplate(this.parentEl, 'templates/search-results.hbs', {categories: APP_CATEGORIES});

	HomePanel.initSearchBar(this.parentEl.find('.search-panel'));

	this.doSearch();
}

SearchResultsPanel.prototype.doSearch = function() {
	
	var _this = this;
	
	var offset = 0;
	if(this.offset != null) {
		offset = parseInt(this.offset, 10);
		this.offset = offset;
	} else {
		this.offset = 0;
	}
	var limit = 10;
	if(this.limit != null) {
		limit = parseInt(this.limit, 10);
		this.limit = limit;
	} else {
		this.limit = 10;
	}
	
	
	var searchPanel = this.parentEl.find('.search-panel');
	
	//refresh filters
	var productSearchActive = searchPanel.find('.product-search-active');
	var productInputText = searchPanel.find('.product-input-text');
	var productSortProperty = searchPanel.find('.product-sort-property');
	var productSortDirection = searchPanel.find('.product-sort-direction');
	var productCategory = searchPanel.find('.product-category');
	var productOffset = searchPanel.find('.product-offset');
	var productLimit = searchPanel.find('.product-limit');
	var searchButton = searchPanel.find('.search-button');
	
	
	productInputText.val(this.query);
	productLimit.val( limit );
	productOffset.val( offset );
	productSortProperty.val(this.sortProperty ? this.sortProperty : 'relevance');
	productSortDirection.val(this.sortDirection ? this.sortDirection: 'descending');
	productCategory.val(this.category ? this.category : '');
	
	var searchResults = this.parentEl.find('.search-results');
	
	searchResults.empty();
	
	if(!this.query && !this.category) {
		
		console.warn("empty query/no category");
		
		searchResults.text('(no keywords)');
		//no query
		return;
		
	}
	
	productSearchActive.attr('disabled', 'disabled');
	
	var req = {
		query : this.query,
		category: this.category,
		sortProperty : this.sortProperty,
		sortDirection : this.sortDirection,
		offset : this.offset,
		limit : this.limit
	};
	
	productSearchActive.attr('disabled', 'disabled');
	
	SearchResultsPanel.executeSearch(req, function(error, resultsCtx){

		console.log("search callback, error ? ", error);
		
		productSearchActive.removeAttr('disabled');
		
		if(error) {
			searchResults.text('ERROR:' + error);
		} else {
			AbstractPanel.renderTemplate(searchResults, 'templates/search-results-list_partial.hbs', resultsCtx);
		}
		
	});
	
}

SearchResultsPanel.getSearchResultsLink = function(params){
	
	var offset = params.offset;
	var limit = params.limit;
	var query = params.query;
	var sortProperty = params.sortProperty;
	var sortDirection = params.sortDirection;
	var category = params.category;
	
	var paramsArray = [];
	
	var url = '/searchresults';
	
	if(query) {
		paramsArray.push('q=' + encodeURIComponent(query));
	}
	
	if(category) {
		paramsArray.push('category=' + encodeURIComponent(category));
	}
	
	if(sortProperty) {
		paramsArray.push('sortProperty=' + encodeURIComponent(sortProperty));
	}
	
	if(sortDirection) {
		paramsArray.push('sortDirection=' + encodeURIComponent(sortDirection));
	}
	
	if(offset) {
		paramsArray.push('offset=' + offset);
	}
	
	if(limit) {
		paramsArray.push('limit=' + limit);
	}
	
	if(paramsArray.length > 0) {
		var jointParams = paramsArray.join('&');
		url += ('?' + jointParams);
	}
	return url;
	
	
};


//callback is called with error, context (template)
SearchResultsPanel.executeSearch = function(req, callback) {
	
//	var req = {
//			query : this.query,
//			category: this.category,
//			sortProperty : this.sortProperty,
//			sortDirection : this.sortDirection,
//			offset : this.offset,
//			limit : this.limit
//		};

	console.log('search request', req);
	
	$.post('/search', JSON.stringify(req), function(data, textStatus, jqXHR) {
			
		console.log('search response', data);

		if (data.ok != true) {
				
			console.error("Request error:" + data.message);

			callback(data.message);
				
			return;
			
		}
		
			
		for(var i = 0 ; i < data.results.length; i++) {
				
			var d = data.results[i];
				
			d.index = data.offset + i + 1;
			d.detailsURL = EntityDetailsPanel.getEntityDetailsURL(d.slug);
		}
		
		var ctx = $.extend({}, data);
			

		ctx.pageURLs = [];
			
		var pageNum = 1;
		for(var i = 0; i < data.totalResults; i += req.limit) {
				
			var ext = $.extend({}, req);
			ext.offset = i;
			var pageURL = SearchResultsPanel.getSearchResultsLink(ext);
				
			ctx.pageURLs.push({
				active: req.offset != i,
				pageURL: pageURL,
				page: pageNum
			});
				
			pageNum++;
		}
			
		if(req.offset > 0) {
				
			var ext = $.extend({}, req);
			ext.offset = 0;
			ctx.firstPageURL = SearchResultsPanel.getSearchResultsLink(ext);
				
			var ext = $.extend({}, req);
			ext.offset = Math.max( req.offset - req.limit, 0 );
			ctx.previousPageURL = SearchResultsPanel.getSearchResultsLink(ext);
				
		}
			
		//next page available
		if(req.offset + req.limit < data.totalResults) {
				
			var ext = $.extend({}, req);
			ext.offset = req.offset + req.limit;
			ctx.nextPageURL = SearchResultsPanel.getSearchResultsLink(ext);
				
				
			var total = data.totalResults;
			var r = total % req.limit;
			if(r == 0) r = req.limit;
			var ext = $.extend({}, req);
			ext.offset = total - r;
				
			ctx.lastPageURL = SearchResultsPanel.getSearchResultsLink(ext);
				
		}
			
		callback(null, ctx);
		
	}).fail(function() {
			
		console.error("ERROR", arguments[2]);
		
		callback(arguments[2]);
			
	});
	
}

SearchResultsPanel.homeBreadcrumb = {
	url : '/',
	label : '<i class="fa fa-home"></i> Home'
};

SearchResultsPanel.prototype.getBreadcrumbs = function() {

	return [ SearchResultsPanel.homeBreadcrumb ];

}

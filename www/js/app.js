//initRouter();

var APP_CATEGORIES = [{
	id: 'Brokers',
	label: 'Brokers'
}, {
	id: 'Industry',
	label: 'Industry'
}, {
	id: 'Commercial',
	label: 'Commercial'	
}, {
	id: 'Life',
	label: 'Life/Health'	
}, {
	id: 'Personal',
	label: 'Personal'	
}, { 
	id: 'Providers',
	label: 'Insurance Providers'	
}
];
/*
var APP_CATEGORIES = [{
	id: 'Top',
	label: 'Top'
}, {
	id: 'Communication',
	label: 'Communication'
}, {
	id: 'Customer Support',
	label: 'Customer Support'
}, {
	id: 'HR',
	label: 'HR'	
}, {
	id: 'Marketing',
	label: 'Marketing'	
}, {
	id: 'Personal',
	label: 'Personal'	
}, {
	id: 'Productivity',
	label: 'Productivity'	
}, {
	id: 'Shopping',
	label: 'Shopping'
}, {
	id: 'Task Management',
	label: 'Task Management'
}, {
	id: 'Utilities',
	label: 'Utilities'
}
];
*/
for(var i = 0 ; i < APP_CATEGORIES.length; i++) {
	var cat = APP_CATEGORIES[i];
	cat.url = SearchResultsPanel.getSearchResultsLink({category: cat.id});
}
//insert topbar
//AbstractPanel.renderTemplate($('.topbar'), 'templates/topbar.hbs', {categories: APP_CATEGORIES});

//insert sidebar categories
AbstractPanel.renderTemplate($('.sidebar'), 'templates/sidebar.hbs', {categories: APP_CATEGORIES});

//must initRouter after declaration of APP_CATEGORIES
initRouter();
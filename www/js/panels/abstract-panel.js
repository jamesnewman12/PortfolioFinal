AbstractPanel = function(){
	this.parentEl = null;
	this.title = null;
	this.subtitle = null;
	this.menu = null;
}

AbstractPanel.registeredPartials = [];

AbstractPanel.renderTemplate = function (selector, template, context) {
	
	if(typeof(selector) === 'string') {
		selector = $(selector);
	} else {
		//assumed jquery selector
	}
	
	console.log('select', selector);
	
	if(typeof(JST) === 'undefined') {
		console.error('global templates JST array not found');
		return;
	}
	
	var t = JST[template];
	
	if(typeof(t) != 'function') {
		console.error("Template not found: ", template);
		return;
	}
	if(context == null) {
		context = {};
	}
	var html = t(context);
	
	selector.html(html);
	
};

AbstractPanel.registerPartial = function(partialName) {
	
	if(AbstractPanel.registeredPartials.indexOf(partialName) >= 0) {
		console.info("Partial already registered: ", partialName);
		return;
	}
	
	if(typeof(JST) === 'undefined') {
		console.error('global templates JST array not found');
		return;
	}
	
	var t = JST['templates/' + partialName + '.hbs'];
	
	if(typeof(t) != 'function') {
		console.error("Partial not found: ", partialName);
		return;
	}
	
	Handlebars.registerPartial(partialName, t);
	
	
}

/**
 * method should return an array of objects, the last object is not active
 */
AbstractPanel.prototype.getBreadcrumbs = function(){
	console.error('OVERRIDE ME!');
}

AbstractPanel.prototype.render = function() {
	console.error('OVERRIDE ME!');
}
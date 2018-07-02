SubmitEntityPanel = function(parentEl){
	
	this.parentEl = parentEl;
	this.title = 'Submit Entity';
	this.menu = 'home';
	// this.subtitle = null;
	
}

SubmitEntityPanel.prototype = new AbstractPanel();
SubmitEntityPanel.prototype.constructor = SubmitEntityPanel;

SubmitEntityPanel.prototype.cleanup = function() {
	
}

SubmitEntityPanel.prototype.render = function() {

	var _this = this;
	
	$.post('/entityform', JSON.stringify({}), function(data, textStatus, jqXHR){
		
		AbstractPanel.renderTemplate(_this.parentEl, 'templates/submit-entity.hbs', {});
		
		var entityForm = _this.parentEl.find('.entity-form');
		
		console.log('entityform data', data);
		
		if(data.ok != true) {
			console.error("Request error:" + data.message);
			entityForm.text('ERROR ' + data.message);
			return;
		}
		
		var fields = data.fields;

		$('.entity-set-uri-label').text(data.entitySetURI);
		$('.entity-set-name-label').text(data.entitySetName);
		
		for(var i = 0 ; i < fields.length; i++) {
			
			var field = fields[i];

			var div = $('<div>');
			var l = field.label ;
			if(field.multivalue) {
				l += ' [multivalue]';
			}
			div.append($('<label>').text(l+ ': '));
			div.append($('<input>', {'class': 'modal-active', 'data-field-uri': field.URI}));
			
			entityForm.append(div);
			
		}
		
		var activeEls = _this.parentEl.find('.modal-active');
		var resultsPanel = _this.parentEl.find('.submit-results');
		
		_this.parentEl.find('.create-entity-button').click(function(){
			
			var requestObject = {};
			entityForm.find('[data-field-uri]').each(function(i){
				var el = $(this);
				requestObject[el.attr('data-field-uri')] = el.val();
			});
			
			resultsPanel.empty();
			activeEls.attr('disabled', 'disabled');
			
			
			$.post('/createentity', JSON.stringify(requestObject), function(data, textStatus, jqXHR){
				
				console.log('/createentity response', data);
				
				resultsPanel.empty();
				
				if(data.ok != true) {
					activeEls.removeAttr('disabled');
					console.error("Request error:" + data.message);
					resultsPanel.text('ERROR ' + data.message);
					return;
				}
				
				var entity = data.results[0];
				
				
				resultsPanel.append($('<div>').text('Entity Submitted, waiting for approval'));
				resultsPanel.append($('<div>').append(
				[
				 $('<a>', {href: '/submitentity', 'data-navigo2': ''}).text("Submit New"),
				 document.createTextNode(' '),
				 $('<a>', {href: EntityDetailsPanel.getEntityDetailsURL(entity.slug), 'data-navigo2': ''}).text("Pending Entity Details")
				]));

				
			}).fail(function(){
				
				console.error("ERROR", arguments[2] );
				resultsPanel.empty().text('ERROR ' + arguments[2]);
				activeEls.removeAttr('disabled');
				
			});
		});
		
		
		
	}).fail(function(){
		
		console.error("ERROR", arguments[2] );
		
	});
	
	
	
	
}

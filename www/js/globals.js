//make sure cookie is set for entire domain
if(typeof(SESSION_DOMAIN) === 'undefined') {
	console.error("No SESSION_DOMAIN config param");
}
console.log("SESSION_DOMAIN: ", SESSION_DOMAIN);

VITAL_COOKIE_ATTRS = {path: '/', domain: SESSION_DOMAIN, secure: COOKIE_SECURE};

VITAL_COOKIE_PREFIX = COOKIE_PREFIX;

var ENDPOINT = 'endpoint.' + APP_ID;

//global
var vitalservice = null;

var appConfig = null;


//each view should define the following function - hook
//var onVitalServiceReady = function() {
//
//};

var router = null;

//var routerFirstEvent = true;




$(function(){
	
	if(WEBAPP_CONNECTED) { 
		refreshLoggedInState2();
	}
	
	//a better way to use navigo links, no need to refresh
	$(document).on('click', '[data-navigo2]', function(event){

		var href = $(this).attr('href');
		
		if( isInIFrame() ) {

			//pass to parent
			var obj = {};
			obj.origin = HTTPS_URL;
			obj.action = 'navigate';
			obj.href = href;
			window.parent.postMessage(obj, '*');
			
		} else {
			
			router.navigate(href);
			
			
		}
		
		return false;
		
	});
	
	
	
	if(WEBAPP_CONNECTED && typeof(VitalService) !== 'undefined') {
		
		console.log("instantiating service...");
		
		if( typeof(EVENTBUS_URL) === 'undefined') {
			console.error("No EVENTBUS_URL config param!");
		}
		
		vitalservice = new VitalService(ENDPOINT, EVENTBUS_URL, function(){
			
			console.log('connected to endpoint');
			
			//get app config
			vitalservice.callFunction('app.config', {}, function(results){
				
				appConfig = results.first();
				
				console.log("App config", appConfig);

				//refreshLoggedInState();
				
				init_router();
				
				if(typeof(onVitalServiceReady) === 'undefined') {
					//console.warn("onVitalServiceReady not defined");
				} else {
					onVitalServiceReady();
				}
				
				
			}, function(error){
				
				console.error("Error when getting app config object: " + error);
				
			});
			
		}, function(err){
			console.error('couldn\'t connect to endpoint -' + err);
		});
		
	} else {
		
		//console.warn("WEBAPP NOT CONNECTED or VitalService disabled");
		
		appConfig = {};
		
		init_router();
		
		if(typeof(onVitalServiceReady) === 'undefined') {
//			console.warn("onVitalServiceReady not defined");
		} else {
			onVitalServiceReady();
		}
		
	}
	

	
});



function refreshLoggedInStateX(){
	
	var cl = vitalservice.getCurrentLogin(); 
	
	$('.no-logged-state-visible').hide();
	
	if( cl != null ) {
		
		$('.logged-out-visible').hide();
		
		$('.logged-in-visible').show();
		
		$('.current-username').text(cl.get('username'));
		
	} else {

		$('.logged-in-visible').hide();
		
		$('.logged-out-visible').show();
		
	}
	
}


window.addEventListener('message', function(event) {

//	console.log("MSG", event);
	
	var data = event.data;
	
    // IMPORTANT: Check the origin of the data!
    if ( data.origin == HTTPS_URL ) {
        // The data has been sent from your site

        // The data sent with postMessage is stored in event.data

    	if(data.action == 'session_check') {
    		
    		onSessionCheckedResponse(data);
    		
    	} else if(data.action == 'logout') {
    		
    		onLogoutResponse(data);
    		
    	} else if(data.action == 'close-modal') {
    		router.navigate('');
    		
    	} else if(data.action == 'navigate') {
    		
    		var href = data.href;
    		
			router.navigate(href);
			
    	} else {
    		console.warn("Unknown iframe action: " + data.action);
    	}
    	
//        console.log(event.data);
    } else {
        // The data hasn't been sent from your site!
        // Be careful! Do not use it.
        return;
    }
});

function refreshLoggedInState2() {
	
	//use an iframe to obtain session from other domain cookie
	$('#session-iframe').remove();
	
	
	var iframe = $('<iframe>', {src: HTTPS_URL + 'iframes/session_check.html', id: 'session-iframe'});
	$('head').append(iframe);
	
}

//callback for iframe
function onSessionCheckedResponse(obj) {
	
	$('#session-iframe').remove();
	
	$('.no-logged-state-visible').hide();
	
	//notifyParent("loginState":true,"loginID":"derek@vital.ai","msg":"ok","name":"Derek"} );
	
	if( obj.loginState == true) {
		
		$('.logged-out-visible').hide();
		
		$('.logged-in-visible').show();
		
		$('.current-username').text(obj.loginID);
		
	} else {

		$('.logged-in-visible').hide();
		
		$('.logged-out-visible').show();
		
	}
	
	
	
	
}

function doLogoutIframe() {
	
	//use an iframe to obtain session from other domain cookie
	$('#logout-iframe').remove();
	
	
	var iframe = $('<iframe>', {src: HTTPS_URL + 'iframes/logout.html', id: 'logout-iframe'});
	$('head').append(iframe);
	
	
}

function onLogoutResponse(data) {
	
	$('#logout-iframe').remove();
	
	if(data.ok) {
		
		refreshLoggedInState2();
		
	} else {
		console.error("logout error: " , data);
	}
	
}

function openPasswordResetConfigrmModal(code) {
	
	initPasswordResetConfigrmModal(code);
	
	var modal = $('#password-reset-confirm-modal');
	
	modal.find('iframe').removeAttr('src'); 
	
	var url = HTTPS_URL + 'iframes/password-reset-confirm.html';
	
	if(code != null && code.length > 0) {
		url += ('?code=' + encodeURIComponent(code));
	}
	
	modal.find('iframe').attr('src', url);
	
	if(isInIFrame()) {
		
	} else {
		
		openModal('password-reset-confirm-modal');
		
	}
	
}

function initPasswordResetConfigrmModal(code) {

	var p = $('#password-reset-confirm-modal');
	
	var initialMessage = p.find('.initial-message');
			
	var successEl = p.find('.request-success');
			
	var errorEl = p.find('.request-error');
			
	var theForm = p.find('.new-password-form');
			
	var inputEmail = p.find('.input-email');
			
	var inputPassword = p.find('.input-password');
			
	var inputPasswordRepeat = p.find('.input-password-repeat');
			
	var resetButton = p.find('.email-reset-button');
	
	var initialized = p.hasClass('initialized');
	
	if(!initialized) {
		
		theForm.find('.return-aware').keyup(function(e) {
			if(e.which == 13) {
				//doSignup();
				resetButton.click();
				return false;
			}
		});
		
		p.addClass('initialized');
		
	}
			
	resetButton.removeAttr('disabled');
			
	if(code == null || code == '') {
				
		initialMessage.hide();
				
		errorEl.text("No code parameter");
				
		return;
				
	}
	
	vitalservice.callFunction('password.reset.get', {code: code}, function(result) {
		
		//console.log('password.reset.get result: ', result);
		
		var req = result.first();
		
		initialMessage.hide();
		
		theForm.show();
		
		inputEmail.val(req.get('username'));
		
		inputPassword.val('');
		
		inputPasswordRepeat.val('');
		

	}, function(error) {
		
		initialMessage.hide();
	
		errorEl.text("Error: " + error);
		
	});

	
	if(!initialized) {
	
		p.find('.login-button-el').click(function(){
			
			router.navigate('/login');
			
		});
		
		resetButton.click(function(){
		
			resetButton.attr('disabled', 'disabled');

			inputPassword.attr('disabled', 'disabled');
			inputPasswordRepeat.attr('disabled', 'disabled');

			successEl.text('');	
			errorEl.text('');
			
			
			var data = {
				code:           code,
				password:       inputPassword.val(),
				passwordRepeat: inputPasswordRepeat.val()
			};

			vitalservice.callFunction('password.reset.action', data, function(result) {
					
				successEl.text(result.status.message);	
				errorEl.text('');

				resetButton.hide();

				p.find('.login-button-el').show();

			}, function(error) {
					
				
				resetButton.removeAttr('disabled');
				inputPassword.removeAttr('disabled');
				inputPasswordRepeat.removeAttr('disabled');
				
				successEl.text('');
				errorEl.text(error);
					
			});
			
		});

	}
	
}

function openSignupModal(code) {
	
	//init signup modal
	initSignupModal(code);
	
	var modal = $('#signup-modal');
	
	modal.find('iframe').removeAttr('src'); 
	
	var url = HTTPS_URL + 'iframes/signup.html';
	if(code != null && code.length > 0) {
		url += '?code=' + code;
	}
	
	modal.find('iframe').attr('src', url);
	
	if(isInIFrame()) {
		
	} else {
		
		openModal('signup-modal');
		
	}
	
	
}

function initSignupModal(code) {

	if(code == null) code = '';
	
	var m = $('#signup-modal');
	
	m.find('input').val('');
	
	var signupActive = m.find('.signup-active');
	signupActive.removeAttr('disabled');
	
	var signupStatus = m.find('.signup-status');
	signupStatus.empty();
	
	var inputInvitationCode = m.find('#signup-invitation-code');
	
	var invitationCodeRequestsEnabled = appConfig.get('invitationCodeRequestsEnabled');
	
	if(!invitationCodeRequestsEnabled) {
		m.find('.invitation-row').remove();
	} else {
		inputInvitationCode.val(code);
	}
	
	if(m.hasClass('initialized')) return;
	
	m.addClass('initialized');
	
	
	m.find('#signup-confirm-button').click(function(event){
	
		signupStatus.empty();
		
		var invitationCode = invitationCodeRequestsEnabled ? inputInvitationCode.val() : null;
		
		var customerID = m.find('#signup-customer-id').val();
		
		var name = m.find('#signup-name').val();
		
		var email = m.find('#signup-email').val();
		
		var password = m.find('#signup-password').val();
		
		var passwordRepeat = m.find('#signup-password-repeat').val();

		signupActive.attr('disabled', 'disabled');
		
		vitalservice.callFunction('customers.signup', {
			invitationCode: invitationCode,
			customerID: customerID,
			customerName: name,
			email: email,
			password: password,
			passwordRepeat: passwordRepeat
			
		}, function(response) {
			
			signupStatus.empty();
			m.find('.signup-success').text(response.status.message);
			
			signupActive.removeAttr('disabled');
			
			m.find('input').val('');
			
		}, function(error){
			
			signupStatus.empty();
			m.find('.signup-error').text(error);
			
			signupActive.removeAttr('disabled');
			
		});
	});
}

function openRequestInvitationModal() {
	
	//init modal first
	initRequestInvitationModal();
	
	var modal = $('#request-invitation-modal');
	
	modal.find('iframe').removeAttr('src'); 
	
	modal.find('iframe').attr('src', HTTPS_URL + 'iframes/request-invitation.html');
	
	if(isInIFrame()) {
		
	} else {
		
		openModal('request-invitation-modal');
		
	}
	
	
}

function openLoginModal() {
	
	$('.modal').modal('hide');
	
	var modal = $('#login-modal');
	
	var dataTargetURL = ( WEBAPP_URL + 'home' ) ;
	
	modal.find('iframe').removeAttr('src'); 
	
	modal.find('iframe').attr('src', HTTPS_URL + 'iframes/login.html?targetURL=' +  encodeURIComponent(dataTargetURL));
	
	modal.attr('data-target-url', dataTargetURL);
	
	if(isInIFrame()) {
		
	} else {
		
		modal.modal({});
		
	}
	
	
	return false;
	
}

function initRequestInvitationModal() {
	
	var m = $('#request-invitation-modal');
	var successEls = m.find('.on-success');
	successEls.hide();
	
	var initialEls = m.find('.initial');
	initialEls.show();
	
	var invitationStatus = m.find('.invitation-status');
	invitationStatus.empty();
	
	var invitationActive = m.find('.invitation-active');
	invitationActive.removeAttr('disabled');
	
	var emailInput = m.find('#invitation-code-email');
	emailInput.val('');
	
	var nameInput = m.find('#invitation-code-name');
	nameInput.val('');

	var companyInput = m.find('#invitation-code-company');
	companyInput.val('');

	var telephoneInput = m.find('#invitations-code-telephone');
	telephoneInput.val('');
	
//	var successMsg = m.find('.invitation-success');
	var errorMsg = m.find('.invitation-error');
	
	var b = m.find('#request-invitation-code-button');
	
	if(m.hasClass('initialized')) return;
	
	m.addClass('initialized');

	var inputs = emailInput.add([nameInput, companyInput, telephoneInput]);
	
	inputs.keypress(function(e) {
	    if(e.which == 13) {
	    	b.click();
	    }
	});
	
	
	var onError = function(error) {
		
		console.error("ERROR", error);
		
		invitationActive.removeAttr('disabled');
		
		errorMsg.text(error);
		
	}
	
	b.click(function(event){
		
		console.log("joining waiting list...");
		
		invitationActive.attr('disabled', 'disabled');
		
		invitationStatus.empty();
		
		var email = $.trim( emailInput.val() );
//		if(!email) {
//			onError("Empty email");
//			return;
//		}
		var name = $.trim(nameInput.val());
//		if(!name) {
//			onError("Empty name");
//			return;
//		}
		var company = $.trim(companyInput.val());
//		if(!company) {
//			onError("Empty company");
//			return;
//		}
		var telephone = $.trim(telephoneInput.val());
//		if(!telephone) {
//			onError("Empty telephone");
//			return;
//		}
		
		if(!email && !telephone) {
			onError("at least email or telephone is required");
			return;
		}
	
		
		$.post('/joinwaitinglist', JSON.stringify({
			email: email,
			name: name,
			company: company,
			telephone: telephone
		}), function(data, textStatus, jqXHR){
			
			console.log('entityform data', data);
			
			if(data.ok != true) {

				onError(data.message);
				
				return;
			}
			
			initialEls.hide();
			successEls.show();
			
//			successMsg.text(invitationSuccess.status.message);
			
			
		}).fail(function(){
			
			onError(arguments[2]);
			
		});
		
		/*
		vitalservice.callFunction('customers.request.invitation', {email: email}, function(invitationSuccess){
			
			console.log('invitation status: ', invitationSuccess);
			
			emailInput.val('');
			
			initialEls.hide();
			successEls.show();
			
			invitationActive.removeAttr('disabled');
			
			invitationStatus.empty();
			successMsg.text(invitationSuccess.status.message);
			
		}, function(error){
			
			invitationActive.removeAttr('disabled');
			
			invitationStatus.empty();
			errorMsg.text(error);
			
		});
		
		*/
		
	});
	
}

function openResetPasswordModal() {
	
	initResetPasswordModal();
	
	
	var modal = $('#reset-password-modal');
	
	modal.find('iframe').removeAttr('src'); 
	
	modal.find('iframe').attr('src', HTTPS_URL + 'iframes/reset-password.html');
	
	if(isInIFrame()) {
		
	} else {
		
		openModal('reset-password-modal');
		
	}
	
}

function initResetPasswordModal() {
	
	var m = $('#reset-password-modal');
	
	var successEls = m.find('.on-success');
	successEls.hide();
	
	var initialEls = m.find('.initial');
	initialEls.show();
	
	var resetButton = m.find('#email-reset-button');
	
	var modalStatus = m.find('.request-status');
	modalStatus.empty();
	
	var modalActive = m.find('.modal-active');
	modalActive.removeAttr('disabled');
	
	var inputEmail = m.find('#reset-input-email');
	inputEmail.val('');
	
	if(m.hasClass('initialized')) {
		return;
	}
	
	m.addClass('initialized');
	
	
	var successEl = m.find('.request-success');
	var errorEl = m.find('.request-error');
	
	
	inputEmail.keyup(function(e) {
	    if(e.which == 13) {
	    	//doSignup();
	    	resetButton.click();
		    return false;
	    }
	});
	
	resetButton.click(function(){
		
		modalStatus.empty();
	
		var _email = $.trim(inputEmail.val());
		
		if(_email.length < 1) return;

		modalActive.attr('disabled', 'disabled');

		vitalservice.callFunction('password.reset.generate', {email: _email}, function(result) {
		
			console.log("requestObj: ", result);

			modalActive.removeAttr('disabled');
		
			initialEls.hide();
			successEls.show();
			
			successEl.text(result.status.message);
			
			inputEmail.val('');
			
		
		}, function(error) {
		
			modalActive.removeAttr('disabled');
			
			console.error("request error: ", error);
			
			errorEl.text(error);
		
		});
		
	
	});
	
}

function openConfirmEmailModal(code, email) {
	
	initConfirmEmailModal(code, email);
	
	var modal = $('#confirm-email-modal');
	
	modal.find('iframe').removeAttr('src'); 
	
	var link = '?';
	
	var url = HTTPS_URL + 'iframes/confirm-email.html';
	if(code != null && code.length > 0) {
		url += '?code=' + code;
		link = '&';
	}
	if(email != null && email.length > 0) {
		url += link + 'email=' + encodeURIComponent(email);
	}
	
	modal.find('iframe').attr('src', url);
	
	if(isInIFrame()) {
		
	} else {
		
		openModal('confirm-email-modal');
		
	}
	
}

function initConfirmEmailModal(code, email) {
	
	var w = $('#confirm-email-modal');
	
	var success = w.find('.success');
	var successHide = w.find('.success-hide');
	var error   = w.find('.error');
	
	success.hide();
	successHide.show();
	error.hide();
	
	w.find('.no-input').hide();
	w.find('.input-ok').hide();
	
	if(email == null || email == '' || code == null || code == '') {
		w.find('.no-input').show();
		return;
	}
	
	w.find('.input-code').val(code);
	w.find('.input-email').val(email);
	w.find('.input-email-label').text(email);

	w.find('.input-ok').show();
	
//	this.onConfirmedTriggered();
	
//ConfirmEmailView.prototype.onConfirmedTriggered = function() {
	
	//console.log('email confirm triggered')
	
	var email = w.find('.input-email').val();
	
	var code = w.find('.input-code').val();
	
	//success.empty();
	error.empty();
	error.hide();
	
	var email = w.find('.input-email').val();
	
	vitalservice.callFunction('customers.confirm.email', {email: email, code: code}, function(result) {
		
		//console.log('customers.confirm.email result: ', result)
		
		var msg = result.status.message;
		
		error.hide();
		successHide.hide();

		success.find('.text-success').text(msg);
			
		success.show();
		
	}, function(status) {
			
		error.text(status);
		
		success.hide();
		error.show();
		
		
	});
	
	
}

function openModal(modalID) {
	
	$('.modal').modal('hide');
	
	
	if(modalID != null) {
		
		$('#' + modalID).modal({});
		
	}
	
}

function init_router() {
	
	if(router != null) {
		console.warn("router already initialized");
		return;
	}
	
	if(router != null) {
		return;
	}
	
	var port = '' + window.location.port;
	
	if(port.length > 0) port = ':' + port;
		
	var urlPrefix = PREFIX;
	
	if(urlPrefix.substring(urlPrefix.length -1, urlPrefix.length ) === '/') {
		urlPrefix = urlPrefix.substring(0, urlPrefix.length -1);
	}
	
	var rootURL = window.location.protocol + '//' + window.location.hostname + port + urlPrefix;
	console.log('root URL: ', rootURL);
	
	if(typeof(Navigo) !== 'undefined') {
		
		router = new Navigo(rootURL, false);
		
		router.on({
		
		  '/confirmemail/:code/:email': function(params) {
			  
			  var code = decodeURIComponent(params.code);
			  var email = decodeURIComponent(params.email);
			  
			  console.log("Navigate: /passwordresetconfirm/:code/:email , code = " + code + " , email = " + email);
			  
			  openConfirmEmailModal(code, email);
			  
		  },
		  '/confirmemail/:code': function(params) {
			  
			  var code = decodeURIComponent(params.code);
			  
			  console.log("Navigate: /passwordresetconfirm/:code , code = " + code);
			  
			  openConfirmEmailModal(code, null);
			  
		  },
		  
		  '/confirmemail': function(params) {
			  
			  console.log("Navigate: /passwordresetconfirm");
			  
			  openConfirmEmailModal(null, null);
			  
		  },
		  
		  '/login' : function(params) {
			  
			  console.log("Navigate: /login");
			  
			  openLoginModal();
		  },
		  
		  '/passwordresetconfirm/:code': function(params) {
			  
			  var code = decodeURIComponent(params.code);
			  
			  console.log("Navigate: /passwordresetconfirm/:code , code = ", code);
			  
			  openPasswordResetConfigrmModal(code);
		  },
		  
		  '/passwordresetconfirm': function(params) {
			
			  console.log("Navigate: /passwordresetconfirm");
			  
			  openPasswordResetConfigrmModal(null);
			  
		  },
		  
		  
		  '/requestinvitationcode' : function(params) {
			
			  console.log("Navigate: /requestinvitationcode");
			  
			  openRequestInvitationModal();
			  
		  },
		  
		  '/resetpassword' : function(params) {
			
			  console.log("Navigate: /resetpassword");
			  
			  openResetPasswordModal();
			  
		  },
			
		  '/signup/:code' : function(params) {
			
			  console.log("Navigate: /signup/:code , code = ", params.code);
			  
			  openSignupModal(params.code);
			  
		  },
		  
		  '/signup' : function(params) {
			  
			  console.log('Navigate: /signup');
	
			  openSignupModal(null);
			  
		  },
			
		  '*': function (params) {
			  
			  console.log('Navigate: *');
			  
			  //close modal
			  openModal(null);
			  
	//		  router.navigate('/settings');
			  
			  //navigate to some subview?
			  
	//		  if(checkFirstEvent()) return;
			  
			  
		  }
		  
	});
		
	} else {
		console.info("no router");
	}
	
}


//http://stackoverflow.com/questions/19491336/get-url-parameter-jquery-or-how-to-get-query-string-values-in-js
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),//decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (decodeURIComponent(sParameterName[0]) === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    
    return null;
};

$(document).ready(
    function(){
        console.log("fully loaded");
        $(".disabled-button").each( //add more selector here if you want
            function(){
                if($(this).attr("disabled"))
                    $(this).attr("disabled", false); //enable button again
            }
        );
    }
);
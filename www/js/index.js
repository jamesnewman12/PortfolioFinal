//UI PART
$(function(){
	
	login_initui();
	
	if( !isInIFrame() ) {
		
		mailing_initui();
	}
	
	$('.close-modal').click(function(){
		
		//
		if(isInIFrame()) {

			var obj = {};
			obj.origin = HTTPS_URL;
			obj.action = 'close-modal';
			window.parent.postMessage(obj, '*');
			
		} else {
			
			router.navigate('');
			
		}
		
	});
	
});

function isInIFrame() {
	return window.location.href.indexOf('/iframes/') >= 0;
}

function login_initui() {
	
	var loginForm = $('#login-form');
	
	var loginButton = loginForm.find('#login-button');

	
	var accountPanel = $('#account-id-panel');
	
	var accountIDEl = $('#AccountID');
	var usernameEl = $('#UserName');
	var passwordEl = $('#Password');
	
	var accountIDMode = window.ACCOUNT_ID_MODE;
	var accountIDPreset = window.ACCOUNT_ID;
	var rolesCheckEnabled = window.ROLES_CHECK_ENABLED == true;
	
	console.log('ACCOUNT_ID_MODE', accountIDMode);
	console.log('ACCOUNT_ID preset', accountIDPreset);
	
	
	if(accountIDMode == 'enabled') {
		
	} else if(accountIDMode == 'disabled') {
		accountPanel.remove();
	} else {
		accountIDEl.val(accountIDPreset).removeClass('return-aware').removeClass('modal-active').attr('disabled', 'disabled');
	}
	
	$(usernameEl).keypress(function(e) {
	    if(e.which == 13) {
	    	doLogin();
	    }
	});
	
	$(passwordEl).keypress(function(e) {
		if(e.which == 13) {
			doLogin();
		}
	});
	
	
	
	
	var inputEls = loginForm.find('.modal-active');
	
	var statusEls = loginForm.find('.status');
	var loginError = loginForm.find('.login-error');
	var loginSuccess = loginForm.find('.login-success');
	
	function setErrorMessage(error) {
		if(!error) error = 'unknown error';
		var processed = error;
		if(processed.indexOf('error_vital_service') == 0) {
			processed = 'internal service error';
		} else if(processed.indexOf('error_') == 0) {
			var space = processed.indexOf(' ');
			if(space > 0) {
				processed = processed.substring(space + 1);
			}
		}
		if(!processed) {
			processed = 'unknown error';
		}
		if(processed.length > 300) {
			processed = processed.substring(0, 297) + '...';
		}
		loginError.text(processed);
	}
	
	function doLogin(){
		
		statusEls.empty();
		
		var username = usernameEl.val();
		
		var password = passwordEl.val();
	
		if(username.length == 0 || password.length == 0) {
			return;
		}
		
		var accountID = null;
		
		if(accountIDMode == 'enabled') {
			accountID = accountIDEl.val();
		} else if(accountIDMode == 'preset') {
			accountID = accountIDPreset;
		}
		

		
		inputEls.attr('disabled', 'disabled');
		
		vitalservice.callFunction(VitalServiceWebsocketImpl.vitalauth_login, {loginType: 'Login', username: username, password: password, accountID: accountID}, function(success){
			
			
			if(rolesCheckEnabled) {
				
				var loginObject = success.first();
				
				var roleURIs = loginObject.get('roleURIs');
				
				if(roleURIs == null || roleURIs.indexOf('role:ai.haley.role.access.webapp') < 0) {
					
					console.error("Missing role:ai.haley.role.access.webapp");
					
					inputEls.removeAttr('disabled');
					
					setErrorMessage("This login does not have a webapp role.");
					
					vitalservice.callFunction(VitalServiceWebsocketImpl.vitalauth_logout, {}, function(logoutSuccess){
						
						console.info("Logout response: ", logoutSuccess);

					}, function(logoutError) {
						
						console.error("Logout error: ", logoutError);
					});
					
					return;
					
				}
				
			}
			
//			loginSuccess.text('Logged in successfully');
			
			console.log("Logged in successfully, checking account: ", success);

			
			vitalservice.callFunction('account.get', {}, function(rl){
				
				console.log('Account verified - proceeding');
				
				loginSuccess.text('Logged in successfully');
				
				setTimeout(function(){
					
					var modal = $('#login-modal');
					
					var targetURL = modal.attr('data-target-url');
					
					modal.modal('hide');
					
					passwordEl.val('');
					
					statusEls.empty();
					
//					refreshLoggedInState();
					
					inputEls.removeAttr('disabled');
					
					//detect if in iframe
					if(isInIFrame()) {
						targetURL = getUrlParameter('targetURL')
						window.top.location.href = targetURL;
					} else {
						window.location.href = targetURL;
					}
					
				}, 1000);
				
				
			}, function(error){
				
				console.error("Account verification error: ", error);
				
				inputEls.removeAttr('disabled');
				
				setErrorMessage(error);
				
				vitalservice.callFunction(VitalServiceWebsocketImpl.vitalauth_logout, {}, function(logoutSuccess){
					
					console.info("Logout response: ", logoutSuccess);

				}, function(logoutError) {
					
					console.error("Logout error: ", logoutError);
				});
				
			});
			
		}, function(error){
			
			inputEls.removeAttr('disabled');
			
			setErrorMessage(error);
			
			console.error(error);
		});
		
	};
	
	loginButton.click(doLogin);
	
	
	$('.logout-button').click(function(){
		
		//logout with jsonp call
		doLogoutIframe();
		
//		vitalservice.callFunction(VitalServiceWebsocketImpl.vitalauth_logout, {}, function(success){
//			
//			console.log("Logged out");
//			
//			refreshLoggedInState();
//			
//		}, function(error){
//			
//			console.error("Error when logging out: ", error);
//			
//		});
		
	});
	
	$('.signup-button').click(function(){
		
		router.navigate('/signup');
		
		return false;
	})
	
	
	$('.join-waiting-list-button').click(function(){
		
		router.navigate('/requestinvitationcode');
		
		return false;
		
	});
	
	$('.haley-button').click(function(){
		
		window.location.href = WEBAPP_URL + 'home';
		
		return false;
		
	});
	
	$('.main-login-link , .account-login-link').click(function(){
		
		if(typeof(WEBAPP_URL) === 'undefined') {
			console.error("WEBAPP_URL is config param missing");
			return false;
		}
		
		var isMainLogin = $(this).hasClass('main-login-link');
		
		var dataTargetURL = isMainLogin ? ( WEBAPP_URL + 'home' ) : (WEBAPP_URL + 'account/');
		
		
		if(isInIFrame()) {
			
			var cl = vitalservice.getCurrentLogin(); 
			 
			if( cl != null ) {
	
				//proceed with event
				window.location.href = dataTargetURL;
				
				return false;
				
			}
		}
		
		$('.modal').modal('hide');
		
		var modal = $('#login-modal');
		
		modal.find('iframe').removeAttr('src'); 
		
		modal.find('iframe').attr('src', HTTPS_URL + 'iframes/login.html?targetURL=' +  encodeURIComponent(dataTargetURL));
		
		modal.attr('data-target-url', dataTargetURL);
		
		modal.modal({});
		
		return false;
		
		
	});
	
}

function mailing_initui() {
  //disable form element
  $('#signup-form-el').submit(function() {
    return false;
  });

  var inputEmail = $('#input-email'); 
  var signupButton = $('#signup');
  
  var signupButtonPanel = $('#signup-button-panel');
  
  var success = $('#signup-success');
  var error   = $('#signup-error');
  
  var errorTimer = null;
  
  var successTimer = null;
  
  error.click(function(){
    //speeds up the animation only
    if(errorTimer != null) {
      clearTimeout(errorTimer);
      errorTimer = null;
      fadeOutError();
    }
  });
  
  success.click(function(){
    //speeds up the animation only
    if(successTimer != null) {
      clearTimeout(successTimer);
      successTimer = null;
      fadeOutSuccess();
    }
  });
  
  var els = $('#input-email, #signup');
  
  els.removeAttr('disabled');
  
  inputEmail.keyup(function(e) {
      if(e.which == 13) {
        onSignupTriggered();
        return false;
      }
      
  });
  
  signupButton.click(function(){
    onSignupTriggered();
  });

  function fadeOutError() {
    error.fadeOut(1000, function(){
      $('.signup-els').fadeIn(1000, function(){
        inputEmail.focus();
      });
    });
  }
  
  function fadeOutSuccess() {
    success.fadeOut(1000, function(){
      $('.signup-els').fadeIn(1000, function(){
        inputEmail.focus();
      });
    });
  }

	function onSignupTriggered() {
		
		console.log('signup triggered');
		
		if(inputEmail.attr('disabled') == 'disabled') {
			console.log('in the middle of signup operation')
			return;
		}
		
		//disable 
		els.attr('disabled', 'disabled');
		
		var email = $('#input-email').val()
		mailing_signup(email, function(msg){

			
			$('.signup-els').fadeOut(1000, function(){
			   inputEmail.val('');
         els.removeAttr('disabled');
			   success.fadeIn(1000, function(){
			   
			     if(successTimer != null) {
              clearTimeout(successTimer);
              successTimer = null;
            }
			   
           successTimer = setTimeout(function(){
              fadeOutSuccess();
           }, 5000);
           
         })
			});
			
			
		}, function(status, msg){
			
			$('.signup-els').fadeOut(1000, function(){
        els.removeAttr('disabled');
        error.empty();
        if(status == 'error_already_signed_up') {
          error.append($('<span>',{'class': 'text-warning'}).text('Email already exists: ' + email +'. Enter your email again...'));
          inputEmail.val('');
        } else {
          error.text(msg);
        }
        error.fadeIn(1000, function(){
        
            if(errorTimer != null) {
              clearTimeout(errorTimer);
              errorTimer = null;
            }
          errorTimer = setTimeout(function(){
            fadeOutError();
          }, 5000);
          
        });
        
			});
			
			
		});
	}

}


function mailing_signup(email, successCallback, errorCallback) {
	
	console.log('signing up, email', email)
	
	vitalservice.callFunction('mailing.haley.signup', {email: email}, function(result) {
		
		console.log('haley.mailing.signup result: ', result)
		
		successCallback(result.status.message);
		
	}, function(error) {
		
		var status = 'error_unknown';
		
		var msg = 'no error message';
		
		if(error.indexOf('error_') == 0) {
			
			var split = error.split(/\s+/);
			
			status = split[0]
			
			if(split.length > 1) {
				split.splice(0, 1);
				msg = split.join(' ');
			}
			
		} else {
			msg = error;
		}
		
		errorCallback(status, msg);
		
	});
	
}



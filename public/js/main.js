;(function(){

	var app = {
		init: function(){
			this.timer.setup(); // Set up the timer
			this.facebook.setup(); // Set up the Facebook SDK

			$('#showEmailForm').on('click', function(e){ // When the "Email" button is clicked...
				e.preventDefault(); // Stop the page from jumping to the top
				$('.actions a, .actions span').fadeOut(500, function(){ // Fade out our links & "OR" seperator
					$('.actions form').fadeIn(500); // Fade in our email form
				});
			});

			$('#emailForm').on('submit', function(e){ // When the email form is submitted
				e.preventDefault();

				var $this = $(this),
					email = $this.find('[name="email"]').val();

				$('.actions, .initial-content').fadeOut(500, function(){ // Fade out our links & "OR" seperator
					$('.thanks').fadeIn(500); // Fade in thank you content
				});

				app.handleEmail({email: email}); // This is the method you'd use to handle the user's email address (i.e save it to a database, etc)... 
			});
		},
		handleEmail: function(data){
			/* Handle the user's email address here... */
			console.log(data);
		},
		facebook: {
			setup: function(){
				/* Enter your own Facebook App details here... */
				window.fbAsyncInit = function() {
			    FB.init({
			      appId      : '130885187109778',                        
			      channelUrl : '//holding.eideus.com/js/lib/channel.js', 
			      status     : true,                                 
			      xfbml      : true                                  
			    });

			    app.facebook.init();
			  };

			  /* This loads the FB SDK asyncronously... */
			  (function(d, s, id){
			     var js, fjs = d.getElementsByTagName(s)[0];
			     if (d.getElementById(id)) {return;}
			     js = d.createElement(s); js.id = id;
			     js.src = "//connect.facebook.net/en_US/all.js";
			     fjs.parentNode.insertBefore(js, fjs);
			   }(document, 'script', 'facebook-jssdk'));
			},
			init: function(){
				$('#facebookLogin').on('click', function(e){ // When the Facebook button is clicked...
					e.preventDefault();

					FB.login(function(response) { // Attempt to log the user in
						if (response.authResponse) {
							FB.api('/me', function(response) { // Get the user's details
								app.handleEmail({email: response.email}); 
								$('.actions, .initial-content').fadeOut(500, function(){ // Fade out our links & "OR" seperator
									$('.thanks').fadeIn(500); // Fade in thank you content
								});
							});
						}
					}, {scope: "email"});
				});

				FB.getLoginStatus(function(response) { // Check to see if the user has already subscribed via Facebook...
					if (response.status === 'connected') {
						var uid = response.authResponse.userID,
							accessToken = response.authResponse.accessToken;

						FB.api('/me', function(response) { // Get the user's details
							$('.actions, .initial-content').hide();
							$('.thanks').show();
						});
					} 
				}, {scope: "email"});
			}
		},
		timer: {
			setup: function(){
				$('.phone-countdown').countdown("2013/12/25", function(event) { // Be sure to change "2013/12/25" to your launch date!
					var $this = $(this);
					switch(event.type) {
						case "seconds":
						case "minutes":
						case "hours":
						case "days":
						case "weeks":
						case "daysLeft":
							$this.find('.countdown-'+event.type).html(event.value);
							break;
						case "finished":
							$this.hide();
							break;
					}
				});
			}
		},
		phone: {
			/* Animations for the phone */
			init: function(){
				$('.logo').delay(1000).animate({
					top: 78
				}, 1000);

				$('.phone-countdown').delay(1500).fadeIn(1000, function(){
					if($('body').width() > 979){
						$('.phone').animate({
							right: '29%'
						}, 750);
					}

					$('.main-content').delay(450).animate({
						opacity: 1
					}, 500);
				});
			}
		},
		domReady: function(){},
		windowLoad: function(){
			$('.phone').fadeIn(500, app.phone.init); // When the window has loaded, fade in the phone...
		}
	};

	app.init();
	$(function(){
		app.domReady();

		$(window).load(app.windowLoad);
	});

})(jQuery)
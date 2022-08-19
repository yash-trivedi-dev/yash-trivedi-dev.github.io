(function ($) {

	"use strict";

	//Get the button
	let mybutton = document.getElementById("btn-back-to-top");

	// When the user scrolls down 20px from the top of the document, show the button
	window.onscroll = function () {
		scrollFunction();
	};

	function scrollFunction() {
		if (
			document.body.scrollTop > 20 ||
			document.documentElement.scrollTop > 20
		) {
			mybutton.style.display = "block";
		} else {
			mybutton.style.display = "none";
		}
	}

	$(window).stellar({
		responsive: true,
		parallaxBackgrounds: true,
		parallaxElements: true,
		horizontalScrolling: false,
		hideDistantElements: false,
		scrollProperty: 'scroll'
	});


	var fullHeight = function () {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function () {
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function () {
		setTimeout(function () {
			if ($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	// Scrollax
	$.Scrollax();

	$(".nav-item").on("click", function () {
		$(".nav-item").removeClass("active");
		$(this).addClass("active");
	});

	$('#contactForm').validate({
		rules: {
			name: {
				required: true,
				minlength: 2
			},
			subject: {
				required: true,
				minlength: 4
			},
			email: {
				required: true,
				email: true
			},
			message: {
				required: true,
			}
		},
		messages: {
			name: {
				required: "please enter your name",
				minlength: "your name must consist of at least 2 characters"
			},
			subject: {
				required: "please enter your subject",
				minlength: "your subject must consist of at least 4 characters"
			},
			email: {
				required: "please enter your email address"
			},
			message: {
				required: "please enter your message"
			}
		},
		submitHandler: function (form) {
			var submit = $('#submit-btn'); // submit button

			var status = document.getElementById("response");
			status.innerHTML = "";
			submit.html('Sending....');
			submit.attr("disabled", true);
			fetch('https://formspree.io/f/mknenajp', {
				method: "post",
				body: new FormData(form),
				headers: {
					'Accept': 'application/json'
				}
			}).then(response => {
				if (response.ok) {
					status.innerHTML = "<span class='text-success'>Thanks for your submission!</span>";
					form.reset()
				} else {
					response.json().then(data => {
						if (Object.hasOwn(data, 'errors')) {
							status.innerHTML = "<span class='text-danger'>" + data["errors"].map(error => error["message"]).join(", ") + "</span>"
						} else {
							status.innerHTML = "<span class='text-danger'>Oops! There was a problem submitting your form</span>"
						}
					})
				}

			}).catch(error => {
				status.innerHTML = "<span class='text-danger'>Oops! There was a problem submitting your form</span>"

			}).finally(() => {
				submit.html("Send Message")
				submit.attr("disabled", false);
			});


		}
	});

	$('nav .dropdown').hover(function () {
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function () {
		var $this = $(this);
		// timer;
		// timer = setTimeout(function(){
		$this.removeClass('show');
		$this.find('> a').attr('aria-expanded', false);
		// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
		console.log('show');
	});

	// scroll
	var scrollWindow = function () {
		$(window).scroll(function () {
			var $w = $(this),
				st = $w.scrollTop(),
				navbar = $('.ftco_navbar'),
				sd = $('.js-scroll-wrap');

			if (st > 150) {
				if (!navbar.hasClass('scrolled')) {
					navbar.addClass('scrolled');
				}
			}
			if (st < 150) {
				if (navbar.hasClass('scrolled')) {
					navbar.removeClass('scrolled sleep');
				}
			}
			if (st > 350) {
				if (!navbar.hasClass('awake')) {
					navbar.addClass('awake');
				}

				if (sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if (st < 350) {
				if (navbar.hasClass('awake')) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if (sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	var contentWayPoint = function () {
		var i = 0;
		$('.ftco-animate').waypoint(function (direction) {

			if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function () {

					$('body .ftco-animate.item-animate').each(function (k) {
						var el = $(this);
						setTimeout(function () {
							var effect = el.data('animate-effect');
							if (effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if (effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if (effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						}, k * 50, 'easeInOutExpo');
					});

				}, 100);

			}

		}, { offset: '95%' });
	};
	contentWayPoint();


	// navigation
	var OnePageNav = function () {
		$(".smoothscroll[href^='#'], #ftco-nav ul li a[href^='#']").on('click', function (e) {
			e.preventDefault();

			var hash = this.hash,
				navToggler = $('.navbar-toggler');
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 700, 'easeInOutExpo', function () {
				window.location.hash = hash;
			});


			if (navToggler.is(':visible')) {
				navToggler.click();
			}
		});
		$('body').on('activate.bs.scrollspy', function () {
			console.log('nice');
		})
	};
	OnePageNav();


	// magnific popup
	$('.image-popup').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			verticalFit: false
		},
		zoom: {
			enabled: true,
			duration: 300 // don't foget to change the duration also in CSS
		}
	});


	jQuery('.portfolio-filter p span').on('click', function () {
		jQuery('.portfolio-filter p span').removeClass('active');
		jQuery(this).addClass('active');

		var data = jQuery(this).attr('data-filter');
		jQuery('.portfolio-grid').isotope({
			filter: data
		});
	});

	if (document.getElementById('portfolio')) {
		jQuery('.portfolio-grid').isotope({
			itemSelector: '.all',
			percentPosition: true,
			masonry: {
				columnWidth: '.all'
			}
		});
	}


})(jQuery);

(function($) {

	var	$window = $(window),
		$head = $('head'),
		$body = $('body');

	
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ],
			'xlarge-to-max':    '(min-width: 1681px)',
			'small-to-xlarge':  '(min-width: 481px) and (max-width: 1680px)'
		});

		$window.on('load', function() 
		{
			window.setTimeout(function() 
			{
				$body.removeClass('is-preload');
			}, 100);
		});
		var resizeTimeout;
		$window.on('resize', function() 
		{
			$body.addClass('is-resizing');
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(function() 
			{
				$body.removeClass('is-resizing');
			}, 100);
			});

		if (!browser.canUse('object-fit') 	||	browser.name == 'safari')
				$('.image.object').each(function() 
				{
					var $this = $(this),
					$img = $this.children('img');
					$img.css('opacity', '0');
					$this
						.css('background-image', 'url("' + $img.attr('src') + '")')
						.css('background-size', $img.css('object-fit') ? $img.css('object-fit') : 'cover')
						.css('background-position', $img.css('object-position') ? $img.css('object-position') : 'center');

				});

		var $sidebar = $('#sidebar'),
			$sidebar_inner = $sidebar.children('.inner');

			breakpoints.on('<=large', function() 
			{
				$sidebar.addClass('inactive');
			});

			breakpoints.on('>large', function() {
				$sidebar.removeClass('inactive');
			});

			if (browser.os == 'android'	&&	browser.name == 'chrome')
				$('<style>#sidebar .inner::-webkit-scrollbar { display: none; }</style>')
					.appendTo($head);

			$('<a href="#sidebar" class="toggle">Toggle</a>')
				.appendTo($sidebar)
				.on('click', function(event) 
				{
					event.preventDefault();
					event.stopPropagation();
					$sidebar.toggleClass('inactive');

				});
			$sidebar.on('click', 'a', function(event) 
			{
				if (breakpoints.active('>large'))
				return;
				var $a = $(this),
					href = $a.attr('href'),
					target = $a.attr('target');
					event.preventDefault();
					event.stopPropagation();
				if (!href || href == '#' || href == '')
					return;
				$sidebar.addClass('inactive');
					setTimeout(function() 
					{
						if (target == '_blank')
							window.open(href);
							else
								window.location.href = href;

						}, 500);

				});
				$sidebar.on('click touchend touchstart touchmove', function(event) 
				{
					if (breakpoints.active('>large'))
					return;
					event.stopPropagation();

				});
				$body.on('click touchend', function(event) {
					if (breakpoints.active('>large'))
					return;
					$sidebar.addClass('inactive');

				});

			$window.on('load.sidebar-lock', function() 
			{
				var sh, wh, st;
				if ($window.scrollTop() == 1)
					$window.scrollTop(0);

				$window
					.on('scroll.sidebar-lock', function() 
					{
						var x, y;
						if (breakpoints.active('<=large')) 
							{
								$sidebar_inner
									.data('locked', 0)
									.css('position', '')
									.css('top', '');

								return;
							}
							x = Math.max(sh - wh, 0);
							y = Math.max(0, $window.scrollTop() - x);
							if ($sidebar_inner.data('locked') == 1) 
								{
									if (y <= 0)
									$sidebar_inner
										.data('locked', 0)
										.css('position', '')
										.css('top', '');
									else
										$sidebar_inner
										.css('top', -1 * x);
								}
								else {
									if (y > 0)
										$sidebar_inner
										.data('locked', 1)
										.css('position', 'fixed')
										.css('top', -1 * x);

									}

					})
					.on('resize.sidebar-lock', function() 
					{
							wh = $window.height();
							sh = $sidebar_inner.outerHeight() + 30;
							$window.trigger('scroll.sidebar-lock');

					})
					.trigger('resize.sidebar-lock');

				});

			var $menu = $('#menu'),
			$menu_openers = $menu.children('ul').find('.opener');
			$menu_openers.each(function() 
			{
				var $this = $(this);
				$this.on('click', function(event) 
				{
					event.preventDefault();
					$menu_openers.not($this).removeClass('active');
					$this.toggleClass('active');
					$window.triggerHandler('resize.sidebar-lock');

				});

			});

})(jQuery);

/* Contact form */

$(document).ready(function () 
{
    $("#myForm").validate(
		{
            rules: 
			{
                name: 
				{
                    required: true
                },
                email: 
				{
                    required: true,
                       email: true
                },
                    description: 
				{
                    required: true,
                   minlength: 5
                }
            },
                messages: 
				{
                    name: "Please enter your name",
                    email: "Please enter a valid email address",
                    description: 
					{
                        required: "Please provide a description",
                        minlength: "Your description must be at least 5 characters long"
                    }
                },
                submitHandler: function (form) 
				{
                    $("#loader").show();
                    $("#message").hide();

                    setTimeout(function () 
					{
                        $("#loader").hide();
                        $("#message")
                            .text("Thank you for feeback. ESAB sales team will reach you.")
                            .show();
                        form.reset();
                    }, 2000);
                }
            });
        });
	
		
	/* Intersection Observation API */
	const aboutUsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            console.log("My intersection hit")
            $(".active").removeClass("underlined");
            $("#sidebar").toggleClass("underlined");
        } else {
            $(".active").removeClass("underlined");
        }
    });
}, {});

aboutUsObserver.observe($("#banner")[0]);
function setPanelFocusability(panel, makeFocusable) 
{
	const focusableSelector = "a[href], button, input, select, textarea";
	const elements = panel.querySelectorAll(focusableSelector);
	elements.forEach((el) => {
		el.tabIndex = makeFocusable ? 0 : -1;
	});
}

document.querySelectorAll(".tabs-content .tab-content").forEach((panel) => {
	setPanelFocusability(panel, false);
});

function updateIndicator() 
{
	const activeTab = document.querySelector(".tabs-nav button.active");
	const indicator = document.querySelector(".tab-indicator");
	if (activeTab && indicator) 
		{
			indicator.style.left = activeTab.offsetLeft + "px";
			indicator.style.width = activeTab.offsetWidth + "px";
		}
}

function activateTab(tabId) 
{
	const tabs = document.querySelectorAll(".tabs-nav button");
	const panels = document.querySelectorAll(".tabs-content .tab-content");
	tabs.forEach((tab) => 
		{
			if (tab.getAttribute("data-tab") === tabId) 
				{
					tab.classList.add("active");
					tab.setAttribute("aria-selected", "true");
				}
				else 
				{
					tab.classList.remove("active");
					tab.setAttribute("aria-selected", "false");
				}
		});
	panels.forEach((panel) => 
		{
			if (panel.getAttribute("data-tab") === tabId) 
				{
					panel.classList.add("active");
				} 
				else 
				{
					panel.classList.remove("active");
				}
		});
	updateIndicator();
}

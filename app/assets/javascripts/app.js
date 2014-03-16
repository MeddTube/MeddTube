(function() {

	// Okay, so... I did this in a rush. It should be rewritten with object literals and functions
	// that only load when an element exists, etc.  It's on the to-do list after the layout
	// stops changing.

	// Trigger tooltips
	$("[rel=tooltip]").tooltip();

	// scrollSpy
	$('.navbar').scrollspy();

	$('.graph-horizontal-labels').hide();

	$("#js-tour-page").click(function() {
		$('#joyRideContent').joyride({});
	});

	$('#js-zoom-in').click(function() {
		$('body').css('font-size', '200%');
	});

	// HIGH CONTRAST
	$('body').addClass('regular-contrast');
	$('.regular-contrast #js-high-contrast a').live(
		'click', function() {
			$('body').removeClass('regular-contrast').addClass('high-contrast');
			$(this).parent().addClass('active');
			$(this).find('span').html('on');
			return false;
		}
	);
	$('.high-contrast #js-high-contrast a').live(
		'click', function() {
			$('body').addClass('regular-contrast').removeClass('high-contrast');
			$(this).parent().removeClass('active');
			$(this).find('span').html('off');
			return false;
		}
	);

	// Timeline events
	$('.timeline-event').each(function() {
		$(this).addClass('closed');
	});

	$('.timeline-event.closed a.summary').live(
		'click', function() {
			$(this).parent().find('.detail').slideDown();
			$(this).parent().addClass('open');
			//$('.conditions .headline .panel, .conditions .timeline').syncHeight();
			return false;
		}
	);

	$('.timeline-event.open a.summary').live(
		'click', function() {
			$(this).parent().find('.detail').slideUp();
			$(this).parent().removeClass('open');
			//$('.conditions .headline .panel, .conditions .timeline').syncHeight();
			return false;
		}
	);


	// Expand and collapse lab results
	$('.lab-result.closed').live(
		'click', function() {
			$(this).removeClass('closed').addClass('open');
			$(this).children('.row').slideDown();
			$(this).find('.graph-result-label').css('display', 'block');
			$(this).find('.graph-horizontal-labels').show();
			var horizontalLabelHeight = $('.graph-horizontal-labels').height();
			$(this).find('.graph-horizontal').css('margin-top', horizontalLabelHeight + 'px');
			$(this).find('.graph-horizontal-labels').css('top', '-' + horizontalLabelHeight + 'px');
			$(this).find('.graph-horizontal-labels li').syncHeight();

		}
	);

	$('.lab-result.open').live(
		'click', function() {
			$(this).removeClass('open').addClass('closed');
			$(this).children('.row').slideUp();
			$(this).find('.graph-result-label').css('display', 'none');
			$(this).find('.graph-horizontal-labels').hide();
			$(this).find('.graph-horizontal').css('margin-top', '0');
		}
	);

	// Sync Heights of Columns
	// $('.allergies .headline .panel, .allergies .listing').syncHeight();
	// $('.labs .headline .panel, .labs .content-container').syncHeight();
	// $('.encounters .headline .panel, .encounters .content').syncHeight();
	// $('.careteam .headline .panel, .careteam .content').syncHeight();
	//$('.medications .headline .panel, .medications .content').syncHeight();
	// $('.immunizations .headline .panel, .immunizations .content').syncHeight();
	// $('.conditions .headline .panel, .conditions .timeline').syncHeight();

}());

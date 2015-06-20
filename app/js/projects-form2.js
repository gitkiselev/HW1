$(document).ready(function(){

	if ($('.popup').length) {
		Popups.init()
	}

	$('#form').on('submit', function(e){
		e.preventDefault();

		var
			$this = $(this);
			


		if (validateThis($this)) {

			postFormData($this, function(data){
				var
					reqPopup = data.status ? '#success' : '#error';

				Popups.open(reqPopup);
			});
		}
	});

}); // - > ready_end;

var Popups = (function() {

    var
	    popups = $('.popup');

	function _close(){
		popups.hide();
	}

    return {
	    
	    init : function(){
		    $('.popup__close, .popup__overlay').on('click', function(e){
			    e.preventDefault();

			    _close();
		    });
	    },

	    open: function(id) {
		    var
			    reqPopup = popups.filter(id);

		    _close();

		    reqPopup.fadeIn(300);
	    }
    }
}());

function postFormData(form, successCallback) {
	var
		host        = form.attr('action'),
		reqFields   = form.find('[name]'),
		dataObject  = {};

	if (!host) {
		console.log('set action attribute to your form, you fool!!');
	}

	reqFields.each(function(){
		var
			$this = $(this),
			value = $this.val(),
			name  = $this.attr('name');

		dataObject[name] = value;
	});

	$.post(host, dataObject, successCallback);
}
//Функция выделения незаполненных полей
/*function checkInput() {
	form.find('.req-field').each(function(){
		if($(this).val() ! = '') {
			$(this).removeClass('empty-field');
		}else {
			$(this).addClass('.empty-field');
		}
		
	});
}
function checkInput();

/* --------- валидация --------- */

function validateThis(form) {

	var
		textType = form.find("#project-name"),
		imgType = form.find("#fileupload"),
		urlType = form.find("#project-url"),
		textareaType = form.find("#project-description"),
		isValid = true;

		if (isValid) {

	textType.each(function(){

		var
			$this = $(this),
			notEmptyField = !!$this.val();

		if (notEmptyField) {
			isValid = true;
			$this.focus().removeClass('empty-field');
		} else {
			$this.tooltip({
				content: 'введите название',
				position: 'left'
			});
			$this.addClass('.empty-field');

			isValid = false;
		}
	});
		}

		if (isValid) {

	imgType.each(function(){

		var
			$this = $(this),
			notEmptyField = !!$this.val();

		if (notEmptyField) {
			isValid = true;
		} else {
			$this.tooltip({
				content: 'изображение',
				position: 'left'
			});
			$this.addClass('.empty-field');

			isValid = false;
		}
	});
		}

		if (isValid) {

	urlType.each(function(){

		var
			$this = $(this),
			notEmptyField = !!$this.val();

		if (notEmptyField) {
			isValid = true;
		} else {
			$this.tooltip({
				content: 'описание проекта',
				position: 'left'
			});
			$this.addClass('.empty-field');

			isValid = false;
		}
	});
		}

		if (isValid) {
	textarea.each(function(){

		var
			$this = $(this),
			notEmptyField = !!$this.val();

		if (notEmptyField) {
			isValid = true;
		} else {
			$this.tooltip({
				content: 'описание проекта',
				position: 'left'
			});
			$this.addClass('.empty-field');

			isValid = false;
		}	
	});
		}


return isValid
};

$.fn.tooltip = function(options) {

	options = {
		position    : options.position || 'right',
		content     : options.content || 'I am tooltip'
	};

	var
		markup = '<div class="tooltip tooltip_' + options.position + '"> \
						<div class="tooltip__inner">' + options.content + '</div> \
					</div>';

	var
		$this = this,
		body = $('body');

	$this
		.addClass('tooltipstered')
		.attr('data-tooltip-position', options.position);

	body.append(markup);

	_positionIt($this, body.find('.tooltip').last(), options.position);


	$(document).on('click', function(){
		$('.tooltip').remove();
	});

	$(window).on('resize', function(){

		var
			tooltips = $('.tooltip');

		var
			tooltipsArray = [];

		tooltips.each(function(){
			tooltipsArray.push($(this));
		});

		$('.tooltipstered').each(function(index){
			var
				position = $(this).data('tooltip-position');

			_positionIt($(this), tooltipsArray[index], position);
		});

	});

	function _positionIt(elem, tooltip, position) {

		//измеряем элемент

		var
			elemWidth   = elem.outerWidth(true),
			elemHeight  = elem.outerHeight(true),
			topEdge     = elem.offset().top,
			bottomEdge  = topEdge + elemHeight,
			leftEdge    = elem.offset().left,
			rightEdge   = leftEdge + elemWidth;

		// измеряем тултип

		var
			tooltipWidth    = tooltip.outerWidth(true),
			tooltipHeight   = tooltip.outerHeight(true),
			leftCentered    = (elemWidth / 2) - (tooltipWidth / 2),
			topCentered     = (elemHeight / 2) - (tooltipHeight / 2);


		var positions = {};

		switch (position) {
			case 'right' :
				positions = {
					left : rightEdge,
					top : topEdge + topCentered
				};
				break;
			case 'top' :
				positions = {
					left: leftEdge + leftCentered,
					top : topEdge - tooltipHeight
				};
				break;
			case 'bottom' :
				positions = {
					left : leftEdge + leftCentered,
					top : bottomEdge
				};
				break;
			case 'left' :
				positions = {
					left : leftEdge - tooltipWidth,
					top : topEdge + topCentered
				};
				break;
		}

		tooltip
			.offset(positions)
			.css('opacity', '1');
	}


};
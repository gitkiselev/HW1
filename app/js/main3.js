$.fn.tooltip = function (options) {
	option = {
		position	: options.position || 'right',
		content		: options.content  || 'I am a tooltip'
	};
	

	var
		markup = '<div class="tooltip tooltip_' + options.position + '"> \
						<div class="tooltip__inner">' + options.content + '</div> \
					</div>';

	var $this = this,
		body = $('body');

	$this
		.addClass('tooltipstered')
		.attr('data-tooltip-position', options.position);
		//Добавляем разметку в body
	body.append(markup);

	_positioning($this, body.find('.tooltip').last(), options.position);

	//Чтобы тултипы пропадали по клику
	/*$(document).on('click', function(){
		$('.tooltip').remove();
	});*/
	
	//переотрисовка тултипов
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

			_positioning($(this), tooltipsArray[index], position);
		});

	});
	//Функция для позиционирования тултипа
	function _positioning(elem, tooltip, position) {
		var
			elemWidth	= elem.outerWidth(true),
			elemHeight	= elem.outerHeight(true),
			topEdge     = elem.offset().top,
			bottomEdge	= topEdge + elemHeight,
			leftEdge	= elem.offset().left,
			rightEdge	= leftEdge + elemWidth;

		var
			tooltipWidth	= tooltip.outerWidth(true),
			tooltipHeight	= tooltip.outerHeight(true),
			leftCentered	= (elemWidth / 2) - (tooltipWidth / 2),
			topCentered		= (elemHeight / 2) - (tooltipHeight / 2);


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

/*var module = (function () {*/
	var app = {
		initialize : function () {
			this.setUpListeners();
			//$('input, textarea').placeholder();нету

		},

		setUpListeners : function () {
			$('.project-item-add').on('click', this.openForm);//mine
			$('.popup-close').on('click', this.closeForm);////////mine///////////////
			$('form').on('submit', this.submitForm);
			$('form').on('keydown', 'input, textarea', this.removeError);
			$('.form-group').on('keydown', 'input, textarea', this.removeTooltip);
			$('form').on('reset', this.deleteAllTooltips);
			$('.btn-clear').on('click', this.resetBtn);
			$('.btn-clear').on('click', this.removeTooltip);
		},
		

		

		
		

		

		submitForm : function (e) {
			e.preventDefault();

			var form = $(this);

			if (app.validate(form) === false) 
				return false;
			
			console.log('You have to use ajax');
		},


		validate : function (form) {
			var 
				nameUser        = form.find("#name"),
				passUser        = form.find("#password"),
				valid           = true;

				
				nameUser.tooltip('destroy');
				passUser.tooltip('destroy');


			nameUser.each(function(){
				var input = $(val),
				val = input.val(),
				formGroup = input.parents('.form-group'),
				textError = 'Всетаки вы не ввели логин';

				if (val.lenght === 0) {
					formGroup.addClass('error');
					input.tooltip({
						trigger: 'manual',
						position: 'left',
						title: textError
					}).tooltip('show');
					valid = false;
				}else {
					formGroup.removeClass('error');
					input.tooltip('hide');
				}
			});	


			passUser.each(function(){
				var input = $(val),
				val = input.val(),
				formGroup = input.parents('.form-group'),
				textError = 'пожалуйста введите пароль';

				if(val.lenght === 0){
					formGroup.addClass('error');
					input.tooltip({
						trigger: 'manual',
						position: 'left',
						title: textError
					}).tooltip('show');
					valid = false;
				}else {
					formGroup.removeClass('error');
					input.tooltip('hide');
				}
			});	
				
				return valid;
		},

		removeError : function() {
			$(this).removeClass('error');
		},
		resetBtn : function () {
			$('.error').removeClass('error');
		}
	};
//}
app.initialize();

//}());
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

	/*Чтобы тултипы пропадали по клику
	$(document).on('click', function(){
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
			topEdge		= elem.offset().top,
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

var module = (function () {
	var app = {
		initialize : function () {
			this.setUpListeners();
			//$('input, textarea').placeholder();

		},

		setUpListeners : function () {
			$('#add-new-proj').on('click', this.openForm);
			$('#close-modal').on('click', this.closeForm);
			$('form').on('submit', this.submitForm);
			$('form').on('keydown', 'input, textarea', this.removeError);
			$('form').on('reset', this.resetBtn);
		},

		openForm : function (e) {
			e.preventDefault();

			$('#open-modal').fadeIn();
			$('#add-site').slideDown(1000);
			$('.error').removeClass('error');
		},

		closeForm : function (e) {
			e.preventDefault();

			$('#open-modal').fadeOut();
			$('#add-site').slideUp(1000);

		},

		submitForm : function (e) {
			e.preventDefault();

			var form = $(this);

			if (app.validate(form) === false) {
				return false;
			};
			console.log('You have to use ajax');
		},

		validate : function (form) {
			var projectName     = form.find("#project-name"),
				projectURL      = form.find("#project-url"),
				mailType        = form.find("[data-validation='email']"),
				fileType        = form.find("[data-validation='file']"),
				projectDesc     = form.find("#project-description"),
				contactsName    = form.find("#contacts-name"),
				contactsMessage = form.find("#contacts-message"),
				nameUser        = form.find("#name"),
				passUser        = form.find("#password"),
				valid           = true;

				projectName.each(function(){
					var $this		= $(this),
						notEmptyVal = !!$this.val(),
						error		= 'введите название';

					if(notEmptyVal){
						//return valid;
						
						
						return valid;	

					}else{
						$this.addClass('error')
						.tooltip({
							content : error,
							position : 'left'
						});
						valid = false;
					}
				});

				projectURL.each(function(){
					var $this		= $(this),
						notEmptyVal = !!$this.val(),
						error		= 'ссылка на проект';

					if(notEmptyVal){
						return valid;
					}else{
						$this.addClass('error')
						.tooltip({
							content : error,
							position : 'left'
						});
						valid = false;
					}
				});

				fileType.each(function(){
					var $this		= $(this),
						notEmptyVal = !!$this.val(),
						error		= 'добавьте картинку';

					if(notEmptyVal){
						return valid;
					}else{
						$this.addClass('error')
						.tooltip({
							content : error,
							position : 'left'
						});
						valid = false;
					}
				});

				contactsName.each(function(){
					var $this		= $(this),
						notEmptyVal = !!$this.val(),
						error		= 'Вы не ввели имя';

					if(notEmptyVal){
						return valid;
					}else{
						$this.addClass('error')
						.tooltip({
							content : error,
							position : 'left'
						});
						valid = false;
					}
				});

				projectDesc.each(function(){
					var $this		= $(this),
						notEmptyVal = !!$this.val(),
						error		= 'описание проекта';

					if(notEmptyVal){
						return valid;
					}else{
						$this.addClass('error')
						.tooltip({
							content : error,
							position : 'left'
						});
						valid = false;
					}
				});

				contactsMessage.each(function(){
					var $this		= $(this),
						notEmptyVal = !!$this.val(),
						error		= 'Ваш вопрос';

					if(notEmptyVal){
						return valid;
					}else{
						$this.addClass('error')
						.tooltip({
							content : error,
							position : 'left'
						});
						valid = false;
					}
				});

				nameUser.each(function(){
					var $this		= $(this),
						notEmptyVal = !!$this.val(),
						error		= 'введите логин';

					if(notEmptyVal){
						return valid;

					}else{
						$this.addClass('error')
						.tooltip({
							content : error,
							position : 'left'
						});
						valid = false;
					}
				});

				passUser.each(function(){
					var $this		= $(this),
						notEmptyVal = !!$this.val(),
						error		= 'введите пароль';

					if(notEmptyVal){
						return valid;
					}else{
						$this.addClass('error')
						.tooltip({
							content : error,
							position : 'left'
						});
						valid = false;
					}
				});

				mailType.each(function(){
					var $this		= $(this),
						regExp		= /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/,
						isMail	= regExp.test($this.val());

					if(isMail){
						return valid;
					}else{
						$this.addClass('error')
						.tooltip({
							content : 'Вы не ввели email',
							position : 'right'
						});
						valid = false;
					}
				});

			
			return valid;
		},

		/*removeError : function() {
			$(this).removeClass('error');
		},*/
		/*resetBtn : function () {
			$('.error').removeClass('error');
		}*/
	};

app.initialize();

}());
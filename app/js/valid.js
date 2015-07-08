// Модуль валидации
var validation = (function (){

	var init = function(){
				console.log('Инициализация модуля validation');
				_setUpListners();
			},
			validateForm = function (form) { // Проверяет, чтобы все поля формы были не пустыми. Если пустые - вызывает тултипы
	      console.log('Проверяем форму');

	      	var projectName = form.find("#project-name"),
			projectURL      = form.find("#project-url"),
			mailName        = form.find("#contacts-mail"),
			fileLoad        = form.find("#filename"),
			projectDesc     = form.find("#project-description"),
			contactsName    = form.find("#contacts-name"),
			contactsMessage = form.find("#contacts-message"),
			nameUser        = form.find("#name"),
			passUser        = form.find("#password"),
			isValid         = true;

				projectName.each(function(){
					var $this		= $(this),
						notEmptyVal = !!$this.val(),
						error		= 'введите название';
						

					if(notEmptyVal){
						console.log('поле не пустое');
						isValid = true;
						$this.removeClass('error');
						$this.tooltip('hide');

						
					}else{
						$this.addClass('error')
						$this.tooltip({
							content : error,
							position : 'left'
						});
						isValid = false;
					}
					return isValid;
				});


				projectURL.each(function(){
					var $this		= $(this),
						notEmptyVal = !!$this.val(),
						error		= 'ссылка на проект';

					if(notEmptyVal){
						console.log('поле не пустое');
						isValid = true;

						
					}else{
						$this.addClass('error')
						.tooltip({
							content : error,
							position : 'left'
						});
						isValid = false;
					}
				});

				fileLoad.each(function(){
					var $this		= $(this),
						notEmptyVal = !!$this.val(),
						error		= 'добавьте картинку';

					if(notEmptyVal){
						console.log('поле не пустое');
						isValid = true;
						
						//$this.tooltip('hide');
					}else{
						$this.addClass('error')
						.tooltip({
							content : error,
							position : 'left'
						});
						isValid = false;
					}
				});

				contactsName.each(function(){
					var $this		= $(this),
						notEmptyVal = !!$this.val(),
						error		= 'Вы не ввели имя';

					if(notEmptyVal){
						isValid = true;
						
						//$this.tooltip('hide');
					}else{
						$this.addClass('error')
						.tooltip({
							content : error,
							position : 'left'
						});
						isValid = false;
					}
				});

				projectDesc.each(function(){
					var $this		= $(this),
						notEmptyVal = !!$this.val(),
						error		= 'описание проекта';

					if(notEmptyVal){
						isValid = true;
						
						//$this.tooltip('hide');
					}else{
						$this.addClass('error')
						.tooltip({
							content : error,
							position : 'left'
						});
						isValid = false;
					}
				});

				contactsMessage.each(function(){
					var $this		= $(this),
						notEmptyVal = !!$this.val(),
						error		= 'Ваш вопрос';

					if(notEmptyVal){
						isValid = true;
						
						
					}else{
						$this.addClass('error')
						.tooltip({
							content : error,
							position : 'left'
						});
						isValid = false;
					}
				});

				nameUser.each(function(){
					var $this		= $(this),
						notEmptyVal = !!$this.val(),
						error		= 'введите логин';

					if(notEmptyVal){
						isValid = true;
						
						

					}else{
						$this.addClass('error')
						.tooltip({
							content : error,
							position : 'left'
						});
						isValid = false;
					}
				});

				passUser.each(function(){
					var $this		= $(this),
						notEmptyVal = !!$this.val(),
						error		= 'введите пароль';

					if(notEmptyVal){
						isValid = true;
						
						
					}else{
						$this.addClass('error')
						.tooltip({
							content : error,
							position : 'left'
						});
						isValid = false;
					}
				});

				mailName.each(function(){
					var $this	= $(this),
						regExp	= /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/,
						isMail	= regExp.test($this.val());
						error   = 'Вы не ввели email';

					if(isMail){
						 isValid = true;
						 
						 //$this.tooltip('hide');
					}else{
						$this.addClass('error')
						.tooltip({
							content : error,
							position : 'right'
						});
						isValid = false;
					}
				});

			
			return isValid;/////////2306

	      }, // конец формы валидации

	      
        
		_setUpListners = function () { // Прослушивает все события 
	      $('form').on('keydown', '.error', _removeError); // удаляем красную обводку у элементов форм
	      $('form').on('reset', _clearForm); // при сбросе формы удаляем также: тултипы, обводку, сообщение от сервера
	    },
    	_removeError = function() { // Убирает красную обводку у элементов форм
	      console.log('Красная обводка у элементов форм удалена');

	      $(this).removeClass('error');
	    },	    
	    _clearForm = function(form) { // Очищает форму 
	      console.log('Очищаем форму');

	      var form = $(this);
	      form.find('.input, .textarea').trigger('hideTooltip'); // удаляем тултипы
	      form.find('.error').removeClass('error'); // удаляем красную подсветку
	      form.find('#error, #success').text('').hide(); // очищаем и прячем сообщения с сервера
	    },	     
	    //вставить функцию создания тултипа
	    $.fn.tooltip = function(options) {
		options = {
		position	: options.position,
		content		: options.content
		},
	
	//Делаем разметку для тултипов
	var
		markup = '<div class="tooltip tooltip_' + options.position + '"> \
						<div class="tooltip__inner">' + options.content + '</div> \
				  </div>';

	var $this = $(this),
		body = $('body');

	$this
		.addClass('tooltipstered')
		.attr('data-tooltip-position', options.position);
		//Добавляем разметку в body
	body.append(markup);

	_positioning($this, body.find('.tooltip').last(), options.position);

	//Чтобы тултипы пропадали по клику
	/*$(document).on('click', function(){
		console.log('кликнули в любом месте и тултипы удалились');
		$('.tooltip').remove();
	});работает, но нужно не это*/
	
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
		//измеряем элемент
		var
			elemWidth   = elem.outerWidth(true),
			elemHeight  = elem.outerHeight(true),
			topEdge     = elem.offset().top,
			bottomEdge  = topEdge + elemHeight,
			leftEdge    = elem.offset().left,
			rightEdge   = leftEdge + elemWidth;
		//измеряем тултип	
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

};	//конец создания тултипа
	    //конец функции создания тултипа

	return {
		init: init,
		validateForm: validateForm
	};

})();

validation.init();
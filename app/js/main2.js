$(document).ready(function(){

	if ($('.popup').length) {
		Popups.init();
	}

	$('form').on('submit', function(e){
		e.preventDefault();
		console.log('отмена действия по-умолчанию');

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
	$('form').on('reset', function(){//очистка формы по клавише "reset"
		console.log('Очистка формы от красной обводки и тултипов');
		$('.tooltip').remove();//пробуем, заработало
		$('input, textarea').removeClass('error');
		
	});
}); // - > ready_end;	
	$('#project-name').on('change keydown', function(){
							console.log('удаляются почему-то все');
							$('.tooltip').remove();//пробуем
						});
	$('#projectURL').on(' change keydown', function(){
							console.log('удаляем');
							$('.tooltip').remove();//пробуем
						});
	$('#fileLoad').on('keydown change', function(){
							console.log('удаляем');
							$('.tooltip').remove();//пробуем
						});
	$('#contactsName').on('keydown change', function(){
							console.log('удаляем');
							$('.tooltip').remove();//пробуем
						});
	$('#contactsMessage').on('keydown change', function(){
							console.log('удаляем');
							$('.tooltip').remove();//пробуем не работает
							$('.error').remove();
						});
	$('#nameUser').on('keydown change', function(){
							console.log('удаляем');
							$('.tooltip').remove();//пробуем
						});
	$('#passUser').on('keydown change', function(){
							console.log('удаляем');
							$('.tooltip').remove();//пробуем
						});
	$('#mailName').on('keydown change', function(){
							console.log('удаляем');
							$('.tooltip').remove();//пробуем
						});
	/*$('input, textarea').focus(function(){//здесь все работает
		console.log('поле получило фокус');
		//$('input, textarea').removeClass('tooltip');
		$(this).removeClass('error');//работает, но нужно по-другому
	});
	/*$('input, textarea').on('change keydown', function(){
		console.log('удаляем класс tooltip');
		$('.tooltip').remove();//но снимает все тултипы тут понятно почему
	});*/
	/*$('input, textarea').on('focus, change', function(){
		console.log('удаляем тултипы при получении фокуса поля');
		$('tooltip').remove();
	});*/
	/*$(document).on('click, change', function(){
		console.log('удаляем тултипы и красную обводку');
		$('.tooltip').removeClass('tooltip');
		$('input, textarea').removeClass('.error');
	});*/



var Popups = (function(){
		var popups = $('.popup');
		function _close(){
			popups.hide();
			console.log('скрываем алерты');
		}
		return {
			init: function(){
				$('.popup__close, .popup__overlay').on('click', function(e){
					e.preventDefault();

					_close();
				});
			},
			open: function(id){
				var reqPopup = popups.filter(id);

				_close();
				reqPopup.fadeIn(300);
			}
		}
}());//Popups end

function postFormData(form, successCallback){
	var
		host       = form.attr('action'),
		reqFields  = form.find('id'),
		dataObject = {};
	if (!host){
		console.log('Set action attribute to your form');
	}
	reqFields.each(function(){
		var
			$this = $(this),
			value = $this.val(),
			name  = $this.attr('name');
		dataObject[name] = value;	
	});
	$.post(host, dataObject, successCallback);	
}/// -> postformdata END

function validateThis(form){
	console.log('Проверяем форму');
		var projectName     = form.find("#project-name"),
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
						isValid = true;
						//projectName.removeClass('error');
						//console.log('удаляем красную обводку');
						
						

						
							

					}else{
						$this.addClass('error')
						$this.tooltip({
							content : error,
							position : 'left'
						});
						isValid = false;
					}
				});


				projectURL.each(function(){
					var $this		= $(this),
						notEmptyVal = !!$this.val(),
						error		= 'ссылка на проект';

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

				fileLoad.each(function(){
					var $this		= $(this),
						notEmptyVal = !!$this.val(),
						error		= 'добавьте картинку';

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

				nameUser.each(function(){
					var $this		= $(this),
						notEmptyVal = !!$this.val(),
						error		= 'введите логин';

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

				passUser.each(function(){
					var $this		= $(this),
						notEmptyVal = !!$this.val(),
						error		= 'введите пароль';

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
}



$.fn.tooltip = function(options) {
	options = {
		position	: options.position,
		content		: options.content
	};
	
	//Делаем разметку для тултипов
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

};	














































	
	


	

		
		

		
	




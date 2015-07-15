// Модуль добавления проекта
var addProject = (function (){

	var init = function(){
		if (typeof console == "undefined" || typeof console.log == "undefined") var console = { log: function() {} }; 
				console.log('Инициализация модуля addProject');
				_setUpListners();
			},
			_setUpListners = function (){
				$('.projects-item-add').on('click', _showModal); // открыть модальное окно
				$('#add-new-project').on('submit', _addProject); // добавление проекта
				$('.popup-close').on('click', _closeModal);//закрыть модальное окно
			},
			_showModal = function (event){
				if (typeof console == "undefined" || typeof console.log == "undefined") var console = { log: function() {} }; 
      			console.log('Вызов модального окна с подложкой');
      				event.preventDefault ? event.preventDefault() : (event.returnValue=false);
	      		
				$('.modal-window').css('display','block');
				$('.popup-body').css('display', 'block');
			},
			_closeModal = function(){
				if (typeof console == "undefined" || typeof console.log == "undefined") var console = { log: function() {} }; 
				console.log('закрываем модальное окно, удаляем тултипы и красную обводку');
				$('.modal-window').css('display','none');
				$('.popup-body').css('display','none');
				$('.qtip').remove();
				$('.has-error').removeClass('has-error');
			}	
	
    	
    	_addProject = function (ev){
    		if (typeof console == "undefined" || typeof console.log == "undefined") var console = { log: function() {} }; 
    		console.log('Работаем с формой добавления проекта');

	      var form = $(this),
	          url = '/ajax.php',
	          defObject = _ajaxForm(form, url);

	      if (defObject) {
	        defObject.done(function(ans) {
	          var mes = ans.mes,
	              status = ans.status;

	          if ( status === 'OK'){
	            form.trigger('reset');
	            form.find('.success-mes').text(mes).show();
	            // TODO: отрисовать новый элемент в DOM при помощи js шаблона
	            location.reload(); // сразу перезагрузим страницу
	          } else{
	            form.find('.error-mes').text(mes).show();
	          }
	        });
	      }      
    	},
	    _ajaxForm = function (form, url) {
      
	      if (!validation.validateForm(form)) return false;  // Возвращает false, если не проходит валидацию 
	      var data = form.serialize(); // собираем данные из формы в объект data

	      return $.ajax({
	      		// Возвращает Deferred Object
	        type: 'POST',
	        url: url,
	        dataType : 'JSON',
	        data: data
	      }).fail( function(ans) {
	      	if (typeof console == "undefined" || typeof console.log == "undefined") var console = { log: function() {} }; 
	        console.log('Проблемы в PHP');
	        form.find('.error-mes').text('На сервере произошла ошибка').show();
	      });
	    };   

	return {
		init: init
	};

})();

addProject.init();
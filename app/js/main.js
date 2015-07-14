/*Кроссбраузерные события*/
$(function (){
	/*$('.projects-item-add').click(function (){
		console.log('открываем модальное окно с подложкой');
		$('.modal-window').css('display','block');
		$('.popup-body').css('display', 'block');

	});*/
	$('.popup-close').click(function (){
		console.log('закрываем окно, удаляем тултипы и красную обводку');
		$('.modal-window').css('display','none');
		$('.popup-body').css('display','none');
		$('.qtip').remove();
		$('.has-error').removeClass('has-error');
		

	});
	$('.popup__close').click(function (){
		$('.popup').css('display', 'none');
	});
	/*$('.popup-close').click(function(){
		console.log('закрываем окно, удаляем тултипы и красную обводку');
		$('.tooltip').remove();
		$('.error').removeClass('error');
	});*/
	
    
});


/*var eventsObj = {
  addEvent: function (element, type, func) {
    if (typeof addEventListener !== 'undefined') {
     element.addEventListener(type, func, false);
    } else if (typeof attachEvent !== 'undefined') {
     element.attachEvent('on' + type, func);
    } else {
     element['on' + type] = func;
    }
  },

  default: function (e) {
    if (typeof e.preventDefault !== 'undefined') {
     e.preventDefault();
    } else {
     e.returnValue = false;
    }
  },

  removeEvent: function (element, type, func) {
    if (typeof removeEventListener !== 'undefined') {
     element.removeEventListener(type, func, false);
    } else if (typeof detachEvent !== 'undefined') {
     element.detachEvent('on' + type, func);
    } else {
     element['on' + type] = null;
    }
  },
  getTarget: function (event) {
  	if (typeof event.target !== 'undefined') {
  		return event.target;
  	}	else {
  			return event.srcElement;
  	}
  },
  preventDefault: function (event) {
  	if (typeof event.preventDefault !== 'undefined') {
  		event.preventDefault();
  	}	else {
  		event.returnValue = false;
  	}
  }
};

/*<a href="yandex.ru" id="link">Кликни!</a>
<script>
var link = document.getElementById("link");
function myfunc(e) {
  eventsObj.default(); // отменили стандартное поведение браузера
  alert("Какой-то текст");
}

eventsObj.addEvent(link, 'click', myfunc); // привязали событие
eventsObj.removeEvent(link, 'click', myfunc); // удалили событие
</script>*/

/*$(document).ready(function() { // вся магия после загрузки страницы
	$('.projects-item-add').click( function(event){ // ловим клик по ссылки с id="go"
		event.preventDefault(); // выключаем стандартную роль элемента
		$('#overlay').fadeIn(400, // сначала плавно показываем темную подложку
		 	function(){ // после выполнения предъидущей анимации
				$('.modal-window') 
					.css('display', 'block') // убираем у модального окна display: none;
					.animate({opacity: 1, top: '50%'}, 200); // плавно прибавляем прозрачность одновременно со съезжанием вниз
		});
	});
	/* Закрытие модального окна, тут делаем то же самое но в обратном порядке */
	/*$('.popup-close, #overlay').click( function(){ // ловим клик по крестику или подложке
		$('.modal-window')
			.animate({opacity: 0, top: '45%'}, 200,  // плавно меняем прозрачность на 0 и одновременно двигаем окно вверх
				function(){ // после анимации
					$(this).css('display', 'none'); // делаем ему display: none;
					$('#overlay').fadeOut(400); // скрываем подложку
				}
			);
	});
});*/


/*$(function () {
	//script for popups
	$('.projects-item-add').click(function () {
		$('div.'+$(this).attr("rel")).fadeIn(500);
		$("body").append("<div id='overlay'></div>");
		$('#overlay').show().css({'filter' : 'alpha(opacity=60)'});
		$('.modal-window').css('display','block');
		return false;				
	});	
	$('popup-close').click(function () {
		
		$(this).parent.parent().fadeOut(100);

		$('#overlay').remove('#overlay');
		
		return false;
	});
	
	//script for tabs
	
});*/

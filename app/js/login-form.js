(function($){

  $(function(){
    $('.login-form').each(function(){
      //Объявляем переменные формы и кнопки отправить
      var form = $(this),
          btn  = form.find('.btn_submit');

          //Добавляем каждому проверяемому полю указание, что поле пустое
          form.find('.input').addClass('empty_field');
          //Функция проверки полей формы
          function checkInput(){
            form.find('.input').each(function(){
              if($(this).val() != ''){
                //Если поле не пустое, удаляем класс-указание
                $(this).removeClass('.empty_field');
              } 
              else {
                //Если поле пустое, добавляем класс-указание
                $(this).addClass('.empty_field');
              }
            });
          }

          //Функция подсветки незаполненных полей
          function lightEmpty(){
            form.find('.empty_field').css({'border-color':'#FA8075'});
            //Через полсекунды удаляем подсветку
            setTimeout(function(){
              form.find('.empty_field').removeAttr('style');
            },500);
          }
          //Проверка в режиме реального времени
          setInterval(function(){
            //Запускаем функцию проверки полей на заполненность
            checkInput();
            //Считаем количество незаполненных полей
            var sizeEmpty = form.find('.empty_field').lenght();
            //Вешаем условие-триггер на кнопку отправки формы
            if(sizeEmpty > 0){
              btn.addClass('disabled')
        
              
              else {
                remove.addClass('disabled')
              }
              
            }
          },500);

          //Событие клика по кнопке "Войти"
          btn.click(function(){
            if($(this).hasClass('disabled')){
              //подсвечиваем незаполненные поля и форму не отправляем, если есть незаполненные поля
              lightEmpty();
              return false
            }
            else {
              
              //Все поля заполнены, можем отправлять форму
              form.submit();
            }
          });
    });    
  });
}) (jQuery);
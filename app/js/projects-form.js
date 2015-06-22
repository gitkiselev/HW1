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





function validateThis(form) {

  var
    projectName = form.find("#project-name"),
    projectImage = form.find('#fileupload'),
    projectURL = form.find('#project-url'),
    textareaType = form.find('#project-description'),
    isValid = true;
  if(isValid) {

    projectName.each(function(){

      var
        $this = $(this),
        notEmptyField = !!$this.val();

        if (notEmptyField) {
        isValid = true;
        
        
      } else {
        
        $this.tooltip({
          content: 'введите название',
          position: 'left',
        });
        $this.addClass('empty-field');
        //$this.focus().addClass('focused-field');


      isValid = false;
      }
    });
  } if(isValid){
  projectImage.each(function(){
    var
      $this = $(this),
      val = $this.val();
      switch (val.substring(val.lastIndexOf('.')+1).toLowerCase()){
        case 'gif': case 'jpg': case 'png': case 'bmp':
        console.log ('Это изображение');
        break;
      default: 
      //выдаем ошибку  
      $(this).tooltip({
        content: 'Изображение',
        position: 'left'
        
      });
      }
      

    if (isValid) {
      projectURL.each(function(){
        var 
        $this = $(this),
        notEmptyField = !!$this.val();
      })
      isValid = true;
    } else {
      $this.tooltip({
        content : 'ссылка на проект',
        position : 'left'
      });
      isValid = false;
    }
  });
}return isValid

if (isValid) {
  textareaType.each(function(){//для описания проекта
    var
      $this = $(this),
      notEmptyField = !!$this.val();
    if (notEmptyField) {
      isValid = true;
    } else {
      $this.tooltip({
        content : 'описание проекта',
        position : 'left'
      });
      $this.addClass('empty-field');
        $this.focus(function(){
          $this.removeClass('empty-field')
        });
      isValid = false;
    }
  });
}return isValid

}


//Функция, которая указывает, что поле пустое
//function reqField {
  //form.find('.req-field').addClass('empty-field');
//}

/*function validateThis(form) {

  //Функция проверки полей формы

    function isEmpty() {
      var form = $(this);
      form.find('.input').each(function() {
        var notEmpty = ($(this).val() != '');
        if (notEmpty) {//если поле не пустое, то удаляем класс пустого поля
          $(this).removeClass('empty-field');
        }
    else    {
         //Если поле пустое, то добавляем класс пустого поля
          $(this).addClass('empty-field');
        }   
      });
    } isValid = false;



//Функция проверки незаполненных полей для "НАЗВАНИЕ ПРОЕКТА"
/*function checkNameField() {
  
  var form = $(this);

  form.find('.input').addClass('empty-field');
  ($this).tooltip({
    content: 'введите название',
    position: 'left'
  });
};
//Функция проверки незаполненных полей для "КАРТИНКА ПРОЕКТА"
function checkImageField() {
  $('.fileupload').change(function() {

    var val = $(this).val();

    switch(val.substring(val.lastIndexOf('.') + 1).toLowerCase()){
        case 'gif': case 'jpg': case 'png': case 'bmp':
            //что-то должно быть хорошее
            $(this).addClass('popup-s');
            break;
        default:
            $(this).val('');
            
            $(this).tooltip({
              content: 'изображение',
              position: 'left'
            });
            // надпись "ошибка"
            $(this).addClass('popup-e');
            break;
    }
});
};
//Функция проверки незаполненных полей для "URL проекта"

function checkURLField() {
  var 
  urlType = form.find("[data-validation='text']"),
  isValid = true;

  if (isValid) {
    urlType.each(function(){

      var 
        $this = $(this),
        notEmptyField = !!$this.val();
       if (notEmptyField) {
        isValid = true;
       } 
       else {
        $this.tooltip({
          content: 'ссылка на проект',
          position: 'left'
        });
       }
    });
  }
};

//Функция проверки незаполненного поля для "ОПИСАНИЕ"

function checkDescField() {
  var 
  descType = form.find("[data-validation='text']"),
  isValid = true;

  if (isValid) {
    descType.each(function(){

      var 
        $this = $(this),
        notEmptyField = !!$this.val();
       if (notEmptyField) {
        isValid = true;
       } 
       else {
        $this.tooltip({
          content: 'описание проекта',
          position: 'left'
        });
       }
    });
  }
};

}






/*****************Функция для создания тултипа*********************/
$.fn.tooltip = function(options) {

  options = {
    position    : options.position || 'left',
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
  };
};


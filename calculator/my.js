$(document).ready(function () {
  var typesCat;
  var typesWidth;
  var typesHeight;
  var clothCat;
  var width;
  var height;
  var widthSize;
  var item;
  var itemHeight;
  var widthLg;
  var heightXML;
  var itemText;
  var types = $("#types");
  var costVal;
  var costItem;
  var result;

// получаем сопоставление с XML
  function getCollationXML() {
    $.ajax({
      type: "POST",
      url: "dop.xml",
      dataType: "xml",
      success: function (data) {
        $(data).find('cloth').each(function () {
          clothCat = $(this).attr('cat');
          height = $(this).find('height');
          height.each(function () {
            heightSize = $(this).attr('size');
            item = $(this).find('item');
            item.each(function () {
              itemWidth = $(this).attr('width');
              if (typesCat == clothCat) {
                if (typesHeight == heightSize) {
                  if (typesWidth == itemWidth) {
                    result = $(this).text();
                    costItem = $('#number-input').val();
                    var commonItem = result * costItem;
                    $('#cost').val(commonItem);
                  }
                }
              }
            });
          });
        });
      },
      error: function () {
        alert('ERROR');
      }
    });
  }

// заполняем поля и выводим цену			
// для вывода цены в самом начале
  function startPoint() {
    typesWidth = $('#width').val();
    typesWidth /= 1000;
    typesHeight = $('#height').val();
    typesHeight /= 1000;
    typesCat = $('#cat option:selected').val();
    getCollationXML();
    $('#cost').val(result);
  }

  startPoint();
  var newResultatHeight = function () {
    //задаем параметр высоты, округляя в большую сторону
    var he = 1000,
      hv = $('#height').val(),
      hc = (Math.ceil(hv / 100) * 100);
    if (hv < 500) {
      hc = 600;
      $('.error-h').css({"display": "block"});
      $('#height').css({"border": "1px solid rgb(255, 89, 89)"});
    } else {

      if (hv > 2000) {
        hc = 2000;
        $('.error-h').css({"display": "block"});
        $('#height').css({"border": "1px solid rgb(255, 89, 89)"});
      } else {
        $('.error-h').css({"display": "none"});
        $('#height').css({"border": "1px solid #cccccc"});
      }
    }

    //передаем параметр в <input id="hhide" />
    $('#hhide').val(hc);
  };

  var newResultatWidth = function () {
    //задаем параметр ширины, округляя в большую сторону
    var wi = $('#width').val(),
      wc = (Math.ceil(wi / 100) * 100);
    //задаем условия
    if (wi < 400) {
      wc = 200;
      $('.error-w').css({"display": "block"});
      $('#width').css({"border": "1px solid rgb(255, 89, 89)"});
    } else {
      if (wi > 1500) {
        wc = 1500;
        $('.error-w').css({"display": "block"});
        $('#width').css({"border": "1px solid rgb(255, 89, 89)"});
      } else {
        $('.error-w').css({"display": "none"});
        $('#width').css({"border": "1px solid #cccccc"});
      }
    }
    //передаем параметр в <input id="whide" />
    $('#whide').val(wc);
  };

  $('.WValue').keyup(function () {
    newResultatWidth();
    onChange();
    getCollationXML();

  });

  $('.HValue').keyup(function () {
    newResultatHeight();
    onChange();
    getCollationXML();
  });
  var thi = $('#cat option:selected').val();
  $('#category').val(thi);
  $('#cat').change(function () {
    onChange();
  });


  function onChange() {
    var clientWidth = $('#width').val();
    $('#real-cost #client-width').val(clientWidth);
    var clientHeight = $('#height').val();
    $('#real-cost #client-height').val(clientHeight);
    var typesCat = $("#cat option:selected").val();
    $('#category').val(typesCat);
    typesHeight = $('#hhide').val();
    typesHeight /= 1000;
    typesWidth = $('#whide').val();
    typesWidth /= 1000;

    getCollationXML();
  } // onChange


  $('.minus').mouseup(function () {
    var $input = $(this).parent().find('input');
    var count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    $input.val(count);
    $input.change();
    onChange();

  });
  $('.plus').mouseup(function () {
    var $input = $(this).parent().find('input');
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    onChange();
  });

  $('#number-input').keyup(function () {
    if ($(this).val() < 1) {
      $(this).val(1);

      if ($('#start-cost').val() != "0") {
        onChange()
      }
    } else {
      if ($('#start-cost').val() != "0") {
        onChange()
      }
    }
  });
});
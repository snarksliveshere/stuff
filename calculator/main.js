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
  buildSelect();

  function buildSelect() {
    $.ajax({
      type: "POST",
      url: "reformat.xml",
      dataType: "xml",
      success: function (data) {

        // get Category & build
        var clothLength = $(data).find('cloth').length;

        var catContent;
        for (var i = 1; i <= clothLength; i++) {
          catContent += '<option value="' + i + '">' + i + '</option>';
        }
        $('#cat').append(catContent);

        // get Height & build
        $(data).find('cloth').each(function () {
          height = $(this).find('height');
          heightXML = height.length;
        });
        height.each(function () {
          var item = $(this).find('item');
          widthLg = item.length;
        });
        // get Width & build
        var widthContent;
        widthLg = widthLg * 100 + 900;
        for (var i = 1000; i <= widthLg; i += 100) {
          widthContent += '<option value="' + i + '">' + i + '</option>';
        }
        $('#width').append(widthContent);
        heightXML = heightXML * 200 + 800;
        var content;
        for (var i = 1000; i <= heightXML; i += 200) {
          content += '<option value="' + i + '">' + i + '</option>';
        }
        $('#height').append(content);
      },
      error: function () {
        alert('ERROR from buildselect');
      }
    });
  }

  function getCollationXML() {
    $.ajax({
      type: "POST",
      url: "reformat.xml",
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
                    var result = $(this).text();
                    $('.output').html(result);
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
  types.change(function () {
    typesCat = $("#types #cat :selected").val();
    typesWidth = $("#types #width :selected").val();
    typesHeight = $("#types #height :selected").val();
    getCollationXML();
  });
});
'strict';

function Horn(hornObject) {
  this.image = hornObject.image_url;
  this.title = hornObject.title;
  this.description = hornObject.description;
  this.keyword = hornObject.keyword;
  this.horns = hornObject.horns;
}

Horn.allHorns = [];

//1. This function will grab the HTML to create the template
Horn.prototype.render = function () {
  const $source = $('#photo-template').html();

  //2. Compile
  const compileSource = Handlebars.compile($source);

  //3. Return the HTML from the compiled method
  return compileSource(this);

}

// Retrieve the JSON data
Horn.readJson = ($jsonFile) => {
  $.get($jsonFile)
    .then(data => {
      data.forEach(horn => {
        Horn.allHorns.push(new Horn(horn));
      })
    }, 'json')
    .then(Horn.loadHorns)
    .then(arrKey);
}

//Process through the array and render each object

Horn.loadHorns = () => {
  Horn.allHorns.forEach(Horn => $('#horns').append(Horn.render()));
}


function arrKey() {
  let arrKey = [];
  Horn.allHorns.forEach(function (item) {
    console.log('this.keyword: ', item.keyword);
    if (!arrKey.includes(item.keyword)) {
      arrKey.push(item.keyword);
    }
  });
  console.log('arrKey', arrKey);


  for (let i = 0; i < arrKey.length; i++) {
    //   // create a new section child in the main element
    $('select').append('<option class="copy"></option>');

    //   // find the new section that was just created
    let $optionCopy = $('option[class="copy"]');

    $optionCopy.text(arrKey[i]);
    $optionCopy.removeClass('copy');
    $optionCopy.attr('value', arrKey[i]);

  }
}

//When the user makes their selection, show only the image(s) that they selects
$(`select[name = "filter"]`).on('change', function () {
  let $selection = $(this).val();
  console.log($selection);
  $('section').hide();
  // console.log("$selection", $selection);
  $(`section[class = "${$selection}"]`).show();

})

//PAGE-1 EVENT LISTENER
$(`li[id = "page-1"]`).on('click', function () {
  // let $selection = $(this).val();
  // $('section').hide();
  // console.log("$selection", $selection);
  // $(`section[class = "${$selection}"]`).show();
  console.log($(this).text());
  // if ( !$(this).text() === 'Page 1' ) {
  //   Horn.readJson('data/page-1.json' );

})













$(document).ready(Horn.readJson('data/page-1.json'));


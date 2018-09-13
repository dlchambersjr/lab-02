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
  Horn.allHorns = [];
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
  let $previousPage = $('#horns');
  $previousPage = $previousPage.html('');

  Horn.allHorns.forEach(Horn => $('#horns').append(Horn.render()));
}


function arrKey() {
  let $previousFilter = $(`select[name = "filter"]`);
  $previousFilter = $previousFilter.html('');

  let arrKey = [];
  Horn.allHorns.forEach(function (item) {
    if (!arrKey.includes(item.keyword)) {
      arrKey.push(item.keyword);
    }
  });



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
  $('section').hide();
  $(`section[class = "${$selection}"]`).show();

})

let currentPage = 'Page 1'

//PAGE-1 EVENT LISTENER
$(`li[id = "page-1"]`).on('click', function () {
  if ($(this).text() !== currentPage) {
    Horn.readJson('data/page-1.json');
    currentPage = 'Page 1';
  }
})

//PAGE-2 EVENT LISTENE
$(`li[id = "page-2"]`).on('click', function () {
  if ($(this).text() !== currentPage) {
    Horn.readJson('data/page-2.json');
    currentPage = 'Page 2';
  }
})











$(document).ready(Horn.readJson('data/page-1.json'));


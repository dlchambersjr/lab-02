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
    .then(sortArr)
    .then(Horn.loadHorns)
    .then(arrKey);
}

function sortArr() {
  Horn.allHorns.sort();
  console.log(Horn.allHorns);
}

//Process through the array and render each object
Horn.loadHorns = () => {
  let $previousPage = $('#horns');
  $previousPage = $previousPage.html('');

  Horn.allHorns.forEach(Horn => $('#horns').append(Horn.render()));
}

// Filter the images by keyword

function arrKey() {
  let $previousFilter = $(`select[name = "filter"]`);
  $previousFilter = $previousFilter.html('');
  $previousFilter.append('<option class="all" value="all">No Filter</option>');

  let arrKey = [];
  Horn.allHorns.forEach(function (item) {
    if (!arrKey.includes(item.keyword)) {
      arrKey.push(item.keyword);
    }
  });

  for (let i = 0; i < arrKey.length; i++) {
    //   // create a new section child in the main element
    $('select[name = "filter"]').append('<option class="copy"></option>');

    //   // find the new section that was just created
    let $optionCopy = $('option[class="copy"]');

    $optionCopy.text(arrKey[i]);
    $optionCopy.removeClass('copy');
    $optionCopy.removeAttr('class');
    $optionCopy.attr('value', arrKey[i]);
  }
}

//When the user makes their selection, show only the image(s) that they selects
$(`select[name = "filter"]`).on('change', function () {
  let $selection = $(this).val();
  if ($selection === 'all' && currentPage === 'Page 1') {
    Horn.readJson('data/page-1.json');
  } else if ($selection === 'all' && currentPage === 'Page 2') {
    Horn.readJson('data/page-2.json');
  } else {
    $('section').hide();
    $(`section[class = "${$selection}"]`).show();
  }
})

//PAGE-1 EVENT LISTENER
let currentPage = 'Page 1'

$(`li[id = "page-1"]`).on('click', function () {
  if ($(this).text() !== currentPage) {
    $(this).css('text-decoration', 'underline');
    $(`li[id = "page-2"]`).css('text-decoration', 'none');
    Horn.readJson('data/page-1.json');
    currentPage = 'Page 1';
  }
})

//PAGE-2 EVENT LISTENER
$(`li[id = "page-2"]`).on('click', function () {
  if ($(this).text() !== currentPage) {
    $(this).css('text-decoration', 'underline');
    $(`li[id = "page-1"]`).css('text-decoration', 'none');
    Horn.readJson('data/page-2.json');
    currentPage = 'Page 2';
  }
})

//SORT-BY-NAME EVENT LISTENER
$(`select[name = "sort"]`).on('change', function () {
  // if ($(this).text() !== currentPage) {
  //   Horn.readJson('data/page-2.json');
  //   currentPage = 'Page 2';
  let $selectionSort = $(this).val();
  console.log($selectionSort);

})

$(document).ready(() => {
  Horn.readJson('data/page-1.json');
  $(`li[id = "page-1"]`).css('text-decoration', 'underline');
});


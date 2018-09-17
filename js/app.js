'strict';

function Horn(hornObject) {
  this.image = hornObject.image_url;
  this.title = hornObject.title;
  this.description = hornObject.description;
  this.keyword = hornObject.keyword;
  this.horns = hornObject.horns;
}

Horn.allHorns = [];
// let sortOrder = 'title'

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
      data.forEach(image => {
        Horn.allHorns.push(new Horn(image));
      })
      console.log('from jSon', Horn.allHorns)
    }, 'json')
    // .then(Horn.sortImages)
    .then(Horn.loadHorns)
    .then(Horn.createFilter)
    .then(Horn.pageChange);
}

//Process through the array and render each object
Horn.loadHorns = () => {
  let $previousPage = $('#horns');
  $previousPage = $previousPage.html('');
  Horn.allHorns.forEach(Horn => $('#horns').append(Horn.render()));
}

// Filter the images by keyword

Horn.createFilter = () => {
  let $previousFilter = $(`select[name = "filter"]`);
  $previousFilter = $previousFilter.html('');
  $previousFilter.append('<option class="all" value="all">No Filter</option>');

  let filterArray = [];
  Horn.allHorns.forEach(function (item) {
    if (!filterArray.includes(item.keyword)) {
      filterArray.push(item.keyword);
    }
  });

  filterArray.sort();

  for (let i = 0; i < filterArray.length; i++) {
    //   // create a new section child in the main element
    $('select[name = "filter"]').append('<option class="copy"></option>');

    //   // find the new section that was just created
    let $optionCopy = $('option[class="copy"]');

    $optionCopy.text(filterArray[i]);
    $optionCopy.removeClass('copy');
    $optionCopy.removeAttr('class');
    $optionCopy.attr('value', filterArray[i]);
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
Horn.pageChange = () => {
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

}
//SORT-BY EVENT LISTENER
Horn.changeSort = () => {
  $(`input[name = "sort"]`).on('change', function () {
    let $selectionSort = $(this).val();
    Horn.sortImages(Horn.allHorns, $selectionSort);
  })
}

$(document).ready(() => {
  Horn.readJson('data/page-1.json');
  $(`li[id = "page-1"]`).css('text-decoration', 'underline');
});

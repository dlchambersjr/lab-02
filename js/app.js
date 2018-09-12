'strict';

function Horn(hornObject) {
  this.image = hornObject.image_url;
  this.title = hornObject.title;
  this.description = hornObject.description;
  this.keyword = hornObject.keyword;
  this.horns = hornObject.horns;
}

Horn.allHorns = [];

// This function will create the HTML to render the data
Horn.prototype.render = function () {

  // create a new section child in the main element
  $('main').append('<section class="copy"></section>');

  // find the new section that was just created
  const $hornCopy = $('section[class="copy"]');

  // Create the HTML info for the new section
  const $hornHtml = $('#photo-template').html();

  // Add the HTML info to the new section
  $hornCopy.html($hornHtml);

  // Apply the info from each instance to the HTML
  $hornCopy.find('h2').text(this.title);
  $hornCopy.find('img').attr('src', this.image);
  $hornCopy.find('p').text(this.description);
  $hornCopy.removeClass('copy');
  $hornCopy.addClass(this.keyword);
}

// Retrieve the JSON data
Horn.readJson = () => {
  $.get('data/page-1.json')
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
  Horn.allHorns.forEach((Horn) => Horn.render());
}


function arrKey () {
  let arrKey = [];
  Horn.allHorns.forEach(function (item) {
    console.log('this.keyword: ', item.keyword);
    if (!arrKey.includes(item.keyword)){
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
$(`select[name = "filter"]`).on('change', function (){
  let $selection = $(this).val();
  $('section').hide();
  // console.log("$selection", $selection);
  $(`section[class = "${$selection}"]`).show();

})












$(document).ready(Horn.readJson());


'strict';

function Horn(hornObject) {
  this.image = hornObject.image_url;
  this.title - hornObject.title;
  this.description = hornObject.description;
  this.keyword = hornObject.keyword;
  this.horns = hornObject.horns;
}

Horn.allHorns = [];

Horn.prototype.render = function () {
  // create a new section child in the main element
  $('main').append('<section class="copy"></section>');

  // find the new section that was just created
  const $hornCopy = $('section[class="copy"]');

  // Create the HTML info for the new section
  const $hornHtml = $('#photo-template').hmtl;

  // Add the HTML info to the new section
  $hornCopy.html($hornHtml);

  // Apply the info from each instance to the HTML
  $hornCopy.find('h2').text(this.title);
  $hornCopy.find('img').text(this.image);
  $hornCopy.find('p').text(this.description);

}

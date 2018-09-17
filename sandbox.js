// Horn.sortImages = (sortOn) => {
//   sortOrder = sortOn;
//   console.log('Sort Images on', sortOrder);
//   console.log('array to sort', Horn.allHorns);
//   Horn.allHorns.sort((a, b) => {
//     let firstComparison = a[sortOrder];
//     let secondComparison = b[sortOrder];
//     return (firstComparison > secondComparison) ? 1 : (firstComparison < secondComparison) ? -1 : 0;
//   });
// }



// Image.handleSort = () => {
//   $('input').on('change', function () {
//     $('select').val('default');
//     $('div').remove()
//     Image.sortBy(Image.all, $(this).attr('id'))
//     Image.all.forEach(image => {
//       $('#image-container').append(image.render());
//     })
//   })
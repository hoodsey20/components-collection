$('body').on('click', '.js-collapseCard .collapseCard__header', function (e) {
    console.log('click1')
  e.preventDefault();
  var collapsedCard = $(this).parents('.collapseCard');
  collapsedCard.toggleClass('isClosed');
  collapsedCard.toggleClass('isOpen');
})

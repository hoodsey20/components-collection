document.addEventListener('click', function(evt) {
  if (evt.target.matches('.js-collapseCard .collapseCard__header')) {
    var collapsedCard = evt.target.closest('.collapseCard');
    collapsedCard.classList.toggle('isClosed');
    collapsedCard.classList.toggle('isOpen');
  }
})
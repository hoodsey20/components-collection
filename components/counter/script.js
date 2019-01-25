document.addEventListener('click', function(evt) {
    if (evt.target.matches('.js-counter .counter__button')) {
      var input = evt.target.closest('.counter').querySelector('.counter__input');
      switch (evt.target.dataset.set) {
        case 'up':
            input.stepUp();
            break;
        case 'down':
            input.stepDown();
            break;
        default:
            throw new Error('не указан data-set атрибут')
        }
    }
})
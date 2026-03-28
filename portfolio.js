function initPortfolio() {
  // Back link fade in
  var pb = document.getElementById('port-back');
  if (pb) pb.classList.add('visible');

  // Stagger-animate port-obj elements
  var items = document.querySelectorAll('#screen-port .port-obj');
  for (var i = 0; i < items.length; i++) {
    (function(el, idx) {
      setTimeout(function() { el.classList.add('in'); }, 180 + idx * 140);
    })(items[i], i);
  }

  // Filter tabs
  var filters = document.querySelectorAll('.port-filter');
  var cards = document.querySelectorAll('.port-card');

  for (var f = 0; f < filters.length; f++) {
    filters[f].addEventListener('click', function() {
      for (var j = 0; j < filters.length; j++) {
        filters[j].classList.remove('active');
      }
      this.classList.add('active');
      var selected = this.getAttribute('data-filter');
      for (var k = 0; k < cards.length; k++) {
        var cat = cards[k].getAttribute('data-category');
        if (selected === 'all' || cat === selected) {
          cards[k].classList.remove('port-hidden');
        } else {
          cards[k].classList.add('port-hidden');
        }
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', function() { initPortfolio(); });

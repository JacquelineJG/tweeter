$(document).ready(function() {
  $('textarea').val('')
  
});

$(document).on('input', 'textarea', function() {
  const max = 140;
  let currentCount = $(this).val().length;
  let charRemaining = max - currentCount;
  $('.new-tweet .counter').text(charRemaining)
  if (charRemaining < 0) {
    $('.new-tweet .counter').addClass("red");
  } else if (charRemaining >= 0) {
    $('.new-tweet .counter').removeClass("red");
  }
});

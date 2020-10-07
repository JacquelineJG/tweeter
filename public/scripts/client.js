/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function(tweets) {
  const tweetContainer = $('.tweet-container').html('')
  console.log(tweets);
  console.log(tweetContainer);
  // loops through tweets
  for (tweet of tweets) {
    tweetContainer.prepend(createTweetElement(tweet));
  }
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
}

const escape =  function(str) {
  console.log('str', str)
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = function(tweet) {
  const safeHTML = `<p>${escape(tweet.content.text)}</p>`;
let $tweet = $(`<article>
<div class='tweet-top'>
<div>
  <img src='${tweet.user.avatars}' width="60" height="60">
</div>
<div class='name'>${tweet.user.name}</div>
<div class='handle'>${tweet.user.handle}</div>
</div>
<div class='tweet-middle'>
<p>${safeHTML}</p>
</div>
<div class='tweet-bottom'>
<div class='date'>
<time datetime='${tweet.created_at}'>
</div>
<div class='symbols'>
<i class="fa fa-flag" style="font-size:20px;color:#6e50f2"></i>
<i class="fa fa-retweet" style="font-size:20px;color:#6e50f2"></i>
<i class="fa fa-heart" style="font-size:20px;color:#6e50f2"></i>
</div>
</div>
</article>`);

return $tweet;
}


$(document).ready(function() {
  console.log('Ready!')
  $('.tweet-form').submit(function(event) {
    event.preventDefault()
    if($('.new-tweet .counter').val() < 140 && $('.new-tweet .counter').val() > 0) {
    $.ajax('/tweets', 
    { method: 'POST', 
      data: $(this).serialize()
    }).then(function() {
      loadTweets()
      $('#tweet-text').val('')
      $('.new-tweet .counter').val(140)
    })
    } else if ($('.new-tweet .counter').val() == 140) {
      $('.error').prepend('Error: Tweet cannot be empty').hide().slideDown(1000);
      setTimeout(function() { 
        $(".error").slideUp(); 
        $(".error").empty();
      }, 3000);
    } else if ($('.new-tweet .counter').val() <= 0) {
      $('.error').prepend('Error: Tweet cannot be more than 140 characters').hide().slideDown(1000);
      setTimeout(function() { 
        $(".error").slideUp(); 
        $(".error").empty();
      }, 3000);
    }
  
  }),
  
  $(loadTweets = function() {
      $.ajax('/tweets', { method: 'GET' })
      .then(function (response) {
        renderTweets(response);
      });
    });

  loadTweets()
  
});


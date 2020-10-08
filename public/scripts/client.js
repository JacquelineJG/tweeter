// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
const renderTweets = function(tweets) {
  const tweetContainer = $('.tweet-container').html('')
  // loops through tweets
  for (tweet of tweets) {
    tweetContainer.prepend(createTweetElement(tweet));
  }
}
// creates relative for when tweet is created
function relativeTime(date) {
  let seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}
// escapes from malicious text insterted into new tweet form
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}
// function for creation of new tweet
const createTweetElement = function(tweet) {
  const safeHTML = `<p>${escape(tweet.content.text)}</p>`;
  let $tweet = $(
  `<article>
    <div class='tweet-top'>
      <div>
        <img src='${tweet.user.avatars}' width="60" height="60">
      </div>
      <div class='name'>${tweet.user.name}</div>
      <div class='handle'>${tweet.user.handle}</div>
    </div>
    <div class='tweet-middle'>
      <p><b>${safeHTML}</b></p>
    </div>
    <div class='tweet-bottom'>
      <div class='time'>
        ${relativeTime(tweet.created_at)}
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
    //if all checks clear for a tweet, make a post request, then load the tweets same page and reset the counter and text box
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
      $('.error').text('Error: Tweet cannot be empty').hide().slideDown(2000);
      setTimeout(function() { 
        $(".error").slideUp(); 
        $(".error").empty();
      }, 3000);
    } else if ($('.new-tweet .counter').val() <= 0) {
      $('.error').text('Error: Tweet cannot be more than 140 characters').hide().slideDown(2000);
      setTimeout(function() { 
        $(".error").slideUp(); 
        $(".error").empty();
      }, 3000);
    }
  })
  
  $(loadTweets = function() {
      $.ajax('/tweets', { method: 'GET' })
      .then(function (response) {
        renderTweets(response);
      });
    });

  loadTweets()
  
});


/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json


// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

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

const createTweetElement = function(tweet) {
let $tweet = $(`<article>
<div class='tweet-top'>
<div>
  <img src='${tweet.user.avatars}' width="60" height="60">
</div>
<div class='name'>${tweet.user.name}</div>
<div class='handle'>${tweet.user.handle}</div>
</div>
<div class='tweet-middle'>
<p>${tweet.content.text}</p>
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
    if($('.new-tweet .counter').val() < 140 && $('.new-tweet .counter').val() > 0){
    $.ajax('/tweets', 
    { method: 'POST', 
      data: $(this).serialize()
    }).then(function() {
      loadTweets()
    })
    } else if ($('.new-tweet .counter').val() == 140) {
      alert('Invalid: Tweet cannot be blank');
    } else if ($('.new-tweet .counter').val() <= 0) {
      alert('Invalid: Tweet cannot be more than 140 characters')
    }
  
  }),
  
  $(loadTweets = function() {
      $.ajax('/tweets', { method: 'GET' })
      .then(function (response) {
        console.log(response);
        renderTweets(response);
      });
    });

  loadTweets()
  
});


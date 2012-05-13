function getTweets(callback) {
  $.ajax({
    url: 'https://api.twitter.com/1/statuses/user_timeline.json?screen_name=gorillatron&exclude_replies=true',
    type: 'get',
    dataType: 'jsonp',
    error: function() {
      callback(new Error('failed to load tweets'))
    },
    success: function(tweets) {
      callback(null, tweets)
    }
  })
}
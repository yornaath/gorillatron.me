var GithubActivity;
  
GithubActivity = (function(){
  
  function GithubActivity(attrs){
    this.data = {}
    for(var attr in attrs) {
      this.data[attr] = attrs[attr]
    }
  }

  GithubActivity.fetch = function(callback) {
    $.ajax({
      url: 'https://ajax.googleapis.com/ajax/services/feed/load?callback=?&num=5&output=json&v=1.0&q=http://github.com/andtan.atom',
      type: 'get',
      dataType: 'jsonp',
      error: function() {
        callback(new Error('failed to load tweets'))
      },
      success: function(res) {
        var activitiesJSON, githubActivities, i, activity
        activitiesJSON = res.responseData.feed.entries
        githubActivities = []
        for (i = 0; i < activitiesJSON.length; i++) {
          activity = activitiesJSON[i]
          activity.title = activity.title.replace('andtan', 'Andre Tangen')
          var githubActivitie = new GithubActivity(activity)
          githubActivities.push(githubActivitie)
        }
        callback(null, githubActivities)
      }
    })
  }

  GithubActivity.prototype.toJSON = function() {
    return this.data
  }
    
  return GithubActivity
})()
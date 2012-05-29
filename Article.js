
var fs = require('fs')

var Article;

Article = (function(){
  
  function Article(articledir, json){
    this.data = json
    this.data.layout = json.layout || Article.layout
    this.page = Article.root + '/' + articledir + '/template.jade'
  }

  Article.prototype.toJSON = function() {
    return this.data
  }

  Article.prototype.get = function(key) {
    return this.data[key]
  }

  Article.prototype.set = function(key, val) {
    return this.data[key] = val
  }

  Article.layout = __dirname + '/views/articlelayout.jade'

  Article.root = __dirname + '/articles'

  Article.all = function(callback) {
    fs.readdir(Article.root, function(err, articledirs) {
      if(err) {
        callback(err)
      }
      var articles = []
      var i = 0
      articledirs.forEach(function(articledir) {
        fs.readFile(Article.root + articledir + '/article.json', 'utf8', function(err, articlejson) {
          i++
          var json
          if(err) {
            return callback(err)
          }
          try {
            json = JSON.parse(articlejson)
            articles.push(new Article(articledir, json))
            if(i === articledirs.length) {
              callback(null, articles)
            }
          } catch(e) {
            console.error('failed to parse json in: ' + Article.root + articledir + '/article.json');
            callback('failed to parse json in: ' + Article.root + articledir + '/article.json')
          }
        })
      })
    })
  }

  Article.find = function(name, callback) {
    fs.readFile(Article.root + '/' + name + '/article.json', 'utf8', function(err, articlejson) {
      var json
      if(err) {
        return callback(err)
      }
      try {
        json = JSON.parse(articlejson)
        callback(null, new Article(name, json))
      } catch(e) {
        console.log(e);
        console.error('failed to parse json in: ' + Article.root + name + '/article.json');
        callback('failed to parse json in: ' + Article.root + name + '/article.json')
      }
    })
  }
      
  return Article
})()

module.exports = Article
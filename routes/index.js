
var Article = require('../Article.js')

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', {
    layout: 'frontpagelayout'
  })
};

exports.crit = function(req, res) {
  res.render('crit', {
    layout: 'articlelayout'
  })
}

exports.article = function(req, res) {
  Article.find(req.params.article, function(err, article) {
    res.render(article.page, article.toJSON())
  })
}
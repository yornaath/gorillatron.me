$(document).ready(function() {
  
  var wtwui = require('wtwui')

  new wtwui.Crit({
    target: '.critit',
    life: '600',
    mindamage: 80,
    maxdamage: 140,
    critlimit: 125,
    deadText: 'Deleted!'
  }).on('dead', function() {
    setTimeout(function() {
      $('.critit')
        .addClass('deleted')
    }, 100)
  })


})
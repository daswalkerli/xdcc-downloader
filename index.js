var download = require('./download');
var question = require('./question');
var search = require('./search');
var winston = require('winston');

if (process.env.NODE_ENV === 'development') {
  winston.level = 'debug';
}

question
  .query()
  .then(search)
  .then(question.select)
  .then(function(result) {
    return download(result.hostname, result.channel, result.bot, result.number);
  })
  .catch(function(error) {
    console.error(error);
  });


var Promise = require('bluebird');
var request = require('request');
var cheerio = require('cheerio');
var querystring = require('querystring');

module.exports = function(query) {
  return new Promise(function(resolve, reject) {
    var url = 'http://sunxdcc.com/?' + querystring.stringify({sterm: query});
    return request(url, function(error, res, html) {
      if (error) return reject(error);
      var $ = cheerio.load(html);
      return resolve($('.attributes').map(function() {
        var element = $(this);
        var match = element.find('.filename_desc a')
          .attr('href').match(/^irc:\/\/([^\/]+)\/(.*)$/);
        var command = element.find('.pack_value span').attr('onclick');
        var number = element.find('.pack_value span').text();
        var filename = element.find('.filename_desc a').text();
        return {
          hostname: match[1],
          channel: '#' + match[2],
          filename: filename.split('\n')[0],
          number: number,
          bot: command.match(/\/msg\s(.*)\sxdcc/)[1],
        };
      }).get());
    });
  });
};

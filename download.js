var ProgressBar = require('progress');
var Promise = require('bluebird');
var irc = require('xdcc').irc;
var winston = require('winston');

module.exports = function(hostname, channel, bot, number) {
  var username = 'ionfgodfngzelm';
  return new Promise(function(resolve, reject) {
    var launched = false, last = 0, progress;
    var client = new irc.Client(hostname, username, {
      channels: [channel]
    });

    client.on('message', function(from, to, message) {
      winston.debug('message [%s] => [%s] %s', from, to, message);
      if (launched || from === username) return;
      launched = true;
      winston.debug('xdcc send %s', number);
      client.getXdcc(bot, 'xdcc send ' + number, '/data');
    });

    client.on('xdcc-connect', function(meta) {
      winston.debug('xdcc-connect');
      progress = new ProgressBar('Downloading... [:bar] :percent, :etas remaining', {
        incomplete: ' ',
        total: meta.length,
        width: 20
      });
      client.part(channel, 'bye bye !');
    });

    client.on('xdcc-data', function(received) {
      winston.debug('xdcc-data');
      progress.tick(received - last);
      last = received;
    });

    client.on('xdcc-end', function() {
      winston.debug('xdcc-end');
      return resolve();
    });

    client.on('error', function(message) {
      winston.error(message);
      return reject(new Error(message));
    });
  });
};

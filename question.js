var inquirer = require('inquirer');

module.exports = {
  query: function() {
    return inquirer.prompt({
      type: 'input',
      name: 'query',
      message: 'What are you looking for ?'
    }).then(function(res) {
      return res.query;
    });
  },
  select: function(available) {
    return inquirer.prompt({
      type: 'list',
      name: 'file',
      message: 'Which one do you want ?',
      choices: available.map(function(item, p) {
        return p + ' [' + item.hostname + '] ' + item.filename;
      })
    }).then(function(res) {
      return available[parseInt(res.file.match(/^([0-9]+)/)[1])];
    })
  },
};

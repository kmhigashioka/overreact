const componentGenerator = require('./component');

module.exports = function (plop) {
  plop.setGenerator('component', componentGenerator);
};

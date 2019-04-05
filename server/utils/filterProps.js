const _ = require('lodash');

module.exports = (object, props) => _.pickBy(object, (value, key) => props.indexOf(key) !== -1);

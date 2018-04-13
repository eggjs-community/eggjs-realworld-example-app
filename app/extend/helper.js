'use strict';

const bcrypt = require('bcryptjs');

exports.bhash = str => {
  return bcrypt.hashSync(str, 10);
};

exports.bcompare = (str, hash) => {
  return bcrypt.compareSync(str, hash);
};

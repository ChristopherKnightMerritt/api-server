'use strict';

module.exports = (err, req, res, next) => {
  console.log('Server Error');
  let error = {error: err || err};
  res.status(500).json(error).end();
};

const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated, rejectLowAccess} = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, rejectLowAccess, (req, res) => {
  // what is the value of req.user????
  console.log('req.user:', req.user);

  pool
    .query(`SELECT * FROM "secret";`)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log('Error making SELECT for secrets:', error);
      res.sendStatus(500);
    });
});

module.exports = router;

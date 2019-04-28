const Router = require('express').Router;
const router = new Router();
const Mercury = require('@postlight/mercury-parser');

router.route('/').get((req, res) => {
  res.json({
    message: 'Welcome to 🚀mercury-parser-api API! Endpoint: /parser',
  });
});

router.route('/parser').get(async (req, res) => {
  let result = { message: 'No URL was provided' };
  if (req.query.url) {
    try {
      let contentType = req.query.contentType || 'html';
      result = await Mercury.parse(req.query.url, { contentType: contentType });
    } catch (error) {
      result = { error: true, messages: error.message };
    }
  }
  return res.json(result);
});

module.exports = router;

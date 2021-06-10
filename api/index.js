const router=require('express').Router();
const account = require('./account.js');
const bookmark = require('./bookmarks.js');

router.use('/account', account);
router.use('/bookmarks', bookmark);

module.exports=router;

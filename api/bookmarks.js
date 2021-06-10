const router = require('express').Router();
const bookmarksDb = require('../db/bookmarks');
const passport = require('passport');
const {ensureAuthenticated}=require('../auth');

router.post('/addBookmark', ensureAuthenticated,async(req,res)=>{
    bookmark=req.body;
    bookmark.userId=req.user.Id;
    await bookmarksDb.addBookmark(bookmark);
    res.json({status:'ok'});
})
router.post('/delete', ensureAuthenticated,async(req, res)=>{
    await bookmarksDb.deleteBookmark(req.body.id);
    res.json({status:'ok'});
})
router.post('/update',ensureAuthenticated,async(req,res)=>{
   await bookmarksDb.updateBookmark(req.body);
    res.json({status:'ok'});
})
router.get('/',async(req,res)=>{
    const bookmarks=await bookmarksDb.GetTop5Urls();
    res.json(bookmarks);
})
router.get('/userBookmarks', ensureAuthenticated, async(req,res)=>{
    const bookmarks=await bookmarksDb.getUserBookmarks(req.user.Id);
    res.json(bookmarks);
})

module.exports=router;
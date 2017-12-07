const router = require('express').Router()

//require controllers
const blogController = require('../controllers/blogController')

//require helper
const hashPassword = require('../helpers/hashPassword')
const verifyToken  = require('../middlewares/verifyToken')

//route
router.get('/', blogController.welcomePage)

router.post('/', verifyToken.loginState, blogController.postBlog)

router.get('/all', blogController.getBlogs)

router.get('/:id', blogController.getBlog)

router.put('/:id', verifyToken.loginState, blogController.editBlog)

router.delete('/:id', verifyToken.loginState, blogController.delBlog)

router.post('/signin', hashPassword.reHashed, blogController.signin)

router.post('/signup', hashPassword.hashed, blogController.signup)

router.post('/verify', blogController.verify)

//export
module.exports = router;
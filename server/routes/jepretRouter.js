const router = require('express').Router()

//require controllers
const jepretController = require('../controllers/jepretController')

//require helper
const hashPassword = require('../helpers/hashPassword')
const verifyToken  = require('../middlewares/verifyToken')
const checkStatus = require('../middlewares/checkStatus')

//route
router.get('/', jepretController.welcomePage)

// | /api/signfb  | POST | fb(token) | Auth FB   |
router.post('/signfb', checkStatus, jepretController.signfb)

// | /api/jepret  | POST | token, image, caption | post new jepret |
router.post('/jepret', verifyToken.loginState, jepretController.postBlog)

// | /api/jepret  | GET  | token | get all my jepret |
router.get('/jepret', jepretController.getBlogs)

// | /api/jepret/:id  | GET  | - | get specific jepret |
router.get('/jepret/:id', jepretController.getBlog)

// | /api/jepret/:id  | PUT | token, newCaption | update caption jepret |
router.put('/:id', verifyToken.loginState, jepretController.editBlog)

// | /api/jepret/:id  | DELETE | token | delete jepreted post |
router.delete('/:id', verifyToken.loginState, jepretController.delBlog)

// | /api/jepret/:id/love | POST | token | like the jepret |
// router.post('/jepret', verifyToken.loginState, jepretController.postBlog)


// | /api/signup  | POST | username & password  | Auth (Register) |
// | /api/signin  | POST | username & password | Auth (login) return token jwt |
router.post('/signin', hashPassword.reHashed, jepretController.signin)
router.post('/signup', hashPassword.hashed, jepretController.signup)


//export
module.exports = router;

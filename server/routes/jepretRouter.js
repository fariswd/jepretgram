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
router.post('/jepret', verifyToken.loginState, jepretController.postJepret)

// | /api/jepret  | GET  | token | get all my jepret |
router.get('/jepret', jepretController.getJeprets)

// | /api/jepret/:id  | GET  | - | get specific jepret |
router.get('/jepret/:id', jepretController.getJepret)

// | /api/jepret/:id  | PUT | token, newCaption | update caption jepret |
router.put('/jepret/:id', verifyToken.loginState, jepretController.editJepret)

// | /api/jepret/:id  | DELETE | token | delete jepreted post |
router.delete('/jepret/:id', verifyToken.loginState, jepretController.delJepret)

// | /api/jepret/:id/love | POST | token | like the jepret |
router.post('/jepret/:id/love', verifyToken.loginState, jepretController.loveJepret)


// | /api/signup  | POST | username & password  | Auth (Register) |
// | /api/signin  | POST | username & password | Auth (login) return token jwt |
router.post('/signin', hashPassword.reHashed, jepretController.signin)
router.post('/signup', hashPassword.hashed, jepretController.signup)


//export
module.exports = router;

//require helper
const fbHelper = require('../helpers/fb')
const jsonToken = require('../helpers/jsonToken')

//require model
const User = require('../models/user')

let checkStatus = (req, res, next) => {
  fbHelper.unwrapToken(req.headers.token, (err, response) => {
    if (err) {
      res.status(400).send({err: err})
    } else {
      User.findOne({ username: response.email })
      .then(result => {
        if(result){
          let tokenizer = {
            _id: result._id,
            name: result.name
          }
          jsonToken.signToken(tokenizer, (err, token) => {
            if (err) {
              res.status(500).send({err: err})
            }
            else {
              res.status(200).send({
                msg: "success",
                token: token,
                userId: result._id,
                tokenfb: req.headers.token
              })
            }
          })
        } else {
          next()
        }
      })
      .catch(err => {
        res.status(500).send({err: err})
      })
    }
  })
}

module.exports = checkStatus;

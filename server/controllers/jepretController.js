//require helper
const hashPassword = require('../helpers/hashPassword')
const jsonToken = require('../helpers/jsonToken')
const FB = require('fb')
const fb = new FB.Facebook({version: 'v2.11'})

//require model
const User = require('../models/user')
const Jepret = require('../models/jepret')

let welcomePage = (req, res) => {
  res.send({msg: 'welcomePage'})
}

let signfb = (req, res) => {
  FB.setAccessToken(req.headers.token)
  FB.api('/me', { fields: ['id', 'name', 'email', 'picture'] }, (response)=>{
    if(response.error) {
      res.status(500).send({err: response.error})
    } else {
      let newUser = {
        username: response.email,
        name: response.name
      }
      let user = new User (newUser)
      user.save()
      .then(result => {
        let tokenizer = {
          _id: result._id,
          name: result.name,
        }
        jsonToken.signToken(tokenizer, (err, token) => {
          if (err) {
            res.status(500).send({err: err})
          }
          else {
            res.status(200).send({
              msg: "success",
              token: token,
              userId: tokenizer._id,
              name: result.name,
              tokenfb: req.headers.token
            })
          }
        })
      })
      .catch(err => {
        res.status(500).send({
          err: err
        })
      })
    }
  })
}

let postJepret = (req, res) => {
  if(req.body.imageurl && req.body.caption) {
    let jepret = new Jepret({
      userId: req.decoded._id,
      image: req.body.image,
      imageurl: req.body.imageurl,
      caption: req.body.caption,
      createdAt: new Date()
    })
    jepret.save()
    .then(result=>{
      res.status(200).send({
        msg:"success",
        author: req.decoded.username,
        jepretPost: result
      })
    })
    .catch(err=>{
      res.status(500).send({msg:"unsuccessfull post"})
    })
  } else {
    res.status(400).send({msg: "empty title & article"})
  }
}

let getJepret = (req, res) => {
  Jepret.findOne({ _id: req.params.id })
  .populate('userId')
  .exec()
  .then(result=>{
    res.status(200).send({
      msg: "success",
      jepretPost: result
    })
  })
  .catch(err=>{
    res.status(500).send({msg:"unsuccess get jepret post"})
  })
}

let getJeprets = (req, res) => {
  Jepret.find()
  .populate('userId')
  .exec()
  .then(result=>{
    res.status(200).send({
      msg: "success",
      jepretPost: result
    })
  })
  .catch(err=>{
    res.status(500).send({msg:"unsuccess get blog post"})
  })
}

let editJepret = (req, res) => {
  Jepret.update({ _id: req.params.id }, {
    caption: req.body.caption
  })
  .then(result=>{
    Jepret.findOne({ _id: req.params.id })
    .then(newEdit=>{
      res.status(200).send({
        msg: "success",
        newJepretPost: newEdit
      })
    })
    .catch(err=>{
      res.status(500).send({msg:"unsuccess get blog post"})
    })

  })
  .catch(err=>{
    res.status(400).send({msg: err})
  })
}

let delJepret = (req, res) => {
  Jepret.findOne({ _id: req.params.id })
  .then(before=>{
    Jepret.remove({ _id: req.params.id })
    .then(result=>{
      res.status(200).send({
        msg: "success",
        deleted: before
      })

    })
    .catch(err=>{
      res.status(400).send({msg: err})
    })
  })
  .catch(err=>{
    res.status(400).send({msg: err})
  })
}

let loveJepret = (req, res) => {
  Jepret.findOne({ _id: req.params.id })
  .then(result=>{
    if(result.userId == req.decoded._id) {
      res.status(400).send({msg: 'cannot send love to yourself'})
    } else {
      let love = result.love
      let pos = love.findIndex(function(e) {
        return e == req.decoded._id
      })
      if (pos<0) {
        love.push(req.decoded._id)
      } else {
        love.splice(pos, 1)
      }
    }
  })
  .catch(err=>{
    res.status(400).send({msg: err})
  })
}

let verify = (req, res) => {
  res.status(200).send({msg:"success"})
}

let signup = (req, res) => {
  let user = new User({
    username: req.body.username,
    password: req.body.password
  })
  user.save()
  .then(result=>{
    res.status(200).send({ msg: "success" })
  })
  .catch(err=>{
    res.status(500).send({ msg: err })
  })
}

let signin = (req, res) => {
  res.status(200).send({
    msg:"success",
    token: req.token
  })
}

module.exports = {
  welcomePage,
  postJepret,
  getJepret,
  getJeprets,
  editJepret,
  delJepret,
  signin,
  signup,
  signfb,
  loveJepret
};

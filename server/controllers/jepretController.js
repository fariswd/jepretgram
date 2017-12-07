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
              userId: tokenizer._id
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

let postBlog = (req, res) => {
  if(req.body.title && req.body.article) {
    let blog = new Blog({
      userId: req.decoded.id,
      title: req.body.title,
      article: req.body.article
    })
    blog.save()
    .then(result=>{
      res.status(200).send({
        msg:"success",
        author: req.decoded.username,
        blogPost: result
      })
    })
    .catch(err=>{
      res.status(500).send({msg:"unsuccessfull post"})
    })
  } else {
    res.status(400).send({msg: "empty title & article"})
  }
}

let getBlog = (req, res) => {
  Blog.findOne({ _id: req.params.id })
  .then(result=>{
    res.status(200).send({
      msg: "success",
      blogPost: result
    })
  })
  .catch(err=>{
    res.status(500).send({msg:"unsuccess get blog post"})
  })
}

let getBlogs = (req, res) => {
  Blog.find()
  .then(result=>{
    res.status(200).send({
      msg: "success",
      blogPost: result
    })
  })
  .catch(err=>{
    res.status(500).send({msg:"unsuccess get blog post"})
  })
}

let editBlog = (req, res) => {
  Blog.update({ _id: req.params.id }, {
    userId: req.decoded.id,
    title: req.body.title,
    article: req.body.article
  })
  .then(result=>{
    Blog.findOne({ _id: req.params.id })
    .then(newEdit=>{
      res.status(200).send({
        msg: "success",
        newBlogPost: newEdit
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

let delBlog = (req, res) => {
  Blog.findOne({ _id: req.params.id })
  .then(before=>{
    Blog.remove({ _id: req.params.id })
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

let verify = (req, res) => {
  res.status(200).send({msg:"success"})
}

module.exports = {
  welcomePage,
  postBlog,
  getBlog,
  getBlogs,
  editBlog,
  delBlog,
  signin,
  signup,
  signfb
};

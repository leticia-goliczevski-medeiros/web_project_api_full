const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Jacques Cousteau"
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Explorer"
  },
  avatar: {
    type: String,
    default: "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'É necessário um link válido.',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'É necessário um email válido.'
    }
  },
  password: {
    type: String,
    required: true,
    select: false
  }
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({email}).select('+password')
  .then((user)=> {
    if(!user) {
      throw new UnauthorizedError('Email ou senha incorretos.');
    }

    return bcrypt.compare(password, user.password)
    .then((matched)=> {
      if(!matched) {
        throw new UnauthorizedError('Email ou senha incorretos.');
      }

      return user;
    })
  })
}

module.exports = mongoose.model('user', userSchema);

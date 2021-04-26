const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
  },
  fullname: {
    type: String,
  },
  email: String, 
  password: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
},
{
  timestamps: true
}
);

const User = model("User", userSchema);

module.exports = User;
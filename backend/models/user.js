const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
  type: String,
  required: true,
  unique: true,
  validate: {
    validator: function (v) {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      const isMobile = /^[0-9]{10}$/.test(v);
      return isEmail || isMobile;
    },
    message: props => `${props.value} is not a valid email or mobile number!`
  }
},
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: "NORMAL"
  }
}, { timestamps: true });

const User = mongoose.model("user", userSchema)

module.exports = User
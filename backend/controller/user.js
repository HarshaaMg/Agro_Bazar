const User = require("../models/user")
const {setUser, getUser} = require("../service/auth")



async function handelUserRegistration(req, res) {
  const { name, contact, password, re_entered_password } = req.body;

  if (password !== re_entered_password) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    await User.create({
      name,
      contact,
      password,
    });

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}


async function handelLogInRequest(req, res){
    const {contact, password} = req.body
    const user = await User.findOne({
        contact,
        password
    })
    console.log(user)

    if(!user) return res.status(400).json({ error: "user not found" });

    const token = setUser(user)
    res.cookie("uid", token)
    return res.status(201).json({ message: "User logged in successfully" });
}

module.exports = {
    handelUserRegistration,
    handelLogInRequest,
}
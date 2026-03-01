const jwt = require("jsonwebtoken")
const secret = "sumit21122004@"

function setUser(user) {
    return jwt.sign(
        { _id: user._id, email: user.contact, role: user.role }, // Only store safe, minimal data
        secret
    );
}

function getUser(token) {
    if (!token) return null;
    
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}


module.exports = {setUser, getUser}
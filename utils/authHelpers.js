const jwt = require('jsonwebtoken');

const generateToken = async (user) => {
  const {
    _id, name, email, dni, age,
  } = user;
  const token = jwt.sign({
    _id, name, email, dni, age,
  }, process.env.TOKEN_SECRET);
  return token;
};

const verifyToken = (token) => {
  const verified = jwt.verify(token, process.env.TOKEN_SECRET);
  if (!verified) return false;
  return verified;
};

const checkToken = (req, res, next) => {
  const token = req.header('token');
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access Denied (You need to send the token in headers)',
      body: {},
    });
  }
  const verifiedToken = verifyToken(token);
  if (!verifiedToken) {
    return res.status(400).json({
      success: false,
      message: 'Invalid Token',
      body: {},
    });
  }
  let { user } = req;
  user = verifiedToken;
  next();
  return res.status(500).json({
    success: false,
    message: 'Access Denied (You need to send the token in headers)',
    body: {},
  });
};

module.exports.generateToken = generateToken;
module.exports.checkToken = checkToken;

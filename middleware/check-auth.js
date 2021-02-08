const jwt = require('jsonwebtoken');

module.exports = ((req, res, next) => {
  
  try{
    const token = req.headers.authorization.split(' ');
    const decodedToken = jwt.verify(token[1], process.env.JWT_KEY);
    req.userData = { email: decodedToken.email, userId: decodedToken.userId, username: decodedToken.username };
    next();
  }
  catch (error){
    res.status(401).json({
      msg: 'You are not authenticated!'
    });
  }
});
module.exports = (req, res, next) => {
  if (!req.user) {
      return res.status(401).send('Before you must login.');
  } else if (req.user.role !== 1) {
      console.error(req.user.username, req.ip, 'Access to admin role');
      return res.status(401).send('Your role is not admin.');
  } else {
      next();
  }
}
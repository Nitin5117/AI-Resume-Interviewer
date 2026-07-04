const validate = (req, res, next) => {
  const { name, email, password } = req.body;

  if (req.path === '/register') {
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }
  }

  if (req.path === '/login') {
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }
  }

  next();
};

exports.register = validate;
exports.login = validate;

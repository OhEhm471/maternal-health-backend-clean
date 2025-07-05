import User from '../models/User.js';

const isAdmin = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
  } catch (err) {
    console.error('isAdmin error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export default isAdmin;

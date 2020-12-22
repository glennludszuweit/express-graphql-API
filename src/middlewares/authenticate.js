import jwt from 'jsonwebtoken';

export const createJWT = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const verifyUser = (req, res, next) => {
  const token = req.header('Authorization') || '';
  if (!token) return res.status(401).send('Access deneid.');
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.verifiedUser = verified.user;
    next();
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
};

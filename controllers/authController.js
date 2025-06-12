import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token)
    return res.status(401).json({ message: 'Bạn phải đăng nhập trước.' });

  jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
    if (err) return res.status(403).json({ message: 'Token không hợp lệ.' });
    req.signedInUserId = data.userId;
    next();
  });
};

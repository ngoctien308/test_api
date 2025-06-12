import db from '../db.js';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res) => {
  try {
    const name = req.body?.name;
    const email = req.body?.email;
    const password = req.body?.password;

    // check trong
    if (!name || !email || !password) {
      throw new Error('Thiếu dữ liệu');
    }

    if (password.length < 6) {
      throw new Error('Mật khẩu phải từ 6 kí tự trở lên.');
    }

    // check trung
    const [data, others] = await db.query('select * from users where email=?', [
      email
    ]);

    if (data[0]) {
      throw new Error('Email đã tồn tại.');
    }

    await db.query('insert into users (name, email, password) values (?,?,?)', [
      name,
      email,
      password
    ]);

    res
      .status(200)
      .json({ message: 'Đăng kí thành công. Bây giờ bạn có thể đăng nhập' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const email = req.body?.email;
    const password = req.body?.password;

    // check trong
    if (!email || !password) {
      throw new Error('Thiếu dữ liệu');
    }

    const [data, others] = await db.query(
      'select * from users where email=? and password=?',
      [email, password]
    );
    if (data.length === 0) {
      throw new Error('Sai tài khoản hoặc mật khẩu.');
    }

    const signedInUser = data[0];
    const token = jwt.sign(
      { userId: signedInUser.id },
      process.env.SECRET_KEY,
      {
        expiresIn: 300 // 5m
      }
    );

    res.status(200).json({ message: 'Đăng nhập thành công.', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

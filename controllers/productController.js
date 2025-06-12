import db from '../db.js';

export const getAllProducts = async (req, res) => {
  try {
    const [data, others] = await db.query('select * from products');

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const [data, others] = await db.query('select * from products where id=?', [
      req.params?.id
    ]);
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updatedFields = Object.keys(req.body); // lấy ra các trường cần update

    if (updatedFields.length === 0) {
      throw new Error('Không có trường nào để cập nhật');
    }

    let setClause = updatedFields.map((field) => `${field}=?,`).join('');
    setClause = setClause.slice(0, -1);

    const sql = 'update products set '
      .concat(setClause)
      .concat(' where id=', req.params.id);
    const values = updatedFields.map((field) => req.body[field]);

    await db.query(sql, values);

    res.status(200).json({ message: 'Cập nhật thành công.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await db.query('delete from products where id=?', [req.params?.id]);

    res.status(200).json({ message: 'Xóa thành công.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

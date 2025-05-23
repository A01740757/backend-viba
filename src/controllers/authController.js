
import { connectToDatabase, sql } from '../config/dbConfig.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const pool = await connectToDatabase();
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .query('SELECT * FROM UsuariosJulian WHERE email = @email');

    const user = result.recordset[0];
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

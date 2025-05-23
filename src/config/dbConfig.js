
import sql from 'mssql';
import dotenv from 'dotenv';
dotenv.config();

const dbSettings = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  port: 1433,
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

export async function connectToDatabase() {
  try {
    const pool = await sql.connect(dbSettings);
    console.log('Conectado a SQL Server');
    return pool;
  } catch (error) {
    console.error('Error al conectar a SQL Server:', error);
    throw error;
  }
}

export { sql };

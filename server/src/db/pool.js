import mysql from 'mysql2/promise';
import 'dotenv/config';
export const pool=mysql.createPool({host:process.env.DB_HOST||'localhost',port:Number(process.env.DB_PORT||3306),user:process.env.DB_USER||'root',password:process.env.DB_PASSWORD||'',database:process.env.DB_NAME||'sheh',waitForConnections:true,connectionLimit:8,queueLimit:0});
export async function canUseDb(){try{const c=await pool.getConnection();await c.ping();c.release();return true}catch{return false}}

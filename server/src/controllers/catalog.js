import { appendFile, mkdir } from 'node:fs/promises';
import { pool, canUseDb } from '../db/pool.js';
import * as localCatalog from '../db/fallback.js';

export async function products(req, res) {
  if (await canUseDb()) {
    const [rows] = await pool.query('SELECT p.*, c.name AS category FROM products p LEFT JOIN categories c ON c.id=p.category_id ORDER BY p.id');
    return res.json(rows);
  }
  return res.json(localCatalog.products);
}

export async function product(req, res) {
  if (await canUseDb()) {
    const [rows] = await pool.execute('SELECT p.*, c.name AS category FROM products p LEFT JOIN categories c ON c.id=p.category_id WHERE p.slug=? LIMIT 1', [req.params.slug]);
    if (!rows[0]) return res.status(404).json({ message: 'Product not found' });
    return res.json(rows[0]);
  }
  const item = localCatalog.products.find((entry) => entry.slug === req.params.slug);
  if (!item) return res.status(404).json({ message: 'Product not found' });
  return res.json(item);
}

export async function categories(req, res) {
  if (await canUseDb()) {
    const [rows] = await pool.query('SELECT * FROM categories ORDER BY name');
    return res.json(rows);
  }
  return res.json([...new Set(localCatalog.products.map((entry) => entry.category))]);
}

export async function ingredients(req, res) {
  if (await canUseDb()) {
    const [rows] = await pool.query('SELECT * FROM ingredients ORDER BY name');
    return res.json(rows);
  }
  return res.json(localCatalog.ingredients);
}

export async function journal(req, res) {
  if (await canUseDb()) {
    const [rows] = await pool.query('SELECT * FROM journal_posts ORDER BY created_at DESC');
    return res.json(rows);
  }
  return res.json(localCatalog.journal);
}

export async function journalPost(req, res) {
  if (await canUseDb()) {
    const [rows] = await pool.execute('SELECT * FROM journal_posts WHERE slug=? LIMIT 1', [req.params.slug]);
    if (!rows[0]) return res.status(404).json({ message: 'Post not found' });
    return res.json(rows[0]);
  }
  const item = localCatalog.journal.find((entry) => entry.slug === req.params.slug);
  if (!item) return res.status(404).json({ message: 'Post not found' });
  return res.json(item);
}

export async function contact(req, res) {
  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (await canUseDb()) {
    await pool.execute(
      'INSERT INTO contact_messages (name,email,subject,message) VALUES (?,?,?,?)',
      [name, email, subject, message]
    );
  } else {
    const uploadsDir = new URL('../../uploads/', import.meta.url);
    const messageFile = new URL('../../uploads/contact-messages.jsonl', import.meta.url);
    await mkdir(uploadsDir, { recursive: true });
    await appendFile(messageFile, `${JSON.stringify({ name, email, subject, message, createdAt: new Date().toISOString() })}\n`, 'utf8');
  }

  return res.status(201).json({ message: 'Message received' });
}

import db from "../config/db.js";

export const getAllUsersDB = async () => {
  const { rows } = await db.query("SELECT * FROM users");
  return rows;
};

export const findUserByEmail = async (email) => {
  const { rows } = await db.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  return rows[0];
};

export const findUserById = async (id) => {
  const { rows } = await db.query(
    "SELECT id, name, email FROM users WHERE id = $1",
    [id]
  );
  return rows[0];
};

export const createUser = async ({ name, email, password }) => {
  const { rows } = await db.query(
    `INSERT INTO users (name, email, password)
     VALUES ($1, $2, $3)
     RETURNING id, name, email`,
    [name, email, password]
  );
  return rows[0];
};
import "dotenv/config";
import bcrypt from "bcrypt";
import db from "../src/config/db.js";

const seed = async () => {
  await db.query("DELETE FROM users");

  const password = await bcrypt.hash("admin", 10);

  await db.query(
    `INSERT INTO users (name, email, password)
     VALUES ($1, $2, $3)`,
    ["Admin", "admin@example.com", password]
  );

  console.log("✅ Seeding completed");
  process.exit();
};

seed().catch(err => {
  console.error(err);
  process.exit(1);
});

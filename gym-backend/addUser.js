const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");

(async () => {
  try {
    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "arpitdua",
      database: "gym"
    });

    // Example new user
    const username = "arpit";
    const plainPassword = "12345";

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Insert into DB
    await db.execute(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashedPassword]
    );

    console.log("User added successfully!");
    await db.end();
  } catch (err) {
    console.error(err);
  }
})();

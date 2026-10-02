const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("./models/User");

const resetAdminPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("DATABASE:", mongoose.connection.name);
    console.log("HOST:", mongoose.connection.host);

    const newPassword = "password@123";

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await User.findOneAndUpdate(
      { email: "admin@shopsphere.com" },
      {
        password: hashedPassword,
        role: "admin",
      },
      { returnDocument: "after" }
    );

    if (!user) {
      console.log("❌ Admin user not found");
      process.exit(1);
    }

    const check = await bcrypt.compare(
      newPassword,
      user.password
    );

    console.log("USER:", user.email);
    console.log("ROLE:", user.role);
    console.log("PASSWORD VERIFY:", check);

    await mongoose.disconnect();

    process.exit(0);
  } catch (error) {
    console.error("❌ ERROR:", error);
    process.exit(1);
  }
};

resetAdminPassword();
module.exports = async (db) => {
  const { Role } = db.mysql;

  const roles = ["admin", "teacher", "student"];

  try {
    for (const name of roles) {
      const [role, created] = await Role.findOrCreate({
        where: { name },
        defaults: { name },
      });

      if (created) {
        console.log(`🌱 Created role: ${name}`);
      } else {
        console.log(`ℹ️ Role already exists: ${name}`);
      }
    }

    console.log("✅ Seeded Roles successfully!\n");
  } catch (err) {
    console.error("❌ Failed to seed Roles:", err.message);
  }
};

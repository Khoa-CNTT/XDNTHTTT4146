const { mysql } = require("../models");

async function seedDefaultData() {
  // 🧠 Roles
  const [adminRole, created] = await mysql.Role.findOrCreate({
    where: { name: "admin" },
    defaults: { description: "Administrator" },
  });

  const [userRole] = await mysql.Role.findOrCreate({
    where: { name: "user" },
    defaults: { description: "Normal user" },
  });

  // 🏅 Badges
  await mysql.Badge.findOrCreate({
    where: { name: "Rookie" },
    defaults: {
      description: "Newbie badge",
      icon: "rookie.png",
    },
  });

  // 🧰 ItemTypes
  await mysql.ItemType.findOrCreate({
    where: { name: "fertilizer" },
    defaults: {
      description: "Used to improve land quality",
    },
  });

  // 💬 Log
  console.log("🌱 Default data seeded (Roles, Badges, ItemTypes...)");
}

module.exports = seedDefaultData;

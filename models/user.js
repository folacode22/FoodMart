module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      googleId: { type: Sequelize.STRING },
      username: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      address: { type: Sequelize.STRING },
      role: {
        type: Sequelize.STRING,
        enumerable: ["user", "admin"],
        defaultValue: "user",
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    },
    {
      freezeTableName: true,
    }
  );
  return User;
};

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      googleId: { type: DataTypes.STRING },
      username: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      address: { type: DataTypes.STRING },
      role: {
        type: DataTypes.STRING,
        enumerable: ["user", "admin"],
        defaultValue: "user",
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: { allowNull: false, type: DataTypes.DATE },
    },
    {
      freezeTableName: true,
    }
  );
  return User;
};

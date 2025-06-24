const mongoose = require("mongoose");

const connectDB = async () => {
  const connect = await mongoose.connect(
    "mongodb+srv://shreejinetwork702:Xd5OsAeqRz2SLOD4@cluster0.dhjwe.mongodb.net/devOpsDataBase"
  );
  console.log(
    `Data Base Connection SuccessFull ${connect.connection.host},${connect.connection.name}`
  );
};

module.exports = {
  connectDB,
};

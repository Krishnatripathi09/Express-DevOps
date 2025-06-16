const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect(
    "mongodb+srv://shreejinetwork702:Xd5OsAeqRz2SLOD4@cluster0.dhjwe.mongodb.net/devOpsDataBase"
  );
};

module.exports = {
  connectDB,
};

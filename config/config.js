require("dotenv").config();
module.exports = {
    mongoURI: "mongodb://127.0.0.1:27017/walletvalidator",
    adminKey: process.env.ADMIN_KEY,
    port: process.env.PORT
};

const mongoose = require('mongoose');

const dbconnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ DB connected successfully");
    } catch (err) {
        console.error("❌ DB connection error:", err.message);
        process.exit(1);
    }
};

module.exports = dbconnect;

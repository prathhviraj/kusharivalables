const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const makeAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected');

        const email = process.argv[2];

        if (!email) {
            console.error('❌ Please provide an email address as an argument.');
            console.log('👉 Usage: node makeAdmin.js <user-email>');
            process.exit(1);
        }

        const user = await User.findOne({ email });

        if (!user) {
            console.error(`❌ User with email ${email} not found.`);
            process.exit(1);
        }

        user.role = 'admin';
        await user.save();

        console.log(`🎉 Success! User ${email} is now an admin.`);
        process.exit(0);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

makeAdmin();

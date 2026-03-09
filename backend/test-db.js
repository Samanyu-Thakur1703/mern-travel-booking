require('dotenv').config();

console.log('Testing MongoDB Connection...');
console.log('URI:', process.env.MONGODB_URI.replace(/:[^:]*@/, ':****@')); // Hide password

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ SUCCESS! MongoDB Connected');
    console.log('📊 Database:', mongoose.connection.name);
    console.log('🌍 Host:', mongoose.connection.host);
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ FAILED! Error:', err.message);
    console.error('Full error:', err);
    process.exit(1);
  });
import mongoose from 'mongoose';

const conectionString = `mongodb+srv://${process.env.DB_HOST}/${process.env.DB_NAME}`;
export const connection = mongoose.connect(conectionString, {
   user: process.env.DB_USER,
   pass: process.env.DB_PASS,
   useCreateIndex: true
});

// mongoose.set('debug', true);

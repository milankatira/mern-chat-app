import mongoose from 'mongoose';

export const db = async () => {

  try {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    console.log(process.env.MONGODB_URI);
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/chat',
    );

    console.log('Mongodb connected successfully.');

  } catch (error) {

    console.log(process.env.MONGODB_URI);
    console.log('Database connection error: ', error);

  }

};

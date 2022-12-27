import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { notFound, errorHandler } from './middleware/errorMiddleware';
import { db } from './config/Db';
import { Routes } from './src';
dotenv.config();

const app = express();

app.use(express.json());

console.log(process.env.SITE_URL);

const corsOptions = {
  origin: process.env.SITE_URL,
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get('/', (req, res) =>
{
  res.send('API is running..');
});

app.use('/api/chat', Routes.chatRoute);
app.use('/api/user', Routes.userRoute);
app.use('/api/message', Routes.messageRoute);

const PORT = process.env.PORT;

app.use(notFound);

app.use(errorHandler);

const server = app.listen(PORT, async () =>
{
  db();

  console.log(`Listening on port ${ PORT }`);
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000',
    // credentials: true,
  },
});

io.on(
  'connection',
  (socket: {
    on: (
      arg0: string,
      arg1: {
        (userData: any): void;
        (room: any): void;
        (room: any): any;
        (room: any): any;
        (newMessageRecieved: any): void;
      },
    ) => void;
    join: (arg0: any) => void;
    emit: (arg0: string) => void;
    in: (arg0: any) => {
      (): any;
      new(): any;
      emit: { (arg0: string, arg1: undefined): void; new(): any };
    };
    off: (arg0: string, arg1: () => void) => void;
    leave: (arg0: any) => void;
  }) =>
  {
    console.log('Connected to socket.io');
    socket.on('setup', (userData: { _id: any }) =>
    {
      socket.join(userData._id);
      socket.emit('connected');
    });

    socket.on('join chat', (room: string) =>
    {
      socket.join(room);
      console.log('User Joined Room: ' + room);
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    socket.on('typing', (room: any) => socket.in(room).emit('typing'));

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    socket.on('stop typing', (room: any) =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      socket.in(room).emit('stop typing'),
    );

    socket.on(
      'new message',
      (newMessageRecieved: { chat: any; sender: { _id: any } }) =>
      {
        const chat = newMessageRecieved.chat;

        if (!chat.users) return console.log('chat.users not defined');

        chat.users.forEach((user: { _id: any }) =>
        {
          if (user._id == newMessageRecieved.sender._id) return;

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          socket.in(user._id).emit('message recieved', newMessageRecieved);
        });
      },
    );

    socket.off('setup', () =>
    {
      console.log('USER DISCONNECTED');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      socket.leave(userData._id);
    });
  },
);

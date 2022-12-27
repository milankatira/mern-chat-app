import asyncHandler from 'express-async-handler';
import { Response, Request } from 'express';
import messageModel from './message.model';
import userModel from '../user/user.model';
import chatModel from '../chat/chat.model';


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const allMessages = asyncHandler(async (req:Request, res:Response) => {

  try {

    const messages = await messageModel.find({ chat: req.params.chatId })
      .populate('sender', 'name pic email')
      .populate('chat');
    res.json(messages);

  } catch (error:any) {

    res.status(400);
    throw new Error(error.message);

  }

});


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const sendMessage = asyncHandler(async (req: any, res: Response) => {

  const { content, chatId } = req.body;

  if (!content || !chatId) {

    console.log('Invalid data passed into request');
    return res.sendStatus(400);

  }

  const newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {

    let message = await messageModel.create(newMessage);

    message = await message.populate('sender', 'name');

    message = await message.populate('chat');

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    message = await userModel.populate(message, {
      path: 'chat.users',
      select: 'name email',
    });

    await chatModel.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });

    res.json(message);

  } catch (error:any) {

    res.status(400);
    throw new Error(error.message);

  }

});


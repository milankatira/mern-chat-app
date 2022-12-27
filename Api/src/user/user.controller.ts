import asyncHandler from 'express-async-handler';
import { Response,Request } from 'express';
import userModel from './user.model';
import generateToken from '../../config/generateToken';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const allUsers = asyncHandler(async (req: any, res: Response) => {

  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: 'i' } },
          { email: { $regex: req.query.search, $options: 'i' } },
        ],
      }
    : {};

  const users = await userModel
    .find(keyword)
    .find({ _id: { $ne: req.user._id } });
  res.send(users);

});


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const registerUser = asyncHandler(async (req: Request, res:Response) => {

  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {

    res.status(400);
    throw new Error('Please Enter all the Feilds');

  }

  const userExists = await userModel.findOne({ email });

  if (userExists) {

    res.status(400);
    throw new Error('User already exists');

  }

  const user = await userModel.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });

  } else {

    res.status(400);
    throw new Error('User not found');

  }

});


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const authUser = asyncHandler(async (req: Request, res: Response) => {

  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (user && (await user.matchPassword(password))) {

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });

  } else {

    res.status(401);
    throw new Error('Invalid Email or Password');

  }

});


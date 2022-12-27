import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { type: 'String', required: true },
    email: { type: 'String', unique: true, required: true },
    password: { type: 'String', required: true },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
);

userSchema.methods.matchPassword = async function (enteredPassword: string) {

  return await bcrypt.compare(enteredPassword, this.password);

};

userSchema.pre('save', async function (next) {

  if (!this.isModified) {

    next();

  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

});

export default mongoose.model('User', userSchema);

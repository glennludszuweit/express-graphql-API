import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.virtual('password').set(function (password) {
  this.hashedPassword = bcrypt.hashSync(password, 10);
});

userSchema.methods = {
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.hashedPassword);
  },
};

export default mongoose.model('User', userSchema);

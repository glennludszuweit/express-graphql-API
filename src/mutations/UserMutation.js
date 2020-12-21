import bcrypt from 'bcryptjs';
import { GraphQLString } from 'graphql';
import { createJWT } from '../middlewares/authenticate.js';
import User from '../models/User.js';

export const register = {
  type: GraphQLString,
  args: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const { name, email, password } = args;
    const salt = await bcrypt.genSalt(5);
    const securedPass = await bcrypt.hash(password, salt);
    const user = new User({
      name,
      email,
      password: securedPass,
    });
    await user.save();
    const token = createJWT(user);
    return token;
  },
};

export const login = {
  type: GraphQLString,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const user = await User.find({ email: args.email });
    if (!user) throw new Error('Incorrect email.');

    const userPassword = user.map((x) => x.password);
    const checkPassword = await bcrypt.compare(
      args.password,
      userPassword.toString()
    );
    if (!checkPassword) throw new Error('Invalid password.');

    const token = createJWT(user);
    return token;
  },
};

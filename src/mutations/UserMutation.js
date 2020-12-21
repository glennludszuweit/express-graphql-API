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
    const user = new User({
      name,
      email,
      password,
    });
    await user.save();
    const token = createJWT(user);
    return JSON.stringify(token);
  },
};

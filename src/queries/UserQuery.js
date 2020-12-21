import { GraphQLList } from 'graphql';
import User from '../models/User.js';
import UserType from '../types/UserType.js';

export const users = {
  type: new GraphQLList(UserType),
  async resolve(parent, args) {
    return await User.find();
  },
};

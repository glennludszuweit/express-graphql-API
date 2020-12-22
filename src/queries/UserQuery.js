import { GraphQLID, GraphQLList } from 'graphql';
import User from '../models/User.js';
import UserType from '../types/UserType.js';

export const getUsers = {
  type: new GraphQLList(UserType),
  description: 'Get all users',
  async resolve() {
    return await User.find();
  },
};

export const getUser = {
  type: new GraphQLList(UserType),
  description: 'Get one users',
  args: { id: { type: GraphQLID } },
  async resolve(parent, args) {
    return await User.findById(args.id);
  },
};

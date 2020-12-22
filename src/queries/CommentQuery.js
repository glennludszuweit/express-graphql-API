import { GraphQLID, GraphQLList } from 'graphql';
import Comment from '../models/Comment.js';
import CommentType from '../types/CommentType.js';

export const getComments = {
  type: new GraphQLList(CommentType),
  description: 'Get all comments',
  async resolve() {
    return await Comment.find();
  },
};

export const getComment = {
  type: CommentType,
  description: 'Get one comment',
  args: { id: { type: GraphQLID } },
  async resolve(parent, args) {
    return await Comment.findById(args.id);
  },
};

import { GraphQLString } from 'graphql';
import Comment from '../models/Comment.js';
import CommentType from '../types/CommentType.js';

export const addComment = {
  type: CommentType,
  description: 'Add comment to post',
  args: {
    comment: { type: GraphQLString },
    postId: { type: GraphQLString },
  },
  async resolve(parent, args, { verifiedUser }) {
    const comment = new Comment({
      comment: args.comment,
      postId: args.postId,
      authorId: verifiedUser._id,
    });

    return await comment.save();
  },
};

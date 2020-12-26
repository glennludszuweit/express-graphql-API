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

export const updateComment = {
  type: CommentType,
  description: 'Update comment',
  args: {
    commentId: { type: GraphQLString },
    comment: { type: GraphQLString },
  },
  async resolve(parent, args, { verifiedUser }) {
    if (!verifiedUser) throw new Error('Unauthorized.');
    const comment = await Comment.findOneAndUpdate(
      { _id: args.commentId, authorId: verifiedUser._id },
      { comment: args.comment },
      { new: true, validators: true }
    );
    if (!comment) throw new Error('Comment not found');
    return comment;
  },
};

export const deleteComment = {
  type: GraphQLString,
  description: 'Delete comment',
  args: {
    commentId: { type: GraphQLString },
  },
  async resolve(parent, args, { verifiedUser }) {
    if (!verifiedUser) throw new Error('Unauthorized.');
    const comment = await Comment.findOneAndDelete({
      _id: args.commentId,
      authorId: verifiedUser._id,
    });
    if (!comment) throw new Error('Comment not found');
    return 'Comment Deleted';
  },
};

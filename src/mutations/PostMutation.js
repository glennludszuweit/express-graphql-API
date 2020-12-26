import { GraphQLString } from 'graphql';
import Post from '../models/Post.js';
import PostType from '../types/PostType.js';

export const addPost = {
  type: PostType,
  decription: 'Add new post',
  args: {
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
  async resolve(parent, args, { verifiedUser }) {
    if (!verifiedUser) {
      throw new Error('Unauthorized.');
    }
    const { title, body } = args;
    const post = new Post({
      title,
      body,
      authorId: verifiedUser._id,
    });

    return await post.save();
  },
};

export const updatePost = {
  type: PostType,
  description: 'Update post',
  args: {
    postId: { type: GraphQLString },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
  async resolve(parent, args, { verifiedUser }) {
    if (!verifiedUser) throw new Error('Unauthorized.');
    const { postId, title, body } = args;
    const post = await Post.findOneAndUpdate(
      { _id: postId, authorId: verifiedUser._id },
      { title, body },
      { new: true, validators: true }
    );
    if (!post) throw new Error('Post not found');
    return post;
  },
};

export const deletePost = {
  type: GraphQLString,
  description: 'Delete post',
  args: {
    postId: { type: GraphQLString },
  },
  async resolve(parent, args, { verifiedUser }) {
    if (!verifiedUser) throw new Error('Unauthorized.');
    const post = await Post.findOneAndDelete({
      _id: args.postId,
      authorId: verifiedUser._id,
    });
    if (!post) throw new Error('Post not found');
    return 'Post Deleted';
  },
};

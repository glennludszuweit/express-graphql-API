import { GraphQLString } from 'graphql';
import Post from '../models/Post.js';
import PostType from '../types/PostType.js';

export const addPost = {
  type: PostType,
  decription: 'Add new post',
  args: {
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  },
  async resolve(parent, args, { verifiedUser }) {
    if (!verifiedUser) {
      throw new Error('Unauthorized.');
    }
    const { title, content } = args;
    const post = new Post({
      title,
      content,
      authorId: verifiedUser._id,
    });

    return await post.save();
  },
};

export const updatePost = {
  type: PostType,
  description: 'Update post',
  args: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  },
  async resolve(parent, args, { verifiedUser }) {
    if (!verifiedUser) throw new Error('Unauthorized.');
    const { id, title, content } = args;
    const post = await Post.findOneAndUpdate(
      { _id: id, authorId: verifiedUser._id },
      { title, content },
      { new: true, validators: true }
    );
    if (!post) throw new Error('Post not found');
    return post;
  },
};

export const deletePost = {
  type: PostType,
  description: 'Update post',
  args: {
    id: { type: GraphQLString },
  },
  async resolve(parent, args, { verifiedUser }) {
    if (!verifiedUser) throw new Error('Unauthorized.');
    const { id, title, content } = args;
    const post = await Post.findOneAndDelete({
      _id: id,
      authorId: verifiedUser._id,
    });
    if (!post) throw new Error('Post not found');
    return post;
  },
};

import { GraphQLID, GraphQLList } from 'graphql';
import Post from '../models/Post.js';
import PostType from '../types/PostType.js';

export const getPosts = {
  type: new GraphQLList(PostType),
  description: 'Get all posts',
  async resolve() {
    return await Post.find();
  },
};

export const getPost = {
  type: PostType,
  description: 'Get one post',
  args: { id: { type: GraphQLID } },
  async resolve(parent, args) {
    return await Post.findById(args.id);
  },
};

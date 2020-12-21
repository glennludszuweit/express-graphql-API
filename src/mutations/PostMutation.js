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
    console.log(verifiedUser);
    if (!verifiedUser) {
      throw new Error('Unauthorized.');
    }
    const { title, content } = args;
    const post = new Post({
      title,
      content,
      authorId: verifiedUser.user._id,
    });

    await post.save();
  },
};

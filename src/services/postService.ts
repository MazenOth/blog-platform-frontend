import axios from 'axios';
import { Post } from '@/types/types';
import { API_BASE_URL, LOCAL_API_BASE_URL } from '@/config/api';

export const blogPostService = {
  async getAll(
    search?: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{ posts: Post[]; totalPosts: number }> {
    try {
      const params = new URLSearchParams();

      if (search) params.append('search', search);
      params.append('page', page.toString());
      params.append('limit', limit.toString());

      const response = await axios.get<{
        posts: Post[];
        totalPosts: number;
      }>(`${API_BASE_URL}/posts?${params.toString()}`);

      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch blog posts. Please try again later.');
    }
  },

  async getById(id: string): Promise<Post> {
    try {
      const response = await axios.get<Post>(
        `${API_BASE_URL}/posts/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        'Failed to fetch blog post details. Please try again later.'
      );
    }
  },

  async create(post: Omit<Post, 'id'>): Promise<Post> {
    try {
      const response = await axios.post<Post>(
        `${LOCAL_API_BASE_URL}/posts`,
        post,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to create blog post. Please try again later.');
    }
  },
};

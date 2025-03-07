import axios from 'axios';
import { API_BASE_URL, LOCAL_API_BASE_URL } from '@/config/api';
import { Author } from '@/types/types';

export const authorService = {
  async getAll(): Promise<Author[]> {
    try {
      const response = await axios.get<Author[]>(
        `${LOCAL_API_BASE_URL}/authors`
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch authors. Please try again later.');
    }
  },

  async getById(id: string): Promise<Author> {
    try {
      const response = await axios.get<Author>(`${API_BASE_URL}/authors/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        'Failed to fetch author details. Please try again later.'
      );
    }
  },

  async create(author: Omit<Author, 'id'>): Promise<Author> {
    try {
      const response = await axios.post<Author>(
        `${LOCAL_API_BASE_URL}/authors`,
        author,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          'Error creating author:',
          error.response?.data || error.message
        );
      } else {
        console.error('Unexpected error:', error);
      }
      throw new Error('Failed to create author. Please try again later.');
    }
  },
};

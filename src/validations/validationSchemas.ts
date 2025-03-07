import * as yup from 'yup';

export const authorSchema = yup.object().shape({
  name: yup
    .string()
    .required('Author name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name must be at most 100 characters'),

  bio: yup
    .string()
    .required('Bio is required')
    .min(10, 'Bio must be at least 10 characters')
    .max(500, 'Bio must be at most 500 characters'),
});

export const blogPostSchema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .min(5, 'Title must be at least 5 characters')
    .max(150, 'Title must be at most 150 characters'),

  content: yup
    .string()
    .required('Content is required')
    .min(50, 'Content must be at least 50 characters')
    .max(5000, 'Content must be at most 5000 characters'),

  authorId: yup
    .number()
    .required('Author is required')
    .typeError('Invalid author ID'),
});

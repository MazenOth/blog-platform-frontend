'use client';

import { Box, Input, Button, Textarea } from '@chakra-ui/react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { useRouter } from 'next/navigation';
import { blogPostService } from '@/services/postService';
import { ROUTES } from '@/config/routes';
import ProjectSelect from '@/components/authors/AuthorDropdown';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { blogPostSchema } from '@/validations/validationSchemas';

export default function AddPost() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(blogPostSchema),
  });

  const onSubmit = async (data: any) => {
    await blogPostService.create(data);
    router.push(ROUTES.home);
  };

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb={4} isInvalid={!!errors.authorId}>
          <FormLabel>Author</FormLabel>
          <ProjectSelect
            onSelect={(authorId) => setValue('authorId', authorId)}
          />
          <FormErrorMessage>{errors.authorId?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mb={4} isInvalid={!!errors.title}>
          <FormLabel>Title</FormLabel>
          <Input {...register('title')} />
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mb={4} isInvalid={!!errors.content}>
          <FormLabel>Content</FormLabel>
          <Textarea {...register('content')} />
          <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
        </FormControl>

        <Button type='submit'>Add Blog Post</Button>
      </form>
    </Box>
  );
}

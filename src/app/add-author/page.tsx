'use client';

import { Box, Input, Button, Textarea } from '@chakra-ui/react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { useRouter } from 'next/navigation';
import { authorService } from '@/services/authorService';
import { ROUTES } from '@/config/routes';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { authorSchema } from '@/validations/validationSchemas';

export default function AddAuthor() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(authorSchema),
  });

  const onSubmit = async (data: any) => {
    await authorService.create(data);
    router.push(ROUTES.home);
  };

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb={4} isInvalid={!!errors.name}>
          <FormLabel>Author Name</FormLabel>
          <Input {...register('name')} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mb={4} isInvalid={!!errors.bio}>
          <FormLabel>Bio</FormLabel>
          <Input {...register('bio')} />
          <FormErrorMessage>{errors.bio?.message}</FormErrorMessage>
        </FormControl>

        <Button type='submit'>Add Author</Button>
      </form>
    </Box>
  );
}

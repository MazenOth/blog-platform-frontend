'use client';

import { Box, Text, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { Post } from '@/types/types';
import { ROUTES } from '@/config/routes';

interface PostCardProps {
  post: Post;
}

export default function BlogPostCard({ post }: PostCardProps) {
  return (
    <Box borderWidth='1px' borderRadius='lg' p={4}>
      <Text fontSize='xl' fontWeight='bold'>
        {post.title}
      </Text>
      <Text color='gray.600'>By {post.authorName}</Text>
      <Link href={ROUTES.postsDetails(post.id)}>
        <Button mt={2} colorScheme='blue'>
          Read More
        </Button>
      </Link>
    </Box>
  );
}

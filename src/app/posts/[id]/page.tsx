import { Box, Text, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { blogPostService } from '@/services/postService';
import { ROUTES } from '@/config/routes';

interface PostDetailsProps {
  params: {
    id: string;
  };
}

export default async function ApartmentDetails({ params }: PostDetailsProps) {
  const post = await blogPostService.getById(params.id);

  return (
    <Box p={4}>
      <Text fontSize='2xl'>{post.title}</Text>
      <Text>Author: {post.authorName}</Text>
      <Text>Created At: {post.createdAt} </Text>
      <Text>Content: {post.content}</Text>
      <Link href={ROUTES.home}>
        <Button mt={4} colorScheme='teal'>
          Back to Listings
        </Button>
      </Link>
    </Box>
  );
}

import {
  Box,
  Grid,
  Button,
  Input,
  Flex,
  Spinner,
  Heading,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import PostCard from '@/components/posts/PostCard';
import Link from 'next/link';
import { blogPostService } from '@/services/postService';
import { ROUTES } from '@/config/routes';
import { redirect } from 'next/navigation';

const POSTS_PER_PAGE = 3;

async function handleSearch(formData: FormData) {
  'use server';
  const query = formData.get('search') as string;
  redirect(`?search=${encodeURIComponent(query)}`);
}

async function handlePagination(formData: FormData) {
  'use server';
  const page = formData.get('page') as string;
  redirect(`?page=${page}`);
}

interface HomeProps {
  searchParams: { search?: string; page?: string };
}

export default async function Home({ searchParams }: HomeProps) {
  const searchQuery = searchParams.search || '';
  const currentPage = Number(searchParams.page) || 1;

  const { posts, totalPosts } = await blogPostService.getAll(
    searchQuery,
    currentPage,
    POSTS_PER_PAGE
  );

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <Box p={4}>
      <Link href={ROUTES.home}>
        <Heading mb={4}>All Blog Posts</Heading>
      </Link>

      {/* Search Form */}
      <form action={handleSearch}>
        <Flex mb={4} gap={2}>
          <Input
            name='search'
            placeholder='Search...'
            defaultValue={searchQuery}
          />
          <Button type='submit' colorScheme='teal'>
            Search
          </Button>
        </Flex>
      </form>
      <Flex
        mb={4}
        gap={2}
        flexDirection={{ base: 'column', md: 'row' }}
        align={{ base: 'stretch', md: 'center' }}
      >
        <Link href={ROUTES.addPost}>
          <Button colorScheme='teal' w='full'>
            Add Blog Post
          </Button>
        </Link>
        <Link href={ROUTES.addAuthor}>
          <Button colorScheme='teal' w='full'>
            Add Author
          </Button>
        </Link>
      </Flex>
      {posts.length === 0 ? (
        <Box>No posts found.</Box>
      ) : (
        <Grid
          templateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          }}
          gap={6}
        >
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </Grid>
      )}

      {/* Pagination Form */}
      {totalPages > 1 && (
        <Wrap justify='center' mt={4} gap={2}>
          {Array.from({ length: totalPages }, (_, i) => (
            <WrapItem key={i + 1}>
              <form action={handlePagination}>
                <input type='hidden' name='page' value={i + 1} />
                <Button
                  type='submit'
                  colorScheme={i + 1 === currentPage ? 'blue' : 'gray'}
                >
                  {i + 1}
                </Button>
              </form>
            </WrapItem>
          ))}
        </Wrap>
      )}
    </Box>
  );
}

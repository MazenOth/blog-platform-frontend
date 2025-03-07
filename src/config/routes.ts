export const ROUTES = {
  home: '/',
  addPost: '/add-post',
  addAuthor: '/add-author',
  postsDetails: (id: number) => `/posts/${String(id)}`,
};

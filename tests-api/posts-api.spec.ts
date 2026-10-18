
import { test, expect } from '@playwright/test';
import { PostsApi } from '../api/PostsApi';

test('GET /posts/1 returns a valid post', async ({ request }) => {
  const postsApi = new PostsApi(request);
  const response = await postsApi.getPost(1);

  expect(response.status()).toBe(200);

  const post = await response.json();

  expect(post).toMatchObject({
    userId: 1,
    id: 1,
  });
  expect(post.title).toEqual(expect.any(String));
  expect(post.title.length).toBeGreaterThan(0);
  expect(post.body).toEqual(expect.any(String));
  expect(post.body.length).toBeGreaterThan(0);
});

test('GET /posts returns a collection of posts', async ({ request }) => {
  const postsApi = new PostsApi(request);
  const response = await postsApi.getPosts();

  expect(response.status()).toBe(200);

  const posts = await response.json();

  expect(Array.isArray(posts)).toBe(true);
  expect(posts.length).toBeGreaterThan(0);
  expect(posts[0]).toMatchObject({
    userId: expect.any(Number),
    id: expect.any(Number),
    title: expect.any(String),
    body: expect.any(String),
  });
});

test('GET /posts/999999 returns 404 for a nonexistent post', async ({ request }) => {
  const postsApi = new PostsApi(request);
  const response = await postsApi.getPost(999999);

  expect(response.status()).toBe(404);
});

test('GET /posts returns a JSON content type', async ({ request }) => {
  const postsApi = new PostsApi(request);
  const response = await postsApi.getPosts();

  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/json');
});

test('GET /posts?userId=1 returns only posts for that user', async ({ request }) => {
  const postsApi = new PostsApi(request);
  const response = await postsApi.getPostsByUser(1);

  expect(response.status()).toBe(200);

  const posts = await response.json();

  expect(Array.isArray(posts)).toBe(true);
  expect(posts.length).toBeGreaterThan(0);

  for (const post of posts) {
    expect(post.userId).toBe(1);
  }
});

test('POST /posts creates a post and returns the submitted data', async ({ request }) => {
  const postsApi = new PostsApi(request);

  const newPost = {
    title: 'Playwright API testing',
    body: 'Testing POST requests with Playwright and TypeScript',
    userId: 1,
  };

  const response = await postsApi.createPost(
    newPost.title,
    newPost.body,
    newPost.userId,
  );

  expect(response.status()).toBe(201);

  const createdPost = await response.json();

  expect(createdPost).toMatchObject(newPost);
  expect(createdPost.id).toEqual(expect.any(Number));
});


import { test, expect } from '@playwright/test';

const apiBaseUrl = 'https://jsonplaceholder.typicode.com';

test('GET /posts/1 returns a valid post', async ({ request }) => {
  const response = await request.get(`${apiBaseUrl}/posts/1`);

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
  const response = await request.get(`${apiBaseUrl}/posts`);

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
  const response = await request.get(`${apiBaseUrl}/posts/999999`);

  expect(response.status()).toBe(404);
});


import {
  type APIRequestContext,
  type APIResponse,
} from '@playwright/test';

export class PostsApi {
  private readonly request: APIRequestContext;
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getPost(postId: number): Promise<APIResponse> {
    return this.request.get(`${this.baseUrl}/posts/${postId}`);
  }

  async getPosts(): Promise<APIResponse> {
    return this.request.get(`${this.baseUrl}/posts`);
  }

  async getPostsByUser(userId: number): Promise<APIResponse> {
    return this.request.get(`${this.baseUrl}/posts`, {
      params: { userId },
    });
  }

  async createPost(title: string, body: string, userId: number): Promise<APIResponse> {
    return this.request.post(`${this.baseUrl}/posts`, {
      data: { title, body, userId },
    });
  }
}

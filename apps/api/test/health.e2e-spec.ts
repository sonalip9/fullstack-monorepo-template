import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import type { HealthResponse } from '@template/types';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { AppModule } from '../src/app.module.js';

describe('GET /health', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns a HealthResponse', async () => {
    const response = await request(app.getHttpServer()).get('/health').expect(200);
    const body = response.body as HealthResponse;

    expect(body.status).toBe('ok');
    expect(Number.isNaN(Date.parse(body.timestamp))).toBe(false);
  });
});

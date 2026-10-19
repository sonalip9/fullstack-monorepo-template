import { describe, expect, it } from 'vitest';
import { HealthController } from './health.controller.js';

describe('HealthController', () => {
  it('reports status ok with an ISO timestamp', () => {
    const result = new HealthController().check();

    expect(result.status).toBe('ok');
    expect(new Date(result.timestamp).toISOString()).toBe(result.timestamp);
  });
});

export interface EnvironmentConfig {
  baseURL: string;
  testTimeoutMs: number;
  expectTimeoutMs: number;
  retries: number;
}

export function isEnvironmentConfig(value: unknown): value is EnvironmentConfig {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return typeof candidate.baseURL === 'string'
    && typeof candidate.testTimeoutMs === 'number'
    && typeof candidate.expectTimeoutMs === 'number'
    && typeof candidate.retries === 'number';
}

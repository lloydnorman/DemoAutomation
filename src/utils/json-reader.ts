import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export function readJsonFile<T>(
  relativePath: string,
  isExpectedType: (value: unknown) => value is T,
): T {
  const filePath = resolve(process.cwd(), relativePath);
  let parsed: unknown;

  try {
    parsed = JSON.parse(readFileSync(filePath, 'utf8')) as unknown;
  } catch (error) {
    throw new Error(`Unable to read JSON file at ${filePath}`, { cause: error });
  }

  if (!isExpectedType(parsed)) {
    throw new Error(`JSON file has an invalid shape: ${filePath}`);
  }

  return parsed;
}

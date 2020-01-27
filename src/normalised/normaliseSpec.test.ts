import 'jest';
import { normaliseSpec } from './normaliseSpec';
import { getLatestSpec } from '../getLatestSpec';

describe('normaliseSpec', () => {
  it('passes the smoke test', async () => {
    const spec = await getLatestSpec();
    const norm = normaliseSpec(spec);

    expect(norm).toBeTruthy();
  });
});

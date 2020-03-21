import 'jest';
import { getLatestSpec, DefaultSpecUrl } from '.';
import { validateCloudFormationSpec } from './CloudFormationSpec';
import { ValidationMode } from '@fmtk/validation';

describe('getLatestSpec', () => {
  it('it validates the current spec without failing', async () => {
    const spec = await getLatestSpec(DefaultSpecUrl, false);
    const result = validateCloudFormationSpec({
      value: spec,
      mode: ValidationMode.Strict,
    });

    expect(result.ok).toBeTruthy();
  });
});

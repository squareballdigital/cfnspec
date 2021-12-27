import { ExtraFields } from '@fmtk/decoders';
import 'jest';
import { DefaultSpecUrl, getLatestSpec } from '.';
import { decodeCloudFormationSpec } from './CloudFormationSpec';

describe('getLatestSpec', () => {
  it('it validates the current spec without failing', async () => {
    const spec = await getLatestSpec(DefaultSpecUrl, false);
    const result = decodeCloudFormationSpec(spec, {
      extraFields: ExtraFields.Reject,
    });

    expect(result.ok).toBeTruthy();
  });
});

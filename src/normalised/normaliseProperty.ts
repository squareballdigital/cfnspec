import { UpdateType } from '../model/UpdateType';
import { DataTypeCommonSpec, normaliseDataType } from './normaliseDataType';
import { PropertyDefinition } from './PropertyDefinition';

export interface PropertyCommonSpec extends DataTypeCommonSpec {
  Documentation?: string;
  Required?: boolean;
  UpdateType?: UpdateType;
}

export function normaliseProperty(
  name: string,
  spec: PropertyCommonSpec,
  namespace: string,
): PropertyDefinition {
  const type = normaliseDataType(spec, namespace);
  if (!type) {
    throw new Error(`can't determine type of property ${namespace}.${name}`);
  }
  return {
    type,
    name,
    documentation: spec.Documentation,
    required: spec.Required,
    updateType: spec.UpdateType,
  };
}

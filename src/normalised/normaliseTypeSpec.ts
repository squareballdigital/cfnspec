import { TypeDefinition, TypeDefinitionKind } from './TypeDefinition';
import { PrimitiveType } from '../model/PrimitiveType';
import { StringMap } from '../model/StringMap';
import { TypeName } from './TypeName';
import { TypeSource } from './TypeSource';
import { PropertyCommonSpec, normaliseProperty } from './normaliseProperty';
import { normaliseDataType } from './normaliseDataType';
import { NameResolver } from './NameResolver';

export interface TypeDefCommonSpec {
  AdditionalProperties?: boolean;
  Documentation?: string;
  DuplicatesAllowed?: boolean;
  ItemType?: string;
  PrimitiveItemType?: PrimitiveType;
  PrimitiveType?: PrimitiveType;
  Properties?: StringMap<PropertyCommonSpec>;
  Required?: boolean;
  Type?: string;
}

export function normaliseTypeSpec(
  name: TypeName,
  spec: TypeDefCommonSpec,
  source: TypeSource,
  resolve: NameResolver,
): TypeDefinition {
  if (spec.Properties) {
    return {
      documentation: spec.Documentation,
      name: name.name,
      properties: Object.entries(spec.Properties).map(([propName, prop]) =>
        normaliseProperty(propName, prop, name.namespace || name.name, resolve),
      ),
      source,
      kind: TypeDefinitionKind.Object,
      namespace: name.namespace,
      ...(spec.AdditionalProperties ? { allowExtraProperties: true } : {}),
    };
  } else {
    const dataType = normaliseDataType(
      spec,
      name.namespace || name.name,
      resolve,
    );
    if (!dataType) {
      return {
        kind: TypeDefinitionKind.Empty,
        name: name.name,
        namespace: name.namespace,
        source,
        documentation: spec.Documentation,
      };
    }
    return {
      kind: TypeDefinitionKind.Simple,
      type: dataType,
      name: name.name,
      namespace: name.namespace,
      source,
      documentation: spec.Documentation,
    };
  }
}

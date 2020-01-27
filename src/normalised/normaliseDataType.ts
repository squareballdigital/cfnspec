import { PrimitiveType } from '../model/PrimitiveType';
import { DataTypeKind, DataType, DataTypeRef } from './DataType';
import { NameResolver } from './NameResolver';

export interface DataTypeCommonSpec {
  DuplicatesAllowed?: boolean;
  ItemType?: string;
  PrimitiveItemType?: PrimitiveType;
  PrimitiveType?: PrimitiveType;
  Type?: string;
}

export function normaliseDataType(
  spec: DataTypeCommonSpec,
  namespace: string,
  resolve: NameResolver,
): DataType | undefined {
  let typeKind: DataTypeKind;

  if (spec.Type === 'List') {
    typeKind = DataTypeKind.List;
  } else if (spec.Type === 'Map') {
    typeKind = DataTypeKind.Map;
  } else {
    typeKind = DataTypeKind.Scalar;
  }

  let typeRef: DataTypeRef | undefined;

  if (typeKind === DataTypeKind.Scalar) {
    if (spec.PrimitiveType) {
      typeRef = {
        isPrimitive: true,
        name: spec.PrimitiveType,
      };
    } else if (spec.Type) {
      typeRef = {
        isPrimitive: false,
        ...resolve({ name: spec.Type, namespace }),
      };
    }
  } else {
    if (spec.PrimitiveItemType) {
      typeRef = {
        isPrimitive: true,
        name: spec.PrimitiveItemType,
      };
    } else if (spec.ItemType) {
      typeRef = {
        isPrimitive: false,
        ...resolve({ name: spec.ItemType, namespace }),
      };
    }
  }

  if (!typeRef) {
    return;
  }

  if (typeKind === DataTypeKind.List) {
    return {
      kind: typeKind,
      type: typeRef,
      unique: !spec.DuplicatesAllowed,
    };
  }
  return {
    kind: typeKind,
    type: typeRef,
  };
}

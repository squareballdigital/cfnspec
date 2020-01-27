import { PrimitiveType } from '../model/PrimitiveType';

export interface PrimitiveDataTypeRef {
  isPrimitive: true;
  name: PrimitiveType;
}

export interface NonPrimitiveDataTypeRef {
  isPrimitive: false;
  name: string;
  namespace?: string;
}

export type DataTypeRef = PrimitiveDataTypeRef | NonPrimitiveDataTypeRef;

export enum DataTypeKind {
  Scalar = 'scalar',
  List = 'list',
  Map = 'map',
}

export interface NonListDataType {
  kind: DataTypeKind.Scalar | DataTypeKind.Map;
  type: DataTypeRef;
}

export interface ListDataType {
  kind: DataTypeKind.List;
  type: DataTypeRef;
  unique?: boolean;
}

export type DataType = NonListDataType | ListDataType;

import { DataType } from './DataType';
import { PropertyDefinition } from './PropertyDefinition';
import { TypeSource } from './TypeSource';

export enum TypeDefinitionKind {
  Simple = 'simple',
  Object = 'object',
  Empty = 'empty',
}

export interface TypeDefinitionCommon {
  documentation?: string;
  name: string;
  namespace?: string;
  source: TypeSource;
}

export interface SimpleTypeDefinition extends TypeDefinitionCommon {
  kind: TypeDefinitionKind.Simple;
  type: DataType;
}

export interface ObjectTypeDefinition extends TypeDefinitionCommon {
  kind: TypeDefinitionKind.Object;
  allowExtraProperties?: boolean;
  properties: PropertyDefinition[];
}

export interface EmptyTypeDefinition extends TypeDefinitionCommon {
  kind: TypeDefinitionKind.Empty;
}

export type TypeDefinition =
  | SimpleTypeDefinition
  | ObjectTypeDefinition
  | EmptyTypeDefinition;

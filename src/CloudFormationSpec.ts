import {
  boolean,
  enumValue,
  object,
  optional,
  record,
  string,
  text,
} from '@fmtk/decoders';

export enum PrimitiveType {
  String = 'String',
  Long = 'Long',
  Integer = 'Integer',
  Double = 'Double',
  Boolean = 'Boolean',
  Timestamp = 'Timestamp',
  Json = 'Json',
}

export enum UpdateType {
  Mutable = 'Mutable',
  Immutable = 'Immutable',
  Conditional = 'Conditional',
}

export interface Dictionary<T> {
  [key: string]: T;
}

export interface TypeDefinition {
  AdditionalProperties?: boolean;
  Documentation?: string;
  DuplicatesAllowed?: boolean;
  ItemType?: string;
  PrimitiveItemType?: PrimitiveType;
  PrimitiveType?: PrimitiveType;
  Properties?: Dictionary<TypeDefinition>;
  Required?: boolean;
  Type?: string;
  UpdateType?: UpdateType;
}

export interface ResourceDefinition extends TypeDefinition {
  Attributes?: Dictionary<TypeDefinition>;
}

export interface CloudFormationSpec {
  PropertyTypes: Dictionary<TypeDefinition>;
  ResourceSpecificationVersion: string;
  ResourceTypes: Dictionary<ResourceDefinition>;
}

export const decodePrimitiveType = enumValue(PrimitiveType);
export const decodeUpdateType = enumValue(UpdateType);

const typeDefinitionModel = {
  AdditionalProperties: optional(boolean),
  Documentation: optional(string),
  DuplicatesAllowed: optional(boolean),
  ItemType: optional(string),
  PrimitiveItemType: optional(decodePrimitiveType),
  PrimitiveType: optional(decodePrimitiveType),
  Required: optional(boolean),
  Type: optional(string),
  UpdateType: optional(decodeUpdateType),
};

export const decodeTypeDefinition = object<TypeDefinition>({
  ...typeDefinitionModel,
  Properties: optional(record(text, object(typeDefinitionModel))),
});

export const decodeResourceDefinition = object<ResourceDefinition>({
  ...typeDefinitionModel,
  Attributes: optional(record(text, object(typeDefinitionModel))),
  Properties: optional(record(text, object(typeDefinitionModel))),
});

export const decodeCloudFormationSpec = object<CloudFormationSpec>({
  PropertyTypes: record(text, decodeTypeDefinition),
  ResourceSpecificationVersion: string,
  ResourceTypes: record(text, decodeResourceDefinition),
});

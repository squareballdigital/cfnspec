import {
  is,
  properties,
  optional,
  bool,
  text,
  dictionary,
} from '@fmtk/validation';

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

export const validatePrimitiveType = is(...Object.values(PrimitiveType));
export const validateUpdateType = is(...Object.values(UpdateType));

const typeDefinitionModel = {
  AdditionalProperties: optional(bool()),
  Documentation: optional(text()),
  DuplicatesAllowed: optional(bool()),
  ItemType: optional(text()),
  PrimitiveItemType: optional(validatePrimitiveType),
  PrimitiveType: optional(validatePrimitiveType),
  Required: optional(bool()),
  Type: optional(text()),
  UpdateType: optional(validateUpdateType),
};

export const validateTypeDefinition = properties<TypeDefinition>({
  ...typeDefinitionModel,
  Properties: optional(dictionary(properties(typeDefinitionModel))),
});

export const validateResourceDefinition = properties<ResourceDefinition>({
  ...typeDefinitionModel,
  Attributes: optional(dictionary(properties(typeDefinitionModel))),
  Properties: optional(dictionary(properties(typeDefinitionModel))),
});

export const validateCloudFormationSpec = properties<CloudFormationSpec>({
  PropertyTypes: dictionary(validateTypeDefinition),
  ResourceSpecificationVersion: text(),
  ResourceTypes: dictionary(validateResourceDefinition),
});

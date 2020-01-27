import { CfnSpecification } from '../model/CfnSpecification';
import { TypeDefinition } from './TypeDefinition';
import { TypeSource } from './TypeSource';
import { normaliseTypeSpec } from './normaliseTypeSpec';
import { parseTypeName } from './TypeName';
import { StringMap } from '../model/StringMap';
import { AttributeSpecification } from '../model/AttributeSpecification';

export function normaliseSpec(spec: CfnSpecification): TypeDefinition[] {
  const propTypes = Object.entries(spec.PropertyTypes).map(([name, propSpec]) =>
    normaliseTypeSpec(parseTypeName(name), propSpec, TypeSource.PropertyType),
  );

  const resourceTypes = Object.entries(
    spec.ResourceTypes,
  ).map(([name, resourceSpec]) =>
    normaliseTypeSpec({ name }, resourceSpec, TypeSource.ResourceType),
  );

  const attribTypes = Object.entries(spec.ResourceTypes)
    .filter(([, resourceSpec]) => resourceSpec.Attributes)
    .map(([name, resourceSpec]) =>
      normaliseTypeSpec(
        { name: 'Attributes', namespace: name },
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        { Properties: escapeAttribs(resourceSpec.Attributes!) },
        TypeSource.AttributeType,
      ),
    );

  return [...propTypes, ...resourceTypes, ...attribTypes].sort((a, b) =>
    a.name > b.name ? 1 : a.name === b.name ? 0 : -1,
  );
}

function escapeAttribs(
  spec: StringMap<AttributeSpecification>,
): StringMap<AttributeSpecification> {
  return Object.entries(spec).reduce(
    (a, [k, v]) => ({ ...a, [escapeName(k)]: v }),
    {},
  );
}

function escapeName(name: string): string {
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) {
    return `"${name}"`;
  }
  return name;
}

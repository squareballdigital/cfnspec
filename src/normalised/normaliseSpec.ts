import { CfnSpecification } from '../model/CfnSpecification';
import { TypeDefinition } from './TypeDefinition';
import { TypeSource } from './TypeSource';
import { normaliseTypeSpec } from './normaliseTypeSpec';
import { parseTypeName } from './TypeName';
import { makeResolver } from './NameResolver';

export function normaliseSpec(spec: CfnSpecification): TypeDefinition[] {
  const resolve = makeResolver(spec);

  const propTypes = Object.entries(spec.PropertyTypes).map(([name, propSpec]) =>
    normaliseTypeSpec(
      parseTypeName(name),
      propSpec,
      TypeSource.PropertyType,
      resolve,
    ),
  );

  const resourceTypes = Object.entries(
    spec.ResourceTypes,
  ).map(([name, resourceSpec]) =>
    normaliseTypeSpec({ name }, resourceSpec, TypeSource.ResourceType, resolve),
  );

  const attribTypes = Object.entries(spec.ResourceTypes)
    .filter(([, resourceSpec]) => resourceSpec.Attributes)
    .map(([name, resourceSpec]) =>
      normaliseTypeSpec(
        { name: 'Attributes', namespace: name },
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        { Properties: resourceSpec.Attributes! },
        TypeSource.AttributeType,
        resolve,
      ),
    );

  return [...propTypes, ...resourceTypes, ...attribTypes].sort((a, b) =>
    a.name > b.name ? 1 : a.name === b.name ? 0 : -1,
  );
}

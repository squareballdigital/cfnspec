import { CfnSpecification } from '../model/CfnSpecification';
import { TypeName } from './TypeName';

export interface NameResolver {
  (name: TypeName): TypeName;
}

export function makeResolver(spec: CfnSpecification): NameResolver {
  return (name: TypeName): TypeName => {
    if (name.namespace) {
      if (`${name.namespace}.${name.name}` in spec.PropertyTypes) {
        return name;
      }
    }

    if (name.name in spec.PropertyTypes) {
      return { name: name.name };
    }

    throw new Error(
      `can't resolve name ${name.name} ` +
        `from namespace ${name.namespace || 'global'}`,
    );
  };
}

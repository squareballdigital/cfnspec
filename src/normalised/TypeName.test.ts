import 'jest';
import { parseTypeName } from './TypeName';

describe('parseTypeName', () => {
  it('correctly parses a namespaced name', () => {
    const name = parseTypeName('AWS::Lambda::Function.LogRetention');
    expect(name.name).toEqual('LogRetention');
    expect(name.namespace).toEqual('AWS::Lambda::Function');
  });

  it('correctly parses an un-namespaced name', () => {
    const name = parseTypeName('LogRetention');
    expect(name.name).toEqual('LogRetention');
    expect(name.namespace).toBeUndefined();
  });
});

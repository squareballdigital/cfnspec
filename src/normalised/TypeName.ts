export interface TypeName {
  name: string;
  namespace?: string;
}

export function parseTypeName(name: string): TypeName {
  const i = name.lastIndexOf('.');

  if (i < 0) {
    return { name };
  }
  return { namespace: name.substring(0, i), name: name.substring(i + 1) };
}

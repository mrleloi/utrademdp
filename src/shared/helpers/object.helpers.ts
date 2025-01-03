export function pickProps<TType extends object>(
  source: TType,
  keys: (keyof TType)[],
): { [k in keyof TType]: TType[k] } {
  const target: any = {};
  keys.forEach((key) => {
    target[key] = source[key];
  });
  return target;
}

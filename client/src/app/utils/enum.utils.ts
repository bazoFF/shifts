export function getAllEnumValues(enumType: {}): number[] {
  const values: number[] = [];
  const keys = Object.keys(enumType);
  for (const key of keys.slice(0, keys.length / 2)) {
    values.push(<number>+key);
  }
  return values;
}

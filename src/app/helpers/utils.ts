export function unfreezeObject(value: any): any {
  return JSON.parse(JSON.stringify(value));
}

export function isEmpty(value: unknown): boolean {
  return (
    value === undefined ||
    value === null ||
    value === 'undefined' ||
    value === 'null' ||
    Number.isNaN(value) ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
}

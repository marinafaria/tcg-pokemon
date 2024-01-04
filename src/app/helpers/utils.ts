export function unfreezeObject(value: any): any {
  return JSON.parse(JSON.stringify(value));
}

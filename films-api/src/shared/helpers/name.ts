export function getFullName<T extends { firstName: string; lastName: string }>(
  person: T,
): string {
  return `${person.firstName} ${person.lastName}`;
}

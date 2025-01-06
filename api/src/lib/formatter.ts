export enum DocumentType {
  delivery,
  invoice,
}

export function documentIdFormatter(
  type: DocumentType,
  value: number,
  year: number
) {
  const numbers = `${year}-${`00000${value}`.slice(-5)}`;

  if (type === DocumentType.delivery) {
    return `BL-${numbers}`;
  } else if (type === DocumentType.invoice) {
    return `FA-${numbers}`;
  } else return "";
}

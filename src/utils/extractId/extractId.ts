interface ObjectWithId {
  id: string;
}

export default function extractId(idOrObject: string | number | ObjectWithId): string {
  if (typeof idOrObject === 'string') {
    return idOrObject;
  }

  if (typeof idOrObject === 'number') {
    return idOrObject.toString();
  }

  const { id } = idOrObject;

  if (!id) {
    throw new Error('No id property found on input');
  }

  return id;
}

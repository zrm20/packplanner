export default function extractId(idOrObject) {
  const type = typeof idOrObject;
  if (type === 'string' || type === 'number') {
    return idOrObject;
  };

  if (type !== 'object') {
    throw new Error("Invalid argument. extractId requires a string, number, or object");
  };

  const { id } = idOrObject;

  if (!id) {
    throw new Error("No id property found on input");
  };

  return id;
};
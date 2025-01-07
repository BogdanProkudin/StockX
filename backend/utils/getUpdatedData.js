export default function getUpdatedFields(originalData, updatedData) {
  const updatedFields = {};

  for (const key in originalData) {
    if (originalData[key] !== updatedData[key]) {
      updatedFields[key] = updatedData[key];
    }
  }

  return updatedFields;
}

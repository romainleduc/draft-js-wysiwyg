// Determine if the toggle button value matches, or is contained in, the
// candidate group value.
const isValueSelected = (
  value?: string,
  candidate?: string | string[]
): boolean => {
  if (candidate === undefined || value === undefined) {
    return false;
  }

  if (Array.isArray(candidate)) {
    return candidate.indexOf(value) >= 0;
  }

  return value === candidate;
};

export default isValueSelected;

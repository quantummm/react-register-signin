import isEmail from "validator/lib/isEmail";
import equals from "validator/lib/equals";

export function email(value) {
  return value && !isEmail(value.trim()) ? "Invalid email" : null;
}

export function passwordConfirmCheck(password, confirmedPassword) {
  if (!equals(confirmedPassword, password)) {
    return "Your Password doesn't match";
  }
}

function isDirty(value) {
  return value || value === 0;
}
//如果有值，则undefined，就是没有key，如果没有值就返回"Required"
export function required(requiredFields, values) {
  return requiredFields.reduce(
    (fields, field) => ({
      ...fields,
      ...(isDirty(values[field]) ? undefined : { [field]: "Required" }),
    }),
    {}
  );
}

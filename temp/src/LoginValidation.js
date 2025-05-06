function Validation(values) {
  let errors = {};  // Naming the object as errors is more intuitive.

  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  // Validate email
  if (!values.email) {
    errors.email = "Email should not be empty";  // Correct error message
  } else if (!email_pattern.test(values.email)) {
    errors.email = "Email didn't match the required pattern";
  }

  // Validate password
  if (!values.password) {
    errors.password = "Password should not be empty";  // Correct error message
  } else if (!password_pattern.test(values.password)) {
    errors.password = "Password must contain at least 1 digit, 1 lowercase letter, 1 uppercase letter, and be 8 characters long";
  }

  return errors;
}

export default Validation;

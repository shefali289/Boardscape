const RegisterInputValidators = (
  email,
  password,
  confirmPassword,
) => {
  const errors = {};

  // check if the email is empty
  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else {
    // check if the email is valid
    const emailRegEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(emailRegEx)) {
      errors.email = 'Email must be a valid email address';
    }
  }

  // checking input password
  if (password === '') {
    errors.password = 'Password must not be empty';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Confirm password must match password';
  }

  return {
    valid: Object.keys(errors).length < 1,
    errors,
  };
};

const LoginInputValidators = (email, password) => {
  const errors = {};

  // check if the email is empty
  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  }
  // checking input password
  if (password === '') {
    errors.password = 'Password must not be empty';
  }

  return {
    valid: Object.keys(errors).length < 1,
    errors,
  };
};

export default RegisterInputValidators;
export { LoginInputValidators };

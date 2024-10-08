export const validateEmail = (email) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  if (email.length !== 0 && regex.test(email.toLowerCase())) {
      return true;
  } else {
      return false;
  }
};

export const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  if (password.length !== 0 && regex.test(password)) {
    return true;
  } else {
    return false;
  }
};
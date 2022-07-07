const camelCaseToRegular = (value) => {
  for (let i = 0; i < value.length; i++) {
    if (value[i] >= "A" && value[i] <= "Z") {
      const substrLeft = value.slice(0, i);
      const substRight = value.slice(i + 1);
      if (i === 0) {
        value = substrLeft + value[i].toLowerCase() + substRight;
      } else {
        value = substrLeft + " " + value[i].toLowerCase() + substRight;
      }
    }
  }
  return value;
};
const isStringConsistsOfLatinOnly = (value) => {
  const regEx = new RegExp("^[a-z A-Z]+$");
  if (!regEx.test(value)) {
    return false;
  }else{
    return true;
  }
  
};

// can contain characters a-z, 0-9,
// underscores and periods. 
// The username cannot start with a period nor end with a period. 
// It must also not have more than one period sequentially.
// Max length is 30 chars.
const validateUsername = (value) => {
  const regEx = new RegExp("^(?!.*\\.\\.)(?!.*\\.$)[^\\W][\\w.]{0,29}$","igm");
  if (!regEx.test(value)) {
    return false;
  }else{
    return true;
  }
}

// - at least 8 characters
// - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
// - Can contain special characters
const validatePassword = (value) => {
  const regEx = new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$");
  if (!regEx.test(value)) {
    return false;
  }else{
    return true;
  }
}

// RFC2822 
const validateEmail = (value) => {
  const regEx = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
  if (!regEx.test(value)) {
    return false;
  }else{
    return true;
  }
}

export { camelCaseToRegular, isStringConsistsOfLatinOnly, validateUsername, validatePassword, validateEmail };

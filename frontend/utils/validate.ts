export const stringIsEmpty = (str: string) => {
  if (str) {
    str = String(str);

    if (str.length > 0) {
      return false;
    }
  }

  return true;
};

export const isValidEmail = (email: string) => {
  if (email) {
    email = String(email);

    return email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  }

  return false;
};

export const isValidPassword = (pass: string) => {
  if (pass) {
    return pass.length >= 8;
  }

  return false;
};

export const isValidGSTIN = (gstin: string) => {
  if (gstin) {
    gstin = String(gstin);
    let regex = new RegExp(
      /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/
    );
    return regex.test(gstin);
  }

  return false;
};

export const isValidPAN = (pan: string) => {
  if (pan) {
    pan = String(pan);
    let regex = new RegExp(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/);
    return regex.test(pan);
  }

  return false;
};

export const isValidPincode = (pin: string) => {
  if (pin) {
    pin = String(pin);
    let regex = new RegExp(/^[1-9][0-9]{5}$/);
    return regex.test(pin);
  }

  return false;
};

export const isValidOTP = (otp: string) => {
  if (otp) {
    otp = String(otp);
    let regex = new RegExp(/^[1-9]{6}$/);
    return regex.test(otp);
  }

  return false;
};

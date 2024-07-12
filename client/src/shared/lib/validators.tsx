export const validateUsername = (name: string): string => {
  const userNameRegex = new RegExp(/^[0-9A-Za-z]{3,16}$/);
  if (userNameRegex.test(name)) {
    return '';
  }

  return 'only numbers and letters, 3 to 16 symbols';
};

export const validatePassword = (password: string): string => {
  const passwordRegex = new RegExp(/^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/);
  if (passwordRegex.test(password)) {
    return '';
  }

  return 'at least one letter and number, 8 to 32 symbols';
};

export const validateTelegram = (telegram: string): string => {
  const telegramRegex = new RegExp(
    /.*\B@(?=\w{5,32}\b)[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*.*$/,
  );
  if (telegramRegex.test(telegram)) {
    return '';
  }

  return 'starts with @, 5 to 32 symbols';
};

export const validateCity = (city: string): string => {
  const telegramRegex = new RegExp(/^[A-Za-z]{2,32}$/);
  if (telegramRegex.test(city)) {
    return '';
  }

  return 'only letters, 2 to 32 symbols';
};

type Validator = (input: string) => string;

export const areAllValidatorsPass = (
  inputs: string[],
  validators: Validator[],
): boolean => {
  const errors: string[] = [];

  for (let i = 0; i < inputs.length; i++) {
    const error = validators[i](inputs[i]);
    if (error) {
      return false;
    }
  }

  return true;
};

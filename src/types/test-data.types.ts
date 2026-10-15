export interface RegistrationData {
  gender: string;
  firstName: string;
  lastName: string;
  emailPrefix: string;
  password: string;
}

export interface InvalidLoginData {
  emailPrefix: string;
  password: string;
}

export interface AccountTestData {
  registration: RegistrationData;
  invalidLogin: InvalidLoginData;
}

export function isAccountTestData(value: unknown): value is AccountTestData {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  const registration = candidate.registration;
  const invalidLogin = candidate.invalidLogin;

  return isRegistrationData(registration) && isInvalidLoginData(invalidLogin);
}

function isRegistrationData(value: unknown): value is RegistrationData {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return typeof candidate.gender === 'string'
    && typeof candidate.firstName === 'string'
    && typeof candidate.lastName === 'string'
    && typeof candidate.emailPrefix === 'string'
    && typeof candidate.password === 'string';
}

function isInvalidLoginData(value: unknown): value is InvalidLoginData {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return typeof candidate.emailPrefix === 'string'
    && typeof candidate.password === 'string';
}

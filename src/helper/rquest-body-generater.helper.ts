export const generateFullUserRequestBody = (
  overrides: Record<string, any> = {}
) => ({
  userId: Math.floor(
    Math.random() * (10000000000000 - 900000) + 900000
  ).toString(),
  firstName: 'Automation',
  lastName: 'Intergration Test',
  dob: '1980-01-01',
  residenceCountry: 'GB',
  nationality: 'GB',
  ...(overrides ? overrides : {}),
});

export const generateMandatoryUserRequestBody = (
  overrides: Record<string, any> = {}
) => ({
  userId: Math.floor(
    Math.random() * (10000000000000 - 900000) + 900000
  ).toString(),
  firstName: 'Automation',
  lastName: 'Intergration Test',
  dob: '1980-01-01',
  residenceCountry: 'GB',
  ...(overrides ? overrides : {}),
});
export const patchUserRequestBody = (overrides: Record<string, any> = {}) => ({
  firstName: 'Edited',
  lastName: 'Via The Intergration Test',
  residenceCountry: 'AE',
  ...(overrides ? overrides : {}),
});

export const generateUserPlanRequestBody = (
  overrides: Record<string, any> = {}
) => ({
  levelUsd: Math.floor(Math.random() * (4000 - 1000) + 1000),
  ...(overrides ? overrides : {}),
});

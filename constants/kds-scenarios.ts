import { v4 as uuidv4 } from 'uuid';
const validToken = 'local-auth-token';
const key_types = ['gpg', 'rsa4096', 'rsa2048', 'ed25519', 'secp256k1'];
export const scenarios = [
  {
    test_title:
      'Verify that the user can not authenticate with an invalid header and valid body',
    headers: {
      Authorization: `Bearer InvalidToken`,
    },
    body: {
      userEmail: 'test@test.com',
      userId: uuidv4(),
      walletId: uuidv4(),
      type: key_types[0],
    },
    response: {
      error: 'Unauthorized',
      message: 'Unauthorized',
    },
    status_code: 401,
  },
  {
    test_title:
      'Verify that the user can not authenticate with an empty header and valid body',
    headers: {},
    body: {
      userEmail: 'test@test.com',
      userId: uuidv4(),
      walletId: uuidv4(),
      type: key_types[0],
    },
    response: {
      error: 'Unauthorized',
      message: 'User is not authorized to access this resource',
    },
    status_code: 401,
  },
  {
    test_title:
      'Verify that the user can not authenticate with an invalid header and invalid body',
    headers: { Authorization: `Bearer InvalidToken` },
    body: {
      userEmail: '',
      userId: '',
      walletId: '',
      type: '',
    },
    response: {
      error: 'Unauthorized',
      message: 'Unauthorized',
    },
    status_code: 401,
  },
  {
    test_title:
      'Verify that the user can not authenticate with an valid header and invalid body payload',
    headers: {
      Authorization: `Bearer ${validToken}`,
    },
    body: {
      userEmail: '',
      userId: '',
      walletId: '',
      type: '',
    },
    response: {
      error: 'Bad Request',
      message: {
        userEmail: ['userEmail must be an email'],
        userId: ['userId must be longer than or equal to 1 characters'],
        walletId: ['walletId must be longer than or equal to 1 characters'],
        type: ['type must be longer than or equal to 1 characters'],
      },
    },
    status_code: 400,
  },
  {
    test_title:
      'Verify that the request body userEmail needs to be valid email',
    headers: { Authorization: `Bearer ${validToken}` },
    body: {
      userEmail: 'testtest.com',
      userId: uuidv4(),
      walletId: uuidv4(),
      type: key_types[0],
    },
    response: {
      error: 'Bad Request',
      message: { userEmail: ['userEmail must be an email'] },
    },
    status_code: 400,
  },
];

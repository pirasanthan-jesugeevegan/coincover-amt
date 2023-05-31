import { v4 as uuidv4 } from 'uuid';
const validToken = 'local-auth-token';
const key_types = ['gpg', 'rsa4096', 'rsa2048', 'ed25519', 'secp256k1'];
export const scenarios = [
  {
    test_title:
      'Verify that with an invalid header and valid body should return a 401 Unauthorized reponse',
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
      'Verify that with an empty header and valid body should return a 401 Unauthorized reponse',
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
      'Verify that with an invalid header and invalid body should return a 401 Unauthorized reponse',
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
      'Verify that with an valid header and invalid body payload should return a 400 Bad Request reponse',
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
        userId: [
          'userId must be a string longer than or equal to 1 characters',
        ],
        walletId: [
          'walletId must be a string longer than or equal to 1 characters',
        ],
        type: ['type must be a string longer than or equal to 1 characters'],
      },
    },
    status_code: 400,
  },
  {
    test_title:
      'Verify that with an valid header and body payload with invalid email should return a 400 Bad Request reponse',
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
  {
    test_title:
      'Verify that with a valid header and invalid body (userID empty) should return a 400 Bad Request reponse',
    headers: { Authorization: `Bearer ${validToken}` },
    body: {
      userEmail: 'test@test.com',
      userId: '',
      walletId: uuidv4(),
      type: key_types[0],
    },
    response: {
      error: 'Bad Request',
      message: {
        userId: [
          'userId must be a string longer than or equal to 1 characters',
        ],
      },
    },
    status_code: 400,
  },
  {
    test_title:
      'Verify that with a valid header and invalid body (walletId empty) should return a 400 Bad Request reponse',
    headers: { Authorization: `Bearer ${validToken}` },
    body: {
      userEmail: 'test@test.com',
      userId: uuidv4(),
      walletId: '',
      type: key_types[0],
    },
    response: {
      error: 'Bad Request',
      message: {
        walletId: [
          'walletId must be a string longer than or equal to 1 characters',
        ],
      },
    },
    status_code: 400,
  },
  {
    test_title:
      'Verify that with a valid header and invalid body (type empty) should return a 400 Bad Request reponse',
    headers: { Authorization: `Bearer ${validToken}` },
    body: {
      userEmail: 'test@test.com',
      userId: uuidv4(),
      walletId: uuidv4(),
      type: '',
    },
    response: {
      error: 'Bad Request',
      message: {
        type: ['type must be a string longer than or equal to 1 characters'],
      },
    },
    status_code: 400,
  },
  {
    test_title:
      'Verify that with a valid header and invalid body (invalid key type) should return a 400 Bad Request reponse',
    headers: { Authorization: `Bearer ${validToken}` },
    body: {
      userEmail: 'test@test.com',
      userId: uuidv4(),
      walletId: uuidv4(),
      type: 'invalid_type',
    },
    response: {
      error: 'Bad Request',
      message: 'Invalid key type requested.',
    },
    status_code: 400,
  },
];

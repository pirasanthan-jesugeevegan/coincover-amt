import { test } from '@playwright/test';
import { expect } from 'chai';
import { ENV_VARS } from '../../../utils/env';
import { generateFullKeyRequestBody } from '../../../helper/rquest-body-generater.helper';
import { header } from '../../../helper/request-header-generater.helper';
import { post } from '../../../helper/request.helper';

const { local_url } = ENV_VARS;

test.describe('Negative Path - POST/key endpoint @dr', async () => {
  test('Verify that with an invalid header and valid body should return a 401 Unauthorized response', async ({
    request,
  }) => {
    //Given a the user provide an invalid header and valid body
    //When the request is sent request to /key endpoint
    const response = await post(
      request,
      `${local_url}/key`,
      generateFullKeyRequestBody(),
      header('Invalid')
    );
    //Then the response should be 401 with message 'Unauthorized'
    expect(await response.status()).to.equal(401);
    expect(await response.json()).to.deep.equal({
      statusCode: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
    });
  });

  test('Verify that with an empty header and valid body should return a 401 Unauthorized response', async ({
    request,
  }) => {
    //Given a the user provide an empty header and valid body
    //When the request is sent request to /key endpoint
    const response = await post(
      request,
      `${local_url}/key`,
      generateFullKeyRequestBody(),
      {}
    );
    //Then the response should be 401 with message 'User is not authorized to access this resource'
    expect(await response.status()).to.equal(401);
    expect(await response.json()).to.deep.equal({
      statusCode: 401,
      error: 'Unauthorized',
      message: 'User is not authorized to access this resource',
    });
  });
  test('Verify that with an valid header and empty body should return a 401 Unauthorized response', async ({
    request,
  }) => {
    //Given a the user provide an valid header and empty body
    //When the request is sent request to /key endpoint
    const response = await post(
      request,
      `${local_url}/key`,
      {},
      header('local-auth-token')
    );
    //Then the response should be 400 with message with all field required (userEmail,userId,walletId,type)
    expect(await response.status()).to.equal(400);
    expect(await response.json()).to.deep.equal({
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
    });
  });
});

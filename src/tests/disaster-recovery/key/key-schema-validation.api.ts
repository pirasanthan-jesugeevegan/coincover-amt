import { test } from '@playwright/test';
import { expect } from 'chai';
import { ENV_VARS } from '../../../utils/env';
import { generateFullKeyRequestBody } from '../../../helper/rquest-body-generater.helper';
import { header } from '../../../helper/request-header-generater.helper';
import { post } from '../../../helper/request.helper';

const { baseUrl_DR, drToken } = ENV_VARS;

test.describe('Schema Validation - POST/key endpoint @dr', async () => {
  //////////////////////////////////////
  // userId
  //////////////////////////////////////
  test('Verify that when userId is not in the body should return a 400 Bad Request', async ({
    request,
  }) => {
    //Given that the userid is not in body payload
    //When the request is sent request to /key endpoint
    const response = await post(
      request,
      `${baseUrl_DR}/key`,
      generateFullKeyRequestBody({
        userId: undefined,
      }),
      header(drToken)
    );
    //Then the response should be 400 with message 'userId must be a string longer than or equal to 1 characters'
    expect(await response.status()).to.equal(400);
    expect(await response.json()).to.deep.equal({
      error: 'Bad Request',
      message: {
        userId: [
          'userId must be a string longer than or equal to 1 characters',
        ],
      },
    });
  });
  test('Verify that when invalid userId in the body should return a 400 Bad Request', async ({
    request,
  }) => {
    //Given that the invalid userId is in body payload
    //When the request is sent request to /key endpoint
    const response = await post(
      request,
      `${baseUrl_DR}/key`,
      generateFullKeyRequestBody({
        userId: 1234,
      }),
      header(drToken)
    );
    //Then the response should be 400 with message 'userId must be a string longer than or equal to 1 characters'
    expect(await response.status()).to.equal(400);
    expect(await response.json()).to.deep.equal({
      error: 'Bad Request',
      message: {
        userId: [
          'userId must be a string longer than or equal to 1 characters',
        ],
      },
    });
  });
  test('Verify that when empty userId in the body should return a 400 Bad Request', async ({
    request,
  }) => {
    //Given that the invalid userId is in body payload
    //When the request is sent request to /key endpoint
    const response = await post(
      request,
      `${baseUrl_DR}/key`,
      generateFullKeyRequestBody({
        userId: '',
      }),
      header(drToken)
    );
    //Then the response should be 400 with message 'userId must be a string longer than or equal to 1 characters'
    expect(await response.status()).to.equal(400);
    expect(await response.json()).to.deep.equal({
      error: 'Bad Request',
      message: {
        userId: [
          'userId must be a string longer than or equal to 1 characters',
        ],
      },
    });
  });
  //////////////////////////////////////
  // userEmail
  //////////////////////////////////////
  test('Verify that when userEmail is not in the body should return a 400 Bad Request', async ({
    request,
  }) => {
    //Given that the userEmail is not in body payload
    //When the request is sent request to /key endpoint
    const response = await post(
      request,
      `${baseUrl_DR}/key`,
      generateFullKeyRequestBody({
        userEmail: undefined,
      }),
      header(drToken)
    );
    //Then the response should be 400 with message 'userEmail must be an email'
    expect(await response.status()).to.equal(400);
    expect(await response.json()).to.deep.equal({
      error: 'Bad Request',
      message: {
        userEmail: ['userEmail must be an email'],
      },
    });
  });
  test('Verify that when invalid userEmail in the body should return a 400 Bad Request', async ({
    request,
  }) => {
    //Given that the invalid userEmail is in body payload
    //When the request is sent request to /key endpoint
    const response = await post(
      request,
      `${baseUrl_DR}/key`,
      generateFullKeyRequestBody({
        userEmail: 1234,
      }),
      header(drToken)
    );
    //Then the response should be 400 with message 'userEmail must be an email'
    expect(await response.status()).to.equal(400);
    expect(await response.json()).to.deep.equal({
      error: 'Bad Request',
      message: {
        userEmail: ['userEmail must be an email'],
      },
    });
  });
  test('Verify that when empty userEmail in the body should return a 400 Bad Request', async ({
    request,
  }) => {
    //Given that the invalid userEmail is in body payload
    //When the request is sent request to /key endpoint
    const response = await post(
      request,
      `${baseUrl_DR}/key`,
      generateFullKeyRequestBody({
        userEmail: '',
      }),
      header(drToken)
    );
    //Then the response should be 400 with message 'userEmail must be an email'
    expect(await response.status()).to.equal(400);
    expect(await response.json()).to.deep.equal({
      error: 'Bad Request',
      message: {
        userEmail: ['userEmail must be an email'],
      },
    });
  });
  test('Verify that when incorrect email formate is in the body should return a 400 Bad Request', async ({
    request,
  }) => {
    //Given that the incorrect email formate is in body payload
    //When the request is sent request to /key endpoint
    const response = await post(
      request,
      `${baseUrl_DR}/key`,
      generateFullKeyRequestBody({
        userEmail: 'incorrect@example',
      }),
      header(drToken)
    );
    //Then the response should be 400 with message 'userEmail must be an email'
    expect(await response.status()).to.equal(400);
    expect(await response.json()).to.deep.equal({
      error: 'Bad Request',
      message: {
        userEmail: ['userEmail must be an email'],
      },
    });
  });
  //////////////////////////////////////
  // walletId
  //////////////////////////////////////
  test('Verify that when walletId is not in the body should return a 400 Bad Request', async ({
    request,
  }) => {
    //Given that the walletId is not in body payload
    //When the request is sent request to /key endpoint
    const response = await post(
      request,
      `${baseUrl_DR}/key`,
      generateFullKeyRequestBody({
        walletId: undefined,
      }),
      header(drToken)
    );
    //Then the response should be 400 with message 'walletId must be a string longer than or equal to 1 characters'
    expect(await response.status()).to.equal(400);
    expect(await response.json()).to.deep.equal({
      error: 'Bad Request',
      message: {
        walletId: [
          'walletId must be a string longer than or equal to 1 characters',
        ],
      },
    });
  });
  test('Verify that when invalid walletId in the body should return a 400 Bad Request', async ({
    request,
  }) => {
    //Given that the invalid walletId is in body payload
    //When the request is sent request to /key endpoint
    const response = await post(
      request,
      `${baseUrl_DR}/key`,
      generateFullKeyRequestBody({
        walletId: 1234,
      }),
      header(drToken)
    );
    //Then the response should be 400 with message 'walletId must be a string longer than or equal to 1 characters'
    expect(await response.status()).to.equal(400);
    expect(await response.json()).to.deep.equal({
      error: 'Bad Request',
      message: {
        walletId: [
          'walletId must be a string longer than or equal to 1 characters',
        ],
      },
    });
  });
  test('Verify that when empty walletId in the body should return a 400 Bad Request', async ({
    request,
  }) => {
    //Given that the invalid walletId is in body payload
    //When the request is sent request to /key endpoint
    const response = await post(
      request,
      `${baseUrl_DR}/key`,
      generateFullKeyRequestBody({
        walletId: '',
      }),
      header(drToken)
    );
    //Then the response should be 400 with message 'walletId must be a string longer than or equal to 1 characters'
    expect(await response.status()).to.equal(400);
    expect(await response.json()).to.deep.equal({
      error: 'Bad Request',
      message: {
        walletId: [
          'walletId must be a string longer than or equal to 1 characters',
        ],
      },
    });
  });
  //////////////////////////////////////
  // type
  //////////////////////////////////////
  test('Verify that when type is not in the body should return a 400 Bad Request', async ({
    request,
  }) => {
    //Given that the type is not in body payload
    //When the request is sent request to /key endpoint
    const response = await post(
      request,
      `${baseUrl_DR}/key`,
      generateFullKeyRequestBody({
        type: undefined,
      }),
      header(drToken)
    );
    //Then the response should be 400 with message 'type must be a string longer than or equal to 1 characters'
    expect(await response.status()).to.equal(400);
    expect(await response.json()).to.deep.equal({
      error: 'Bad Request',
      message: {
        type: ['type must be a string longer than or equal to 1 characters'],
      },
    });
  });
  test('Verify that when invalid type in the body should return a 400 Bad Request', async ({
    request,
  }) => {
    //Given that the invalid type is in body payload
    //When the request is sent request to /key endpoint
    const response = await post(
      request,
      `${baseUrl_DR}/key`,
      generateFullKeyRequestBody({
        type: 1234,
      }),
      header(drToken)
    );
    //Then the response should be 400 with message 'type must be a string longer than or equal to 1 characters'
    expect(await response.status()).to.equal(400);
    expect(await response.json()).to.deep.equal({
      error: 'Bad Request',
      message: {
        type: ['type must be a string longer than or equal to 1 characters'],
      },
    });
  });
  test('Verify that when empty type in the body should return a 400 Bad Request', async ({
    request,
  }) => {
    //Given that the invalid type is in body payload
    //When the request is sent request to /key endpoint
    const response = await post(
      request,
      `${baseUrl_DR}/key`,
      generateFullKeyRequestBody({
        type: '',
      }),
      header(drToken)
    );
    //Then the response should be 400 with message 'type must be a string longer than or equal to 1 characters'
    expect(await response.status()).to.equal(400);
    expect(await response.json()).to.deep.equal({
      error: 'Bad Request',
      message: {
        type: ['type must be a string longer than or equal to 1 characters'],
      },
    });
  });
  test('Verify that when a type is not on the db should return a 400 Bad Request', async ({
    request,
  }) => {
    //Given that a type is not on the db is in body payload
    //When the request is sent request to /key endpoint
    const response = await post(
      request,
      `${baseUrl_DR}/key`,
      generateFullKeyRequestBody({
        type: 'incorrect',
      }),
      header(drToken)
    );
    //Then the response should be 400 with message 'Invalid key type requested.'
    expect(await response.status()).to.equal(400);
    expect(await response.json()).to.deep.equal({
      error: 'Bad Request',
      message: 'Invalid key type requested.',
    });
  });
});

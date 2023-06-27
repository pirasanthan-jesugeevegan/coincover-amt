import { test } from '@playwright/test';
import { expect } from 'chai';
import { ENV_VARS } from '../../../utils/env';
import {
  generateFullUserRequestBody,
  patchUserRequestBody,
} from '../../../helper/rquest-body-generater.helper';
import { header } from '../../../helper/request-header-generater.helper';
import { post, patch } from '../../../helper/request.helper';

const { stdTxnToken, baseUrl_TP } = ENV_VARS;

test.describe('Negative Path - POST/user endpoint @tp', async () => {
  test('Verify that with an existing userId in the body should return a 400 Bad Request', async ({
    request,
  }) => {
    //Given a the user provide an existing userId in the body
    //When the request is sent request to /user endpoint
    const response = await post(
      request,
      `${baseUrl_TP}/user`,
      generateFullUserRequestBody({
        userId: '1',
      }),
      header(stdTxnToken),
    );
    //Then the response should be 400 with message 'User already exists'
    expect(await response.status()).to.equal(400);
    expect(await response.json()).to.deep.equal({
      statusCode: 400,
      error: 'Bad Request',
      message: 'User already exists',
    });
  });

  test('Verify that the user cannot access the service with no bearer token', async ({
    request,
  }) => {
    //Given the user provides no bearer token
    //When the request is sent request to /user endpoint
    const response = await post(
      request,
      `${baseUrl_TP}/user`,
      generateFullUserRequestBody(),
      {},
    );
    //Then the response should be 401 with response message 'missing authorization header'
    expect(await response.status()).to.equal(401);
    expect(await response.json()).to.deep.equal({
      error: 'missing authorization header',
    });
  });

  test('Verify that the user cannot access the service with an invalid bearer token', async ({
    request,
  }) => {
    //Given the user provides an invalid bearer token
    //When the request is sent request to /user endpoint
    const response = await post(
      request,
      `${baseUrl_TP}/user`,
      generateFullUserRequestBody(),
      header('invalid'),
    );
    //Then the response should be 401 with response message 'invalid authorization header'
    expect(await response.status()).to.equal(401);
    expect(await response.json()).to.deep.equal({
      error: 'invalid authorization header',
    });
  });
});

test.describe('Negative Path - PATCH/user endpoint @tp', async () => {
  const userId = Math.floor(
    Math.random() * (10000000000000 - 900000) + 900000,
  ).toString();
  //Given the user creates a new user
  test.beforeAll(async ({ request }) => {
    const response = await post(
      request,
      `${baseUrl_TP}/user`,
      generateFullUserRequestBody({ userId }),
      header(stdTxnToken),
    );
    expect(await response.status()).to.equal(201);
  });
  test('Verify that the user cannot access the service with no bearer token', async ({
    request,
  }) => {
    //Given the user provides no bearer token
    //When the request is sent request to /user endpoint
    const response = await patch(
      request,
      `${baseUrl_TP}/user/${userId}`,
      patchUserRequestBody(),
      {},
    );
    //Then the response should be 401 with response body message 'missing authorization header'
    expect(await response.status()).to.equal(401);
    expect(await response.json()).to.deep.equal({
      error: 'missing authorization header',
    });
  });

  test('Verify tresponses', async ({ request }) => {
    //Given the user provides an invalid bearer token
    //When the request is sent request to /user endpoint
    const response = await patch(
      request,
      `${baseUrl_TP}/user/${userId}`,
      patchUserRequestBody(),
      header('Invalid'),
    );
    //Then the response should be 401 with response message 'invalid authorization header'
    expect(await response.status()).to.equal(401);
    expect(await response.json()).to.deep.equal({
      error: 'invalid authorization header',
    });
  });

  test('Verify that if user does not exists in the database then return 404', async ({
    request,
  }) => {
    //Given the userID is not in the database
    //When the request is sent request to /user endpoint
    const response = await patch(
      request,
      `${baseUrl_TP}/user/999999999991199911991919191919`,
      patchUserRequestBody(),
      header(stdTxnToken),
    );
    //Then the response should be 400 with response message 'User not found'
    expect(await response.status()).to.equal(404);
    expect(await response.json()).to.deep.equal({
      statusCode: 404,
      error: 'Not Found',
      message: 'User not found',
    });
  });
});

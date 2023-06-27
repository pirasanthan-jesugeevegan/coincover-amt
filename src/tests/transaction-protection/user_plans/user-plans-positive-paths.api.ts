import { test } from '@playwright/test';
import { expect } from 'chai';
import { ENV_VARS } from '../../../utils/env';
import {
  generateFullUserRequestBody,
  generateUserPlanRequestBody,
} from '../../../helper/rquest-body-generater.helper';
import { post } from '../../../helper/request.helper';
import { header } from '../../../helper/request-header-generater.helper';

const { stdTxnToken, baseUrl_TP } = ENV_VARS;

test.describe('Positive Path - POST/user/{user_id}/plan endpoint @tp', async () => {
  const userId = Math.floor(
    Math.random() * (10000000000000 - 900000) + 900000,
  ).toString();

  test.beforeAll(async ({ request }) => {
    //Given the user creates a new user
    const response = await post(
      request,
      `${baseUrl_TP}/user`,
      generateFullUserRequestBody({ userId }),
      header(stdTxnToken),
    );
    //Then the response should be 201
    expect(await response.status()).to.equal(201);
  });
  test('Verify that the user get a 201 created response when authenticated, has correct Requestbody and User does not have a plan assigned', async ({
    request,
  }) => {
    //Given the user has a user plan request body payload
    //When the request is sent request to /user/${userId}/plan endpoint
    const response = await post(
      request,
      `${baseUrl_TP}/user/${userId}/plan`,
      generateUserPlanRequestBody(),
      header(stdTxnToken),
    );
    //Then the response should be 201 with no response body
    expect(await response.status()).to.equal(201);
    expect(await response.body()).to.not.have.property('body');
  });

  test('Verify that the user get a 201 created response when authenticated, has correct Requestbody, User does not have a plan assigned and amount has a decimal place', async ({
    request,
  }) => {
    //Given the user does not have a plan assigned and levelUsd has a decimal place in the payload
    //When the request is sent request to /user/${userId}/plan endpoint
    const response = await post(
      request,
      `${baseUrl_TP}/user/${userId}/plan`,
      generateUserPlanRequestBody({ levelUsd: 10.0 }),
      header(stdTxnToken),
    );
    //Then the response should be 201 with no response body
    expect(await response.status()).to.equal(201);
    expect(await response.body()).to.not.have.property('body');
  });
});

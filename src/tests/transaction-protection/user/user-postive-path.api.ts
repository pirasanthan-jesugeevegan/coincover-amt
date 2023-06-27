import { test } from '@playwright/test';
import { expect } from 'chai';
import { ENV_VARS } from '../../../utils/env';
import {
  generateFullUserRequestBody,
  generateMandatoryUserRequestBody,
  patchUserRequestBody,
} from '../../../helper/rquest-body-generater.helper';
import { post, patch } from '../../../helper/request.helper';
import { header } from '../../../helper/request-header-generater.helper';

const { stdTxnToken, baseUrl_TP } = ENV_VARS;

test.describe('Positive Path - POST/user endpoint @tp', async () => {
  test('Verify that the user get a  201 created response when authenticated and a full request body sent', async ({
    request,
  }) => {
    //Given the user has a full user request body payload
    //When the request is sent request to /user endpoint
    const response = await post(
      request,
      `${baseUrl_TP}/user`,
      generateFullUserRequestBody(),
      header(stdTxnToken),
    );
    //Then the response should be 201 with no response body
    expect(await response.status()).to.equal(201);
    expect(await response.body()).to.not.have.property('body');
  });

  test('Verify that the user get a  201 created response when authenticated and mandatory fields only request body sent', async ({
    request,
  }) => {
    //Given the user has mandatory fields only request body payload
    //When the request is sent request to /user endpoint
    const response = await post(
      request,
      `${baseUrl_TP}/user`,
      generateMandatoryUserRequestBody(),
      header(stdTxnToken),
    );
    //Then the response should be 201 with no response body
    expect(await response.status()).to.equal(201);
    expect(await response.body()).to.not.have.property('body');
  });
});

test.describe('Positive Path - PATCH/user endpoint @tp', async () => {
  const userId = Math.floor(
    Math.random() * (10000000000000 - 900000) + 900000,
  ).toString();
  //Given the user creates a new user
  test.beforeAll(async ({ request }) => {
    const response = await post(
      request,
      `${baseUrl_TP}/user`,
      generateFullUserRequestBody({ userId: userId }),
      header(stdTxnToken),
    );
    expect(await response.status()).to.equal(201);
  });
  test('Verify that the user get a 204 response when authenticated and a full patch request body sent', async ({
    request,
  }) => {
    //When the request is sent request to /user endpoint
    const response = await patch(
      request,
      `${baseUrl_TP}/user/${userId}`,
      patchUserRequestBody(),
      header(stdTxnToken),
    );
    //Then the response should be 204 with no response body
    expect(await response.status()).to.equal(204);
  });

  test('Verify that the user get a 204 response when authenticated and only firstName is updated via patch', async ({
    request,
  }) => {
    //Given the user updated only firstName
    //When the request is sent request to /user endpoint
    const response = await patch(
      request,
      `${baseUrl_TP}/user/${userId}`,

      patchUserRequestBody({
        lastName: undefined,
        residenceCountry: undefined,
      }),
      header(stdTxnToken),
    );
    //Then the response should be 201 with no response body
    expect(await response.status()).to.equal(204);
    expect(await response.body()).to.not.have.property('body');
  });

  test('Verify that the user get a 204 response when authenticated and only lastName is updated via patch', async ({
    request,
  }) => {
    //Given the user updated only lastName
    //When the request is sent request to /user endpoint
    const response = await patch(
      request,
      `${baseUrl_TP}/user/${userId}`,

      patchUserRequestBody({
        firstName: undefined,
        residenceCountry: undefined,
      }),
      header(stdTxnToken),
    );
    //Then the response should be 201 with no response body
    expect(await response.status()).to.equal(204);
    expect(await response.body()).to.not.have.property('body');
  });

  test('Verify that the user get a 204 response when authenticated and only residenceCountry is updated via patch', async ({
    request,
  }) => {
    //Given the user updated only residenceCountry
    //When the request is sent request to /user endpoint
    const response = await patch(
      request,
      `${baseUrl_TP}/user/${userId}`,
      patchUserRequestBody({ firstName: undefined, lastName: undefined }),
      header(stdTxnToken),
    );
    //Then the response should be 201 with no response body
    expect(await response.status()).to.equal(204);
    expect(await response.body()).to.not.have.property('body');
  });
});

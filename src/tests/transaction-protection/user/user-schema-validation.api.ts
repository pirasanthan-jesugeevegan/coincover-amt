import { test } from '@playwright/test';
import { expect } from 'chai';
import { ENV_VARS } from '../../../utils/env';
import { generateFullUserRequestBody } from '../../../helper/rquest-body-generater.helper';
import { post, patch } from '../../../helper/request.helper';
import { header } from '../../../helper/request-header-generater.helper';

const { stdTxnToken, baseUrl_TP } = ENV_VARS;

test.describe(`Schema Validation - POST/user endpoint @tp`, async () => {
  //////////////////////////////////////
  // userId
  //////////////////////////////////////
  test('Verify that when userId is not in the body should return a 400 Bad Request', async ({
    request,
  }) => {
    //Given that the userid is not in body payload
    //When the request is sent request to /user endpoint
    const response = await post(
      request,
      `${baseUrl_TP}/user`,
      generateFullUserRequestBody({
        userId: undefined,
      }),
      header(stdTxnToken)
    );
    //Then the response should be 400 with message 'body/userId Expected required property, body/userId Expected string'
    expect(await response.status()).to.equal(400);
    expect(await response.json()).to.deep.equal({
      statusCode: 400,
      error: 'Bad Request',
      message:
        'body/userId Expected required property, body/userId Expected string',
    });
  });

  test('Verify that when invalid userId in the body should return a 400 Bad Request', async ({
    request,
  }) => {
    //Given that invalid userid is in body payload
    //When the request is sent request to /user endpoint
    const response = await post(
      request,
      `${baseUrl_TP}/user`,
      generateFullUserRequestBody({
        userId: 12345,
      }),
      header(stdTxnToken)
    );
    //Then the response should be 400 with message 'body/userId Expected string'
    expect(await response.status()).to.equal(400);
    expect(await response.json()).to.deep.equal({
      statusCode: 400,
      error: 'Bad Request',
      message: 'body/userId Expected string',
    });
  });
  //////////////////////////////////////
  // firstName
  //////////////////////////////////////
  test('Verify that when firstName is not in the body should return a 400 Bad Request', async ({
    request,
  }) => {
    //Given that firstName is not in body payload
    //When the request is sent request to /user endpoint
    const response = await post(
      request,
      `${baseUrl_TP}/user`,
      generateFullUserRequestBody({
        firstName: undefined,
      }),
      header(stdTxnToken)
    );
    //Then the response should be 400 with message 'body/firstName Expected required property, body/firstName Expected string'
    expect(await response.status()).to.equal(400);
    expect(await response.json()).to.deep.equal({
      statusCode: 400,
      error: 'Bad Request',
      message:
        'body/firstName Expected required property, body/firstName Expected string',
    });
  });

  test('Verify that when invalid firstName in the body should return a 400 Bad Request', async ({
    request,
  }) => {
    //Given that invalid firstName is in body payload
    //When the request is sent request to /user endpoint
    const response = await post(
      request,
      `${baseUrl_TP}/user`,
      generateFullUserRequestBody({
        firstName: 12345,
      }),
      header(stdTxnToken)
    );
    //Then the response should be 400 with message 'body/firstName Expected string'
    expect(await response.status()).to.equal(400);
    expect(await response.json()).to.deep.equal({
      statusCode: 400,
      error: 'Bad Request',
      message: 'body/firstName Expected string',
    });
  });
  //////////////////////////////////////
  // lastName
  //////////////////////////////////////
  test('Verify that when lastName is not in the body should return a 400 Bad Request', async ({
    request,
  }) => {
    //Given that lastName is not in body payload
    //When the request is sent request to /user endpoint
    const response = await post(
      request,
      `${baseUrl_TP}/user`,
      generateFullUserRequestBody({
        lastName: undefined,
      }),
      header(stdTxnToken)
    );
    //Then the response should be 400 with message 'body/lastName Expected required property, body/lastName Expected string'
    expect(await response.status()).to.equal(400);
    expect(await response.json()).to.deep.equal({
      statusCode: 400,
      error: 'Bad Request',
      message:
        'body/lastName Expected required property, body/lastName Expected string',
    });
  });

  test('Verify that when invalid lastName in the body should return a 400 Bad Request', async ({
    request,
  }) => {
    //Given that invalid lastName is in body payload
    //When the request is sent request to /user endpoint
    const response = await post(
      request,
      `${baseUrl_TP}/user`,
      generateFullUserRequestBody({
        lastName: 12345,
      }),
      header(stdTxnToken)
    );
    //Then the response should be 400 with message 'body/lastName Expected string'
    expect(await response.status()).to.equal(400);
    expect(await response.json()).to.deep.equal({
      statusCode: 400,
      error: 'Bad Request',
      message: 'body/lastName Expected string',
    });
  });
  //////////////////////////////////////
  // DOB
  //////////////////////////////////////
  test('Verify that when dob is not in the body should return a 400 Bad Request', async ({
    request,
  }) => {
    //Given that dob is not in body payload
    //When the request is sent request to /user endpoint
    const response = await post(
      request,
      `${baseUrl_TP}/user`,
      generateFullUserRequestBody({
        dob: undefined,
      }),
      header(stdTxnToken)
    );
    //Then the response should be 400 with message 'body/dob Expected required property, body/dob Expected string'
    expect(await response.status()).to.equal(400);
    expect(await response.json()).to.deep.equal({
      statusCode: 400,
      error: 'Bad Request',
      message: 'body/dob Expected required property, body/dob Expected string',
    });
  });

  test('Verify that when invalid dob in the body should return a 400 Bad Request', async ({
    request,
  }) => {
    //Given that invalid dob is in body payload
    //When the request is sent request to /user endpoint
    const response = await post(
      request,
      `${baseUrl_TP}/user`,
      generateFullUserRequestBody({
        dob: 12345,
      }),
      header(stdTxnToken)
    );
    //Then the response should be 400 with message 'body/dob Expected string'
    expect(await response.status()).to.equal(400);
    expect(await response.json()).to.deep.equal({
      statusCode: 400,
      error: 'Bad Request',
      message: 'body/dob Expected string',
    });
  });

  test('Verify that when incorrect formate of dob in the body should return a 400 Bad Request', async ({
    request,
  }) => {
    //Given that invalid dob formate is in body payload
    //When the request is sent request to /user endpoint
    const response = await post(
      request,
      `${baseUrl_TP}/user`,
      generateFullUserRequestBody({
        dob: '01/01/1999',
      }),
      header(stdTxnToken)
    );
    //Then the response should be 400 with message 'body/dob Expected string to match pattern ^\\d{4}-\\d{2}-\\d{2}$'
    expect(await response.status()).to.equal(400);
    expect(await response.json()).to.deep.equal({
      statusCode: 400,
      error: 'Bad Request',
      message:
        'body/dob Expected string to match pattern ^\\d{4}-\\d{2}-\\d{2}$',
    });
  });
  //////////////////////////////////////
  // residenceCountry
  //////////////////////////////////////
  test('Verify that when residenceCountry is not in the body should return a 400 Bad Request', async ({
    request,
  }) => {
    //Given that residenceCountry is not in body payload
    //When the request is sent request to /user endpoint
    const response = await post(
      request,
      `${baseUrl_TP}/user`,
      generateFullUserRequestBody({
        residenceCountry: undefined,
      }),
      header(stdTxnToken)
    );
    //Then the response should be 400 and message contain 'body/residenceCountry Expected required property'
    expect(await response.status()).to.equal(400);
    expect(await response.text()).to.include(
      'body/residenceCountry Expected required property'
    );
  });

  test('Verify that when residenceCountry is not a string in the body should return a 400 Bad Request', async ({
    request,
  }) => {
    //Given that residenceCountry is not a string and is in body payload
    //When the request is sent request to /user endpoint
    const response = await post(
      request,
      `${baseUrl_TP}/user`,
      generateFullUserRequestBody({
        residenceCountry: 12345,
      }),
      header(stdTxnToken)
    );
    //Then the response should be 400 with message contain 'body/residenceCountry Expected 'AF''
    expect(await response.status()).to.equal(400);
    expect(await response.text()).to.include(
      "body/residenceCountry Expected 'AF'"
    );
  });

  test('Verify that when invalid residenceCountry in the body should return a 400 Bad Request', async ({
    request,
  }) => {
    //Given that invalid residenceCountry is in body payload
    //When the request is sent request to /user endpoint
    const response = await post(
      request,
      `${baseUrl_TP}/user`,
      generateFullUserRequestBody({
        residenceCountry: 'SweetHomeTestLand',
      }),
      header(stdTxnToken)
    );
    //Then the response should be 400 with message "body/residenceCountry Expected 'AF"
    expect(await response.status()).to.equal(400);
    expect(await response.text()).to.include(
      "body/residenceCountry Expected 'AF"
    );
  });
  //////////////////////////////////////
  // nationality
  //////////////////////////////////////
  test('Verify that when nationality is not a string in the body should return a 400 Bad Request', async ({
    request,
  }) => {
    //Given that nationality is not a string and is in body payload
    //When the request is sent request to /user endpoint
    const response = await post(
      request,
      `${baseUrl_TP}/user`,
      generateFullUserRequestBody({
        nationality: 12345,
      }),
      header(stdTxnToken)
    );
    //Then the response should be 400 with message contain "body/nationality Expected 'AF'"
    expect(await response.status()).to.equal(400);
    expect(await response.text()).to.include("body/nationality Expected 'AF'");
  });

  test('Verify that when invalid nationality in the body should return a 400 Bad Request', async ({
    request,
  }) => {
    //Given that invalid nationality is in body payload
    //When the request is sent request to /user endpoint
    const response = await post(
      request,
      `${baseUrl_TP}/user`,
      generateFullUserRequestBody({
        nationality: 'SweetHomeTestLand',
      }),
      header(stdTxnToken)
    );
    //Then the response should be 400 with message "body/nationality Expected 'AF"
    expect(await response.status()).to.equal(400);
    expect(await response.text()).to.include("body/nationality Expected 'AF'");
  });
});
test.describe(`Schema Validation - PATCH/user endpoint @tp`, async () => {
  const userId = Math.floor(
    Math.random() * (10000000000000 - 900000) + 900000
  ).toString();
  //Given the user creates a new user
  test.beforeAll(async ({ request }) => {
    const response = await post(
      request,
      `${baseUrl_TP}/user`,
      generateFullUserRequestBody({ userId: userId }),
      header(stdTxnToken)
    );
    expect(await response.status()).to.equal(201);
  });

  test('Verify that when empty body should return a 400 Bad Request', async ({
    request,
  }) => {
    //Given that body payload is empty
    //When the request is sent request to /user endpoint
    const response = await patch(
      request,
      `${baseUrl_TP}/user/${userId}`,
      {},
      header(stdTxnToken)
    );
    //Then the response should be 400 with message 'body/firstName Expected required property, body/firstName Expected string'
    expect(await response.status()).to.equal(400);
    expect(await response.json()).to.deep.equal({
      statusCode: 400,
      error: 'Bad Request',
      message: 'body Expected object to have at least 1 properties',
    });
  });
  //////////////////////////////////////
  // firstName
  //////////////////////////////////////
  test('Verify that when invalid firstName in the body should return a 400 Bad Request', async ({
    request,
  }) => {
    //Given that invalid firstName is in body payload
    //When the request is sent request to /user endpoint
    const response = await patch(
      request,
      `${baseUrl_TP}/user/${userId}`,
      generateFullUserRequestBody({
        firstName: 12345,
      }),
      header(stdTxnToken)
    );
    //Then the response should be 400 with message 'body/firstName Expected string'
    expect(await response.status()).to.equal(400);
    expect(await response.json()).to.deep.equal({
      statusCode: 400,
      error: 'Bad Request',
      message: 'body/firstName Expected string',
    });
  });
  //////////////////////////////////////
  // lastName
  //////////////////////////////////////
  test('Verify that when invalid lastName in the body should return a 400 Bad Request', async ({
    request,
  }) => {
    //Given that invalid lastName is in body payload
    //When the request is sent request to /user endpoint
    const response = await patch(
      request,
      `${baseUrl_TP}/user/${userId}`,
      generateFullUserRequestBody({
        lastName: 12345,
      }),
      header(stdTxnToken)
    );
    //Then the response should be 400 with message 'body/lastName Expected string'
    expect(await response.status()).to.equal(400);
    expect(await response.json()).to.deep.equal({
      statusCode: 400,
      error: 'Bad Request',
      message: 'body/lastName Expected string',
    });
  });
  //////////////////////////////////////
  // DOB
  //////////////////////////////////////
  //BUG
  // test('Verify that when invalid dob in the body should return a 400 Bad Request', async ({
  //   request,
  // }) => {
  //   //Given that invalid dob is in body payload
  //   //When the request is sent request to /user endpoint
  //   const response = await patch(
  //     request,
  //     `${baseUrl_TP}/user/${userId}`,
  //     generateFullUserRequestBody({
  //       dob: 12345,
  //     }),
  //     header(stdTxnToken),
  //   );
  //   //Then the response should be 400 with message 'body/dob Expected string'
  //   expect(await response.status()).to.equal(400);
  //   expect(await response.json()).to.deep.equal({
  //     statusCode: 400,
  //     error: 'Bad Request',
  //     message: 'body/dob Expected string',
  //   });
  // });

  // test('Verify that when incorrect formate of dob in the body should return a 400 Bad Request', async ({
  //   request,
  // }) => {
  //   //Given that invalid dob formate is in body payload
  //   //When the request is sent request to /user endpoint
  //   const response = await patch(
  //     request,
  //     `${baseUrl_TP}/user/${userId}`,
  //     generateFullUserRequestBody({
  //       dob: '01/01/1999',
  //     }),
  //      header(stdTxnToken),
  //   );
  //   //Then the response should be 400 with message 'body/dob Expected string to match pattern ^\\d{4}-\\d{2}-\\d{2}$'
  //   expect(await response.status()).to.equal(400);
  //   expect(await response.json()).to.deep.equal({
  //     statusCode: 400,
  //     error: 'Bad Request',
  //     message:
  //       'body/dob Expected string to match pattern ^\\d{4}-\\d{2}-\\d{2}$',
  //   });
  // });
  //////////////////////////////////////
  // residenceCountry
  //////////////////////////////////////
  test('Verify that when residenceCountry is not a string in the body should return a 400 Bad Request', async ({
    request,
  }) => {
    //Given that residenceCountry is not a string and is in body payload
    //When the request is sent request to /user endpoint
    const response = await patch(
      request,
      `${baseUrl_TP}/user/${userId}`,
      generateFullUserRequestBody({
        residenceCountry: 12345,
      }),
      header(stdTxnToken)
    );
    //Then the response should be 400 with message contain 'body/residenceCountry Expected 'AF''
    expect(await response.status()).to.equal(400);
    expect(await response.text()).to.include(
      "body/residenceCountry Expected 'AF'"
    );
  });

  test('Verify that when invalid residenceCountry in the body should return a 400 Bad Request', async ({
    request,
  }) => {
    //Given that invalid residenceCountry is in body payload
    //When the request is sent request to /user endpoint
    const response = await patch(
      request,
      `${baseUrl_TP}/user/${userId}`,
      generateFullUserRequestBody({
        residenceCountry: 'SweetHomeTestLand',
      }),
      header(stdTxnToken)
    );
    //Then the response should be 400 with message "body/residenceCountry Expected 'AF"
    expect(await response.status()).to.equal(400);
    expect(await response.text()).to.include(
      "body/residenceCountry Expected 'AF"
    );
  });
  //////////////////////////////////////
  // nationality
  //////////////////////////////////////
  //BUG
  // test('Verify that when nationality is not a string in the body should return a 400 Bad Request', async ({
  //   request,
  // }) => {
  //   //Given that nationality is not a string and is in body payload
  //   //When the request is sent request to /user endpoint
  //   const response = await patch(
  //     request,
  //     `${baseUrl_TP}/user/${userId}`,
  //     generateFullUserRequestBody({
  //       nationality: 12345,
  //     }),
  //      header(stdTxnToken),
  //   );
  //   //Then the response should be 400 with message contain "body/nationality Expected 'AF'"
  //   expect(await response.status()).to.equal(400);
  //   expect(await response.text()).to.include("body/nationality Expected 'AF'");
  // });
  //BUG
  // test('Verify that when invalid nationality in the body should return a 400 Bad Request', async ({
  //   request,
  // }) => {
  //   //Given that invalid nationality is in body payload
  //   //When the request is sent request to /user endpoint
  //   const response = await patch(
  //     request,
  //     `${baseUrl_TP}/user/${userId}`,
  //     generateFullUserRequestBody({
  //       nationality: 'SweetHomeTestLand',
  //     }),
  //      header(stdTxnToken),
  //   );
  //   //Then the response should be 400 with message "body/nationality Expected 'AF"
  //   expect(await response.status()).to.equal(400);
  //   expect(await response.text()).to.include("body/nationality Expected 'AF'");
  // });
});

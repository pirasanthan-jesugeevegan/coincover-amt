import { test } from '@playwright/test';
import { createUser } from '../../requests/example.request';
import { expect } from 'chai';
import { v4 as uuidv4 } from 'uuid';

test.describe(`Happy Path - Register User Endpoint`, async () => {
  //Given the positive data
  const payload = {
    username: `testuser${uuidv4()}_@coin.com`,
    first_name: 'John',
    last_name: 'Smith',
    email: `testuser${uuidv4()}_@coin.com`,
  };
  test('Verify that the user can create a new user with 201 status code', async ({
    request,
  }) => {
    //When the request is sent
    const response = await createUser(request, {
      ...payload,
      password: 'superCroc2019',
    });
    //Then the response should be positive
    expect(await response.status()).to.equal(201);
    expect(await response.json()).to.deep.equal(payload);
  });
});

test.describe(`Unhappy Path - Register User Endpoint`, async () => {
  test('Verify that with an empty body payload should return a 400 Bad Request response', async ({
    request,
  }) => {
    //Given the request is empty string
    //When the request is sent
    const response = await createUser(request, {});
    //Then the response should be a 400 & 'This field is required.' & 'This field is required.'
    expect(await response.status()).to.equal(400);
    expect(await response.json()).to.deep.equal({
      username: ['This field is required.'],
      password: ['This field is required.'],
    });
  });

  test('Verify that with an with username & no password body payload should return a 400 Bad Request response', async ({
    request,
  }) => {
    //Given the request only has username
    //When the request is sent
    const response = await createUser(request, {
      username: 'coin_password',
    });
    //Then the response should be a 400 & 'This field is required.'
    expect(await response.status()).to.equal(400);
    expect(await response.json()).to.deep.equal({
      password: ['This field is required.'],
    });
  });
  test('Verify that with an with password & no username body payload should return a 400 Bad Request response', async ({
    request,
  }) => {
    //Given the request only has password
    //When the request is sent
    const response = await createUser(request, {
      password: 'password',
    });
    //Then the response should be a 400 & 'This field is required.'
    expect(await response.status()).to.equal(400);
    expect(await response.json()).to.deep.equal({
      username: ['This field is required.'],
    });
  });
  test('Verify that with a user name that already exist should return a 400 Bad Request response', async ({
    request,
  }) => {
    //Given the request has exisiting username
    //When the request is sent
    const response = await createUser(request, {
      username: 'username',
      password: 'password',
    });
    //Then the response should be a 400 & 'A user with that username already exists'
    expect(await response.status()).to.equal(400);
    expect(await response.json()).to.deep.equal({
      username: ['A user with that username already exists.'],
    });
  });
});

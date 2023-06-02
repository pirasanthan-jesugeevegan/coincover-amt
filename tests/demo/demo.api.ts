import { test } from '@playwright/test';
import { createUser } from '../../requests/example.request';
import { expect } from 'chai';
import { v4 as uuidv4 } from 'uuid';

test.describe(`Happy Path - Register User Endpoint`, async () => {
  const payload = {
    username: `testuser${uuidv4()}_@coin.com`,
    first_name: 'John',
    last_name: 'Smith',
    email: `testuser${uuidv4()}_@coin.com`,
  };
  test('Verify that the user can create a new user with 201 status code', async ({
    request,
  }) => {
    const response = await createUser(request, {
      ...payload,
      password: 'superCroc2019',
    });
    expect(await response.status()).to.equal(201);
    expect(await response.json()).to.deep.equal(payload);
  });
});

test.describe(`Unhappy Path - Register User Endpoint`, async () => {
  test('Verify that with an empty body payload should return a 400 Bad Request response', async ({
    request,
  }) => {
    const response = await createUser(request, {});
    expect(await response.status()).to.equal(400);
    expect(await response.json()).to.deep.equal({
      username: ['This field is required.'],
      password: ['This field is required.'],
    });
  });

  test('Verify that with an with username & no password body payload should return a 400 Bad Request response', async ({
    request,
  }) => {
    const response = await createUser(request, {
      username: 'coin_password',
    });
    expect(await response.status()).to.equal(400);
    expect(await response.json()).to.deep.equal({
      password: ['This field is required.'],
    });
  });
  test('Verify that with an with password & no username body payload should return a 400 Bad Request response', async ({
    request,
  }) => {
    const response = await createUser(request, {
      password: 'password',
    });
    expect(await response.status()).to.equal(400);
    expect(await response.json()).to.deep.equal({
      username: ['This field is required.'],
    });
  });
  test('Verify that with a user name that already exist should return a 400 Bad Request response', async ({
    request,
  }) => {
    const response = await createUser(request, {
      username: 'username',
      password: 'password',
    });
    expect(await response.status()).to.equal(400);
    expect(await response.json()).to.deep.equal({
      username: ['A user with that username already exists.'],
    });
  });
});

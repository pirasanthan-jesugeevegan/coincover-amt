const axios = require('axios');
const fs = require('fs');

const TEST_TYPE = process.env.TEST_TYPE;
const USER_NAME = process.env.USER_NAME;

const today = new Date().toISOString().slice(0, 10);
const filePath = './results.json';
const { totalTestsCount, passedTestsCount } = testResult(filePath);

function testResult(filePath) {
  const json = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const testResults = json.suites.flatMap((suite) =>
    suite.specs.flatMap((spec) => spec.tests)
  );
  const passedTestsCount = testResults.filter((test) =>
    test.results.every((result) => result.status === 'passed')
  ).length;
  const totalTestsCount = testResults.length;

  return { totalTestsCount, passedTestsCount };
}

async function sendTeamsWebhook(webhookUrl, card) {
  try {
    const response = await axios.post(webhookUrl, {
      '@type': 'MessageCard',
      summary: 'New notification',
      themeColor: passedTestsCount === totalTestsCount ? '00d700' : 'd70400',
      sections: [card],
    });
    console.log('Webhook sent successfully');
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error sending webhook:', error.message);
  }
}

const webhookUrl =
  'https://daiprotect.webhook.office.com/webhookb2/66af9574-7257-438e-8045-a4fb43f8c61a@c904af66-46d2-4df0-b23c-5fb7ba5c0783/IncomingWebhook/1b595e7c71494f039425aaede0ea61dd/e9b9d08a-7124-4d52-a399-0e9717b11276';
const url = `https://coincover-pj.s3.us-east-1.amazonaws.com/${TEST_TYPE}/${today}/index.html`;
const card = {
  title: `${TEST_TYPE.toUpperCase()} Test Run Completed`,
  facts: [
    {
      name: 'Triggered by',
      value: USER_NAME,
    },
  ],
  markdown: true,
  potentialAction: [
    {
      '@type': 'OpenUri',
      name: 'View Report',
      targets: [{ os: 'default', uri: url }],
    },
  ],
};

if (TEST_TYPE !== 'pt') {
  const result = `Number of passed tests: ${passedTestsCount} out of ${totalTestsCount}`;
  const status = passedTestsCount === totalTestsCount ? 'PASSED' : 'FAILED';

  card.facts.push(
    {
      name: 'Result',
      value: result,
    },
    {
      name: 'Status',
      value: status,
    }
  );
}
sendTeamsWebhook(webhookUrl, card);

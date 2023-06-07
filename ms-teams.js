const axios = require('axios');
const fs = require('fs/promises');

const TEST_TYPE = process.env.TEST_TYPE;
const USER_NAME = process.env.USER_NAME;

const today = new Date().toISOString().slice(0, 10);
const filePath = './results/results.json';
const webhookUrl =
  'https://daiprotect.webhook.office.com/webhookb2/66af9574-7257-438e-8045-a4fb43f8c61a@c904af66-46d2-4df0-b23c-5fb7ba5c0783/IncomingWebhook/1b595e7c71494f039425aaede0ea61dd/e9b9d08a-7124-4d52-a399-0e9717b11276';
const url = `https://coincover-pj.s3.us-east-1.amazonaws.com/${TEST_TYPE}/${today}/index.html`;
let payload = {
  '@type': 'MessageCard',
  summary: 'New notification',
  sections: [
    {
      title: `${TEST_TYPE.toUpperCase()} Test Run Completed`,
      facts: [
        {
          name: 'Triggered by',
          value: USER_NAME,
        },
      ],
      potentialAction: [
        {
          '@type': 'OpenUri',
          name: 'View Report',
          targets: [{ os: 'default', uri: url }],
        },
      ],
    },
  ],
};

async function sendTeamsWebhook(webhookUrl, payload) {
  try {
    const response = await axios.post(webhookUrl, payload);
    console.log('Webhook sent successfully');
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error sending webhook:', error.message);
  }
}

(async () => {
  if (TEST_TYPE !== 'pt') {
    try {
      const json = JSON.parse(await fs.readFile(filePath, 'utf-8'));
      let totalPassedTests = 0;
      let totalTests = 0;

      json.suites.forEach((suite) => {
        suite.suites.forEach((suite) => {
          totalTests += suite.specs.length;
          const passedTests = suite.specs.reduce((count, spec) => {
            return spec.ok == true ? count + 1 : count;
          }, 0);
          totalPassedTests += passedTests;
        });
      });

      const result = `Number of passed tests: ${totalPassedTests} out of ${totalTests}`;
      const status = totalPassedTests === totalTests ? 'PASSED' : 'FAILED';

      payload.sections[0].facts.push(
        {
          name: 'Result',
          value: result,
        },
        {
          name: 'Status',
          value: status,
        }
      );
    } catch (error) {
      console.error('Error reading file:', error.message);
    }
  }

  await sendTeamsWebhook(webhookUrl, payload);
})();

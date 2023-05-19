const axios = require('axios');

const TEST_TYPE = process.env.TEST_TYPE;
const today = new Date().toISOString().slice(0, 10);
console.log(today);

async function sendTeamsWebhook(webhookUrl, card) {
  try {
    const response = await axios.post(webhookUrl, {
      '@type': 'MessageCard',
      summary: 'New notification',
      themeColor: '0072C6',
      sections: [card],
    });
    console.log('Webhook sent successfully');
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error sending webhook:', error.message);
  }
}

// Replace 'YOUR_WEBHOOK_URL' with the actual webhook URL for your Microsoft Teams channel
const webhookUrl =
  'https://daiprotect.webhook.office.com/webhookb2/66af9574-7257-438e-8045-a4fb43f8c61a@c904af66-46d2-4df0-b23c-5fb7ba5c0783/IncomingWebhook/1b595e7c71494f039425aaede0ea61dd/e9b9d08a-7124-4d52-a399-0e9717b11276';
const url = `https://coincover-pj.s3.us-east-1.amazonaws.com/${TEST_TYPE}/${today}/index.html`;
const card = {
  title: 'Test Run Completed',

  potentialAction: [
    {
      '@type': 'OpenUri',
      name: 'View Report',
      targets: [{ os: 'default', uri: url }],
    },
  ],
};

sendTeamsWebhook(webhookUrl, card);

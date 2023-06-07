import connectToDatabase from './connection';

export async function executeQuery(customer) {
  const client = await connectToDatabase();
  const query = `
      INSERT INTO customers (customer_name, email)
      VALUES ($1, $2)
      RETURNING customer_id
    `;
  const values = [customer.customer_name, customer.email];
  const result = await client.query(query, values);

  return result.rows[0].customer_id;
}

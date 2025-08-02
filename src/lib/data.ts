import postgres from 'postgres';
import {CustomerField, CustomersTableType, InvoiceForm, InvoicesTable, LatestInvoiceRaw, Revenue} from '@/lib/definitions';
import {formatCurrency} from '@/lib/utils'
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchCardData(){
    try {
        const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
        const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
        const invoiceStatusPromise = sql`SELECT
        SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
        SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending" FROM invoices`;

        const data = await Promise.all([
            invoiceCountPromise,
            customerCountPromise,
            invoiceStatusPromise
        ]);

        const numberOfInvoices = Number(data[0][0].count??'0')
        const numberOfCustomers = Number(data[1][0].count??'0')
        const totalPaidInvoices = formatCurrency(Number(data[2][0].paid??'0'))
        const totalPendingInvoices = formatCurrency(Number(data[2][0].pending??'0'))

        return {
            numberOfInvoices,numberOfCustomers, totalPaidInvoices, totalPendingInvoices
        };
    } catch (error) {
        console.error('DB error',error)
        throw new Error('Failed to fetch card data.')
    }
}
export async function fetchRevenue() {
    try {
        console.log('Fetching revenvue data...');
        await new Promise((resolve) =>setTimeout(resolve, 3000));
        const data = await sql<Revenue[]>`SELECT * FROM revenue `;
        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

export async function fetchLatestInvoices(){
    try {
        const data = await sql<LatestInvoiceRaw[]>`SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
        FROM invoices
        JOIN customers ON invoices.customer_id = customers.id
        ORDER BY invoices.date DESC
        LIMIT 5`;
        const latestInvoice = data.map((invoice)=>({
        ...invoice,amount:formatCurrency(invoice.amount),
    }));
    return latestInvoice        
    } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');        
    }
}
const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable[]>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}
export async function fetchInvoicesPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}
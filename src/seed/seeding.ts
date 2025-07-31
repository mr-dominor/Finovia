import pool from "../lib/dbconfig";
import bcrypt from 'bcrypt';
import { invoices, customers, revenue, users } from '../lib/placeholder-data';

async function seedUsers() {
    await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL 
        );
    `);

    const insertUsers = await Promise.all(
        users.map(async (user) => {
            const hashedPass = await bcrypt.hash(user.password, 10);
            return pool.query(`
                INSERT INTO users (id, name, email, password)
                VALUES ($1, $2, $3, $4)
                ON CONFLICT (id) DO NOTHING
            `, [user.id, user.name, user.email, hashedPass]);
        })
    );

    return insertUsers;
}

async function seedCustomers() {
    await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await pool.query(`
        CREATE TABLE IF NOT EXISTS customers (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            image_url VARCHAR(255) NOT NULL 
        );
    `);

    const insertCustomers = await Promise.all(
        customers.map(async (customer) => pool.query(`
            INSERT INTO customers (id, name, email, image_url)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (id) DO NOTHING
        `, [customer.id, customer.name, customer.email, customer.image_url]))
    );

    return insertCustomers;
}

async function seedInvoices() {
    await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await pool.query(`
        CREATE TABLE IF NOT EXISTS invoices (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            customer_id UUID NOT NULL,
            amount INT NOT NULL,
            status VARCHAR(255) NOT NULL,
            date DATE NOT NULL 
        );
    `);

    const insertInvoices = await Promise.all(
        invoices.map(async (invoice) => pool.query(`
            INSERT INTO invoices (customer_id, amount, status, date)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT DO NOTHING
        `, [invoice.customer_id, invoice.amount, invoice.status, invoice.date]))
    );

    return insertInvoices;
}

async function seedRevenue() {
    await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await pool.query(`
        CREATE TABLE IF NOT EXISTS revenue (
            month VARCHAR(4) NOT NULL UNIQUE,
            revenue INT NOT NULL
        );
    `);

    const insertRevenue = await Promise.all(
        revenue.map(async (rev) => pool.query(`
            INSERT INTO revenue (month, revenue)
            VALUES ($1, $2)
            ON CONFLICT (month) DO NOTHING
        `, [rev.month, rev.revenue]))
    );

    return insertRevenue;
}

export async function GET() {
    try {
        const [users, customers, invoices, revenue] = await Promise.all([
            seedUsers(),
            seedCustomers(),
            seedInvoices(),
            seedRevenue()
        ]);

        return new Response(JSON.stringify({
            message: "Database seeded successfully",
            users: users.length,
            customers: customers.length,
            invoices: invoices.length,
            revenue: revenue.length,
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (err) {
        console.error("Seeding error:", err);
        return new Response(JSON.stringify({
            message: "Database seeding failed",
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

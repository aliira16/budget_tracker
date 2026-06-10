import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
    user: 'postgres',
    password: '040721',
    host: 'localhost',
    port: '5432',
    database: 'budget_tracker_db'
});

export default pool;
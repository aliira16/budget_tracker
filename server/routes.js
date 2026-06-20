import e from "express";
import pool from "./db.js"

const router = e.Router();

//login (get user_id)

router.post('/login', async (req, res) => {
    try {
        const { username } = req.body;
        const result = await pool.query('SELECT id FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0) {
            return res.status(401).json({ error: "user not found" })
        }
        res.json({ user_id: result.rows[0].id });
    } catch (error) {
        res.status(500).json({ error: "SERVER login err" })
    }
})

//GET all transactions 

router.get('/transactions/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params;
        const result = await pool.query('SELECT * FROM transactions WHERE user_id = $1 ORDER BY created_at DESC', [user_id]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: "SERVER GET transactions err" })
    }
})

//POST new transactions

router.post('/transactions', async (req, res) => {
    try {
        const { user_id, description, amount, type } = req.body;
        if (!description || !amount || !type) {
            return res.status(400).json({ error: "Missing fields" });
        }
        const result = pool.query('INSERT INTO transactions (user_id , description, amount, type) VALUES ($1, $2, $3, $4) RETURNING *', [user_id, description, parseFloat(amount), type]);
        res.status(201).json((await result).rows[0]);
    } catch (error) {
        res.status(500).json({ error: "SERVER POST transactions err" });
    }
})

//DELETE transactions

router.delete('/transactions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM transactions WHERE id = $1', [id])
        res.status(201).json({ message: 'DELETED' })
    } catch (error) {
        res.status(500).json({ error: "SERVER DELETE transactions err" });
    }
})


export default router;


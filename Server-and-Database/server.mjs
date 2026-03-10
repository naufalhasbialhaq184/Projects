import express from "express";
import pool from "./db.mjs";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Mengambil semua menu tugas dari data base
app.get("/tugas", async (req,res) =>{
   try {
    const all_tasks = await pool.query("SELECT * FROM tugas ORDER BY id DESC");
    res.json(all_tasks.rows);
    console.log(`data berhasil di ambil `)

   } catch (error) {
    console.log(error.message);
    res.send(`Error ${error.message}`)
   };
});

app.put("/tugas/:id/set_check", async (req, res) =>{
    try {
        const {id} = req.params;
        const {is_done} = req.body;

        console.log(is_done)
        console.log(id)
        const update_tasks = await pool.query('UPDATE tugas SET is_done = $1 WHERE id = $2 RETURNING *',
            [is_done, id]
        );

        res.json(update_tasks.rows[0])

    } catch (error) {
        
    }
})



app.delete("/tugas/delete", async (req, res) =>{
    try {
        const new_table = await pool.query("DELETE FROM tugas where is_done = TRUE RETURNING *")
        res.json(new_table.rows[0])
    } catch (error) {
        console.log(error.message)
    }
})

// Menambah tugas ke database dan mengirim kembali
app.post("/tugas", async (req, res) => {
    try {
        const {mata_kuliah, judul_tugas, deadline} = req.body
        const new_tasks = await pool.query("INSERT INTO tugas(mata_kuliah, judul_tugas, deadline) VALUES ($1, $2, $3) RETURNING *",
        [mata_kuliah, judul_tugas, deadline]);
        res.json(new_tasks.rows[0]);
    } catch (error) {
        console.log(error.message);
        res.send(`ERROR ${error.message}`);
    };
})

app.listen(port, () =>{
    console.log(`Server connected to ${port}`);
});
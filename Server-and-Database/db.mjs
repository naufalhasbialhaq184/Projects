import pg from "pg";

const {Pool} =  pg;

const pool = new Pool({
    user : "naufalhasbialhaq",
    host : "localhost",
    port : "5432",
    database : "Tugas"
});

export default pool;
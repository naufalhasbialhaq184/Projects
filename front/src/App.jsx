import React, { useState, useEffect } from "react";
import "./App.css";

const App = () =>{


  // Mendefinisikan Wadah
  const [tasks, set_tasks] =useState([]);
  const [form, set_form] = useState({
    mata_kuliah :"",
    judul_tugas :"",
    deadline :""
  })
  const [loading, set_loading] = useState(false);

  // Mengambil data dari backend
  const fetch_tasks = async () =>{
    const response = await fetch("http://localhost:3000/tugas")
    const data = await response.json()
    set_tasks(data)
  };

  // Menginput data dari backend

  useEffect(() => {
    fetch_tasks();
  }, []);

  // Handle Change
  const handle_change = (e) =>{
    set_form({...form, [e.target.name] : e.target.value})
  };

  // Mengirim data ke backend
  const handle_submit = async (e) => {
    e.preventDefault();
    set_loading(true);

    try {
      await fetch("http://localhost:3000/tugas", {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(form)
      });
      set_form({
        mata_kuliah : "",
        judul_tugas : "",
        deadline : ""
      });
      fetch_tasks();

    } catch (error) {
      console.log(`Ada error pas post data ${error}`)
    }

  };

  const handle_check = async (id, current_status) =>{
    try {
      await fetch(`http://localhost:3000/tugas/${id}/set_check`, {
        method : "PUT",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({is_done : !current_status})
      })

      fetch_tasks()
    } catch (error) {
      console.log(`error di tempat centang ${error.message}`)
    }
  }; 

  const hapus_tugas = async (req, res) =>{
    const apakah = confirm("Apakah kamu yakin ingin menghapus seluruh pekerjaan yang selesai")
    if (apakah){
      try {
        await fetch(`http://localhost:3000/tugas/delete`,{
        method : "DELETE"
      });
      fetch_tasks();
      } catch (error) {
        console.log(`error di tempat hapus tugas ${error.message}`)
      }
    };
  };

  return(
    <div className= "container">
     <h1 className="header">Student Task Manager</h1>
     <div className="container_input">
      <span>Input Tugas</span>
      <form action="" name = "form_tugas" onSubmit={handle_submit}>
        <div className="mata_kuliah">

            <input 
            type="text" 
            name="mata_kuliah"
            value={form.mata_kuliah}
            onChange ={handle_change}
            required
            placeholder="Mata Kuliah"
            />

        </div>
        <div className="judul_tugas">
          <input 
          type="text" 
          name="judul_tugas" 
          value={form.judul_tugas}
          onChange ={handle_change}
          required
          placeholder="Judul Tugas"
          />

        </div>
        <div className="deadline">

          <input 
          type="date" 
          name="deadline"
          value={form.deadline}
          onChange ={handle_change}
          required
          />

        </div>
        <button>Submit</button>
      </form>
      <div className="hapus_checked">
      <button onClick={hapus_tugas}>Hapus Tugas Selesai</button>
     </div>
     </div>
     <div className="container_tugas">
      <span>Tabel Daftar Tugas</span>
      <table className="tabel_tugas">
        <thead>
          <tr>
            <th>Nama Mata Kuliah</th>
            <th>Judul Tugas</th>
            <th>Deadline</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.mata_kuliah}</td>
              <td>{task.judul_tugas}</td>
              <td>{new Date(task.deadline).toLocaleDateString("id-ID", {
                day : "numeric", month :"long", year : "numeric"
              })}
              </td>
              <td><input type="checkbox" name="checkbox" checked = {task.is_done ||false } onChange={() =>{handle_check(task.id, task.is_done)}} /></td>
            </tr>
          ))}
        </tbody>
      </table>
     </div>
  
    </div>
  )
};

export default App;
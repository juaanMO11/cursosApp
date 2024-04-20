const express = require("express");
const bodyParser = require("express");
const app = express();
const path = require("path")
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs'); // Configura EJS como motor de plantillas
//Conexion a la base de datos//
const { Pool } = require('pg');
const pool = new Pool({
    user: 'cursosycursos_user',
    host: 'dpg-co8qfv7109ks73ej98vg-a.oregon-postgres.render.com',
    database: 'cursosycursos_asqy',
    password: 'jC59asj5dkD2ZxDqcYLkfYer1oSqjcCR',
    port: 5432,
    ssl: {
      // Establece la configuración SSL/TLS aquí
      // Por ejemplo:
      rejectUnauthorized: false, // Para evitar errores de "SSL/TLS required"
      // cert: fs.readFileSync('ruta/al/certificado.crt')
  }
  });
//-----------------------------------------//

//Endpoint para agregar un comentario//
app.post('/insertar', async (req, res) => {
    const { nombre, email, comentario } = req.body;
    console.log(nombre, email, comentario);
    try {
      await pool.query('INSERT INTO comentarios (name, email, comentario) VALUES ($1, $2, $3)', [nombre, email, comentario]);
      res.send('Comentario agregado correctamente');
    } catch (error) {
      console.error('Error al agregar comentario', error);
      res.status(500).json({ error: 'Error al agregar comentario' });
    }
  });
//Endpoint para ver un comentario//
  app.get('/comentarios', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, name, comentario FROM comentarios');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener comentarios:', error);
        res.status(500).json({ error: 'Error al obtener comentarios' });
    }
  });
// Endpoint para editar un comentario
app.put('/comentarios/:id', async (req, res) => {
  const comentarioId = req.params.id;
  const { comentario } = req.body; // Solo necesitamos el nuevo comentario
  try {
    await pool.query('UPDATE comentarios SET comentario = $1 WHERE id = $2', [comentario, comentarioId]);
    res.send('Comentario actualizado correctamente');
  } catch (error) {
    console.error('Error al actualizar comentario', error);
    res.status(500).json({ error: 'Error al actualizar comentario' });
  }
});
  // Endpoint para eliminar un comentario
  app.delete('/comentarios/:id', async (req, res) => {
    const comentarioId = req.params.id;
    try {
      await pool.query('DELETE FROM comentarios WHERE id = $1', [comentarioId]);
      res.send('Comentario eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar comentario', error);
      res.status(500).json({ error: 'Error al eliminar comentario' });
    }
  });
  (async () => {
    const client = await pool.connect();
    try {
      await client.query("SELECT setval('comentarios_id_seq', (SELECT MAX(id) FROM comentarios))");
      console.log('Secuencia actualizada correctamente.');
    } catch (error) {
      console.error('Error al actualizar la secuencia:', error);
    } finally {
      client.release();
    }
  })
//-----------------------------------------//

//Servidor//
app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname + '/index.html'))
})
app.use(express.static("public"));
app.listen(3000, ()=>{
    console.log("server running on port",3000);
})
//-----------------------------------------//

//Rutas para las categorias//
app.get("/desarrolloPersonalYProfesional", (req,res)=>{
    res.sendFile(path.join(__dirname + '/cursosCategories/desarrolloPersonalYProfesional.html'))
})
app.get("/tecnologiaYPogramacion", (req,res)=>{
    res.sendFile(path.join(__dirname + '/cursosCategories/tecnologiaYPogramacion.html'))
})
app.get("/negociosYEmprendimiento", (req,res)=>{
    res.sendFile(path.join(__dirname + '/cursosCategories/negociosYEmprendimiento.html'))
})
app.get("/arteYDisenio", (req,res)=>{
    res.sendFile(path.join(__dirname + '/cursosCategories/arteYDisenio.html'))
})
app.get("/idiomas", (req,res)=>{
    res.sendFile(path.join(__dirname + '/cursosCategories/idiomas.html'))
})
app.get("/saludYBienestar", (req,res)=>{
    res.sendFile(path.join(__dirname + '/cursosCategories/saludYBienestar.html'))
})
app.get("/cienciaYMatematicas", (req,res)=>{
    res.sendFile(path.join(__dirname + '/cursosCategories/cienciaYMatematicas.html'))
})
app.get("/humanidadesYCienciasSociales", (req,res)=>{
    res.sendFile(path.join(__dirname + '/cursosCategories/humanidadesYCienciasSociales.html'))
})
app.get("/desarrolloWebYTecnologiasDigitales", (req,res)=>{
    res.sendFile(path.join(__dirname + '/cursosCategories/desarrolloWebYTecnologiasDigitales.html'))
})
app.get("/educacionYEnsenianza", (req,res)=>{
    res.sendFile(path.join(__dirname + '/cursosCategories/educacionYEnsenianza.html'))
})
//Rutas para los cursos//
app.get("/cursoprueba", (req,res)=>{
  res.sendFile(path.join(__dirname + '/cursosCategories/cursoprueba.html'))
})
//-----------------------------------------//
module.exports = app;
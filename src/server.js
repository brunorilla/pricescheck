import {app} from './app.js';
import {buscarAlumno} from "./buscarAlumno.js";


app.listen(8080, (err) => {
    if (err) throw err;
    console.log("Express corriendo en puerto 8080");
})

app.get('/', (req, res) => {
    return res.send("<h1>Por favor especifique una ruta para obtener información</h1>");
});
app.get('/alumnos', (req, res) => {
    console.log(typeof req.query);
    if (Object.entries(req.query).length === 0) {
        return res.send("<h2>Por favor especifique un alumno para obtener información.</h2>")
    } else {
        let response = buscarAlumno(req.query);
        if(response !== 0){
            res.send(JSON.stringify(response));
        } else {
            res.send("No se encontró un alumno con ese DNI");
        }
    }

});


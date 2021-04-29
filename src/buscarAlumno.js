function buscarAlumno(query) {
    let returnValue = 0,
    alumnos =
        [
            {dni: 35823232, nombre: "robledo", apellido: "puch"}, {dni: 39238102, nombre: "juan", apellido: "roque"}
        ]
    if (query.hasOwnProperty('dni')) {
        var searchValue = parseInt(query.dni);
        alumnos.forEach(elem => {
            if (elem.dni === searchValue) {
                returnValue = elem;
            }
        });
    };

    return returnValue;

}

export {
    buscarAlumno
}
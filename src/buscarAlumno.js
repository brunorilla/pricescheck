function buscarAlumno(query, collection) {
    var returnValue = 0;

    if (query.hasOwnProperty('dni')) {
        var searchValue = parseInt(query.dni);
        // console.dir(collection);
        console.log("typeof collection: " + typeof collection);
        collection.find().toArray((err, result) => {
            if (err) throw err;
            console.log("typeof result: " + typeof result);
            console.log(result);
            result.forEach(elem => {
                if (elem.dni === searchValue) {
                    returnValue = elem;
                }
            });
        })

    }

    return returnValue;

}

export {
    buscarAlumno
}
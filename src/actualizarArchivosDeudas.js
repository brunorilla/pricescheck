import fs from 'fs';

function actualizarArchivosDeudas(urlViejo, urlPago, urlNuevo, urlLog) {
    let rawDataDeuda = fs.readFileSync(urlViejo);
    let rawDataPagos = fs.readFileSync(urlPago)

    let parsedDeuda = JSON.parse(rawDataDeuda);
    let parsedPagos = JSON.parse(rawDataPagos);
    let newJsonDeudas = [];

    newJsonDeudas = apareoArchivos(parsedDeuda, parsedPagos, newJsonDeudas, urlLog);
    try {
        createNewDeudasFile(newJsonDeudas,urlNuevo);
    } catch(e){
        console.error("Está toda mal hecha esta app.");
    }

}

function apareoArchivos(deudas, pagos, jsonDeudas, urlLog) {
    for (const deuda of deudas) {
        for (const pago of pagos) {
            let rta = verificarDeudaPago(deuda, pago, urlLog);
            rta !== 0 ? jsonDeudas.push(rta) : '';
        }
    }
    return jsonDeudas;
}


function verificarDeudaPago(deuda, pago, urlLog) {

    // Comparo el dni del pago con el de la deuda
    let rta = 0;
    if (deuda.dni === pago.dni) {
        let saldo = verificarSaldo(deuda, pago);
        if (saldo > 0) {
            loguearEventos(buildMessage(deuda, pago, saldo), urlLog);
            deuda = construirDeuda(deuda, saldo);
            rta = deuda;
        } else {
            loguearEventos(buildMessage(deuda, pago, saldo), urlLog);
        }
    }
    return rta;
}


function construirDeuda(deuda, nuevoSaldo) {
    deuda.debe = nuevoSaldo;
    return deuda;
}

function verificarSaldo(deuda, pago) {
    let saldo;
    return saldo = deuda.debe - pago.pago;
}

function loguearEventos(msg, filePath) {
    fs.appendFileSync(filePath, msg);
}

function buildMessage(deuda, pago, saldo) {
    let msg;
    const sr = "\n ~~~~~~~~~~~~~~~ \n";
    if (saldo > 0) {
        msg = `${sr} Evento: \n ${deuda.nombre}  ${deuda.apellido} registrado con el dni: ${deuda.dni} pagó ${pago.pago} \n ** DEBE ${saldo} ** \n`;
    } else {
        msg = `${sr} Evento: \n ${deuda.nombre}  ${deuda.apellido} registrado con el dni: ${deuda.dni} pagó ${pago.pago} \n ** DEUDA SALDADA ** \n`;
    }
    return msg;
}

function createNewDeudasFile(object, url) {
    let content = JSON.stringify(object);
    try {
        fs.writeFileSync(url, content);
    } catch (e) {
        throw new Error('Error al crear archivo de salida');
    }
}

export {
    actualizarArchivosDeudas,
    construirDeuda,
    verificarDeudaPago,
    loguearEventos,
    verificarSaldo
}

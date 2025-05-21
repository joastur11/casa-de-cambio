document.querySelector('#calcular-cambio').onclick = calcularCambio

const $calcularCambio = document.querySelector('#calcular-cambio');

function cambiarBoton (){
    $calcularCambio.textContent ='Reiniciar'
    $calcularCambio.setAttribute('value', 'reset')
}

function calcularCambio (){
    if ($calcularCambio.value === 'reset'){
        location.reload()
    }
    else{
        document.querySelector('#errores').innerText = '';
        if (validarInputs()){
        cambiarBoton()
        crearUrl()
        }
    }
}

function validarInputs (){
    if (validarFecha() && validarMonedas()){
        return true
    }
    return false
}

function validarFecha (){
    const fecha = document.querySelector('#fecha-ingresada').value
    if (new Date (fecha) < new Date ("2000-01-01")){
        document.querySelector('#errores').innerText = 'Por favor ingrese una fecha mayor a 2000-01-01'
        return false
    }
    if (new Date (fecha) > new Date ()){
        document.querySelector('#errores').innerText = 'No se adivinar el futuro'
        return false
        }
    if (!fecha){
        document.querySelector('#errores').innerText = 'Por favor ingrese una fecha'
        return false
    }
    return true
}
function validarMonedas (){
    const monedaOrigen = document.querySelector('#moneda-usuario').value
    const monedaDestino = document.querySelector('#moneda-cambio').value
    if (monedaOrigen === monedaDestino){
        document.querySelector('#errores').innerText = 'Por favor elija dos monedas distintas'
        return false
    }
    return true
}

function crearUrl (){
    const fecha = document.querySelector('#fecha-ingresada').value
    const monedaOrigen = document.querySelector('#moneda-usuario').value
    const monedaDestino = document.querySelector('#moneda-cambio').value

    const Url = `https://api.frankfurter.dev/v1/${fecha}?from=${monedaOrigen}&to=${monedaDestino}`

    fetch (Url)
        .then (respuesta => respuesta.json())
        .then (data => {
            const valorCambio = data.rates[monedaDestino]
            const resultado = `En ${fecha}, 1 ${monedaOrigen} es igual a ${valorCambio} ${monedaDestino}`
            document.querySelector('#resultado').innerText = resultado
        })
        .catch (error => console.error ('FALLO', error))
}



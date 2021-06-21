//FORMULARIO
form.addEventListener('submit', function LocalStorage() {

    //captura de datos y almacenamiento en variables
    let inputName = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let tarjeta = document.getElementById('numT').value
    let fecha = document.getElementById('fecha').value;
    let cvv = document.getElementById('CVV').value;

    //validación de campos vacíos
    if (inputName == "" || email == "" || tarjeta == "" || fecha == "" || cvv == "") {
        alert('Ingresar todos los campos');
        return true;
    }
    else {
        if (isNaN(inputName)) {
            localStorage.setItem("Name", inputName);
            localStorage.setItem("Email", email);
            localStorage.setItem("tarjeta", tarjeta);
            localStorage.setItem("fecha", fecha);
            localStorage.setItem("CVV", cvv);
            getLocalStorage();
        } else {
            alert("Name most string");
        }
        return false;
    }


})

//Obtener la información del local storage//
function getLocalStorage() {
    let nameSave = localStorage.getItem("Name");

    alert(`${nameSave} Su pago fue realizado de manera exitosa 
    ¡Esperamos disfrute de nuestro contenido. Vuelva Pronto
   
    `);
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){    
    const loginForm = document.getElementById('signin');
    //definir un evento para cuando se envie el formulario
    loginForm.onsubmit= function(e) {
        e.preventDefault();
        //guardar el email en localst
        let userEmail= document.getElementById('userEmail').value;
        // console.log(userEmail)
        localStorage.setItem('email', userEmail);
        //redireccionando a la portada
        window.location.href = 'home.html';
    };

});
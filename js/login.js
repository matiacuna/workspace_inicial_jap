//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){    
    const loginForm = document.getElementById('signin');
    //Evento para cuando se envie el formulario
    loginForm.onsubmit= function(e) {
        e.preventDefault();
        
        let userEmail= document.getElementById('userEmail').value;
       
        localStorage.setItem('email', userEmail); //Guarda usuario en localstorage
        
        window.location.href = 'home.html'; //redireccionando a home
    };

});
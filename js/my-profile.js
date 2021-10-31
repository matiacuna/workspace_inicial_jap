let userData = {}

//funcion que toma los datos ingresados por el usuario y los guarda en LS
function saveUser(){

    userData = {
        name: document.getElementById("name").value,
        lname: document.getElementById("lname").value,
        age: document.getElementById("age").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
       
    }

localStorage.setItem("profile",JSON.stringify(userData));

}

//funcion que inprime la informacion actual del usuario
function showUserData(userInfo){

    let userObj = JSON.parse(userInfo);

    html = `<ul class="list-group">
    <li class="list-group-item text-center" ><h2>informacion del usuario</h2></li>

    <li class="list-group-item list-group-item-info"><h4>Nombre: ${userObj.name} ${userObj.lname}</h4></li>
    <li class="list-group-item list-group-item-info"><h4>Edad: ${userObj.age}</h4> </li>
    <li class="list-group-item list-group-item-info"><h4>Email: ${userObj.email} </h4></li>
    <li class="list-group-item list-group-item-info"><h4>Telefono de contacto: ${userObj.phone} </h4></li>
    

  </ul>
  <br>
    
    
    `
    document.getElementById("infoUser").innerHTML = html;

    localStorage.email = userObj.name + " " + userObj.lname; //actualizo el nombre de lusuario que se imprime en la navbar

    document.getElementById("user").innerHTML =  localStorage.email;


}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    
    
    document.getElementById("save").addEventListener("click", function(e){
        saveUser();
        showUserData(localStorage.profile);
    });

    showUserData(localStorage.profile);


});
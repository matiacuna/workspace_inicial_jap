var cartProducts = [];
var altProductsUrl = 'https://matiacuna.github.io/jsons/articles.json'

var nameE = ""
var ageE = ""
var addressE = ""

var nameC = ""
var cardN = ""    
var cardCode = ""

var bankAc = ""

// función paar mostrar artículos en el carrito
function showCart(array){
    let htmlContent = "";
    for (let i = 0; i < array.length; i++){
        let article = array[i];
        if(article.currency === 'USD'){
            article.unitCost = article.unitCost * 40;
            article.currency = 'UYU'
        }
        let subtotal = article.count * article.unitCost;
        htmlContent += `
        <tr>
        <td><img src='${article.src}' width="100px"></td>
        <td>${article.name}</td>
        <td>${article.currency}</td>
        <td><input style = "width:60px;" onchange="calcSubTotal(${article.unitCost}, ${i})"
        type="number" id="cantidad${i}" value="${article.count}" min="1"></td>
        <td>${article.unitCost}</td>
        
        <td><span class="subTotal" id="subTotal${i}" style="font-weigth:bold;">${subtotal}</span></td>

        

        </tr>
        
       
    `
    document.getElementById("listado").innerHTML = htmlContent;
}
calcTotal();
}


// función para calcula el costo total
function calcTotal(){
    let total = 0;
    let subTotals = document.getElementsByClassName("subTotal");
    for (let i = 0; i < subTotals.length; i++){
        total += parseInt(subTotals[i].innerHTML);
    }

    //calculo metodo de envio
    if(document.getElementById("premium").checked){ 
        total = (total * 0.15) + total;        
    }
    if(document.getElementById("express").checked){ 
        total = (total * 0.07) + total;
    }
    if(document.getElementById("standard").checked){ 
        total = (total * 0.05) + total;
    }

    //imprimo total
    document.getElementById("total").innerHTML = total
}

// función para calcula el costo sub total
function calcSubTotal(count, i){

    let cantidad = parseInt(document.getElementById(`cantidad${i}`).value);
    subtotal = cantidad * count;      
    document.getElementById(`subTotal${i}`).innerHTML = subtotal;
    calcTotal();
}

//funcion apra validar si se ingrearon los datos necesarios para realizar al compra
function valData(){
    //datos de usuario
    nameE = document.getElementById("nameE").value;
    ageE = document.getElementById("ageE").value;
    addressE = document.getElementById("addressE").value;

    //datos de targeta
    nameC = document.getElementById("nameC").value;
    cardN = document.getElementById("cardN").value;
    cardCode = document.getElementById("cardCode").value;

    //datos banco
    bankAc = document.getElementById("bankAc").value;

    let itsOk1 = ""
    let itsOk2 = ""

    //valido si se ingresaron datos personales y lanzo un alert si no es asi
    if( nameE === "" || ageE === "" || addressE === ""){
        //alert("Antes de terminar, por favor completa tus datos personales")
        document.getElementById("alert1").innerHTML = ` <div class="alert alert-warning alert-dismissible fade show" role="alert" ><strong>Antes de terminar</strong>, por favor completa tus datos personales.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>  </div>`
        itsOk1 = "1"

    };

    //valido si se ingresaron datos de pago y lanzo un alert si no es asi
    if( (nameC === "" || cardN === "" || cardCode === "") && bankAc === "" ){
        //alert("Antes de terminar, por favor completa la forma de pago")
        document.getElementById("alert2").innerHTML = ` <div class="alert alert-warning alert-dismissible fade show" role="alert" ><strong>Antes de terminar</strong>, por favor completa la forma de pago.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>  </div>`
        itsOk2 = "1"

    };

    //valido si estan todos los datos completos y lanzo el mensaje de que la compra se realizo con exito
    if( itsOk1 ==! "1" && itsOk2 ==! "1" ) {
        //alert("Antes de terminar, por favor completa la forma de pago")
        document.getElementById("alert3").innerHTML = `<div class="alert alert-success" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
        <h1 class="alert-heading">Compra realizada con exito!</h1>
        <hr>
        <p class="mb-0">Te mantendremos al tanto del proceso del proceso de envio a traves de email, estate atento a tu correo!</p>
        
      </div>`
    };




}





//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(altProductsUrl).then(function (resultObj){
        if(resultObj.status === "ok"){
            cartProducts = resultObj.data.articles;
            showCart (cartProducts)
            calcTotal();
            
        }
    });

    document.getElementById("shipA").addEventListener("click", function(){ //cuando se seleeciona otro metodo de envio se actualiza el total
        calcTotal();
    });

    document.getElementById("buy").addEventListener("click", function(){
        valData();
    });


});
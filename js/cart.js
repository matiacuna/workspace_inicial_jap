var cartProducts = [];
var altProductsUrl = 'https://matiacuna.github.io/jsons/articles.json'

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
    document.getElementById("total").innerHTML = total;
    
}

// función para calcula el costo sub total
function calcSubTotal(count, i){

    let cantidad = parseInt(document.getElementById(`cantidad${i}`).value);
    subtotal = cantidad * count;      
    document.getElementById(`subTotal${i}`).innerHTML = subtotal;
    calcTotal();
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


});
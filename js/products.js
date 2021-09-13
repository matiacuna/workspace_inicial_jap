const ORDER_ASC_BY_PRICE = "Costo-Ascendente";
const ORDER_DESC_BY_PRICE = "Costo-Descendente";
const ORDER_BY_PROD_SOLD_COUNT = "Vendidos";
var currentProductArray = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;

//Funciones para filtrar productos segun el criterio seleccionado usando sort

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_SOLD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

//Fin funciones para filtrar productos segun el criterio seleccionado 


//Función para mostrar los productos
function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductArray.length; i++){
        let productList = currentProductArray[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(productList.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(productList.cost) <= maxCost))){

            htmlContentToAppend += `
            
            <div class="row">
            <div class="col-3">
                <img src="` + productList.imgSrc + `" alt="` + productList.description + `" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">` + productList.name + `</h4>
                    <small class="text-muted">` + productList.soldCount + ` vendidos</small>
                    
                </div>
                <p class="mb-1">` + productList.description + `</p><br>
                <p><b> ` + productList.currency + `-` + productList.cost + `</b><p>
            </div>
        </div>
        <hr>
                                    
                                    `
        }

        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
    }
}
//Fin función para mostrar los productos


// Funcion para setear un criterio para el orden y se muestra el producto

function sortAndShowProducts(sortCriteria, productArray){
    currentSortCriteria = sortCriteria;

    if(productArray != undefined){
        currentProductArray = productArray;
    }

    currentProductArray = sortProducts(currentSortCriteria, currentProductArray);

    
    showProductsList(); //Muestro los productos ordenados
}
// Fin funcion para setear un criterio para el orden y se muestra el producto


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_PRICE, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortBySoldCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_SOLD_COUNT);
    });

    //Borra el rango min y max de precio 
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList();
    });

     //Se setean el valor min y max de precio para filtrar segun este rango obtenido de los campos rangeFilterCost
    document.getElementById("rangeFilterCost").addEventListener("click", function(){


        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }

        showProductsList();
    });
});




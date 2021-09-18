const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}


function search(){
     
  let htmlContentToAppend = "";
  
  for(let i = 0; i < currentProductArray.length; i++){
      let productList = currentProductArray[i];
      let cadena = productList.name.toLowerCase();
     
      if (cadena.indexOf(localStorage.search) !== -1){

          htmlContentToAppend += `
          <a href="product-info.html" class="list-group-item list-group-item-action">
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
          </a>
          `
      }

      document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
  
  }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  document.getElementById("user").innerHTML =  localStorage.email;

  document.getElementById("boton").addEventListener("click", function(e){
    e.preventDefault();

    if(window.location !== './products.html'){
      alert ("De momento la funcion de buscar esta disponible solo en la pagina de productos =(  Sentimos las moelstias. ");
    }
 


    formulario = document.getElementById("editSearch").value;

    localStorage.setItem('search', formulario);
    
    // window.location.href = 'products.html'

    
    
    search();
    

        
});

document.getElementById("editSearch").addEventListener("keyup", function(e){
  e.preventDefault();
  formulario = document.getElementById("editSearch").value;

    localStorage.setItem('search', formulario);
 
  search();
      
});
  
});
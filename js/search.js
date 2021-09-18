function searchBox(){
     
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
                        
                        <p><b> ` + productList.currency + `-` + productList.cost + `</b><p>
                    </div>
                </div>
            </a>
            `
        }
  
        document.getElementById("searchBox").innerHTML = htmlContentToAppend;
    
    }
  }


document.addEventListener("DOMContentLoaded", function(e){

      document.getElementById("editSearch").addEventListener("keyup", function(e){
        // $('.searchBox').toggleClass('active');
        e.preventDefault();
        formulario = document.getElementById("editSearch").value;
      
          localStorage.setItem('search', formulario);
       
        searchBox();
            
      });

      document.getElementById("editSearch").addEventListener("click", function(e){
        $('.searchBox').toggleClass('active');



      });
})
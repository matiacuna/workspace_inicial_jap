
// funcion para mostrar la información del producto
function showProductInfo(p){
    let product_InfoNameHTML  = document.getElementById("product_Info_Name");
    let product_InfoDescriptionHTML = document.getElementById("product_Info_Description");
    let product_InfoSoldCountHTML = document.getElementById("product_Info_Sold_Count");
    let product_InfoCategoryHTML = document.getElementById("product_Info_Category");
    let product_InfoCostHTML = document.getElementById("product_Info_Cost");

    product_InfoNameHTML.innerHTML = p.name;
    product_InfoDescriptionHTML.innerHTML = p.description;
    product_InfoSoldCountHTML.innerHTML = p.soldCount;
    product_InfoCategoryHTML.innerHTML = '<a href="products.html">' + p.category + '</a>';
    product_InfoCostHTML.innerHTML = p.currency + "   " + p.cost ;}


//funcion para mostrar las imagenes del producto dentro del carrousel
function showGalleryImages(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        if (i == 0) {
            htmlContentToAppend = ` <div class="carousel-item active">
        <img src="` + imageSrc + `" class="d-block w-100" alt="...">
        </div>`
        } else {
            htmlContentToAppend += ` <div class="carousel-item">
       <img src="` + imageSrc + `" class="d-block w-100" alt="...">
       </div>`

        }

        document.getElementById("product_Info_Images").innerHTML = htmlContentToAppend;


       
    }
}


// funcion para mostrar el numero de estrellas del comentario 
function showStars(nStars) {
    let htmlContentToAppend = "";
    let contador = nStars;
    for (let i = 1; i <= 5; i++) {
        if (contador > 0) {
            htmlContentToAppend += `<span class="fa fa-star checked"></span>`;
            contador--;
        } else {
            htmlContentToAppend += `<span class="fa fa-star"></span>`;
        }
    }
    return htmlContentToAppend;
}


//funcion para mostrar los comentarios
function showProductComments(array) {
    let htmlContentToAppend = "";
    let stars = "";

    for (let i = 0; i < array.length; i++) {
        let comments = array[i];
        stars = showStars(comments.score);
        const imageUser = `<img src="user.png" style="margin-right: 10px;" width="25" height="25">`;
        htmlContentToAppend += `
            <div class="comments">
                <p><b>` + comments.user + `</b>` + ` - Calificación: ` + stars + `</p>
                <p>` + comments.description + `</p>
                <p>` + comments.dateTime + `</p>
            </div>
            <hr>
        `
    }
    document.getElementById("productComments").innerHTML = htmlContentToAppend;
}


function newCommentsStars(scoreStars) {
    let stars = `<h3>` + showStars(scoreStars) + `</h3>`
    document.getElementById("StarsComments").innerHTML = stars;
}

function makeNewComment(){
    
const userComent = document.getElementById("formComment");
    let starsSelect = document.getElementById("range");
    let scoreStars = 1;
    newCommentsStars(scoreStars);
    
    starsSelect.onchange = function(e) {
        scoreStars = e.target.value;
        newCommentsStars(scoreStars);
    }

    userComent.addEventListener("submit", function(e) {
        e.preventDefault();
        let userName = localStorage.email;
        let textComment = document.getElementById("comment").value;
        let today = new Date();
        let day = today.getFullYear() + `-` + (today.getMonth()+1) + `-` + today.getDate();
        let hour = today.getHours() + `:` + today.getMinutes() + `:` + today.getSeconds(); 
        let commentObj = {
            score: scoreStars,
            description: textComment,
            user: userName,
            dateTime: day + ` ` + hour,
        }
        comments.push(commentObj);
        showProductComments(comments);
    });

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    //muestro la información del producto 
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok") {
            product_Info = resultObj.data;

    showProductInfo(product_Info);
       
    
    showGalleryImages(product_Info.images);//mustro las imagenes en el carrousel


    //muestro los comentarios del producto 
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok") {
        comments = resultObj.data;

    showProductComments(comments);
    
    makeNewComment()
    


    

    
}})}})});
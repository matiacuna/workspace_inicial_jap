document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("chatIcon").addEventListener("click", function(){
        document.getElementById("chatBox").innerHTML = `
        <iframe src="https://web.powerva.microsoft.com/environments/Default-d918780d-bc01-45ee-b9f6-79c34e8a9c80/bots/new_bot_f0dba308a0c84aa29dc532058355678d/webchat" frameborder="0" style="width: 100%; height: 100%; border-radius: 10px;">

            `
            $('.chatBox').toggleClass('active');
    });
})

const myheader = document.getElementById("my-header")

window.addEventListener("scroll", function(){
    if(this.window.scrollY > 500){
        myheader.classList.add("bg-especial")
    } else{
        myheader.classList.remove("bg-especial")
    }
})

const sign_in = document.getElementById("into-login").addEventListener("Click", function(){
    
})

document.getElementById("into-login").addEventListener("click", function(){
    //Redireciona para a rota /sign-up
    window.location.href = "/login"
})
document.getElementById("into-signup").addEventListener("click", function(){
    //Redireciona para a rota /sign-up
    window.location.href = "/sign-up"
})
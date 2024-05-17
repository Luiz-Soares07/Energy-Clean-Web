document.addEventListener("DOMContentLoaded", function(){
    const form = document.getElementById("login")

    form.addEventListener("submit", function(ev){
        ev.preventDefault()

        const email = document.getElementById("email").value
        const password = document.getElementById("password").value

        if (!email || !password){
            alert("Por favor, preencha todos os campos");
            return
        }

        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({email,password})
        })
        .then(response => response.json())
        .then(res => {
            if(res.token){
                localStorage.setItem("token", res.token)
                console.log(res.token)
                alert("Login bem sucedido!")
                window.location.href = "/energy-clean"
            }
        })
        .catch(error => {
            console.error("Erro: ", error)
            alert("Erro ao fazer o login, tente novamente")
        })
    })
    console.log("Token armazenado:", localStorage.getItem("token"));
});

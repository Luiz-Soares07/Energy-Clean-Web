document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token") || getCookie("token");

  if (!token) {
    alert("Você precisa estar logado para acessar esta página.");
    window.location.href = "/login";
    return;
  }

  fetch("/energy-clean", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}` // Inclui o token no formato correto
    }
  })
    .then(response => {
      if (response.ok) {
        // Não é necessário fazer nada aqui, pois queremos renderizar o HTML retornado pela rota
        // A resposta será tratada no próximo .then()
        return response.text();
      } else {
        // Se a resposta não for OK, lançamos um erro para ser tratado no bloco catch()
        throw new Error("Erro ao acessar a rota protegida.");
      }
    })
    .then(html => {
      // Renderiza o HTML retornado pela rota na página
      document.documentElement.innerHTML = html;

      const userName = "<%= userName %>"
      const contentElement = document.getElementById("content")
      const tittle = document.createElement("h3")
      tittle.textContent = `Olá ${userName}, seja muito bem Vindo!`
      contentElement.appendChild(tittle)
    })
    .catch(error => {
      console.error("Erro ao acessar a rota protegida: ", error);
      console.log("Resposta do servidor:", error); // Adiciona isso para ver a resposta do servidor
      alert("Erro ao acessar a rota protegida, verifique o console para mais detalhes");
      // window.location.href = "/login";
    });



});


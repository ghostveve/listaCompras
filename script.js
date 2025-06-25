// Captura de elementos do DOM
const form = document.getElementById("form");
const produtoInput = document.getElementById("produto");
const quantidadeInput = document.getElementById("quantidade");
const lista = document.getElementById("lista-compras");
const botaoLimpar = document.getElementById("limpar");

// Carrega os dados do localStorage ao iniciar
document.addEventListener("DOMContentLoaded", carregarLista);

// Evento para adicionar item
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Evita o recarregamento da página

  const nomeProduto = produtoInput.value.trim();
  const quantidade = quantidadeInput.value;

  if (nomeProduto && quantidade > 0) {
    const item = { nome: nomeProduto, quantidade: quantidade };
    adicionarItem(item);
    salvarNoLocalStorage(item);
    form.reset(); // Limpa o formulário
  }
});

// Evento para limpar a lista
botaoLimpar.addEventListener("click", function () {
  localStorage.removeItem("compras");
  lista.innerHTML = "";
});

// Função para adicionar o item visualmente na lista
function adicionarItem(item) {
  const li = document.createElement("li");
  li.innerHTML = `<span>${item.nome}</span> - ${item.quantidade}x`;
  lista.appendChild(li);
}

// Função para salvar item no localStorage
function salvarNoLocalStorage(item) {
  let compras = JSON.parse(localStorage.getItem("compras")) || [];
  compras.push(item);
  localStorage.setItem("compras", JSON.stringify(compras));
}

// Função para carregar a lista ao abrir a página
function carregarLista() {
  const compras = JSON.parse(localStorage.getItem("compras")) || [];
  compras.forEach(adicionarItem);
}

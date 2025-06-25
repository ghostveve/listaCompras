// Captura de elementos
const form = document.getElementById("form");
const produtoInput = document.getElementById("produto");
const quantidadeInput = document.getElementById("quantidade");
const lista = document.getElementById("lista-compras");
const botaoLimpar = document.getElementById("limpar");

// Carrega lista do localStorage ao iniciar
document.addEventListener("DOMContentLoaded", carregarLista);

// Adicionar item ao enviar formulário
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nomeProduto = produtoInput.value.trim();
  const quantidade = quantidadeInput.value;

  if (nomeProduto && quantidade > 0) {
    const item = { nome: nomeProduto, quantidade: quantidade };
    adicionarItem(item);
    salvarNoLocalStorage(item);
    form.reset();
  }
});

// Limpar lista
botaoLimpar.addEventListener("click", function () {
  localStorage.removeItem("compras");
  lista.innerHTML = "";
});

// Adiciona item visualmente na lista
function adicionarItem(item) {
  const li = document.createElement("li");
  li.innerHTML = `<span>${item.nome}</span> - ${item.quantidade}x`;
  lista.appendChild(li);
}

// Salva item no localStorage
function salvarNoLocalStorage(item) {
  let compras = JSON.parse(localStorage.getItem("compras")) || [];
  compras.push(item);
  localStorage.setItem("compras", JSON.stringify(compras));
}

// Carrega a lista salva
function carregarLista() {
  const compras = JSON.parse(localStorage.getItem("compras")) || [];
  compras.forEach(adicionarItem);
}


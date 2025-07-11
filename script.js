// Contador de cliques
let contador = 0;
const botao = document.getElementById("meuBotao");
const paragrafo = document.getElementById("contador");

botao.addEventListener("click", function () {
  contador++;
  paragrafo.textContent = "Cliques: " + contador;
});

// Captura de elementos
const form = document.getElementById("form");
const produtoInput = document.getElementById("produto");
const quantidadeInput = document.getElementById("quantidade");
const lista = document.getElementById("lista-compras");
const botaoLimpar = document.getElementById("limpar");
const toggleDark = document.getElementById("toggle-dark");
const seletorDaltonismo = document.getElementById("seletor-daltonismo");

if (localStorage.getItem("temaDark") === "true") {
  document.body.classList.add("dark");
  toggleDark.textContent = "☀️ Modo Claro";
}

const daltonismo = localStorage.getItem("daltonismo") || "";
if (daltonismo) {
  document.body.classList.add(daltonismo);
  seletorDaltonismo.value = daltonismo;
}

// Carrega lista do localStorage ao iniciar
document.addEventListener("DOMContentLoaded", carregarLista);

// Adicionar item ao enviar formulário
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nomeProduto = produtoInput.value.trim();
  const quantidade = quantidadeInput.value;

  if (nomeProduto && quantidade > 0) {
    const item = {
      nome: nomeProduto,
      quantidade: quantidade,
      data: new Date().toLocaleDateString(),
    };
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

// Função para adicionar item visualmente na lista
function adicionarItem(item) {
  const li = document.createElement("li");
  let emoji = "🛒";
  const nome = item.nome.toLowerCase();

  if (nome.includes("leite")) emoji = "🥛";
  else if (nome.includes("pão")) emoji = "🍞";
  else if (nome.includes("banana")) emoji = "🍌";
  else if (nome.includes("arroz")) emoji = "🍚";
  else if (nome.includes("carne")) emoji = "🥩";

  li.innerHTML = `${emoji} ${item.nome} - ${item.quantidade}
    <button class="remover">❌</button>`;

  // Evento de remover individual
  li.querySelector(".remover").addEventListener("click", function () {
    li.remove();
    removerDoLocalStorage(item);
  });

  lista.appendChild(li);
}

// Dark Mode
toggleDark.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  toggleDark.textContent = isDark ? "☀️ Modo Claro" : "🌙 Modo Escuro";
  localStorage.setItem("temaDark", isDark);
});

// Modo Daltonismo
seletorDaltonismo.addEventListener("change", () => {
  document.body.classList.remove("protanopia", "deuteranopia", "tritanopia");
  const valor = seletorDaltonismo.value;
  if (valor) {
    document.body.classList.add(valor);
  }
  localStorage.setItem("daltonismo", valor);
});



// Salvar no localStorage
function salvarNoLocalStorage(item) {
  const itens = JSON.parse(localStorage.getItem("compras")) || [];
  itens.push(item);
  localStorage.setItem("compras", JSON.stringify(itens));
}

// Carregar lista do localStorage
function carregarLista() {
  const itens = JSON.parse(localStorage.getItem("compras")) || [];
  itens.forEach(adicionarItem);
}

// Remover item do localStorage
function removerDoLocalStorage(itemRemovido) {
  const itens = JSON.parse(localStorage.getItem("compras")) || [];
  const novaLista = itens.filter(item => item.nome !== itemRemovido.nome || item.quantidade != itemRemovido.quantidade);
  localStorage.setItem("compras", JSON.stringify(novaLista));
}

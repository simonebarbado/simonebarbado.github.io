// Iniciar o programa com as tarefas salvas
  // Pesquisei como resgatar valores do local storage em: https://developer.mozilla.org/pt-BR/docs/Web/API/Storage/getItem
  window.onload = function inicio() {
    let listaDeTarefas = document.getElementById('lista-tarefas');
    listaDeTarefas.innerHTML = localStorage.tarefasSalvas;
    if (localStorage.tarefasSalvas.length == 0) {
      localStorage.tarefasSalvas = '';
      listaDeTarefas.innerHTML = localStorage.tarefasSalvas;
    }
  }

// Botão criar tarefa
function criarTarefa() {
  // Receber o input
  const input = document.getElementById('texto-tarefa').value;
  // Criar tarefa com as propriedades desejadas
  const novaTarefa = document.createElement('li');
  novaTarefa.innerHTML = input;
  novaTarefa.className = 'tarefa-da-lista' // Para usar em outros momentos
  const listaTarefas = document.getElementById('lista-tarefas');
  listaTarefas.appendChild(novaTarefa);
  // Esvaziar o campo de input
  document.getElementById('texto-tarefa').value = '';
}
const buttonCriarTarefa = document.getElementById('criar-tarefa');
buttonCriarTarefa.addEventListener('click', criarTarefa);

function selecionarTarefa(event) {
  if (event.target.classList.contains('tarefa-da-lista')) {
    const tarefas = document.getElementsByClassName('tarefa-da-lista');
    for (let tarefa of tarefas) {
      if (tarefa.classList.contains('background-color')) {
        tarefa.classList.remove('background-color');
      }
    }
    event.target.classList.add('background-color');
  }
}
document.addEventListener('click', selecionarTarefa);

// Clicar duas vezes para completar (.completed)
function tarefaCompleta(event) {
  if (event.target.classList.contains('tarefa-da-lista')) {
    event.target.classList.toggle('completed');   // Pesquisei como alternar uma classe em: https://qastack.com.br/programming/18880890/how-do-i-toggle-an-elements-class-in-pure-javascript
  }
}
document.addEventListener('dblclick', tarefaCompleta);

// Botão apagar tudo
function apagarTudo() {
  const listaDeTarefas = document.getElementById('lista-tarefas');
  listaDeTarefas.innerHTML = ''; // Sugestão do SrTonn
}
let buttonApagarTudo = document.getElementById('apaga-tudo');
buttonApagarTudo.addEventListener('click', apagarTudo);

// Botão apagar selecionado
function apagarSelecionado() {
  document.querySelector('.background-color').remove()
}
let buttonRemoverSelecionado = document.getElementById('remover-selecionado');
buttonRemoverSelecionado.addEventListener('click', apagarSelecionado);

// Botão apagar só os concluídos
  // Pesquisei a função remove em: https://cursos.alura.com.br/forum/topico-funcao-remove-no-javascript-37253
function apagarConcluidos() {
  const tarefasCompletas = document.querySelectorAll('.completed');
  tarefasCompletas.forEach(function(tarefasCompletas) {
    tarefasCompletas.remove();
  })
}
let buttonRemoverFinalizados = document.getElementById('remover-finalizados');
buttonRemoverFinalizados.addEventListener('click', apagarConcluidos);

// Botão salvar tarefas
function salvarTarefas() {
  let listaDeTarefas = document.getElementById('lista-tarefas');
   localStorage.tarefasSalvas = listaDeTarefas.innerHTML; // Pesquisei como salvar item no local storage em: https://developer.mozilla.org/pt-BR/docs/Web/API/Storage/setItem
}
let buttonSalvarTarefas = document.getElementById('salvar-tarefas');
buttonSalvarTarefas.addEventListener('click', salvarTarefas);

// Peguei o raciocínio da Karoline Godoy de referência para resolver os botões abaixo:
// Botão mover pra cima
  // Pesquisei como trocar a posição de um elemento em: https://developer.mozilla.org/pt-BR/docs/Web/API/Node/insertBefore
  // Pesquisei como utilizar o irmão anterior em: https://developer.mozilla.org/pt-BR/docs/Web/API/Node/previousSibling
function moverParaCima() {
  const listaDeTarefas = document.getElementById('lista-tarefas');
  const selecionado = document.querySelector('.background-color');
  if (selecionado && selecionado.previousElementSibling) {
    listaDeTarefas.insertBefore(selecionado, selecionado.previousElementSibling);
  }
}
let buttonMoverParaCima = document.getElementById('mover-cima');
buttonMoverParaCima.addEventListener('click', moverParaCima)

// Botão mover pra baixo
function moverParaBaixo() {
  const listaDeTarefas = document.getElementById('lista-tarefas');
  const selecionado = document.querySelector('.background-color');
  if (selecionado && selecionado.nextElementSibling) {
    listaDeTarefas.insertBefore(selecionado.nextElementSibling, selecionado);
  }
}
let buttonMoverParaBaixo = document.getElementById('mover-baixo');
buttonMoverParaBaixo.addEventListener('click', moverParaBaixo)

// Paleta de Cores
function corAleatoria(){
  // Pesquisei como arredondar um valor em: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/round
  const r = Math.round(Math.random() * 255 + 1); // +1 para não cair no rgb(0,0,0)
  const g = Math.round(Math.random() * 255 + 1);
  const b = Math.round(Math.random() * 255 + 1);
  const rgb = `rgb(${r}, ${g}, ${b})`;
  return rgb;
}

function paletaDeCores(quantidadeDeCores) {
  // Cria um pixel para cada cor, conforme quantidade
  for (let i = 0; i < quantidadeDeCores; i += 1) {
    const cor = document.createElement('li');
    cor.className = 'color';
    document.getElementById('color-palette').appendChild(cor);
  }

  // Selecionar a primeira cor
  const corInicial = document.getElementsByClassName('color')[0]
  corInicial.classList.add('selected')

  // Colocando as cores e propriedades nos pixels
  let paletaDeCores = [`rgb(0, 0, 0)`];
  for (let i = 0; i < quantidadeDeCores; i += 1) {
    paletaDeCores.push(corAleatoria());
    document.getElementsByTagName('li')[i].style.backgroundColor = paletaDeCores[i]
  }
}
paletaDeCores(4);

// Quadro de pixels
function criarQuadro(tamanho) {
  for (let linha = 0; linha < tamanho; linha += 1) {
    const linha = document.createElement('div');

    for (let coluna = 0; coluna < tamanho; coluna += 1) {
      const pixel = document.createElement('div');
      pixel.className = 'pixel';
      pixel.style.backgroundColor = 'rgb(255,255,255)'; // começar com a cor de fundo branca
      linha.appendChild(pixel);
    }
    document.getElementById('pixel-board').appendChild(linha);
  }
}
criarQuadro(5); // começar quadro com 25 pixels

// Pintar pixel
document.addEventListener('click', function (event) {
  let corSelecionada = document.getElementsByClassName('color selected')[0].style.backgroundColor;
  if (event.target.classList.contains('pixel')) {
    event.target.style.backgroundColor = corSelecionada;
  }
}, false);

// Escolher cor (Resolvido com ajuda do Paolo Fullone)
/*
document.addEventListener('click', function (event) {
    if ( event.target.classList.contains( 'accordion-link' ) ) {
        // Do something...
    }
}, false);
*/
document.addEventListener('click', function (event) {
  let paletaDeCores = document.getElementsByClassName('color') // Puxa todas as cores
  // Adicionar o selected no elemento clicado
  if (event.target.classList.contains('color')) {
      // 'For' para limpar o selected se existir em outro elemento
    for (let i = 0; i < paletaDeCores.length; i += 1) {
      paletaDeCores[i].classList.remove('selected')
    }
      event.target.classList.add('selected')
  }
}, false);

// Botões
// Limpar quadro
function limparQuadro() {
  const pixel = document.querySelectorAll('.pixel');
  for (let i = 0; i < pixel.length; i += 1) {
    pixel[i].style.backgroundColor = 'rgb(255, 255, 255)'
  }
}
const botaoLimpar = document.getElementById('clear-board');
botaoLimpar.addEventListener('click', limparQuadro)

// Mudar tamanho do quadro conforme input
function mudarTamanhoQuadro() {
  const botaoVQV = document.getElementById('generate-board');
  botaoVQV.addEventListener('click', () => {
    const input = document.getElementById('board-size');
    if (input.value <= 0) {
      alert ('Board inválido!');
    } else if (input.value < 5) {
      input.value = 5;
    } else if (input.value > 50) {
      input.value = 50;
    }
    // Apaga o quadro existente
    let quadroInicial = document.getElementById('pixel-board');
    while (quadroInicial.firstChild) {
      quadroInicial.removeChild(quadroInicial.firstChild)
    }

    // Cria um quadro novo
    criarQuadro(input.value);
  })
}
mudarTamanhoQuadro();

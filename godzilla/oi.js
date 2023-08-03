// Atribuindo às variáveis os elementos que serão funcionais/interativos no joguinho
const kaiju = document.querySelector('.kaiju');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const restart = document.querySelector('.restart-button');
const perdeu = document.querySelector('.perdeu');
const plane = document.querySelector('.plane');
const superX = document.querySelector('.superX');
const gotengo = document.querySelector('.gotengo');
const somAndando = document.getElementById("somAndando");
const gameover = document.getElementById("gameover");
const collide = document.getElementById("collide");
const fly = document.getElementById("fly");
const fall = document.getElementById("fall");

let isGameOver = false; // Variável para controlar o estado do jogo

// Trabalhando o sistema de pontuação
let score = 0;
let highscore = localStorage.getItem('highscore') || 0; // Pega o highscore atual da local storage ou define como 0 se não houver

// Função para atualizar o highscore
const updateHighscore = () => {
    if (score > highscore) {
        localStorage.setItem('highscore', score); // Atualiza o highscore se o score atual for maior
    }
    document.getElementById('highscore').textContent = localStorage.getItem('highscore'); // Exibe o highscore na página
};

// Variável que executa a ação e a animação de pular juntamente com os seus respectivos sons (pulo e queda)
const jump = () => {
    if (!isGameOver) { // Verifica se o jogo ainda está em execução
        kaiju.classList.add('jump');
        fly.play();

        setTimeout(() => {
            kaiju.classList.remove('jump');
            fall.play();
            if (!isGameOver){
                score += 10; // Adiciona 10 pontos por cada pulo bem sucedido
                document.getElementById('score').textContent = score; // Atualiza a pontuação
            } else {
                score += 0; // Não adiciona pontos em caso de falha
                document.getElementById('score').textContent = score; // Atualiza a pontuação
            }
            updateHighscore(); // Atualiza o highscore ao final
        }, 500);
    }
}

somAndando.play(); // Reprodução do som do caminhado do Kaiju

// Variável de loop que contém o funcionamento principal do joguinho => Função + tempo em milissegundos
const loop = setInterval(() => {
    
    // Atribuindo às variáveis os valores da posições dos componentes do game-board no momento da partida
    const pipePosition = pipe.offsetLeft;
    const kaijuPosition = Number(window.getComputedStyle(kaiju).bottom.replace('px', ''));
    const cloudsPosition = clouds.offsetLeft;
    const planePosition = plane.offsetLeft;
    const superXPosition = superX.offsetLeft;
    const gotengoPosition = gotengo.offsetLeft;

    // Estrutura responsável por definir as condições de game-over e interromper o fluxo de animações quando o jogador colide com o pipe
    if (pipePosition <= 200 && pipePosition > 0 && kaijuPosition < 65) {

        // Define o estado de "game-over"
        isGameOver = true;
        
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        kaiju.style.animation = 'none';
        kaiju.style.bottom = `${kaijuPosition}px`;

        clouds.style.animation = 'none';
        clouds.style.left = `${cloudsPosition}px`;

        plane.style.animation = 'none';
        plane.style.left = `${planePosition}px`;

        superX.style.animation = 'none';
        superX.style.left = `${superXPosition}px`;

        gotengo.style.animation = 'none';
        gotengo.style.left = `${gotengoPosition}px`;

        kaiju.src = './img/game-over.png';
        kaiju.style.width = '280px'

        // Manipulando a exibição da mensagem "PERDEU!" e do botão de reinicio
        restart.style.display = 'block';
        perdeu.style.display = 'block';

        // Interrompe o som do caminhado, toca os sons de colisão e a melodia de game-over
        somAndando.pause();
        gameover.play();
        collide.play();

        // Atualiza o highscore após perder a partida
        updateHighscore();

        // Limpa o intervalo do loop
        clearInterval(loop);
    }
}, 10);

// Adiciona o ouvinte de evento para o salto
document.addEventListener('keydown', jump);
document.addEventListener('touchstart', jump);

// Atualiza o highscore
updateHighscore();
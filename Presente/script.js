const SENHA_CORRETA = "romanos12";

// Variável para controlar a música
let musicaAtiva = false;
let audioAtual = null;

function entrar() {
    const senhaInput = document.getElementById("senha");
    const senha = senhaInput.value.trim().toLowerCase();
    const loginSection = document.getElementById("login");
    const conteudoSection = document.getElementById("conteudo");
    
    if (senha === SENHA_CORRETA) {
        loginSection.style.display = "none";
        conteudoSection.style.display = "block";
        ativarAnimacaoCards();
        criarCoracoes();
        criarEstrelasCadentes();
        criarBotaoMusica(); // Adiciona botão de música flutuante
        tocarMusicaAuto(); // Toca música automaticamente ao entrar
    } else {
        senhaInput.style.border = "2px solid #ff6b6b";
        senhaInput.style.background = "#fff0f0";
        
        alert("💔 Senha incorreta!\n\n💡 Dica: 🎵 'Romanos 12' 🎵\n\nEssa música marcou nosso início... 💕");
        
        setTimeout(() => {
            senhaInput.style.border = "";
            senhaInput.style.background = "";
        }, 2000);
    }
}

function criarBotaoMusica() {
    // Remove botão antigo se existir
    const botaoExistente = document.querySelector('.botao-musica-flutuante');
    if (botaoExistente) botaoExistente.remove();
    
    // Cria o botão flutuante
    const botaoMusica = document.createElement('button');
    botaoMusica.className = 'botao-musica-flutuante';
    botaoMusica.innerHTML = '🎵 Tocar "Romanos 12" 🎵';
    botaoMusica.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: auto;
        padding: 12px 20px;
        background: linear-gradient(135deg, #ff6b6b, #ee5a24);
        color: white;
        border: none;
        border-radius: 50px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
        animation: pulse 1.5s infinite;
    `;
    
    botaoMusica.onmouseenter = () => {
        botaoMusica.style.transform = 'scale(1.05)';
        botaoMusica.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
    };
    
    botaoMusica.onmouseleave = () => {
        botaoMusica.style.transform = 'scale(1)';
        botaoMusica.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    };
    
    botaoMusica.onclick = toggleMusica;
    
    document.body.appendChild(botaoMusica);
}

// Função para tocar/pausar a música
function toggleMusica() {
    const botao = document.querySelector('.botao-musica-flutuante');
    
    if (audioAtual && !audioAtual.paused) {
        // Pausa a música
        audioAtual.pause();
        musicaAtiva = false;
        if (botao) {
            botao.innerHTML = '🎵 Tocar "Romanos 12" 🎵';
            botao.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a24)';
        }
    } else {
        // Toca a música
        tocarMusica();
    }
}

function tocarMusicaAuto() {
    // Toca automaticamente ao entrar (alguns navegadores bloqueiam)
    setTimeout(() => {
        tocarMusica();
    }, 500);
}

function tocarMusica() {
    const botao = document.querySelector('.botao-musica-flutuante');
    
    // Se já existe um áudio tocando, não cria outro
    if (audioAtual && !audioAtual.paused) {
        return;
    }
    
    // Cria o elemento de áudio com a música Romanos 12
    // IMPORTANTE: Você precisa baixar a música e colocar na pasta 'musicas/'
    audioAtual = new Audio('musicas/romanos12.mp3');
    audioAtual.loop = true; // Toca em loop
    audioAtual.volume = 0.5; // Volume 50%
    
    // Tenta tocar
    audioAtual.play().then(() => {
        musicaAtiva = true;
        if (botao) {
            botao.innerHTML = '⏸️ Pausar "Romanos 12" ⏸️';
            botao.style.background = 'linear-gradient(135deg, #ee5a24, #ff6b6b)';
        }
    }).catch(erro => {
        console.log("Erro ao tocar música:", erro);
        // Se não conseguir tocar automaticamente, mostra mensagem
        if (botao) {
            botao.innerHTML = '🔊 Clique para tocar "Romanos 12" 🔊';
            setTimeout(() => {
                if (botao.innerHTML === '🔊 Clique para tocar "Romanos 12" 🔊') {
                    botao.innerHTML = '🎵 Tocar "Romanos 12" 🎵';
                }
            }, 3000);
        }
    });
    
    // Quando a música terminar (se não estiver em loop)
    audioAtual.onended = () => {
        musicaAtiva = false;
        if (botao) {
            botao.innerHTML = '🎵 Tocar "Romanos 12" 🎵';
            botao.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a24)';
        }
    };
    
    // Tratar erros
    audioAtual.onerror = () => {
        console.error("Erro: Arquivo de música não encontrado!");
        if (botao) {
            botao.innerHTML = '❌ Música não encontrada ❌';
            setTimeout(() => {
                if (botao.innerHTML === '❌ Música não encontrada ❌') {
                    botao.innerHTML = '🎵 Tocar "Romanos 12" 🎵';
                }
            }, 3000);
        }
    };
}

function ativarAnimacaoCards() {
    const cards = document.querySelectorAll(".card");
    setTimeout(() => {
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add("show");
            }, index * 150);
        });
    }, 100);
}

function criarCoracoes() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement("div");
            heart.className = "floating-heart";
            heart.innerHTML = ["❤️", "💖", "💕", "💗", "💓", "🎵", "🎶", "📖"][Math.floor(Math.random() * 8)];
            heart.style.left = Math.random() * 100 + "%";
            heart.style.animationDuration = Math.random() * 4 + 4 + "s";
            heart.style.animationDelay = Math.random() * 2 + "s";
            heart.style.fontSize = Math.random() * 25 + 15 + "px";
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 8000);
        }, i * 100);
    }
}

function criarEstrelasCadentes() {
    for (let i = 0; i < 10; i++) {
        const star = document.createElement("div");
        star.className = "shooting-star";
        star.style.top = Math.random() * 50 + "%";
        star.style.left = Math.random() * 100 + "%";
        star.style.animationDelay = Math.random() * 5 + "s";
        star.style.animationDuration = Math.random() * 3 + 2 + "s";
        document.body.appendChild(star);
        
        setTimeout(() => star.remove(), 8000);
    }
}

// Adicionar dica na tela de login
function adicionarDicaMusica() {
    const glassDiv = document.querySelector('.glass');
    if (glassDiv && !document.querySelector('.dica-musica')) {
        const dicaDiv = document.createElement('div');
        dicaDiv.className = 'dica-musica';
        dicaDiv.style.cssText = `
            margin-top: 20px;
            padding: 12px;
            background: rgba(255,255,255,0.15);
            border-radius: 15px;
            font-size: 13px;
            animation: pulse 2s infinite;
        `;
        dicaDiv.innerHTML = `
            🎵 <strong>Dica:</strong> "Romanos 12" 🎵<br>
            <small style="opacity:0.8;">Essa música lembra nosso início... 💕</small>
        `;
        
        const button = document.querySelector('#login button');
        if (button) {
            button.insertAdjacentElement('afterend', dicaDiv);
        }
    }
}

// Inicializa dica na tela de login
window.addEventListener('DOMContentLoaded', () => {
    adicionarDicaMusica();
    console.log("💖 Dica: Música 'Romanos 12'");
});

document.getElementById("senha")?.addEventListener("keypress", function(event) {
    if (event.key === "Enter") entrar();
});
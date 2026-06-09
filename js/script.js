// ==================== TEMA ====================
const themeButton = document.getElementById('theme-button');
const body = document.documentElement;

// Carrega tema salvo
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeButton.textContent = '☀️ Modo Claro';
    }
});

// Alterna tema
themeButton.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeButton.textContent = '🌙 Modo Escuro';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeButton.textContent = '☀️ Modo Claro';
        localStorage.setItem('theme', 'dark');
    }
});


// ==================== CALCULADORA ====================
document.getElementById('botao').addEventListener('click', function () {

    // Captura valores
    const ativacoes = parseInt(document.getElementById('ativacoes').value) || 0;
    const manutencoes = parseInt(document.getElementById('manutencao').value) || 0;
    const servicos = parseInt(document.getElementById('servicos').value) || 0;
    const tmr = parseFloat(document.getElementById('tmr').value) || 0;
    const retrabalho = parseInt(document.getElementById('retrabalho').value) || 0;
    const colocacao = document.getElementById('colocacao').value;

    const VALOR_POR_NC = 2.50;

    // ====================
    // PRODUÇÃO
    // ====================
    const ncAtivacoes = Math.floor(ativacoes / 5);
    const ncManutencoes = Math.floor(manutencoes / 3);
    const ncServicos = Math.floor(servicos / 5);

    let totalNC = ncAtivacoes + ncManutencoes + ncServicos;

    // ====================
    // TMR
    // ====================
    let tmrBonus = 0;

    if (tmr > 0) {
        if (tmr <= 25) {
            tmrBonus = 30;
        } else if (tmr <= 40) {
            tmrBonus = 25;
        } else if (tmr <= 50) {
            tmrBonus = 15;
        }
    }

    totalNC += tmrBonus;

    // ====================
    // RETRABALHO
    // ====================
    const penalidade = retrabalho * 5;
    totalNC -= penalidade;

    // ====================
    // BÔNUS RANKING
    // ====================
    let bonusRanking = 0;

    if (totalNC > 0) {
        if (colocacao === "1") {
            bonusRanking = totalNC * 0.10;
        } else if (colocacao === "2") {
            bonusRanking = totalNC * 0.05;
        }
    }

    // ====================
    // TOTAL FINAL
    // ====================
    const ncFinal = Math.max(0, totalNC + bonusRanking);
    const dinheiroFinal = ncFinal * VALOR_POR_NC;

    // ====================
    // EXIBIÇÃO
    // ====================
    const display = document.getElementById('display-resultado');

    display.innerHTML = `
        <div class="resultado-detalhes">
            <div>📦 Ativações: <strong>${ncAtivacoes} NC</strong></div>
            <div>🔧 Manutenções: <strong>${ncManutencoes} NC</strong></div>
            <div>🛠️ Serviços: <strong>${ncServicos} NC</strong></div>
            <div>⚡ Bônus TMR: <strong>${tmrBonus} NC</strong></div>
            <div>❌ Retrabalho: <strong>-${penalidade} NC</strong></div>
            ${
                bonusRanking > 0
                    ? `<div>🏆 Ranking: <strong>+${bonusRanking.toFixed(1)} NC</strong></div>`
                    : ''
            }
            <hr>
            <div style="font-size:1.3rem; margin:10px 0;">
                Total: <strong>${ncFinal.toFixed(1)} NC</strong>
            </div>
            <div style="
                font-size:2rem;
                font-weight:bold;
                color:#2e7d32;
            ">
                ${dinheiroFinal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })}
            </div>
        </div>
    `;

    // Ajusta cor do resultado
    if (ncFinal < 0) {
        display.style.color = "#e74c3c";
    } else {
        display.style.color = "";
    }
});

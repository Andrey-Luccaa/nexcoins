document.getElementById('botao').addEventListener('click', function() {
    // 1. Captura os valores
    const ativacoes = parseInt(document.getElementById('ativacoes').value) || 0;
    const manutencoes = parseInt(document.getElementById('manutencao').value) || 0;
    const servicos = parseInt(document.getElementById('servicos').value) || 0;
    const tmr = parseFloat(document.getElementById('tmr').value) || 0;
    const retrabalho = parseInt(document.getElementById('retrabalho').value) || 0;
    const colocacao = document.getElementById('colocacao').value;

    let totalNC = 0;
    const VALOR_POR_NC = 2.50; // Cada NC vale R$ 2,50

    // 2. Cálculos de Produção
    totalNC += Math.floor(ativacoes / 5);
    totalNC += Math.floor(manutencoes / 3);
    totalNC += Math.floor(servicos / 5);

    // 3. Bônus de TMR
    if (tmr > 0) {
        if (tmr <= 25) totalNC += 30;
        else if (tmr <= 40) totalNC += 25;
        else if (tmr <= 50) totalNC += 15;
    }

    // 4. Penalidade
    totalNC -= (retrabalho * 5);

    // 5. Bônus de Ranking
    let bonus = 0;
    if (colocacao === "1") bonus = totalNC * 0.10;
    else if (colocacao === "2") bonus = totalNC * 0.05;

    const ncFinal = totalNC + bonus;
    
    // 6. Conversão para Dinheiro (R$)
    const dinheiroFinal = ncFinal * VALOR_POR_NC;

    // 7. Exibição no HTML
    const display = document.getElementById('display-resultado');
    
    // Criamos uma mensagem com o valor em moedas e em reais
    display.innerHTML = `
        <div style="font-size: 1.2rem; margin-bottom: 5px;">${ncFinal.toFixed(1)} NC</div>
        <div style="font-size: 1.8rem; color: #2e7d32; font-weight: bold;">
            ${dinheiroFinal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
        </div>
    `;

    // Ajuste de cor para saldo negativo
    if (ncFinal < 0) {
        display.style.color = "#e74c3c";
    }
});
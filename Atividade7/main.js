function jogar(escUser) {
    const numPc = Math.random();
    let escPc;
    
    if (numPc < 0.33) {
        escPc = 1; // Pedra
    } else if (numPc < 0.66) {
        escPc = 2; // Papel
    } else {
        escPc = 3; // Tesoura
    }
    
    if (escUser === escPc) {
        console.log("Empate!");
    } else if (
        (escUser === 1 && escPc === 3) || (escUser === 2 && escPc === 1) || (escUser === 3 && escPc === 2)
    ) {
        console.log("Usuário venceu!");
    } else {
        console.log("Computador venceu!");
    }
}


const escUser = parseInt(prompt("Escolha: 1 para Pedra, 2 para Papel, 3 para Tesoura"));
if ([1, 2, 3].includes(escUser)) {
    jogar(escUser);
} else {
    console.log("Escolh inválida. Use 1 para Pedra, 2 para Papel e 3 para Tesoura");
}
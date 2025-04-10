// 1. Função para receber três números e retornar o maior deles
function maiorDeTres(a, b, c) {
    return Math.max(a, b, c);
}

function exercicio1() {
    const num1 = parseFloat(document.getElementById('num1a').value);
    const num2 = parseFloat(document.getElementById('num1b').value);
    const num3 = parseFloat(document.getElementById('num1c').value);
    
    const resultado = maiorDeTres(num1, num2, num3);
    document.getElementById('resultado1').textContent = `O maior número é: ${resultado}`;
}

// 2. Função para receber três números e retorná-los em ordem crescente
function ordenarTres(a, b, c) {
    const numeros = [a, b, c];
    numeros.sort((x, y) => x - y);
    return numeros;
}

function exercicio2() {
    const num1 = parseFloat(document.getElementById('num2a').value);
    const num2 = parseFloat(document.getElementById('num2b').value);
    const num3 = parseFloat(document.getElementById('num2c').value);
    
    const ordenados = ordenarTres(num1, num2, num3);
    document.getElementById('resultado2').textContent = `Números ordenados: ${ordenados.join(', ')}`;
}

// 3. Função para verificar se uma string é palíndromo
function ehPalindromo(texto) {
    const textoFormatado = texto.toUpperCase().replace(/\s/g, '');
    const textoInvertido = textoFormatado.split('').reverse().join('');
    return textoFormatado === textoInvertido;
}

function exercicio3() {
    const palavra = document.getElementById('palavra').value;
    const resultado = ehPalindromo(palavra) ? "É um palíndromo!" : "Não é um palíndromo!";
    document.getElementById('resultado3').textContent = resultado;
}

// 4. Função para verificar tipo de triângulo
function verificarTriangulo(a, b, c) {
    if (a + b > c && a + c > b && b + c > a) {
        if (a === b && b === c) {
            return "Triângulo Equilátero (todos os lados iguais)";
        } else if (a === b || a === c || b === c) {
            return "Triângulo Isósceles (dois lados iguais)";
        } else {
            return "Triângulo Escaleno (todos os lados diferentes)";
        }
    } else {
        return "Os valores NÃO formam um triângulo!";
    }
}

function exercicio4() {
    const ladoA = parseFloat(document.getElementById('ladoA').value);
    const ladoB = parseFloat(document.getElementById('ladoB').value);
    const ladoC = parseFloat(document.getElementById('ladoC').value);
    
    const resultado = verificarTriangulo(ladoA, ladoB, ladoC);
    document.getElementById('resultado4').textContent = resultado;
}
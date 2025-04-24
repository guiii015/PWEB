function Retangulo(base, altura) {
    this.base = base;
    this.altura = altura;
    this.calculaArea = function () {
      return this.base * this.altura;
    };
  }
  
  const base = parseFloat(prompt("Parte 1 - Retângulo\nDigite a base do retângulo:"));
  const altura = parseFloat(prompt("Digite a altura do retângulo:"));
  const ret = new Retangulo(base, altura);
  alert("Área do retângulo: " + ret.calculaArea());
  
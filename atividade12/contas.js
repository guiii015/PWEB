class Conta {
    constructor(nome, banco, numero, saldo) {
      this._nomeCorrentista = nome;
      this._banco = banco;
      this._numeroConta = numero;
      this._saldo = saldo;
    }
  
    get nomeCorrentista() { return this._nomeCorrentista; }
    set nomeCorrentista(valor) { this._nomeCorrentista = valor; }
  
    get banco() { return this._banco; }
    set banco(valor) { this._banco = valor; }
  
    get numeroConta() { return this._numeroConta; }
    set numeroConta(valor) { this._numeroConta = valor; }
  
    get saldo() { return this._saldo; }
    set saldo(valor) { this._saldo = valor; }
  }
  
  class Corrente extends Conta {
    constructor(nome, banco, numero, saldo, saldoEspecial) {
      super(nome, banco, numero, saldo);
      this._saldoEspecial = saldoEspecial;
    }
  
    get saldoEspecial() { return this._saldoEspecial; }
    set saldoEspecial(valor) { this._saldoEspecial = valor; }
  }
  
  class Poupanca extends Conta {
    constructor(nome, banco, numero, saldo, juros, dataVencimento) {
      super(nome, banco, numero, saldo);
      this._juros = juros;
      this._dataVencimento = dataVencimento;
    }
  
    get juros() { return this._juros; }
    set juros(valor) { this._juros = valor; }
  
    get dataVencimento() { return this._dataVencimento; }
    set dataVencimento(valor) { this._dataVencimento = valor; }
  }
  
  // Criar Conta Corrente
  const cc = new Corrente(
    prompt("Parte 2 - Conta Corrente\nNome do correntista:"),
    prompt("Banco:"),
    prompt("Número da conta:"),
    parseFloat(prompt("Saldo:")),
    parseFloat(prompt("Saldo especial:"))
  );
  
  alert("Dados da Conta Corrente:\n" +
    `Nome: ${cc.nomeCorrentista}\nBanco: ${cc.banco}\nConta: ${cc.numeroConta}\nSaldo: ${cc.saldo}\nSaldo Especial: ${cc.saldoEspecial}`);
  
  // Criar Conta Poupança
  const cp = new Poupanca(
    prompt("Parte 2 - Conta Poupança\nNome do correntista:"),
    prompt("Banco:"),
    prompt("Número da conta:"),
    parseFloat(prompt("Saldo:")),
    parseFloat(prompt("Juros (%):")),
    prompt("Data de vencimento:")
  );
  
  alert("Dados da Conta Poupança:\n" +
    `Nome: ${cp.nomeCorrentista}\nBanco: ${cp.banco}\nConta: ${cp.numeroConta}\nSaldo: ${cp.saldo}\nJuros: ${cp.juros}%\nVencimento: ${cp.dataVencimento}`);
  
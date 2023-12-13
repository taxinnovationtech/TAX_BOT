var function_cnpj = function fn (event){
    var x = event.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
    event.target.value = !x[2] ? x[1] : x[1] + '.' + x[2] + '.' + x[3] + '/' + x[4] + (x[5] ? '-' + x[5] : '');    
};

String.prototype.reverse = function(){
    return this.split('').reverse().join(''); 
  };

var moeda =  function mascaraMoeda(evento){
    campo = document.getElementById('receita_anual_bruta');
    var tecla = (!evento) ? window.event.keyCode : evento.which;
    var valor  =  campo.value.replace(/[^\d]+/gi,'').reverse();
    var resultado  = "";
    var mascara = "###.###.###.###,##".reverse();
    for (var x=0, y=0; x<mascara.length && y<valor.length;) {
      if (mascara.charAt(x) != '#') {
        resultado += mascara.charAt(x);
        x++;
      } else {
        resultado += valor.charAt(y);
        y++;
        x++;
      }
    }
    campo.value = resultado.reverse();
  }

window.onload = function() {

    document.getElementById('insira_cnpj').addEventListener('input', function_cnpj);
    document.getElementById('receita_anual_bruta').addEventListener('input', moeda);
}

document.getElementById('pergunta_' + (1)).scrollIntoView();

function go(numero_botao) {

    if (numero_botao != 1 ){
      if (numero_botao == 'confirma'){
        numero_botao = 1;
      }
      elemento = document.getElementById('pergunta_' + (numero_botao+1));
      elemento.classList.toggle('fade');
      elemento.scrollIntoView();
    } else {
      getDadosCnpjReceita();
      setTimeout(function(){
        elemento.style.height = '400px';
        var botao_back = document.getElementById('back_confirma');
        var botao_go = document.getElementById('go_confirma');
        botao_back.classList.toggle('fade');
        botao_go.classList.toggle('fade');
      }, 4000);

      elemento = document.getElementById('confirma_cnpj');
      elemento.classList.toggle('fade');
      elemento.scrollIntoView();
      
      
    }
};


function back(numero_botao) {

    if (numero_botao == 'confirma'){
      elemento_atual = document.getElementById('confirma_cnpj');
      elemento_atual.classList.toggle('fade');
      elemento = document.getElementById('pergunta_' + (1));
      elemento.scrollIntoView();

    } else if(numero_botao == 2){
      elemento_atual = document.getElementById('pergunta_2');
      elemento_atual.classList.toggle('fade');
      elemento = document.getElementById('confirma_cnpj');
      elemento.scrollIntoView();
    } else {
      elemento_atual = document.getElementById('pergunta_' + numero_botao);
      elemento_atual.classList.toggle('fade');
      elemento = document.getElementById('pergunta_' + (numero_botao-1));
      elemento.scrollIntoView();
    }
    
    
};





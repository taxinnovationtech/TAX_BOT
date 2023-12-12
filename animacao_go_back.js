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


function go(numero_botao) {
    elemento = document.getElementById('pergunta_' + (numero_botao+1));
    setInterval(proximo, 1000);
};

function proximo(){
    
    elemento.style.display = 'block';
    elemento.scrollIntoView();
};

function back(numero_botao) {
    elemento = document.getElementById('pergunta_' + (numero_botao-1));
    elemento.scrollIntoView();
};





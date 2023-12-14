
var update = {
  "cnpj" : "",
  "nome_comercial" : "",
  "email_comercial" : "",
  "faturamento_anual" : "",
  "receita_liquida":"",
  "regime_tributacao" : "",
  "qtd_funcionarios" : "",
  "folha_salarial" : ""
};

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


function go(numero_botao, button_type) {

    if (button_type != ''){

      if(button_type == 'presumido'){
        update["regime_tributacao"] = document.getElementById('lucro_presumido').value;
      } else if (button_type == 'real') {
        update["regime_tributacao"] = document.getElementById('lucro_real').value;
      } else {
        update["regime_tributacao"] = document.getElementById('simples').value;
      }
    }


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
        elemento.style.height = '20%';
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

      document.getElementById('cnpj_confirma').innerHTML = "Realizando consulta...";
      document.getElementById('razao_social_confirma').innerHTML = "";
      document.getElementById('situacao_cadastral_confirma').innerHTML = "";
      document.getElementById('cnae_confirma').innerHTML = "";

      var botao_back = document.getElementById('back_confirma');
      var botao_go = document.getElementById('go_confirma');
      botao_back.classList.toggle('fade');
      botao_go.classList.toggle('fade');

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

function gravaEmpresa(){
  
  update['cnpj'] = document.getElementById('insira_cnpj').value.replace("/","").replace(".","").replace("-","").replace(".", "");
  update['faturamento_anual'] = document.getElementById('receita_anual_bruta').value;
  update['qtd_funcionarios'] = document.getElementById('qt_funcionarios').value;
  update['nome_comercial'] = document.getElementById('nome').value;
  update['email_comercial'] = document.getElementById('email').value;
  update['folha_salarial'] = '0';
  
  console.log(update)
  var options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(update),
    };

    
    fetch('https://api-chat.taxchatbot.click/empresas', options).catch(e => {console.log(e);});
    /*else {
        fetch('https://api-chat.taxchatbot.click/empresas/atualiza', options).catch(e => {console.log(e);});
    }*/
}








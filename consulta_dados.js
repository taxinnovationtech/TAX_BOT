function getDadosCnpjReceita() {
        
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '3f83a43f58msh17ab7270b8117dap16c090jsnc35f465d7b29',
                'X-RapidAPI-Host': 'consulta-cnpj-gratis.p.rapidapi.com'
            }
        };
        
        setTimeout(() => {

            var cnpj_inserido = document.getElementById('insira_cnpj').value;

            cnpj_inserido = cnpj_inserido.replace("/","").replace(".","").replace("-","");
            fetch('https://consulta-cnpj-gratis.p.rapidapi.com/office/' + cnpj_inserido + '?simples=false', options)
                .then((response) => response.json())
                .then((response) => {
                    
                    cnpj_receita = 'CNPJ: ' + response['taxId'].replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
                    document.getElementById('cnpj_confirma').innerHTML = cnpj_receita;
                    console.log(cnpj_receita);
                    
                    if (response['alias'] != null){
                        nome_receita = 'NOME: ' + response['alias'];
                    } else {
                        nome_receita = 'NOME: ' + response['company']['name'];
                    }
                    console.log(nome_receita);
                    document.getElementById('razao_social_confirma').innerHTML = nome_receita;
                    
                    situacao_cadastral = 'SITUAÇÃO CADASTRAL: ' + response['status']['text'];
                    
                    console.log(situacao_cadastral);
                    document.getElementById('situacao_cadastral_confirma').innerHTML = situacao_cadastral;
                    
                    
                    cnae_receita = 'CNAE: ' + response['mainActivity']['id'] + ' - ' + response['mainActivity']['text'];
                    console.log(cnae_receita);
                    document.getElementById('cnae_confirma').innerHTML = cnae_receita;
            }).catch(
                console.log('Carregando...')
            );
            
        }, 3000);
    }
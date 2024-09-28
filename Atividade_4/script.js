const apiURL = 'http://localhost:3000/despesas';
const apiURLUser = 'http://localhost:3000/usuario';

const buttonCard = document.getElementById('button-add-despesa')
const obrigacoes = document.getElementById('despesa-input-obrigacaoFinanceira')
const valor = document.getElementById('despesa-input-valor')
const data = document.getElementById('despesa-input-diaVencimento')
const tabela = document.getElementById('table-despesas')
const buttonEnviar = document.getElementById('enviar')
const pSubsidio = document.getElementById('valor-subsidio');
const buttonSalario = document.getElementById("button-add-subsidio")
const inputSalario = document.getElementById("valor-input-subsidio")

const mostrarDataAtual = () => {
    const dataAtual = new Date(); 
    const mes = dataAtual.getMonth() + 1; 
    const ano = dataAtual.getFullYear(); 

   
    const dataElement = document.getElementById('data-atual');
    dataElement.textContent = `Mês: ${mes} de ${ano}`;
};

buttonCard.addEventListener('click', function(){
    var card = document.getElementById("card");
    card.style.display = "block";
})

const mostrarSalario = async() => {
    const response = await fetch(apiURLUser);
    const usuario = await response.json();
    if(usuario[0].salario === "0"){
        buttonSalario.style.display = "block"
        inputSalario.style.display = "block"
    }else{
        pSubsidio.textContent = `R$ ${usuario[0].salario}`;
        pSubsidio.classList.add('valor-subsidio');
    }
}

const adicionarSalario = async () => {
    const response = await fetch(apiURLUser);
    const usuario = await response.json();

    if(!inputSalario.value){
        alert("Por favor, insira um valor para o salário.");
        return;
    }

    const newSalario = {
        salario: inputSalario.value
    };

    await fetch(`${apiURLUser}/${usuario[0].id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSalario)
    });

    valorDigitado.value = null;
    mostrarSalario();
}

buttonSalario.addEventListener('click', adicionarSalario)

const fetchDesepesas = async () =>{
    const response = await fetch(apiURL);
    const despesas = await response.json();

    mostrarDespesas(despesas);
}

const mostrarDespesas = (despesas) =>{
    tabela.innerHTML = '';
    despesas.forEach(despesa => {
        const tr = document.createElement('tr');

        const tdObrigacaoFinanceira = document.createElement('td');
        tdObrigacaoFinanceira.textContent = despesa.obrigacaoFinanceira;

        const tdValor = document.createElement('td');
        tdValor.textContent = despesa.valor;

        const tdDia = document.createElement('td');
        tdDia.textContent = despesa.diaVencimento;

        tr.appendChild(tdObrigacaoFinanceira)
        tr.appendChild(tdValor)
        tr.appendChild(tdDia)

        const tdButton = document.createElement('td');
        const button = document.createElement('button');
        button.textContent = 'Pago';
        button.setAttribute('data-id', despesa.id);
	button.classList.add('pago-button'); 
        

        button.addEventListener('click', ()=> deleteLinha(despesa.id))

        tdButton.appendChild(button);
        tr.appendChild(tdButton);

        tabela.appendChild(tr)
    })
}

const addDespesas = async () => {
    const obrigacaoFinanceira = obrigacoes.value;
    const valorDespesa = valor.value;
    const dia = data.value;

    if(!obrigacaoFinanceira && !valorDespesa && !dia){
        return;
    }

    const newDespesa = {
        obrigacaoFinanceira: obrigacaoFinanceira,
        valor: valorDespesa,
        diaVencimento: dia 
    }

    await fetch(apiURL,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDespesa)
    })

    obrigacaoFinanceira.value = ''; 
    valorDespesa.value = ''; 
    dia.value = ''; 

    mostrarDespesas();
    
}

const deleteLinha = async (id) => {

    let responseDespesa = await fetch(`${apiURL}/${id}`)
    let despesa = await responseDespesa.json();

    const response = await fetch(apiURLUser);
    const usuario = await response.json();

    let valorFinal = parseFloat(usuario[0].salario) - parseFloat(despesa.valor);

    await fetch(`${apiURL}/${id}`, {
      method: 'DELETE'
    });

    const newSalario = {
        salario: valorFinal
    };

    await fetch(`${apiURLUser}/${usuario[0].id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSalario)
    });

    mostrarSalario()
  };

buttonEnviar.addEventListener('click', addDespesas)

fetchDesepesas();
mostrarSalario();
mostrarDataAtual();
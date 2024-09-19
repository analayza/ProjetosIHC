const inputNum1 = document.getElementById("inputNum1")
const inputNum2 = document.getElementById("inputNum2")
const button = document.getElementById("btnAdicionar")
const resultado = document.getElementById("resul")


button.addEventListener("click", () => {
    const num1 = parseInt(inputNum1.value.trim());
    const num2 = parseInt(inputNum2.value.trim());
    var selectValue = document.getElementById("select").value;

    if (inputNum1.value.trim() === "" || inputNum2.value.trim() === "") {
        alert("Digite o número")
        return;
    }
    if (selectValue === "soma") {
        const soma = num1 + num2
        resultado.textContent = `Resultado: ${soma}`
    }
    else if (selectValue === "divisao") {
        if(num1 === 0 || num2 === 0){
            resultado.textContent = "Resultado: Não é possivel divisão por 0"
        }else{
            const divisao = num1 / num2
            resultado.textContent = `Resultado: ${divisao}`
        }
    }
    else if (selectValue === "subtrair") {
        const subtrair = num1 - num2
        resultado.textContent = `Resultado: ${subtrair}`
    }
    else if (selectValue === "multiplicacao") {
        const multiplicacao = num1 * num2
        resultado.textContent = `Resultado: ${multiplicacao}`
    }

})


// const novoItem =  document.createElement("li");
// novoItem.textContent = task;

// novoItem.addEventListener("click", () =>{
//     novoItem.classList.toggle("completed");

// })

// const close =  document.createElement("button");
// close.addEventListener("click", () => {
//     list.removeChild(novoItem);

// })

// close.textContent = "x";

// novoItem.appendChild(close);

// list.appendChild(novoItem);

// input.value = "";



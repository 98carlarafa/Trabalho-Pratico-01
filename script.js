const nomeCliente = document.getElementById("nomeCliente");
const nomeLivro = document.getElementById("nomeLivro");
const dataEmp = document.getElementById("dataEmp");
const tempoEmp = document.getElementById("tempoEmp");
const gravar = document.getElementById("gravar");
const tableBody = document.getElementById("tableBody");
const form = document.getElementById("link1");
const emp = document.getElementById("link2");
const bdEmp = document.getElementById("bdEmp");

const emprestimos = JSON.parse(localStorage.getItem('EmprestimosSalvos')) || []


function salvarLivro() {
    let id = emprestimos.lenght;
    let nomeC = nomeCliente.value;
    let nomeL = nomeLivro.value;
    let dataE = dataEmp.value;
    let tempoE = tempoEmp.value;

    if (nomeC == '' || nomeL == '' || dataE == '' || tempoE == '') {
        return false;
    } else {
        let emprestimo = {
            id,
            nomeC,
            nomeL,
            dataE,
            tempoE
        }
        emprestimos.push(emprestimo)
        salvarLocalmente()
    }

}

gravar == null ? '' : gravar.addEventListener('click', salvarLivro)

function salvarLocalmente() {
    localStorage.setItem('EmprestimosSalvos', JSON.stringify(emprestimos))
}

function carregarElementos(emp) {

    tableBody.innerText = '';

    emp.forEach(element => {
        let linha = document.createElement('tr');
        let tdNCliente = document.createElement('td');
        let tdNLivro = document.createElement('td');
        let tdDEmp = document.createElement('td');
        let tdTEmp = document.createElement('td');

        let tdButton = document.createElement('td');
        let btnRemove = document.createElement('button');

        tdNCliente.innerText = element.nomeC;
        tdNCliente.setAttribute('class', 'text-center');
        tdNLivro.innerText = element.nomeL;
        tdNLivro.setAttribute('class', 'text-center');
        tdDEmp.innerText = element.dataE;
        tdDEmp.setAttribute('class', 'text-center');
        tdTEmp.innerText = element.tempoE;
        tdTEmp.setAttribute('class', 'text-center');
        btnRemove.innerText = 'Receber';
        tdButton.setAttribute('class', 'text-center');
        btnRemove.setAttribute('class', 'btn btn-outline-danger');
        btnRemove.setAttribute('id', element.id);

        linha.appendChild(tdNCliente);
        linha.appendChild(tdNLivro);
        linha.appendChild(tdDEmp);
        linha.appendChild(tdTEmp);
        tdButton.appendChild(btnRemove);
        linha.appendChild(tdButton);

        tableBody.appendChild(linha);
    });
    let excluir = document.querySelectorAll('#tableBody button');

    excluir.forEach(item => {
        item.addEventListener('click', function() {
            receberLivro(item.id);
        })
    })
}

function receberLivro(id) {
    let item = emprestimos.find(emprestimo => {
        return emprestimo.id == id
    })
    emprestimos.splice(emprestimos.indexOf(item), 1);
    salvarLocalmente()
    carregarElementos(emprestimos)
}

bdEmp == null ? null : bdEmp.onload = carregarElementos(emprestimos)
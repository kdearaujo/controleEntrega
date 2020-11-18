class Entrega{
    constructor(){
        this.entregas = localStorage.getItem('tbEntregas') === null
        ? [] 
        : JSON.parse(localStorage.getItem('tbEntregas'))
    }
    salva(entrega){
    if(document.getElementById('nro').getAttribute('disabled') === 'disabled'){
        this.apaga(entrega.nro)
    }
        this.entregas.push(entrega) //adicionar um novo registro no fim do array
        localStorage.setItem('tbEntregas',JSON.stringify(this.entregas))
        alert('Entrega cadastrada!')
    }
    apaga(nro){
        let index = this.entregas.findIndex(entrega => entrega.nro == nro)
        //1º parametro é o índice do array e o 2º é o nº de índice removidos
        this.entregas.splice(index, 1)
        localStorage.setItem('tbEntregas', JSON.stringify(this.entregas))
        entrega.atualiza()
    }
    edita(entrega){
        document.getElementById('nro').value = entrega.nro
        document.getElementById('nro').setAttribute('disabled','disabled')
        document.getElementById('nome').value = entrega.nome
        document.getElementById('endereco').value = entrega.endereco
        document.getElementById('bairro').value = entrega.bairro
        document.getElementById('cidade').value = entrega.cidade
        document.getElementById('estado').value = entrega.estado    
        document.getElementById('nroped').value = entrega.nroped    
        document.getElementById('valor').value = entrega.valor  
        document.getElementById('pagamento').value = entrega.pagamento  
        document.getElementById('observacoes').value = entrega.observacoes

    }
    lista(){
        const resposta = this.entregas.map((entrega) => (
            `<tr>
                <td>${entrega.nro}</td>         <td>${entrega.nome}</td>
                <td>${entrega.endereco}</td>    <td>${entrega.bairro}</td>
                <td>${entrega.cidade}</td>      <td>${entrega.estado}</td>
                <td>${entrega.nroped}</td>      <td>${entrega.valor}</td> 
                <td>${entrega.pagamento}</td>   <td>${entrega.observacoes}</td> 
                <td> 
                    <button id='apagar' onClick='entrega.apaga(${entrega.nro})'>🗑️ Apagar</button>
                    <button id='editar' onClick='entrega.edita(${JSON.stringify(entrega)})'>🗒️ Editar</button>
                </td>
            </tr>`
        )).join("")
        return (`<table border='1' class='paleBlueRows'>
        <caption>Relação de Entregas</caption>
        <thead>
            <th>Entrega Nº</th>          <th>Nome do cliente</th>
            <th>Endereço</th>            <th>Bairro</th>
            <th>Cidade</th>              <th>Estado</th>
            <th>Nº do Pedido</th>        <th>Valor</th>
            <th>Forma de Pagamento</th>  <th>Observações</th>   
        </thead>
        <tbody>${resposta}</tbody>
        </table>
        `)
    }
    atualiza(){
        document.getElementById('resposta').innerHTML = entrega.lista()
    }
}
//instanciando um novo objeto
const entrega = new Entrega()

//tratando o botão salvar

document.getElementById('salvar').onclick = function(){
    const registro = {
        nro: document.getElementById('nro').value,
        nome: document.getElementById('nome').value,
        endereco: document.getElementById('endereco').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        nroped: document.getElementById('nroped').value,
        valor: document.getElementById('valor').value,
        pagamento: document.getElementById('pagamento').value,
        observacoes: document.getElementById('observacoes').value
    }
    if(registro.nro === ''){
        alert('O nº da entrega é obrigatório!')
        return false
    }
    if(registro.nome === ''){
        alert('O nome do cliente é obrigatório!')
        return false
    }
    if(registro.valor === '' || registro.endereco === '' || registro.cidade === ''){
        alert('Preencha o endereço, cidade e valor!')
        return false
    }
    entrega.salva(registro)
}

//tratando a listagem

window.onload = function(){
    entrega.atualiza()
}

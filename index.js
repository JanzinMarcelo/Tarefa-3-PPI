import express from 'express';
import path from 'path';

const app = express();
const porta = 3000;
const host ='0.0.0.0';
var listaUsuarios = [];
app.use(express.urlencoded({ extended: true }));


function processaCadastroUsuario(requisicao, resposta){
    let conteudoResposta='';
    if(!(requisicao.body.nome && requisicao.body.Sobrenome && requisicao.body.NomeUsuario)){
        
        conteudoResposta =`
        <!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>
<body>
    <form action="/cadastrarUsuario" method="POST" class="row g-3 needs-validation" novalidate>
        <fieldset class="border p-2">
            <legend>Cadastro de Usuário</legend>
            <div class="col-md-4">
                <label for="nome" class="form-label">Nome:</label>
                <input type="text" class="form-control" id="nome" value="${requisicao.body.nome}" name="nome" >
                <div class="invalid-feedback">
                    Digite seu nome!
                </div>
            </div>
        `;
        if(!requisicao.body.nome){
            conteudoResposta +=`<div>
                                <p class="text-danger">Por favor informe o nome!</p>
                                </div>`;
        } 
        conteudoResposta +=`
        <div class="col-md-4">
                <label for="sobrenome" class="form-label">Sobrenome:</label>
                <input type="text" class="form-control" id="Sobrenome" value ="${requisicao.body.Sobrenome}" name="Sobrenome" >
                <div class="invalid-feedback">
                    Digite seu Sobrenome!
                </div>
                </div>`;
                if(!requisicao.body.idade)
                {
                    conteudoResposta +=`<div>
                                    <p class="text-danger">Por favor informe o seu Sobrenome!</p>
                                    </div>`;
                }
                conteudoResposta +=`
                <div class="col-md-4">
                <label for="username" class="form-label">NomeUsuario:</label>
                <div class="input-group has-validation">
                    <span class="input-group-text" id="inputGroupPrepend">@</span>
                    <input type="text" class="form-control" id="username" value ="${requisicao.body.NomeUsuario}" name="NomeUsuario" aria-describedby="inputGroupPrepend" >
                    <br>
                    `;
                    if(!requisicao.body.NomeUsuario)
                    {
                       conteudoResposta +=`<div>
                                       <p class="text-danger">Por favor informe o nome de usuário!</p>
                                       </div>`;
                    }
                    conteudoResposta +=
                    
                    `
                    <div class="invalid-feedback">
                        Digite seu nome de usuário!
                    </div>
                </div>
            </div>
            <div class="col-12">
            <button class="btn btn-primary mt-4" type="submit">Cadastrar</button>
        </div>
    </fieldset>
</form>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

                `;
                resposta.end(conteudoResposta);
            
    }
    else{
   const usuario = {
    nome: requisicao.body.nome,
    Sobrenome: requisicao.body.idade,
    NomeUsuario: requisicao.body.NomeUsuario

   } 
   listaUsuarios.push(usuario);
    conteudoResposta =`
    <!DOCTYPE html>
    <head>
    <meta charset="UTF-8">
    <title>Menu do sistema</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
      </head>
     <body>
        <h1> Lista de Usuários Cadastrados </h1>
        <table class="table table-striped table-hover">
        <thead>
        <tr>
            <th>Nome</th>
            <th>idade</th>
            <th>Nome de Usuário</th>
        <tr>
        </thead>
        <tbody>`;
        
    for(const usuario of listaUsuarios){
            conteudoResposta+=`
            <tr>
                <td>${usuario.nome}</td>
                <td>${usuario.Sobrenome}</td>
                <td>${usuario.NomeUsuario}</td>
            </tr>
            `;
        }

        conteudoResposta+=`
                </tbody>
            </table>
            <a class="btn btn-primary" href="/"role="button">Voltar ao menu</a>
            <a class="btn btn-primary" href="/cadastraUsuario.html"role="button">Continuar Cadastrando</a>
        </body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        </html>

        `;
        resposta.end(conteudoResposta);
    }
}

app.use(express.static(path.join(process.cwd(), 'paginas')));

app.get('/',(requisicao,resposta)=>{
    resposta.end(`
    <!DOCTYPE html>
    <head>
    <meta charset="UTF-8">
    <title>Menu do sistema</title>
      </head>
     <body>
        <h1> Menu </h1>
        <ul>
            <li><a href="/cadastraUsuario.html">Cadastrar Usuário</a></li>
         </ul>
    </body>
     </html>
     `);

})

app.post('/cadastrarUsuario',processaCadastroUsuario);
    


app.listen(porta,host,()=>{
    console.log(`Servidor executado na url http://${host}:${porta}`);   
});

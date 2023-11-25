import express from 'express';
import path from 'path';

const app = express();
const porta = 3000;
const host ='0.0.0.0';
var listaUsuarios = [];
app.use(express.urlencoded({ extended: true }));


function processaCadastroUsuario(requisicao, resposta){
   const usuario = {
    nome: requisicao.body.nome,
    Sobrenome: requisicao.body.Sobrenome,
    NomeUsuario: requisicao.body.NomeUsuario

   } 
   listaUsuarios.push(usuario);
   let conteudoResposta =`
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
            <th>Sobrenome</th>
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
        resposta.send(conteudoResposta);
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

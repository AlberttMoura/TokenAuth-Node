# Microserviços de autenticação de usuários utilizando Node, PostgreSQL e JWT

### Configurando

Para instalar os pacotes:
npm install

### Como usar?

-   inicie o servidor:
    npm start

Utilizando o Postman ou algum software semelhante, acesse: http://localhost:3000/token e em Authorization, use o tipo Basic Auth com username: admin e senha: admin e o método POST.

- Após isso, um JWT será retornado. Utilizando o tipo Bearer Token, adicione o token e acesse as demais rotas.

Para verificar se um token é válido, acesse a http://localhost:3000/token/validate informando o Token. Retornará status OK, caso válido.

Para criar um usuário, insira no body o seguinte modelo:

{
"username": "admin",
"password": "admin"
}


Visualizar(GET) e criar(POST) usuários: http://localhost:3000/users

Deletar(DELETE) e alterar usuários(PUT): http://localhost:3000/users/:[uuid do usuário]

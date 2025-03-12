# Locadora de Carros - Projeto NestJS

Este projeto simula uma locadora de carros, onde é possível gerenciar carros disponíveis para locação, clientes e aluguel. Ele foi desenvolvido utilizando o NestJS para o backend e PostgreSQL como banco de dados.

## Tecnologias Usadas

- **NestJS**: Framework para construção de APIs.
- **PostgreSQL**: Banco de dados relacional.
- **JWT**: Autenticação baseada em JSON Web Tokens.
- **TypeORM**: ORM para manipulação do banco de dados.
  
## Variáveis de Ambiente

A aplicação utiliza variáveis de ambiente para configurar o banco de dados, servidor e autenticação. Crie um arquivo `.env` na raiz do projeto com os seguintes valores:

### **Variáveis do Banco de Dados**

- `HOST`: Endereço do servidor do banco de dados.
- `DATABASE`: Nome do banco de dados a ser usado.
- `ROOT_USERNAME`: Usuário principal do banco de dados.
- `ROOT_PASSWORD`: Senha do usuário principal do banco de dados.
- `PORT`: Porta do servidor de aplicação.
- `DB_PORT`: Porta do banco de dados.

### **Variáveis de Autenticação**

- `JWT_SECRET`: Chave secreta usada para assinar os tokens JWT.
- `NODE_ENV`: Ambiente em que a aplicação está sendo executada. Defina como `development` ou `production`.

**Exemplo de arquivo `.env`:**

```env
HOST=localhost
DATABASE=locadora_de_carros
ROOT_USERNAME=admin
ROOT_PASSWORD=senha123
PORT=3000
DB_PORT=5432

JWT_SECRET=secreta_super_secreta
NODE_ENV=development

# Rodando a Aplicação

Para rodar a aplicação, use o seguinte comando:

```bash
npm run start:dev
```

Esse comando irá iniciar o servidor em modo de desenvolvimento, permitindo a execução da aplicação com hot reload.

## Autenticação

A autenticação via JWT é opcional em ambiente de desenvolvimento (`NODE_ENV=development`). Em produção, a autenticação via JWT será obrigatória para acessar as rotas protegidas.

Caso esteja rodando em produção, certifique-se de fornecer um `JWT_SECRET` válido e implementar o processo de login para gerar tokens.

## Estrutura do Projeto

- **src/**: Código fonte da aplicação.
- **auth/**: Módulo de autenticação, onde você pode configurar a geração e validação de tokens JWT.
- **cars/**: Módulo de carros, onde você pode gerenciar a criação e listagem.
- **reserva/**: Módulo de reserva, onde você pode manipular as reservas.
- **users/**: Módulo de usuários, onde a autenticação e as permissões são configuradas.

## Scripts

- `npm run start:dev`: Inicia a aplicação no modo de desenvolvimento com hot reload.

## Licença

Este projeto é licenciado sob a MIT License - veja o arquivo LICENSE para mais detalhes.

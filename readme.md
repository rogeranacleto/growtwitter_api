# GrowTwitter API

API REST inspirada no Twitter, desenvolvida com **Node.js**, **Express**, **Prisma** e **PostgreSQL**. Permite registro e autenticação de usuários, criação de tweets e replies, sistema de likes, follow/unfollow e feed personalizado.

---

## Visão Geral

O **GrowTwitter API** é um back-end que simula as principais funcionalidades de uma rede social estilo Twitter. A API oferece:

- **Autenticação** — Registro e login com JWT
- **Tweets** — Criação de tweets e respostas (replies)
- **Likes** — Curtir e descurtir tweets
- **Follow** — Seguir e deixar de seguir usuários
- **Feed** — Feed personalizado com tweets do usuário e de quem ele segue
- **Perfil** — Consulta de perfil com tweets, seguidores e contagem de likes

---

## Tecnologias Utilizadas

| Tecnologia             | Descrição                                          |
| ---------------------- | -------------------------------------------------- |
| **Node.js**            | Runtime JavaScript para o servidor                 |
| **TypeScript**         | Superset tipado do JavaScript                      |
| **Express**            | Framework HTTP para criação de rotas e middlewares |
| **Prisma**             | ORM para modelagem e acesso ao banco de dados      |
| **PostgreSQL**         | Banco de dados relacional                          |
| **JWT (jsonwebtoken)** | Autenticação baseada em tokens                     |
| **bcrypt**             | Hashing seguro de senhas                           |
| **express-validator**  | Validação de dados nas requisições                 |
| **dotenv**             | Gerenciamento de variáveis de ambiente             |
| **CORS**               | Middleware para Cross-Origin Resource Sharing      |
| **uuid**               | Geração de identificadores únicos                  |
| **Docker Compose**     | Containerização do banco de dados PostgreSQL       |
| **ts-node-dev**        | Servidor de desenvolvimento com hot-reload         |

---

## Como Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v18+)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) (para o banco de dados)
- [npm](https://www.npmjs.com/)

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/growtwitter_api.git
cd growtwitter_api
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto baseado no `.env-example`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5555/growtwitter?schema=public"
SECRET_KEY=sua_chave_secreta_aqui
PORT=3030
```

| Variável       | Descrição                                |
| -------------- | ---------------------------------------- |
| `DATABASE_URL` | String de conexão com o PostgreSQL       |
| `SECRET_KEY`   | Chave secreta para assinar os tokens JWT |
| `PORT`         | Porta em que o servidor será executado   |

### 4. Subir o banco de dados com Docker

```bash
docker-compose up -d
```

Isso inicializa um container PostgreSQL 17 na porta **5555** com o banco `growtwitter`.

### 5. Executar as migrations do Prisma

```bash
npx prisma migrate dev
```

### 6. Rodar o projeto

```bash
# Desenvolvimento (com hot-reload)
npm run dev

# Build para produção
npm run build

# Executar build de produção
npm start
```

O servidor estará disponível em `http://localhost:3030`.

---

## Autenticação

A API utiliza **JSON Web Token (JWT)** para autenticação.

### Fluxo de Autenticação

1. O usuário se registra via `POST /register`
2. O usuário faz login via `POST /login` e recebe um **token JWT**
3. O token deve ser enviado no header `Authorization` em todas as rotas protegidas

### Envio do Token

```
Authorization: Bearer <seu_token_jwt>
```

### Payload do Token

```json
{
  "id": "uuid-do-usuario",
  "name": "Nome do Usuário",
  "username": "username"
}
```

- O token tem validade de **1 dia** (`expiresIn: "1d"`)
- Senhas são hashadas com **bcrypt** (salt rounds: 10)

---

## Endpoints da API

### Base URL

```
http://localhost:3030
```

---

### Autenticação (Pública)

#### `POST /register`

Registra um novo usuário.

**Body (JSON):**

| Campo      | Tipo     | Obrigatório | Regras                    |
| ---------- | -------- | ----------- | ------------------------- |
| `name`     | `string` | Sim         | Mínimo 1 caractere        |
| `username` | `string` | Sim         | Não pode ser vazio        |
| `email`    | `string` | Sim         | Deve ser um e-mail válido |
| `password` | `string` | Sim         | Mínimo 6 caracteres       |

**Exemplo de Request:**

```json
{
  "name": "João Silva",
  "username": "joaosilva",
  "email": "joao@email.com",
  "password": "minhaSenha123"
}
```

**Exemplo de Response — `201 Created`:**

```json
{
  "ok": true,
  "message": "Usuario criado com sucesso!",
  "data": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "name": "João Silva",
    "username": "joaosilva",
    "email": "joao@email.com",
    "profileImage": null,
    "createdAt": "2026-05-05T19:00:00.000Z",
    "updatedAt": "2026-05-05T19:00:00.000Z"
  }
}
```

**Possíveis Erros:**

| Status | Mensagem                                   |
| ------ | ------------------------------------------ |
| `400`  | Requisição inválida (validação dos campos) |
| `409`  | Usuario ja existe!                         |

---

#### `POST /login`

Autentica um usuário e retorna o token JWT.

**Body (JSON):**

| Campo      | Tipo     | Obrigatório | Regras                    |
| ---------- | -------- | ----------- | ------------------------- |
| `email`    | `string` | Sim         | Deve ser um e-mail válido |
| `password` | `string` | Sim         | Mínimo 1 caractere        |

**Exemplo de Request:**

```json
{
  "email": "joao@email.com",
  "password": "minhaSenha123"
}
```

**Exemplo de Response — `200 OK`:**

```json
{
  "ok": true,
  "message": "Login realizado com sucesso!",
  "data": {
    "user": {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "name": "João Silva",
      "username": "joaosilva",
      "email": "joao@email.com",
      "profileImage": null,
      "createdAt": "2026-05-05T19:00:00.000Z",
      "updatedAt": "2026-05-05T19:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Possíveis Erros:**

| Status | Mensagem                                   |
| ------ | ------------------------------------------ |
| `400`  | Requisição inválida (validação dos campos) |
| `401`  | E-mail ou senha invalidos, verifique!      |

---

### Tweets (Autenticado)

#### `POST /tweets`

Cria um novo tweet.

**Headers:** `Authorization: Bearer <token>`

**Body (JSON):**

| Campo     | Tipo     | Obrigatório | Regras                   |
| --------- | -------- | ----------- | ------------------------ |
| `content` | `string` | Sim         | Entre 1 e 200 caracteres |

**Exemplo de Request:**

```json
{
  "content": "Meu primeiro tweet no GrowTwitter!"
}
```

**Exemplo de Response — `201 Created`:**

```json
{
  "ok": true,
  "message": "Tweet criado com sucesso!",
  "data": {
    "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    "content": "Meu primeiro tweet no GrowTwitter!",
    "userId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "parentTweetId": null,
    "createdAt": "2026-05-05T19:10:00.000Z",
    "updatedAt": "2026-05-05T19:10:00.000Z"
  }
}
```

**Possíveis Erros:**

| Status | Mensagem                                              |
| ------ | ----------------------------------------------------- |
| `400`  | Conteúdo do tweet é obrigatório / Validação de campos |
| `401`  | Token não fornecido / Token inválido ou expirado      |

---

#### `POST /tweets/:id/reply`

Cria uma resposta (reply) para um tweet existente.

**Headers:** `Authorization: Bearer <token>`

**Parâmetros de Rota:**

| Parâmetro | Tipo   | Descrição                       |
| --------- | ------ | ------------------------------- |
| `id`      | `UUID` | ID do tweet que será respondido |

**Body (JSON):**

| Campo     | Tipo     | Obrigatório | Regras                   |
| --------- | -------- | ----------- | ------------------------ |
| `content` | `string` | Sim         | Entre 1 e 200 caracteres |

**Exemplo de Request:**

```
POST /tweets/b2c3d4e5-f6a7-8901-bcde-f12345678901/reply
```

```json
{
  "content": "Ótimo tweet! Bem-vindo!"
}
```

**Exemplo de Response — `201 Created`:**

```json
{
  "ok": true,
  "message": "Resposta criada com sucesso!",
  "data": {
    "id": "c3d4e5f6-a7b8-9012-cdef-123456789012",
    "content": "Ótimo tweet! Bem-vindo!",
    "userId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "parentTweetId": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    "createdAt": "2026-05-05T19:15:00.000Z",
    "updatedAt": "2026-05-05T19:15:00.000Z"
  }
}
```

**Possíveis Erros:**

| Status | Mensagem                                                      |
| ------ | ------------------------------------------------------------- |
| `400`  | ID do tweet deve ser válido / Conteúdo do tweet é obrigatório |
| `401`  | Token não fornecido / Token inválido ou expirado              |
| `404`  | Tweet não encontrado                                          |

---

### Likes (Autenticado)

#### `POST /tweets/:id/like`

Curte um tweet.

**Headers:** `Authorization: Bearer <token>`

**Parâmetros de Rota:**

| Parâmetro | Tipo   | Descrição                 |
| --------- | ------ | ------------------------- |
| `id`      | `UUID` | ID do tweet a ser curtido |

**Exemplo de Request:**

```
POST /tweets/b2c3d4e5-f6a7-8901-bcde-f12345678901/like
```

**Exemplo de Response — `200 OK`:**

```json
{
  "ok": true,
  "message": "Tweet curtido com sucesso!"
}
```

**Possíveis Erros:**

| Status | Mensagem                                         |
| ------ | ------------------------------------------------ |
| `400`  | ID do tweet deve ser válido                      |
| `401`  | Token não fornecido / Token inválido ou expirado |
| `404`  | Tweet não encontrado                             |
| `409`  | Você já curtiu este tweet                        |

---

#### `DELETE /tweets/:id/like`

Remove o like de um tweet.

**Headers:** `Authorization: Bearer <token>`

**Parâmetros de Rota:**

| Parâmetro | Tipo   | Descrição                       |
| --------- | ------ | ------------------------------- |
| `id`      | `UUID` | ID do tweet para remover o like |

**Exemplo de Request:**

```
DELETE /tweets/b2c3d4e5-f6a7-8901-bcde-f12345678901/like
```

**Exemplo de Response — `200 OK`:**

```json
{
  "ok": true,
  "message": "Like removido com sucesso!"
}
```

**Possíveis Erros:**

| Status | Mensagem                                         |
| ------ | ------------------------------------------------ |
| `400`  | ID do tweet deve ser válido                      |
| `401`  | Token não fornecido / Token inválido ou expirado |
| `404`  | Tweet não encontrado / Like não encontrado       |

---

### Follow (Autenticado)

#### `POST /users/:id/follow`

Segue um usuário.

**Headers:** `Authorization: Bearer <token>`

**Parâmetros de Rota:**

| Parâmetro | Tipo   | Descrição                   |
| --------- | ------ | --------------------------- |
| `id`      | `UUID` | ID do usuário a ser seguido |

**Exemplo de Request:**

```
POST /users/d4e5f6a7-b8c9-0123-defg-234567890123/follow
```

**Exemplo de Response — `201 Created`:**

```json
{
  "ok": true,
  "message": "Usuário seguido com sucesso!"
}
```

**Possíveis Erros:**

| Status | Mensagem                                                        |
| ------ | --------------------------------------------------------------- |
| `400`  | Você não pode seguir a si mesmo / ID do usuario deve ser válido |
| `401`  | Token não fornecido / Token inválido ou expirado                |
| `404`  | Usuário não encontrado                                          |
| `409`  | Você já segue este usuário                                      |

---

#### `DELETE /users/:id/follow`

Deixa de seguir um usuário.

**Headers:** `Authorization: Bearer <token>`

**Parâmetros de Rota:**

| Parâmetro | Tipo   | Descrição                           |
| --------- | ------ | ----------------------------------- |
| `id`      | `UUID` | ID do usuário para deixar de seguir |

**Exemplo de Request:**

```
DELETE /users/d4e5f6a7-b8c9-0123-defg-234567890123/follow
```

**Exemplo de Response — `200 OK`:**

```json
{
  "ok": true,
  "message": "Deixou de seguir o usuário com sucesso!"
}
```

**Possíveis Erros:**

| Status | Mensagem                                         |
| ------ | ------------------------------------------------ |
| `400`  | ID do usuario deve ser válido                    |
| `401`  | Token não fornecido / Token inválido ou expirado |
| `404`  | Você não segue este usuário                      |

---

### Usuários (Autenticado)

#### `GET /users/:id`

Retorna o perfil de um usuário com tweets (incluindo contagem de likes) e lista de seguidores.

**Headers:** `Authorization: Bearer <token>`

**Parâmetros de Rota:**

| Parâmetro | Tipo   | Descrição     |
| --------- | ------ | ------------- |
| `id`      | `UUID` | ID do usuário |

**Exemplo de Request:**

```
GET /users/a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

**Exemplo de Response — `200 OK`:**

```json
{
  "ok": true,
  "message": "Usuário encontrado com sucesso!",
  "data": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "name": "João Silva",
    "username": "joaosilva",
    "email": "joao@email.com",
    "profileImage": null,
    "createdAt": "2026-05-05T19:00:00.000Z",
    "updatedAt": "2026-05-05T19:00:00.000Z",
    "tweets": [
      {
        "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
        "content": "Meu primeiro tweet no GrowTwitter!",
        "userId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "parentTweetId": null,
        "createdAt": "2026-05-05T19:10:00.000Z",
        "updatedAt": "2026-05-05T19:10:00.000Z",
        "likesCount": 5
      }
    ],
    "followers": [
      {
        "followerId": "d4e5f6a7-b8c9-0123-defg-234567890123",
        "follower": {
          "id": "d4e5f6a7-b8c9-0123-defg-234567890123",
          "name": "Maria Santos",
          "username": "mariasantos"
        }
      }
    ]
  }
}
```

**Possíveis Erros:**

| Status | Mensagem                                         |
| ------ | ------------------------------------------------ |
| `400`  | ID do usuário deve ser válido                    |
| `401`  | Token não fornecido / Token inválido ou expirado |
| `404`  | Usuário não encontrado                           |

---

### Feed (Autenticado)

#### `GET /feed`

Retorna o feed personalizado do usuário autenticado, contendo os tweets do próprio usuário e dos usuários que ele segue, ordenados do mais recente para o mais antigo.

**Headers:** `Authorization: Bearer <token>`

**Exemplo de Request:**

```
GET /feed
```

**Exemplo de Response — `200 OK`:**

```json
{
  "ok": true,
  "message": "Feed buscado com sucesso!",
  "data": [
    {
      "id": "c3d4e5f6-a7b8-9012-cdef-123456789012",
      "content": "Acabei de lançar meu novo projeto!",
      "createdAt": "2026-05-05T20:00:00.000Z",
      "parentTweetId": null,
      "user": {
        "id": "d4e5f6a7-b8c9-0123-defg-234567890123",
        "name": "Maria Santos",
        "username": "mariasantos"
      },
      "likesCount": 12
    },
    {
      "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "content": "Meu primeiro tweet no GrowTwitter!",
      "createdAt": "2026-05-05T19:10:00.000Z",
      "parentTweetId": null,
      "user": {
        "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "name": "João Silva",
        "username": "joaosilva"
      },
      "likesCount": 5
    }
  ]
}
```

**Possíveis Erros:**

| Status | Mensagem                                         |
| ------ | ------------------------------------------------ |
| `401`  | Token não fornecido / Token inválido ou expirado |

---

## Regras de Negócio

### Autenticação

- O **e-mail** é único — não é possível registrar dois usuários com o mesmo e-mail
- O **username** é único — não é possível registrar dois usuários com o mesmo username
- A **senha** é hashada com bcrypt antes de ser salva no banco
- A senha **nunca** é retornada nas respostas da API
- O **token JWT** expira em **1 dia**

### Tweets

- O **conteúdo** do tweet deve ter entre **1 e 200 caracteres**
- Um reply só pode ser criado para um **tweet que exista** no banco de dados
- Tweets são criados com o `userId` do usuário autenticado (extraído do token)

### Likes

- Um usuário **não pode curtir o mesmo tweet duas vezes** (erro `409`)
- Para remover um like, o like **deve existir** previamente (erro `404`)
- O tweet **deve existir** para ser curtido ou descurtido (erro `404`)

### Follow

- Um usuário **não pode seguir a si mesmo** (erro `400`)
- Um usuário **não pode seguir o mesmo usuário duas vezes** (erro `409`)
- O usuário a ser seguido **deve existir** (erro `404`)
- Para deixar de seguir, o follow **deve existir** previamente (erro `404`)

### Feed

- O feed exibe os tweets do **próprio usuário** + tweets de **quem ele segue**
- Os tweets são ordenados por **data de criação (mais recentes primeiro)**
- Cada tweet do feed inclui informações do autor (`id`, `name`, `username`) e a **contagem de likes**

---

## Estrutura do Projeto

```
src/
├── adapters/           # Adaptadores para libs externas (bcrypt, jwt)
│   ├── bcrypt.adapter.ts
│   └── jwt.adapter.ts
├── controllers/        # Camada de controle — recebe req/res e delega ao service
│   ├── auth.controller.ts
│   ├── tweet.controller.ts
│   ├── like.controller.ts
│   ├── follow.controller.ts
│   ├── user.controller.ts
│   └── feed.controller.ts
├── database/           # Instância singleton do PrismaClient
│   └── prisma.ts
├── dtos/               # Data Transfer Objects — tipagem dos dados de entrada
│   ├── create-user.dto.ts
│   ├── login-user.dto.ts
│   ├── create-tweet.dto.ts
│   └── reply-tweet.dto.ts
├── envs/               # Configuração centralizada de variáveis de ambiente
│   └── index.ts
├── factories/          # Factory functions — montagem e injeção de dependências
│   ├── auth.factory.ts
│   ├── tweet.factory.ts
│   ├── like.factory.ts
│   ├── follow.factory.ts
│   ├── user.factory.ts
│   └── feed.factory.ts
├── middlewares/        # Middlewares do Express
│   ├── auth.middleware.ts             # Verificação do token JWT
│   └── data-validation.middleware.ts  # Validação de dados com express-validator
├── repositories/       # Camada de acesso ao banco de dados via Prisma
│   ├── user.repository.ts
│   ├── tweet.repository.ts
│   ├── like.repository.ts
│   └── follow.repository.ts
├── routes/             # Definição das rotas da API
│   ├── auth.routes.ts
│   ├── tweet.routes.ts
│   ├── like.routes.ts
│   ├── follow.routes.ts
│   ├── user.routes.ts
│   └── feed.routes.ts
├── services/           # Camada de regras de negócio
│   ├── auth.service.ts
│   ├── tweet.service.ts
│   ├── like.service.ts
│   ├── follow.service.ts
│   ├── user.service.ts
│   └── feed.service.ts
├── utils/              # Utilitários (tratamento de erros)
│   ├── http.error.ts
│   └── on-error.ts
├── app.ts              # Configuração do Express (middlewares e rotas)
├── server.ts           # Entry point — inicialização do servidor
└── express.d.ts        # Extensão de tipos do Express (req.user)
```

### Descrição das Camadas

| Camada           | Responsabilidade                                                            |
| ---------------- | --------------------------------------------------------------------------- |
| **Routes**       | Define as rotas HTTP, aplica validações e middlewares, delega ao controller |
| **Controllers**  | Recebe `Request`/`Response`, extrai dados e chama o service correspondente  |
| **Services**     | Implementa as regras de negócio e validações, chama os repositories         |
| **Repositories** | Realiza operações no banco de dados via Prisma ORM                          |
| **Factories**    | Monta a cadeia de dependências (Repository → Service → Controller)          |
| **Adapters**     | Encapsula bibliotecas externas (bcrypt, JWT) em classes estáticas           |
| **DTOs**         | Define interfaces TypeScript para dados de entrada                          |
| **Middlewares**  | Autenticação JWT e validação de dados                                       |

---

### Arquitetura

```
Request → Routes → Middleware (Auth + Validation) → Controller → Service → Repository → Database
```

---

## Evoluções Futuras

Melhorias e funcionalidades planejadas para as próximas versões da API:

### Novas Rotas

- **`DELETE /tweets/:id`** — Exclusão de tweet pelo autor
- **`PUT /tweets/:id`** — Edição do conteúdo de um tweet existente
- **`DELETE /users/:id`** — Exclusão de conta de usuário com remoção em cascata de todos os tweets, likes e follows associados
- **`PUT /users/:id`** — Edição de perfil do usuário (nome, username, imagem de perfil)
- **`GET /users`** — Listagem e busca de usuários com paginação
- **`GET /tweets`** — Listagem pública de tweets com filtros e paginação

### Documentação

- **Swagger / OpenAPI** — Documentação interativa da API com Swagger UI, permitindo testar endpoints diretamente pelo navegador

### Testes

- **Testes unitários com Jest** — Cobertura de testes para services e regras de negócio
- **Testes de integração** — Testes end-to-end dos endpoints com banco de dados de teste
- **Relatório de cobertura** — Integração com ferramentas de code coverage

### Infraestrutura e DevOps

- **Dockerfile** — Containerização completa da aplicação (não apenas do banco de dados)
- **CI/CD** — Pipeline de integração contínua com GitHub Actions (lint, testes, build)
- **Logging estruturado** — Sistema de logs com Winston ou Pino para monitoramento em produção
- **Rate Limiting** — Proteção contra abuso de requisições

### Funcionalidades

- **Paginação** — Suporte a paginação em listagens (feed, tweets, seguidores)
- **Busca** — Pesquisa de tweets por conteúdo e usuários por nome/username
- **Upload de imagem** — Upload de foto de perfil com Multer ou serviço de storage
- **Notificações** — Sistema de notificações para likes, follows e replies

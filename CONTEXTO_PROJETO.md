# 📋 Documentação de Contexto do Projeto - Sistema de Pizzaria

## 📖 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Tecnologias e Versões](#tecnologias-e-versões)
4. [Estrutura de Pastas](#estrutura-de-pastas)
5. [Modelagem do Banco de Dados](#modelagem-do-banco-de-dados)
6. [Middlewares](#middlewares)
7. [Validação com Schemas](#validação-com-schemas)
8. [Endpoints](#endpoints)
9. [Fluxo de Requisição](#fluxo-de-requisição)
10. [Configurações do Projeto](#configurações-do-projeto)

---

## 🎯 Visão Geral

Sistema backend de gerenciamento de pizzaria desenvolvido em Node.js com TypeScript, utilizando Express como framework web, Prisma ORM para comunicação com banco de dados PostgreSQL, e Zod para validação de dados.

---

## 🏗️ Arquitetura

O projeto segue o padrão **MVC + Service Layer**, com a seguinte estrutura:

```
Requisição HTTP → Rotas → Middlewares → Controller → Service → Banco de Dados → Service → Controller → Resposta HTTP
```

### Camadas da Arquitetura:

1. **Rotas (`routes.ts`)**: Define os endpoints e aplica os middlewares
2. **Middlewares**: Validação de schema, autenticação e autorização
3. **Controllers**: Recebem a requisição, extraem dados e delegam para o Service
4. **Services**: Contêm toda a lógica de negócio e comunicação com o banco de dados
5. **Prisma Client**: ORM que gerencia a comunicação com PostgreSQL

### Princípios Seguidos:

- **Separação de Responsabilidades**: Cada camada tem uma responsabilidade específica
- **Single Responsibility Principle**: Um controller/service para cada operação
- **Reutilização**: Middlewares compartilhados entre rotas
- **Validação Centralizada**: Schemas Zod validam dados antes de chegarem ao controller

---

## 🚀 Tecnologias e Versões

### Dependências de Produção

| Tecnologia         | Versão  | Finalidade                                   |
| ------------------ | ------- | -------------------------------------------- |
| **express**        | ^5.1.0  | Framework web para criação de APIs REST      |
| **@prisma/client** | ^6.19.0 | ORM para comunicação com banco de dados      |
| **typescript**     | ^5.9.3  | Superset JavaScript com tipagem estática     |
| **zod**            | ^4.1.12 | Biblioteca de validação de schemas e tipagem |
| **bcryptjs**       | ^3.0.3  | Criptografia de senhas                       |
| **jsonwebtoken**   | ^9.0.2  | Geração e validação de tokens JWT            |
| **cors**           | ^2.8.5  | Middleware para habilitar CORS               |
| **dotenv**         | ^17.2.3 | Carregamento de variáveis de ambiente        |
| **tsx**            | ^4.20.6 | Executor TypeScript para desenvolvimento     |
| **multer**         | ^8.20.0 | Multipart/form-data (upload de imagem)       |
| **cloudinary**     | ^2.9.0  | Armazenamento e URL da imagem do produto     |

### Dependências de Desenvolvimento

| Tecnologia              | Versão   | Finalidade                    |
| ----------------------- | -------- | ----------------------------- |
| **@types/express**      | ^5.0.5   | Tipos TypeScript para Express |
| **@types/cors**         | ^2.8.19  | Tipos TypeScript para CORS    |
| **@types/jsonwebtoken** | ^9.0.10  | Tipos TypeScript para JWT     |
| **@types/node**         | ^24.10.0 | Tipos TypeScript para Node.js |
| **@types/multer**       | ^8.20.0  | Tipos TypeScript para Multer  |
| **prisma**              | ^6.19.0  | CLI do Prisma ORM             |

### Banco de Dados

- **PostgreSQL** (gerenciado via Prisma ORM)

---

## 📁 Estrutura de Pastas

```
backend/
├── prisma/
│   ├── migrations/           # Histórico de migrações do banco
│   │   └── 20251110200355_create_tables/
│   │       └── migration.sql
│   ├── migration_lock.toml   # Lock de migrações
│   └── schema.prisma         # Schema do banco de dados
├── src/
│   ├── @types/               # Definições de tipos TypeScript customizados
│   │   └── express/
│   │       └── index.d.ts    # Extensão de tipos do Express
│   ├── config/               # Configurações da aplicação
│   │   ├── cloudinary.ts     # Upload de imagens (produtos)
│   │   └── multer.ts         # Multipart em memória (limite 4MB, JPG/PNG)
│   ├── controllers/          # Controllers (recebem requisições)
│   │   ├── category/
│   │   │   ├── CreateCategoryController.ts
│   │   │   └── ListCategoriesController.ts
│   │   ├── product/
│   │   │   └── CreateProductController.ts
│   │   └── user/
│   │       ├── AuthUserController.ts
│   │       ├── CreateUserController.ts
│   │       └── DetailUserController.ts
│   ├── generated/            # Código gerado pelo Prisma
│   │   └── prisma/
│   │       └── client.ts
│   ├── middlewares/          # Middlewares customizados
│   │   ├── isAdmin.ts        # Verifica se usuário é admin
│   │   ├── isAuthenticated.ts # Valida JWT token
│   │   └── validateSchema.ts  # Valida requisições com Zod
│   ├── prisma/               # Configuração do Prisma Client
│   │   └── index.ts
│   ├── schemas/              # Schemas de validação Zod
│   │   ├── categorySchema.ts
│   │   ├── productSchema.ts
│   │   └── userSchema.ts
│   ├── services/             # Services (lógica de negócio)
│   │   ├── category/
│   │   │   ├── CreateCategoryService.ts
│   │   │   └── ListCategoriesService.ts
│   │   ├── product/
│   │   │   └── CreateProductService.ts
│   │   └── user/
│   │       ├── AuthUserService.ts
│   │       ├── CreateUserService.ts
│   │       └── DetailUserService.ts
│   ├── routes.ts             # Definição de todas as rotas
│   └── server.ts             # Configuração e inicialização do servidor
├── .env                      # Variáveis de ambiente
├── package.json              # Dependências e scripts
├── prisma.config.ts          # Configurações adicionais do Prisma
└── tsconfig.json             # Configurações do TypeScript

```

### Convenções de Nomenclatura:

- **Controllers**: `<Action><Entity>Controller.ts` (ex: `CreateUserController.ts`)
- **Services**: `<Action><Entity>Service.ts` (ex: `CreateUserService.ts`)
- **Schemas**: `<entity>Schema.ts` (ex: `userSchema.ts`)
- **Middlewares**: `<description>.ts` (ex: `isAuthenticated.ts`)

---

## 🗄️ Modelagem do Banco de Dados

### Diagrama de Relacionamentos

```
User (1)
  └─ role: STAFF | ADMIN

Category (1) ─────< (N) Product
                         │
                         └─< (N) Item >─┐
                                        │
Order (1) ─────────────────────────────┘
  └─ items: Item[]
```

### Entidades e Atributos

#### **User** (Usuários do Sistema)

```typescript
{
  id: string(UUID); // Identificador único
  name: string; // Nome completo
  email: string(unique); // Email (único)
  password: string; // Senha criptografada (bcrypt)
  role: Role; // STAFF ou ADMIN
  createdAt: DateTime; // Data de criação
  updatedAt: DateTime; // Data de atualização
}
```

**Enum Role:**

- `STAFF` - Funcionário padrão
- `ADMIN` - Administrador (acesso total)

#### **Category** (Categorias de Produtos)

```typescript
{
  id: string (UUID)          // Identificador único
  name: string               // Nome da categoria
  createdAt: DateTime        // Data de criação
  updatedAt: DateTime        // Data de atualização
  products: Product[]        // Produtos desta categoria
}
```

#### **Product** (Produtos/Pizzas)

```typescript
{
  id: string (UUID)          // Identificador único
  name: string               // Nome do produto
  price: number (int)        // Preço em centavos
  description: string        // Descrição do produto
  banner: string             // URL da imagem
  disabled: boolean          // Produto ativo/inativo
  category_id: string        // FK para Category
  category: Category         // Relação com categoria
  items: Item[]              // Itens de pedidos deste produto
  createdAt: DateTime        // Data de criação
  updatedAt: DateTime        // Data de atualização
}
```

**Observação sobre preço**: O preço é armazenado em **centavos** (inteiro) para evitar problemas com aritmética de ponto flutuante.

#### **Order** (Pedidos)

```typescript
{
  id: string (UUID)          // Identificador único
  table: number (int)        // Número da mesa
  status: boolean            // false = aberto, true = fechado
  draft: boolean             // true = rascunho, false = confirmado
  name: string?              // Nome opcional para o pedido
  items: Item[]              // Itens do pedido
  createdAt: DateTime        // Data de criação
  updatedAt: DateTime        // Data de atualização
}
```

#### **Item** (Itens dos Pedidos)

```typescript
{
  id: string(UUID); // Identificador único
  amount: number(int); // Quantidade
  order_id: string; // FK para Order
  order: Order; // Relação com pedido
  product_id: string; // FK para Product
  product: Product; // Relação com produto
  createdAt: DateTime; // Data de criação
  updatedAt: DateTime; // Data de atualização
}
```

### Regras de Deleção (Cascade)

- **Product** deletado → Deleta todos os **Items** relacionados
- **Order** deletado → Deleta todos os **Items** relacionados
- **Category** deletada → Deleta todos os **Products** relacionados

---

## 🛡️ Middlewares

### 1. **isAuthenticated** (`middlewares/isAuthenticated.ts`)

**Função**: Valida se o usuário está autenticado verificando o token JWT.

**Fluxo**:

1. Extrai o token do header `Authorization: Bearer <token>`
2. Verifica a validade do token usando `jsonwebtoken`
3. Extrai o `user_id` do payload do token
4. Adiciona `user_id` ao objeto `req` para uso nos próximos middlewares/controllers
5. Chama `next()` se válido, ou retorna erro 401 se inválido

**Uso**:

```typescript
router.get("/me", isAuthenticated, new DetailUserController().handle);
```

**Respostas de Erro**:

- `401`: Token não fornecido ou inválido

---

### 2. **isAdmin** (`middlewares/isAdmin.ts`)

**Função**: Verifica se o usuário autenticado tem permissão de ADMIN.

**Pré-requisito**: Deve ser usado **após** o middleware `isAuthenticated`.

**Fluxo**:

1. Obtém `user_id` do `req` (adicionado pelo `isAuthenticated`)
2. Busca o usuário no banco de dados
3. Verifica se o campo `role` é igual a `"ADMIN"`
4. Chama `next()` se for admin, ou retorna erro 401 se não for

**Uso**:

```typescript
router.post(
  "/categories",
  isAuthenticated,
  isAdmin,
  validateSchema(categorySchema),
  new CreateCategoryController().handle,
);
```

**Respostas de Erro**:

- `401`: Usuário sem permissão

---

### 3. **validateSchema** (`middlewares/validateSchema.ts`)

**Função**: Valida dados da requisição (body, query, params) usando schemas Zod.

**Fluxo**:

1. Recebe um schema Zod como parâmetro
2. Valida `req.body`, `req.query` e `req.params` contra o schema
3. Chama `next()` se válido
4. Retorna erro 400 com detalhes da validação se inválido

**Uso**:

```typescript
router.post(
  "/users",
  validateSchema(createUserSchema),
  new CreateUserController().handle,
);
```

**Respostas de Erro**:

- `400`: Erro de validação com detalhes dos campos inválidos
- `500`: Erro interno do servidor

**Exemplo de resposta de erro**:

```json
{
  "error": "Erro validação",
  "details": [
    { "message": "O nome precisa ter no minimo 3 letras" },
    { "message": "Precisa ser um email valido" }
  ]
}
```

---

## ✅ Validação com Schemas

Utilizamos **Zod** para validação de dados de entrada. Os schemas ficam organizados na pasta `src/schemas/`.

### User Schemas (`schemas/userSchema.ts`)

#### **createUserSchema**

Valida criação de novos usuários:

```typescript
{
  body: {
    name: string (min: 3 caracteres),
    email: email válido,
    password: string (min: 6 caracteres)
  }
}
```

**Mensagens de erro customizadas**:

- Nome inválido: "O nome precisa ter no minimo 3 letras"
- Email inválido: "Precisa ser um email valido"
- Senha inválida: "A senha deve ter no minimo 6 caracteres"

#### **authUserSchema**

Valida autenticação de usuários:

```typescript
{
  body: {
    email: email válido,
    password: string (obrigatório)
  }
}
```

### Category Schemas (`schemas/categorySchema.ts`)

#### **categorySchema**

Valida criação de categorias:

```typescript
{
  body: {
    name: string (min: 2 caracteres)
  }
}
```

**Mensagens de erro**:

- Nome inválido: "Category name must be at least 2 characters long"

### Product Schemas (`schemas/productSchema.ts`)

#### **createProductSchema**

Valida criação de produtos (campos enviados no corpo do `multipart/form-data`):

```typescript
{
  body: {
    name: string (mínimo 1 caractere),
    price: string (apenas dígitos; convertido para inteiro em centavos no controller),
    description: string (mínimo 1 caractere),
    category_id: string (obrigatório, UUID da categoria)
  }
}
```

**Mensagens de erro** (resumo): nome, preço, descrição e categoria obrigatórios; preço deve ser string numérica (`/^\d+$/`).

**Imagem**: validada no controller — arquivo no campo `file` é obrigatório; tipos aceitos configurados no Multer (JPEG/PNG).

---

## 🌐 Endpoints

### **Usuários**

#### **POST /users**

Cria um novo usuário no sistema.

**Middlewares**: `validateSchema(createUserSchema)`

**Body**:

```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Resposta de Sucesso (200)**:

```json
{
  "id": "uuid-gerado",
  "name": "João Silva",
  "email": "joao@example.com",
  "role": "STAFF",
  "createdAt": "2025-11-11T10:30:00.000Z"
}
```

**Observações**:

- Senha é criptografada com bcrypt (salt: 8)
- Role padrão é STAFF
- Senha não é retornada na resposta

---

#### **POST /session**

Autentica um usuário e retorna token JWT.

**Middlewares**: `validateSchema(authUserSchema)`

**Body**:

```json
{
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Resposta de Sucesso (200)**:

```json
{
  "id": "uuid-do-usuario",
  "name": "João Silva",
  "email": "joao@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Observações**:

- Token JWT com expiração configurada em variável de ambiente
- Token contém o `user_id` no campo `sub`

---

#### **GET /me**

Retorna informações do usuário autenticado.

**Middlewares**: `isAuthenticated`

**Headers**:

```
Authorization: Bearer <token>
```

**Resposta de Sucesso (200)**:

```json
{
  "id": "uuid-do-usuario",
  "name": "João Silva",
  "email": "joao@example.com",
  "role": "STAFF"
}
```

---

### **Categorias**

#### **GET /categories**

Lista todas as categorias (ordenadas por nome ascendente).

**Middlewares**: `isAuthenticated`

**Permissão**: Qualquer usuário autenticado (STAFF ou ADMIN)

**Headers**:

```
Authorization: Bearer <token>
```

**Resposta de Sucesso (200)** — array de objetos com `id`, `name`, `createdAt`:

```json
[
  {
    "id": "uuid-da-categoria",
    "name": "Pizzas Salgadas",
    "createdAt": "2025-11-11T10:30:00.000Z"
  }
]
```

---

#### **POST /categories**

Cria uma nova categoria de produtos.

**Middlewares**: `isAuthenticated`, `isAdmin`, `validateSchema(categorySchema)`

**Permissão**: Apenas usuários com role ADMIN

**Headers**:

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body**:

```json
{
  "name": "Pizzas Doces"
}
```

**Resposta de Sucesso (201)**:

```json
{
  "id": "uuid-gerado",
  "name": "Pizzas Doces",
  "createdAt": "2025-11-11T10:30:00.000Z"
}
```

**Observações**:

- No Prisma, `Category.name` é **único**; duplicidade tende a resultar em erro de negócio (`unable to create category`).

---

### **Produtos**

#### **POST /product**

Cria um produto com imagem enviada ao **Cloudinary**; a URL fica no campo `banner`.

**Middlewares**: `isAuthenticated`, `isAdmin`, `upload.single("file")`, `validateSchema(createProductSchema)`

**Permissão**: Apenas ADMIN

**Headers**:

```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form-data** (campos do `multipart/form-data`):

- **`file`** (arquivo): imagem obrigatória — JPEG/PNG, até 4MB (`src/config/multer.ts`)
- **`name`** (texto): nome do produto (único no banco)
- **`price`** (texto): preço em **centavos**, somente dígitos (ex.: `"1599"`)
- **`description`** (texto): descrição
- **`category_id`** (texto): UUID de uma categoria existente

**Resposta de Sucesso (200)**:

```json
{
  "id": "uuid-gerado",
  "name": "Calabresa",
  "price": 1599,
  "description": "Molho, mussarela, calabresa e orégano",
  "category_id": "uuid-da-categoria",
  "banner": "https://res.cloudinary.com/...",
  "createdAt": "2025-11-11T10:30:00.000Z"
}
```

**Erros comuns** (mensagens lançadas pelo service/controller):

- Categoria inexistente: `Category not found`
- Nome de produto já usado: `A product with this name already exists!`
- Sem arquivo: `The product image is required`
- Falha no upload: `Error while uploading image`
- Tipo MIME inválido: mensagem do filtro do Multer (`Unexpected file type...`)

---

## 🔄 Fluxo de Requisição

### Exemplo Completo: Criação de Usuário

```
1. POST /users
   ↓
2. Middleware: validateSchema(createUserSchema)
   - Valida name, email, password
   - Se inválido → 400 com erros
   ↓
3. CreateUserController.handle()
   - Extrai dados do req.body
   - Instancia CreateUserService
   - Chama service.execute()
   ↓
4. CreateUserService.execute()
   - Verifica se email já existe
   - Se existe → throw Error("Usuário já existente!")
   - Criptografa senha com bcrypt
   - Cria usuário no banco via Prisma
   - Retorna dados do usuário (sem senha)
   ↓
5. CreateUserController.handle()
   - Recebe dados do service
   - Retorna res.json(user)
   ↓
6. Resposta HTTP 200 com dados do usuário
```

### Fluxo com Autenticação e Autorização

```
1. POST /categories
   ↓
2. Middleware: isAuthenticated
   - Valida token JWT
   - Adiciona user_id ao req
   - Se inválido → 401
   ↓
3. Middleware: isAdmin
   - Busca usuário no banco
   - Verifica role === "ADMIN"
   - Se não for admin → 401
   ↓
4. Middleware: validateSchema(categorySchema)
   - Valida dados
   - Se inválido → 400
   ↓
5. CreateCategoryController → CreateCategoryService
   - Lógica de negócio
   - Criação no banco
   ↓
6. Resposta HTTP 201
```

### Listagem de categorias (autenticado)

```
1. GET /categories
   ↓
2. isAuthenticated → ListCategoriesController → ListCategoriesService
   ↓
3. Resposta HTTP 200 (array)
```

### Criação de produto (admin + multipart)

```
1. POST /product (multipart/form-data)
   ↓
2. isAuthenticated → isAdmin
   ↓
3. upload.single("file") — buffer em memória, validação de tipo/tamanho
   ↓
4. validateSchema(createProductSchema) — name, price, description, category_id
   ↓
5. CreateProductController → CreateProductService
   - Verifica categoria e nome único do produto
   - Upload stream para Cloudinary (pasta products)
   - Prisma create com banner = secure_url
   ↓
6. Resposta HTTP 200 (JSON do produto)
```

---

## ⚙️ Configurações do Projeto

### TypeScript (`tsconfig.json`)

**Configurações Principais**:

- **Target**: ES2020
- **Module**: CommonJS (compatível com Node.js)
- **Strict Mode**: Ativado (todas verificações rigorosas)
- **Output**: `./dist`
- **Root**: `./src`
- **Source Maps**: Habilitado

**Verificações Estritas Ativas**:

- `noImplicitAny`: Proíbe tipos `any` implícitos
- `strictNullChecks`: Tratamento rigoroso de null/undefined
- `noUnusedLocals`: Erro para variáveis não usadas
- `noUnusedParameters`: Erro para parâmetros não usados
- `noImplicitReturns`: Todos os caminhos devem retornar valor

---

### Prisma (`prisma/schema.prisma`)

**Generator**:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}
```

Cliente Prisma é gerado em `src/generated/prisma/`.

**Datasource**:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

**Convenções**:

- Nomes de models em PascalCase (ex: `User`)
- Nomes de tabelas em snake_case (ex: `users`)
- IDs: UUID gerado automaticamente
- Timestamps automáticos: `createdAt`, `updatedAt`

---

### Express Server (`server.ts`)

**Middlewares Globais**:

1. `express.json()` - Parse de requisições JSON
2. `cors()` - Habilita CORS para todas as origens
3. `router` - Rotas da aplicação

**Error Handler Global**:

```typescript
app.use((error: Error, _, res: Response, next: NextFunction) => {
  if (error instanceof Error) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(500).json({ error: "Internal server error!" });
});
```

**Porta**:

- Padrão: `3333`
- Configurável via variável de ambiente `PORT`

---

### Variáveis de Ambiente (`.env`)

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/pizzaria?schema=public"

# JWT
JWT_SECRET="sua-chave-secreta-aqui"

# Server
PORT=3333

# Cloudinary (upload de imagens de produto)
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
```

**Variáveis Obrigatórias**:

- `DATABASE_URL`: String de conexão PostgreSQL
- `JWT_SECRET`: Chave secreta para assinar tokens JWT
- `CLOUDINARY_*`: Credenciais Cloudinary para `POST /product`

---

### Scripts NPM (`package.json`)

```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts"
  }
}
```

**Comando de Desenvolvimento**:

```bash
npm run dev
```

- Executa servidor com hot-reload
- Usa `tsx` para executar TypeScript diretamente

**Comandos Prisma**:

```bash
# Criar migração
npx prisma migrate dev --name nome_da_migracao

# Aplicar migrações
npx prisma migrate deploy

# Abrir Prisma Studio
npx prisma studio

# Gerar Prisma Client
npx prisma generate
```

---

## 🔐 Segurança

### Autenticação

- **JWT (JSON Web Tokens)** para autenticação stateless
- Tokens devem ser enviados no header: `Authorization: Bearer <token>`
- Token contém `user_id` no campo `sub`

### Autorização

- Sistema de roles: `STAFF` e `ADMIN`
- Rotas protegidas por middlewares `isAuthenticated` e `isAdmin`

### Criptografia

- **bcryptjs** com salt de 8 rounds para senhas
- Senhas nunca são retornadas nas respostas da API

### Validação

- **Zod** valida todos os inputs antes de chegarem à lógica de negócio
- Mensagens de erro customizadas e amigáveis

---

## 📝 Observações Importantes

1. **Preços em Centavos**: Todos os preços são armazenados como inteiros em centavos para evitar problemas com ponto flutuante.

2. **UUIDs**: Todos os IDs são UUIDs v4 gerados automaticamente pelo Prisma.

3. **Timestamps Automáticos**: `createdAt` e `updatedAt` são gerenciados automaticamente pelo Prisma.

4. **Cascade Delete**: Deleções em cascata estão configuradas para manter integridade referencial.

5. **Error Handling**: Todos os erros são capturados pelo error handler global do Express.

6. **Type Safety**: TypeScript configurado no modo strict garante segurança de tipos em todo o código.

7. **Prisma Client Customizado**: Cliente gerado em `src/generated/prisma` para melhor organização.

8. **Rotas de categoria**: uso do prefixo **`/categories`** (plural); listagem `GET`, criação `POST` apenas para ADMIN.

9. **Produtos com imagem**: `POST /product` usa **multipart** (`file` + campos de texto); imagem sobe para **Cloudinary** e a URL é persistida em `banner`.

---

## 🚀 Como Iniciar o Projeto

1. **Instalar dependências**:

```bash
npm install
```

2. **Configurar variáveis de ambiente**:

```bash
cp .env.example .env
# Editar .env com suas configurações
```

3. **Executar migrações**:

```bash
npx prisma migrate dev
```

4. **Iniciar servidor**:

```bash
npm run dev
```

5. **Servidor rodando em**: `http://localhost:3333`

---

**Documento atualizado em**: 18/04/2026  
**Versão do Projeto**: 1.1.0 (categorias `/categories`, produtos `POST /product` + Cloudinary)

## Atualizacao Consolidada - 28/06/2026

Esta secao consolida o estado completo e atual do backend. Substitui totalmente todas as secoes anteriores que ficaram desatualizadas.

---

### Versoes atuais do `package.json`

Dependencias de producao:

| Pacote               | Versao    |
| -------------------- | --------- |
| `@prisma/adapter-pg` | `^7.7.0`  |
| `@prisma/client`     | `^7.7.0`  |
| `bcryptjs`           | `^3.0.3`  |
| `cloudinary`         | `^2.9.0`  |
| `cors`               | `^2.8.6`  |
| `dotenv`             | `^17.4.2` |
| `express`            | `^5.2.1`  |
| `jsonwebtoken`       | `^9.0.3`  |
| `multer`             | `^2.1.1`  |
| `pg`                 | `^8.20.0` |
| `tsx`                | `^4.21.0` |
| `zod`                | `^4.3.6`  |

Dependencias de desenvolvimento:

| Pacote                | Versao    |
| --------------------- | --------- |
| `@types/cors`         | `^2.8.19` |
| `@types/express`      | `^5.0.6`  |
| `@types/jsonwebtoken` | `^9.0.10` |
| `@types/multer`       | `^2.1.0`  |
| `@types/node`         | `^25.9.4` |
| `@types/pg`           | `^8.20.0` |
| `prisma`              | `^6.19.3` |
| `typescript`          | `^6.0.2`  |

---

### Estrutura de pastas atual (completa)

```text
src/
├── @types/express/index.d.ts
├── config/
│   ├── cloudinary.ts
│   └── multer.ts
├── controllers/
│   ├── category/
│   │   ├── CreateCategoryController.ts
│   │   └── ListCategoriesController.ts
│   ├── order/
│   │   ├── AddItemToOrderController.ts
│   │   ├── CreateOrderController.ts
│   │   ├── DeleteItemController.ts
│   │   ├── DeleteOrderController.ts
│   │   ├── DetailOrderController.ts
│   │   ├── FinishOrderController.ts
│   │   ├── ListOrdersController.ts
│   │   └── SendOrderController.ts
│   ├── product/
│   │   ├── CreateProductController.ts
│   │   ├── DeleteProductController.ts
│   │   ├── ListProductByCategoryController.ts
│   │   └── ListProductsController.ts
│   └── user/
│       ├── AuthUserController.ts
│       ├── CreateUserController.ts
│       └── DetailUserController.ts
├── generated/prisma/           # Codigo gerado pelo Prisma
├── middlewares/
│   ├── isAdmin.ts
│   ├── isAuthenticated.ts
│   └── validateSchema.ts
├── prisma/index.ts
├── schemas/
│   ├── categorySchema.ts
│   ├── orderSchema.ts
│   ├── productSchema.ts
│   └── userSchema.ts
├── services/
│   ├── category/
│   │   ├── CreateCategoryService.ts
│   │   └── ListCategoriesService.ts
│   ├── order/
│   │   ├── AddItemToOrderService.ts
│   │   ├── CreateOrderService.ts
│   │   ├── DeleteItemService.ts
│   │   ├── DeleteOrderService.ts
│   │   ├── DetailOrderService.ts
│   │   ├── finishOrderService.ts
│   │   ├── ListOrdersService.ts
│   │   └── sendOrderService.ts
│   ├── product/
│   │   ├── CreateProductService.ts
│   │   ├── DeleteProductService.ts
│   │   ├── ListProductByCategoryService.ts
│   │   └── ListProductsService.ts
│   └── user/
│       ├── AuthUserService.ts
│       ├── CreateUserService.ts
│       └── DetailsUserService.ts
├── routes.ts
└── server.ts
```

---

### Todos os controllers

| Controller                        | Arquivo                 | Descricao                                     |
| --------------------------------- | ----------------------- | --------------------------------------------- |
| `CreateUserController`            | `controllers/user/`     | Cria novo usuario                             |
| `AuthUserController`              | `controllers/user/`     | Autentica usuario e retorna JWT               |
| `DetailUserController`            | `controllers/user/`     | Retorna dados do usuario autenticado          |
| `CreateCategoryController`        | `controllers/category/` | Cria nova categoria (admin)                   |
| `ListCategoriesController`        | `controllers/category/` | Lista todas as categorias                     |
| `CreateProductController`         | `controllers/product/`  | Cria produto com upload de imagem (admin)     |
| `ListProductsController`          | `controllers/product/`  | Lista produtos, filtravel por `disabled`      |
| `DeleteProductController`         | `controllers/product/`  | Arquiva produto via `disabled = true` (admin) |
| `ListProductByCategoryController` | `controllers/product/`  | Lista produtos ativos de uma categoria        |
| `CreateOrderController`           | `controllers/order/`    | Cria pedido em modo rascunho                  |
| `ListOrdersController`            | `controllers/order/`    | Lista pedidos, filtravel por `draft`          |
| `DetailOrderController`           | `controllers/order/`    | Retorna detalhes completos de um pedido       |
| `AddItemToOrderController`        | `controllers/order/`    | Adiciona item a um pedido aberto              |
| `DeleteItemController`            | `controllers/order/`    | Remove item de um pedido                      |
| `SendOrderController`             | `controllers/order/`    | Envia pedido (rascunho → ativo)               |
| `FinishOrderController`           | `controllers/order/`    | Finaliza pedido (ativo → fechado)             |
| `DeleteOrderController`           | `controllers/order/`    | Exclui pedido permanentemente                 |

---

### Todos os services

| Service                         | Arquivo              | Descricao                                                       |
| ------------------------------- | -------------------- | --------------------------------------------------------------- |
| `CreateUserService`             | `services/user/`     | Verifica email duplicado, criptografa senha, cria usuario       |
| `AuthUserService`               | `services/user/`     | Valida credenciais e retorna JWT                                |
| `DetailsUserService`            | `services/user/`     | Busca usuario por `user_id` do token                            |
| `CreateCategoryService`         | `services/category/` | Cria categoria (nome unico)                                     |
| `ListCategoriesService`         | `services/category/` | Retorna todas as categorias ordenadas por nome                  |
| `CreateProductService`          | `services/product/`  | Valida categoria, nome unico, faz upload ao Cloudinary          |
| `ListProductsService`           | `services/product/`  | Lista produtos filtrando por `disabled`                         |
| `DeleteProductService`          | `services/product/`  | Marca `disabled = true` no produto                              |
| `ListProductsByCategoryService` | `services/product/`  | Retorna produtos ativos de uma categoria                        |
| `CreateOrderService`            | `services/order/`    | Cria pedido com `draft = true`, `status = false`                |
| `ListOrdersService`             | `services/order/`    | Lista pedidos filtrando por `draft`                             |
| `DetailOrderService`            | `services/order/`    | Busca pedido com seus itens e produtos                          |
| `AddItemToOrderService`         | `services/order/`    | Valida pedido e produto, cria item com `total = price * amount` |
| `DeleteItemService`             | `services/order/`    | Verifica existencia do item e o remove                          |
| `SendOrderService`              | `services/order/`    | Muda `draft = false`, rejeita se ja enviado                     |
| `FinishOrderService`            | `services/order/`    | Muda `status = true`, rejeita se ja finalizado                  |
| `DeleteOrderService`            | `services/order/`    | Verifica existencia e exclui o pedido                           |

---

### Rotas atuais (completas)

**Usuarios:**

| Metodo | Rota       | Middlewares                        | Descricao                   |
| ------ | ---------- | ---------------------------------- | --------------------------- |
| `POST` | `/users`   | `validateSchema(createUserSchema)` | Cria usuario                |
| `POST` | `/session` | `validateSchema(authUserSchema)`   | Autentica usuario           |
| `POST` | `/me`      | `isAuthenticated`                  | Retorna usuario autenticado |

**Categorias:**

| Metodo | Rota          | Middlewares                                                    | Descricao        |
| ------ | ------------- | -------------------------------------------------------------- | ---------------- |
| `GET`  | `/categories` | `isAuthenticated`                                              | Lista categorias |
| `POST` | `/categories` | `isAuthenticated`, `isAdmin`, `validateSchema(categorySchema)` | Cria categoria   |

**Produtos:**

| Metodo   | Rota                | Middlewares                                                                                  | Descricao                    |
| -------- | ------------------- | -------------------------------------------------------------------------------------------- | ---------------------------- |
| `GET`    | `/products`         | `isAuthenticated`, `validateSchema(listProductsSchema)`                                      | Lista produtos               |
| `POST`   | `/product`          | `isAuthenticated`, `isAdmin`, `upload.single("file")`, `validateSchema(createProductSchema)` | Cria produto                 |
| `DELETE` | `/product`          | `isAuthenticated`, `isAdmin`                                                                 | Arquiva produto              |
| `GET`    | `/category/product` | `isAuthenticated`, `validateSchema(listProductByCategorySchema)`                             | Lista produtos por categoria |

**Pedidos e Itens:**

| Metodo   | Rota                      | Middlewares                                            | Descricao       |
| -------- | ------------------------- | ------------------------------------------------------ | --------------- |
| `POST`   | `/order`                  | `isAuthenticated`, `validateSchema(createOrderSchema)` | Cria pedido     |
| `GET`    | `/orders`                 | `isAuthenticated`                                      | Lista pedidos   |
| `GET`    | `/order/:order_id`        | `isAuthenticated`, `validateSchema(detailOrderSchema)` | Detalha pedido  |
| `POST`   | `/order/:order_id/items`  | `isAuthenticated`, `validateSchema(addItemSchema)`     | Adiciona item   |
| `PATCH`  | `/order/:order_id/send`   | `isAuthenticated`, `validateSchema(sendOrderSchema)`   | Envia pedido    |
| `PATCH`  | `/order/:order_id/finish` | `isAuthenticated`, `validateSchema(finishOrderSchema)` | Finaliza pedido |
| `DELETE` | `/order/:order_id`        | `isAuthenticated`, `validateSchema(deleteOrderSchema)` | Exclui pedido   |
| `DELETE` | `/items/:item_Id`         | `isAuthenticated`, `validateSchema(deleteItemSchema)`  | Remove item     |

---

### Schemas de validacao atuais

**`userSchema.ts`:**

```ts
createUserSchema: body { username: string (min 3), email: email valido, password: string (min 6) }
authUserSchema:   body { email: email valido, password: string (min 1) }
```

Observacao: o campo do usuario e `username`, nao `name`.

**`categorySchema.ts`:**

```ts
categorySchema: body { name: string (min 2) }
```

**`productSchema.ts`:**

```ts
createProductSchema:         body { name: string (min 1), price: string (apenas digitos), description: string (min 1), category_id: string }
listProductsSchema:          query { disabled?: string (default "false") }
listProductByCategorySchema: query { category_id: string }
```

**`orderSchema.ts`:**

```ts
createOrderSchema:  body { table: number inteiro positivo, name: string (min 1) }
addItemSchema:      body { product_id: uuid, amount: number inteiro positivo }, params { order_id: uuid }
deleteItemSchema:   params { item_Id: uuid }
detailOrderSchema:  params { order_id: uuid }
sendOrderSchema:    params { order_id: uuid }, body? { name?: string }
finishOrderSchema:  params { order_id: uuid }
deleteOrderSchema:  params { order_id: uuid }
```

---

### Prisma e banco

O schema atual usa:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}
```

A URL do banco fica em `prisma.config.ts`, carregada de `process.env["DATABASE_URL"]`.

O model `Item` possui o campo `total Int`, calculado no `AddItemToOrderService` como:

```ts
total: productExists.price * amount;
```

O campo `Order.draft` representa o estado do pedido:

- `draft = true` → pedido em rascunho (ainda sendo montado)
- `draft = false` → pedido enviado para producao

O campo `Order.status` representa se o pedido foi fechado:

- `status = false` → pedido aberto/em andamento
- `status = true` → pedido finalizado/fechado

---

### Configuracoes atuais

`tsconfig.json` usa `strict: true`, `rootDir: "./src"`, `outDir: "./dist"` e `types: ["node"]`.

Como `prisma.config.ts` fica fora de `src/**/*`, ele possui `/// <reference types="node" />` no topo para reconhecer `process.env`.

Scripts atuais:

```json
{
  "dev": "tsx watch src/server.ts",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

---

### Observacoes de boas praticas do projeto

- Controllers sao finos: extraem dados da requisicao, chamam o service e retornam a resposta.
- Services concentram todas as regras de negocio e acesso ao Prisma.
- Schemas Zod validam `body`, `query` e `params` antes do controller via `validateSchema`.
- Rotas administrativas usam `isAuthenticated` + `isAdmin`.
- Rotas de pedido/item usam apenas `isAuthenticated`.
- O error handler global em `server.ts` transforma qualquer `throw new Error(msg)` em resposta `400 { error: msg }`.
- `DeleteProductService` nao exclui fisicamente o produto: marca `disabled = true` para preservar historico de pedidos.
- Precos sao armazenados em centavos (inteiro) para evitar aritmetica de ponto flutuante.
- O campo `total` do `Item` e calculado no momento da insercao (`price * amount`) e persistido no banco.

---

**Documento atualizado em**: 28/06/2026
**Versao do Projeto documentada**: 1.3.0 (rotas completas de orders: detail, send, finish, delete; documentacao de todos os controllers e services)

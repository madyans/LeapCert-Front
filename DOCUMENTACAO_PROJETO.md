# Documentação completa do projeto LeapCert (Front + Back)

Este documento reúne as informações principais do front-end e do back-end do projeto LeapCert: como rodar localmente e em Docker, variáveis de ambiente importantes, resumo dos endpoints da API e observações operacionais.

> Observação de segurança: o repositório contém arquivos `appsettings.*.json` com valores de exemplo (strings de conexão e chaves). Em produção, mantenha segredos fora do código-fonte (variáveis de ambiente, Azure Key Vault, AWS Secrets Manager, etc.) e rotacione chaves quando necessário.

---

## Sumário

- Visão geral
- Estrutura do repositório
- Frontend (LeapCert-Front)
  - Tecnologias
  - Scripts úteis
  - Variáveis de ambiente
  - Como rodar (dev / build / docker)
- Backend (LeapCert-Back)
  - Tecnologias
  - Configurações principais (appsettings e variáveis)
  - Como rodar (dev / migrations / docker)
  - Swagger
- Resumo da API (rotas importantes)
- Autenticação & Cookies
- Armazenamento de arquivos (MinIO)
- Docker / Deploy local com `docker-compose`
- Localização de código e recursos úteis

---

## Visão geral

O projeto é dividido em dois subprojetos:

- `LeapCert-Front` — aplicação frontend em Next.js (TypeScript)
- `LeapCert-Back` — API em .NET (ASP.NET Core, Entity Framework Core)

Este documento foi gerado a partir dos arquivos do repositório (package.json, next.config.ts, Program.cs, appsettings.*, Dockerfiles e docker-compose.yml).

---

## Estrutura do repositório (nível alto)

- `LeapCert-Front/` — frontend (Next.js)
- `LeapCert-Back/` — backend (.NET / WebAPI)

---

## Frontend (LeapCert-Front)

Local: `LeapCert-Front/`

### Tecnologias / dependências principais

Versões declaradas em `package.json` (arquivo fonte):

- Next.js: `15.1.0`
- React: `^18.0.0`
- TypeScript: `^5`
- TailwindCSS: `^3.4.1`
- Axios, TanStack Query, React Hook Form, Zod, Radix UI, Sonner

Arquivos importantes:

- `next.config.ts` — define `API_URL` a partir de `NEXT_PUBLIC_API_URL` e contém a versão
- `src/services/api.ts` — instância axios usada pela aplicação (withCredentials: true)
- `src/constants/URL_PROXYIMAGE.ts` — monta URL para proxy de imagens
- `Dockerfile`, `docker-compose.yml`

### Scripts (em `package.json`)

- `pnpm dev` — desenvolvimento (Next dev)
- `pnpm build` — build de produção
- `pnpm start:next` — iniciar Next em produção
- `pnpm lint` — executar ESLint
- `pnpm format` / `pnpm check` — Prettier

### Variáveis de ambiente

O frontend usa a variável `NEXT_PUBLIC_API_URL` (exposta no cliente) e o `next.config.ts` copia esse valor para `process.env.API_URL` em tempo de build.

- `NEXT_PUBLIC_API_URL` — URL base da API (ex: `http://localhost:5036/api/` para desenvolvimento)

`next.config.ts` define defaults:

- dev default: `http://localhost:5036/api/`
- prod default: `http://98.90.231.160:6030/api/`

Exemplo `.env.local` (dev):

```
NEXT_PUBLIC_API_URL=http://localhost:5036/api/
```

> Observação: como Next injeta `API_URL` em tempo de build, alterar `NEXT_PUBLIC_API_URL` depois de buildar não altera o valor embutido. Para alterar o endpoint em runtime em containers, prefira definir `NEXT_PUBLIC_API_URL` como `ENV` no Docker build/run.

### Como rodar (desenvolvimento)

1. Instale Node 18+ e pnpm
2. No diretório `LeapCert-Front`:

```
pnpm install
pnpm dev
```

A aplicação local normalmente fica em `http://localhost:3000` (Next padrão). O frontend aponta por padrão para `http://localhost:5036/api/` em ambiente de desenvolvimento.

### Como buildar / rodar em produção (local)

```
pnpm build
pnpm start:next
```

### Docker (build/run)

O Dockerfile do front define `ARG NEXT_PUBLIC_API_URL` (default: `http://98.90.231.160:6030/api/`). O `docker-compose.yml` também passa o mesmo valor como argumento.

Exemplo de uso com rede Docker usada neste repositório:

```bash
# criar rede se necessário (os docker-compose esperam a rede 'leapcert-network' externa)
docker network create leapcert-network

# build & run
cd LeapCert-Front
docker-compose up -d --build
```

O container do front expõe a porta `3030` no host (mapeamento `3030:3000`).

---

## Backend (LeapCert-Back)

Local: `LeapCert-Back/`

### Tecnologias / dependências

- .NET target framework: `net8.0` (arquivo `leapcert-back.csproj`)
- Entity Framework Core (SQL Server provider)
- JWT authentication (Microsoft.AspNetCore.Authentication.JwtBearer)
- MinIO (package `Minio`)
- Swagger / Swashbuckle

Pacotes relevantes (via `leapcert-back.csproj`):
- `Microsoft.AspNetCore.Authentication.JwtBearer` 8.x
- `Microsoft.EntityFrameworkCore.SqlServer` 9.x
- `Minio` 6.x
- `Swashbuckle.AspNetCore` 6.x

Arquivos importantes:
- `Program.cs` — configuração da aplicação (CORS, JWT, Swagger, MinIO, DI)
- `appsettings.json` / `appsettings.Development.json` / `appsettings.Production.json`
- `Context/ApplicationDbContext.cs` — EF Core DbContext
- `Migrations/` — migrações EF Core presentes
- `Dockerfile` e `docker-compose.yml`

### Valores de configuração (encontrados no repositório)

**appsettings.json** (valores usados como exemplo)

- ConnectionStrings:DefaultConnection
  - Exemplo (do arquivo):
    - `Server=tcp:98.90.231.160,1433;Database=leapcert_db;User Id=sa;Password=LeapCert@2026!;...`
- Jwt:Secret
  - Exemplo: `eX1@7J#r9aPb!Tz2FqWkLmNcSdUvXyZqR4tGh9bVcXyZ1Q3wE7RsT0YpLkMnOpQz`
- MinIO (exemplo):
  - `AccessKey`: `admin`
  - `SecretKey`: `Admin@123`
  - `EndPoint`: `98.90.231.160:9000`
  - `Bucket`: `leapcert`

> Atenção: esses valores estão no repositório como exemplos. NÃO reutilize em produção e não mantenha segredos no controle de versão.

**appsettings.Development.json** (exemplos relevantes)

- `Jwt:Issuer`: `http://localhost:5036`
- `Jwt:Audience`: `http://localhost:3000`
- `CORS:AllowedOrigins`: `http://localhost:3000`, `http://localhost:3001`, `http://localhost:3002`

**appsettings.Production.json** (exemplos relevantes)

- `Jwt:Issuer`: `http://98.90.231.160:6030`
- `Jwt:Audience`: `http://98.90.231.160:3030`
- `CORS:AllowedOrigins`: `http://98.90.231.160:3030`

### Como rodar (desenvolvimento)

Pré-requisitos: .NET 8 SDK, SQL Server acessível (ou ajuste `DefaultConnection`), opcionalmente MinIO local.

1. Aplique as migrações (se necessário):

```bash
cd LeapCert-Back
# Instale a ferramenta se não tiver
dotnet tool install --global dotnet-ef
# Restaurar e aplicar migrações
dotnet restore
dotnet build
# aplica migrações para a string de conexão atual
dotnet ef database update
```

2. Rodar a API localmente (em dev o projeto está configurado para `http://localhost:5036` nas `launchSettings`):

```bash
dotnet run --project LeapCert-Back/leapcert-back.csproj
```

Após iniciar em modo Development, o Swagger é exposto na raiz (conforme `Program.cs`): por exemplo `http://localhost:5036` (abrirá a UI do Swagger).

### Como rodar com Docker

O `docker-compose.yml` do back mapeia a porta do contêiner `8080` para `6030` no host:

```bash
cd LeapCert-Back
# criar rede se necessário
docker network create leapcert-network

docker-compose up -d --build
```

A API ficará acessível em `http://localhost:6030`.

### Swagger

O Swagger (Swashbuckle) está habilitado e configurado como UI na raiz (`c.RoutePrefix = string.Empty`) — ou seja, ao abrir o host da API você verá a documentação interativa do Swagger.

---

## Resumo da API (rotas principais)

Abaixo uma lista resumida das rotas encontradas (nível alto). Veja os controladores em `LeapCert-Back/Controllers` para detalhes.

### UserController (`/api/user`)

- POST `/api/user/authenticate` — autentica usuário (body: `LoginUserDto`). Em caso de sucesso, o servidor define cookie `accessToken` e retorna dados da sessão.
- GET `/api/user/validateToken?token={token}` — valida token JWT
- GET `/api/user/getAllUsers` — [Authorize] retorna todos os usuários
- POST `/api/user/addUser` — cria um usuário (registro)

### ModuleController (`/api/module`)

- GET `/api/module` — [Authorize] retorna todos os módulos

### ClassController (`/api/class`)

- GET `/api/class` — (AllowAnonymous) lista cursos/classes
- GET `/api/class/student/courses` — [Authorize] cursos do estudante autenticado
- GET `/api/class/{id}` — [Authorize] detalhes de uma classe
- POST `/api/class/{id}/connect` — [Authorize] conectar usuário ao curso
- POST `/api/class/{id}/learning-path/{itemId}/complete` — [Authorize] marcar item como completo
- DELETE `/api/class/{id}/learning-path/{itemId}/complete` — [Authorize] desmarcar completude
- POST `/api/class/{id}/rating` — [Authorize] enviar/atualizar avaliação do curso
- PUT `/api/class/{id}/topics` — [Authorize] atualizar tópicos do curso
- POST `/api/class/{id}/notes` — [Authorize] criar nota do usuário para o curso
- PUT `/api/class/{id}/notes/{noteId}` — [Authorize] atualizar nota
- DELETE `/api/class/{id}/notes/{noteId}` — [Authorize] deletar nota
- POST `/api/class/{id}/forum-topics` — [Authorize] criar tópico de fórum
- GET `/api/class/getTeacherClass/{id}` — (AllowAnonymous) retorna professor da classe

### MinIoController (`/api/minio`)

- GET `/api/minio/objects/getObject?bucketId=...&objectName=...` — [Authorize] obter URL assinado ou referência do objeto
- GET `/api/minio/objects/getAllObjects` — [Authorize] listar objetos do bucket
- POST `/api/minio/createFolder` — [Authorize] criar pasta no bucket (params: path, folderName)
- POST `/api/minio/sendObject` — [Authorize] upload de arquivo (multipart/form-data)
- GET `/api/minio/proxyImage?bucketId=...&objectName=...` — [Authorize] proxy que retorna o conteúdo do arquivo (útil para imagens)

### TeacherController (`/api/teacher`)

- GET `/api/teacher/getAllClasses/{id}` — [Authorize] retorna todas as classes associadas a um professor (por id)
- POST `/api/teacher/createClass` — [Authorize] criar nova classe (body: `CreateClassDto`)

### GeneralController (`/api/general`)

- GET `/api/general/getAllGenders` — [Authorize] retorna lista de gêneros (dados auxiliares)

---

## Autenticação & Cookies

- O backend gera tokens JWT e os armazena em um cookie chamado `accessToken` (veja `UserRepository.SetTokensInsideCookie`). O cookie é configurado com opções de `HttpOnly`, `SameSite`, `Secure` conforme `appsettings.*.json`.
- O middleware JWT (`Program.cs`) tenta extrair o token a partir do cookie `accessToken` (`OnMessageReceived`), portanto as requisições com `withCredentials: true` enviarão o cookie automaticamente para a API.
- O cliente axios (`src/services/api.ts`) tem `withCredentials: true` e um interceptor que tenta ler `accessToken` via `js-cookie` para montar o header `Authorization: Bearer <token>` — atenção: se o cookie estiver configurado como `HttpOnly`, o JavaScript do cliente não conseguirá ler seu valor via `js-cookie`. Mesmo sem ler no cliente, a API ainda recebe o cookie no servidor (desde que `withCredentials` seja true) e autentica.

Observação: há um pequeno descompasso possível entre definir `HttpOnly: true` no cookie e tentar ler o valor no client. Em geral, para segurança, deixe o cookie `HttpOnly` e confie no envio automático de cookies nas requisições (server-side lê o cookie). Se precisar enviar `Authorization` no header do client, o token precisa estar acessível ao JS (não recomendado por segurança).

---

## Armazenamento de arquivos (MinIO)

- O backend está integrado ao MinIO (cliente `Minio`), configurado via `MinIO` em `appsettings.json` (`EndPoint`, `AccessKey`, `SecretKey`, `Bucket`).
- Endpoints para upload/download/proxy estão em `MinIoController`.

---

## Docker e deploy local

Resumo:

- Rede Docker: o `docker-compose.yml` de front e back usam uma rede Docker externa chamada `leapcert-network`. Você pode criá-la com:

```bash
docker network create leapcert-network
```

- Rodar backend:

```bash
cd LeapCert-Back
docker-compose up -d --build
# backend disponível em http://localhost:6030 (conforme docker-compose)
```

- Rodar frontend:

```bash
cd LeapCert-Front
docker-compose up -d --build
# frontend disponível em http://localhost:3030 (map 3030:3000)
```

---

## Localização de código / referências rápidas

- Front-end
  - `LeapCert-Front/package.json` — scripts e dependências
  - `LeapCert-Front/next.config.ts` — variáveis de build
  - `LeapCert-Front/src/services/api.ts` — cliente HTTP (axios)

- Back-end
  - `LeapCert-Back/Program.cs` — configuração do app (CORS, JWT, Swagger, MinIO)
  - `LeapCert-Back/Controllers` — rotas da API
  - `LeapCert-Back/Context` — `ApplicationDbContext`
  - `LeapCert-Back/Migrations` — migrações EF Core
  - `LeapCert-Back/appsettings*.json` — configurações por ambiente


## Banco de Dados (SQL Server) — Esquema extraído das migrations

O backend utiliza SQL Server (Microsoft SQL Server) como banco de dados. Abaixo está um resumo do esquema de dados extraído do snapshot das migrations em `LeapCert-Back/Migrations/ApplicationDbContextModelSnapshot.cs` e das migrations presentes no repositório. Use essas informações como referência para entender tabelas, chaves primárias, colunas principais, relacionamentos e índices.

Localização das migrations e snapshot:
- `LeapCert-Back/Migrations/` (contém arquivos de migração como `20260429012433_AddCourseRatings.cs`, `20260518211213_AddCourseSections.cs`, `20260519233938_AddCourseStructuredTopics.cs`, `20260520000609_AddLearningPathAttachments.cs`, `20260526233551_AddCourseConnectionsAndLearningProgress.cs`, entre outros)
- `LeapCert-Back/Migrations/ApplicationDbContextModelSnapshot.cs` (snapshot do modelo atual)

Observações gerais
- A maioria das tabelas usa uma coluna `codigo` como chave primária (int, Identity).
- Muitas entidades possuem colunas `created_at` e `updated_at` (datetime2) para auditoria.
- Nomes de tabela seguem um padrão em português (prefixo `tb_`) ou nomes específicos (`Usuario`).
- Relações importantes entre tabelas (chaves estrangeiras) são mapeadas com comportamentos de delete (Cascade, Restrict ou NoAction) conforme o snapshot.

Resumo das tabelas principais (nome físico — entidade)

- `tb_curso` (Class)
  - PK: `codigo` (int, Identity)
  - `nome` (nvarchar(max), required)
  - `descricao` (nvarchar(max), required)
  - `genero` (int, nullable) — FK para `tb_genero.codigo`
  - `avaliacao` (nvarchar(max), nullable)
  - `created_at`, `updated_at` (datetime2)
  - Index: `genero`
  - Relações: 1:N com seções, avaliações, certificados, itens da trilha, tópicos de fórum; 1:1 com `tb_curso_path` e `tb_curso_professor_contato`.

- `tb_curso_path` (ClassPath)
  - PK: `codigo`
  - `codigo_curso` (int) — FK único para `tb_curso.codigo` (one-to-one)
  - `path` (nvarchar(max), required)

- `tb_curso_avaliacao_item` (CourseAssessmentItem)
  - PK: `codigo`
  - `codigo_curso` (int) — FK para `tb_curso` (cascade)
  - `titulo`, `tipo` (required)
  - `ordem` (int), `duracao` (string), `prazo` (datetime2?, nullable), `quantidade_questoes` (int?, nullable)
  - `created_at`, `updated_at`
  - Index: (`codigo_curso`, `ordem`)

- `tb_curso_certificado` (CourseCertificate)
  - PK: `codigo`
  - `codigo_curso` (int) — FK para `tb_curso` (cascade)
  - `titulo`, `descricao`, `status` (required)
  - `ordem`, `progresso_padrao` (int), `disponivel_padrao` (bit)
  - `created_at`, `updated_at`
  - Index: (`codigo_curso`, `ordem`)

- `tb_curso_conexao_usuario` (CourseConnection)
  - PK: `codigo`
  - `codigo_criador_curso` (int) — FK para `Usuario.codigo` (Creator) — DeleteBehavior: Restrict
  - `codigo_usuario` (int) — FK para `Usuario.codigo` (User) — DeleteBehavior: Restrict
  - `codigo_curso` (int) — FK para `tb_curso.codigo` (cascade)
  - `status` (nvarchar(450), required)
  - `created_at`, `updated_at`
  - Indexes: `codigo_criador_curso`; (`codigo_curso`, `status`); UNIQUE (`codigo_usuario`, `codigo_curso`)

- `tb_curso_forum_topico` (CourseForumTopic)
  - PK: `codigo`
  - `codigo_curso` (int) — FK para `tb_curso` (cascade)
  - `titulo`, `resumo`, `autor` (required)
  - `ordem`, `created_at`, `updated_at`
  - Index: (`codigo_curso`, `ordem`)

- `tb_curso_trilha` (CourseLearningPathItem)
  - PK: `codigo`
  - `codigo_curso` (int) — FK para `tb_curso` (cascade)
  - `titulo`, `tipo` (required)
  - `ordem`, `arquivo_nome`, `arquivo_path`, `arquivo_tipo` (opcionais)
  - `concluido_padrao` (bit), `created_at`, `updated_at`
  - Index: (`codigo_curso`, `ordem`)

- `tb_curso_trilha_progresso_usuario` (CourseLearningPathProgress)
  - PK: `codigo`
  - `codigo_curso` (int) — FK para `tb_curso` (cascade)
  - `codigo_trilha_item` (int) — FK para `tb_curso_trilha` (NoAction)
  - `codigo_usuario` (int) — FK para `Usuario` (cascade)
  - `concluido` (bit), `concluido_em` (datetime2?, nullable)
  - `created_at`, `updated_at`
  - Indexes: `codigo_curso`; `codigo_trilha_item`; (`codigo_usuario`, `codigo_curso`); UNIQUE (`codigo_usuario`, `codigo_trilha_item`)

- `tb_curso_avaliacao` (CourseRating)
  - PK: `codigo`
  - `codigo_curso` (int) — FK para `tb_curso` (cascade)
  - `codigo_usuario` (int) — FK para `Usuario` (cascade)
  - `nota` (decimal(4,2)), `comentario` (nvarchar(max), nullable)
  - `created_at`, `updated_at`
  - Index: `codigo_usuario`; UNIQUE (`codigo_curso`, `codigo_usuario`)

- `tb_curso_secao` (CourseSection)
  - PK: `codigo`
  - `codigo_curso` (int) — FK para `tb_curso` (cascade)
  - `titulo`, `conteudo` (required)
  - `ordem`, `created_at`, `updated_at`
  - Index: (`codigo_curso`, `ordem`)

- `tb_curso_professor_contato` (CourseTeacherContact)
  - PK: `codigo`
  - `codigo_curso` (int) — FK único para `tb_curso` (one-to-one, cascade)
  - `nome_professor`, `subtitulo`, `mensagem_orientacao` (required)
  - `created_at`, `updated_at`

- `tb_curso_anotacao_usuario` (CourseUserNote)
  - PK: `codigo`
  - `codigo_curso` (int) — FK para `tb_curso` (cascade)
  - `codigo_usuario` (int) — FK para `Usuario` (cascade)
  - `titulo`, `conteudo` (required)
  - `created_at`, `updated_at`
  - Indexes: `codigo_usuario`; (`codigo_curso`, `codigo_usuario`, `updated_at`)

- `tb_genero` (Gender)
  - PK: `codigo`
  - `nome` (required)
  - Referenciada por `tb_curso.genero`

- `tb_modulos` (Modules)
  - PK: `codigo`
  - `nome`, `rota`, `icone` (required)
  - `childoff` (int?, nullable), `ordem` (int?, nullable), `hasChildren` (bit)

- `tb_permissoes_modulo` (PermissionModules)
  - PK: `codigo`
  - `fk_modulo` (int), `fk_perfil` (int)
  - Observação: no snapshot não há FK explícita declarada aqui — pode haver integridade aplicada por aplicação/seed.

- `tb_perfil` (Profile)
  - PK: `codigo`
  - `nome` (required)

- `Usuario` (User)
  - PK: `codigo`
  - `usuario`, `senha`, `nome`, `email` (required)
  - `perfil` (int) — provavelmente referencia `tb_perfil`
  - `avaliacao` (decimal(18,2)), `email_boas_vindas_enviado` (bit)
  - `created_at`

- `tb_usuario_curso` (UserClass)
  - PK: `codigo`
  - `codigo_curso` (int) — FK para `tb_curso` (cascade)
  - `codigo_usuario` (int) — FK para `Usuario` (cascade)
  - `data_matricula` (datetime2)
  - Indexes: `codigo_curso`, `codigo_usuario`

Índices e restrições importantes
- Várias constraints UNIQUE e índices compostos foram declarados no modelo (ex.: UNIQUE em `tb_curso_conexao_usuario` para `codigo_usuario` + `codigo_curso`, UNIQUE em `tb_curso_trilha_progresso_usuario` para `codigo_usuario` + `codigo_trilha_item`, etc.).
- Comportamentos de delete variam por relacionamento: `Cascade` em muitas relações entre curso e seus subitens; `Restrict` para relações onde se preserva o registro do usuário/creator; `NoAction` em um FK específico de progresso da trilha.

Como inspecionar o banco (exemplos)
- Ver tabelas existentes e colunas (SQL Server):

```sql
SELECT TABLE_SCHEMA, TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_TYPE = 'BASE TABLE';

SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, CHARACTER_MAXIMUM_LENGTH
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'tb_curso';
```

- Ver histórico de migrations do EF Core:

```sql
SELECT * FROM __EFMigrationsHistory;
```

Aplicando migrations / criando o banco
- As migrations estão em `LeapCert-Back/Migrations`. Para aplicar localmente (dotnet SDK deve estar instalado):

```bash
cd LeapCert-Back
# instalar dotnet-ef caso não tenha
dotnet tool install --global dotnet-ef
# restaurar/build se necessário
dotnet restore
dotnet build
# aplicar as migrations para a connection string configurada
dotnet ef database update
```

Configuração da connection string
- A connection string padrão (exemplo) está em `LeapCert-Back/appsettings.json` sob `ConnectionStrings:DefaultConnection`. Substitua por uma connection string segura no ambiente (variáveis de ambiente, Key Vault, etc.).
- Exemplo de formato (não reutilizar credenciais do repositório):

```
Server=tcp:<HOST>,<PORT>;Database=<DB_NAME>;User Id=<USER>;Password=<PASSWORD>;TrustServerCertificate=True;Encrypt=False;Connect Timeout=60;
```

Recomendações e próximos passos relacionados ao banco
- Mantenha segredos (senha do DB, chaves) fora do código-fonte.
- Verifique e ajuste as políticas de `ON DELETE` conforme a necessidade de negócio (atualmente há mistura de Cascade/Restrict/NoAction).
- Adicione scripts de seed (se necessário) e/ou registros de teste nas migrations ou em um mecanismo de seed separado.
- Considere criar um script SQL de criação a partir das migrations para ambientes controlados: `dotnet ef migrations script` (gera script SQL cumulativo).

---

*Documento gerado automaticamente a partir dos arquivos do repositório.*

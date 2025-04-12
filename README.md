# 🚀 LeapCert Front 

Interface web do projeto **LeapCert**, construída com **Next.js 15**, **React 19**, **TailwindCSS** e diversas ferramentas modernas do ecossistema frontend. Este projeto proporciona uma experiência de usuário fluida, acessível e responsiva para interações com a plataforma LeapCert.  

---

## 📦 Tecnologias e Bibliotecas

- [Next.js 15](https://nextjs.org/) — Framework React para renderização SSR/SSG
- [React 19](https://react.dev/) — Biblioteca para construção de interfaces
- [TailwindCSS](https://tailwindcss.com/) — Estilização com utilitários
- [React Hook Form](https://react-hook-form.com/) — Gerenciamento de formulários
- [Zod](https://zod.dev/) — Validação de schemas
- [TanStack Query (v5)](https://tanstack.com/query/v5) — Gerenciamento de estados assíncronos
- [Lucide Icons](https://lucide.dev/) — Ícones SVG modernos
- [Axios](https://axios-http.com/) — Cliente HTTP para requisições
- [Radix UI](https://www.radix-ui.com/) — Componentes acessíveis low-level
- [Sonner](https://sonner.emilkowal.dev/) — Sistema leve de notificações
- [cookies-next](https://www.npmjs.com/package/cookies-next) — Gerenciamento de cookies no Next.js

---

## 📁 Estrutura do Projeto

```bash
leapcert-front/
├── public/               # Arquivos estáticos
├── src/                  # Código-fonte da aplicação
│   ├── components/       # Componentes reutilizáveis
│   ├── pages/            # Rotas do Next.js
│   ├── hooks/            # Hooks customizados
│   ├── services/         # Comunicação com APIs
│   ├── styles/           # Estilos globais (Tailwind)
│   └── utils/            # Funções utilitárias
├── .eslintrc.js          # Configuração do ESLint
├── tailwind.config.js    # Configuração do TailwindCSS
├── tsconfig.json         # Configuração do TypeScript
└── package.json          # Dependências e scripts do projeto
```

## 🔧 Scripts Disponíveis

| Comando         | Descrição                                               |
|-----------------|---------------------------------------------------------|
| `pnpm dev`      | Inicia o servidor de desenvolvimento com Turbopack      |
| `pnpm build`    | Cria a versão de produção da aplicação                  |
| `pnpm start`    | Inicia a aplicação em produção                          |
| `pnpm lint`     | Executa o ESLint para manter a qualidade do código      |

---

## ✅ Requisitos

- Node.js 18 ou superior
- Gerenciador de pacotes **pnpm**

---

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para configurar e iniciar o ambiente de desenvolvimento:

1. **Clone o repositório**

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd leapcert-front
   ```

2. **Instale as dependências**
   ```bash
   pnpm install
   ```

3. Inicie o servidor de desenvolvimento
   ```bash
   pnpm dev
   ```

4. Acesse a aplicação
- Abra o navegador e navegue para: http://localhost:3000

---

## 🛠️ Lint & Formatação

Este projeto utiliza ESLint com a configuração padrão recomendada pelo Next.js para manter a consistência e qualidade do código. Execute:
  ```bash
  pnpm lint
  ```
---

## 📝 Licença

Este projeto é privado e de uso interno. Todos os direitos reservados.

---

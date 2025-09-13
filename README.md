# Mars Rover Photo Explorer

Este projeto é uma aplicação web interativa que consome a API da NASA para buscar e exibir fotos capturadas pelos rovers em Marte (Curiosity, Opportunity e Spirit). A interface permite que os usuários filtrem as imagens por rover, câmera e data, proporcionando uma maneira envolvente de explorar o planeta vermelho.

## ✨ Demonstração ao Vivo

**[Link para a demonstração ao vivo]** (adicione seu link aqui)

![alt text](![alt text](image.png))

---

## 🚀 Funcionalidades Principais

- **Busca de Fotos da NASA:** Conecta-se diretamente com a API da NASA para obter dados atualizados.
- **Filtros Avançados:** Permite filtrar as fotos por:
  - **Rover:** Curiosity, Opportunity, ou Spirit.
  - **Câmera:** Lista de câmeras disponíveis para cada rover.
  - **Data:** Seleção de data através de um calendário interativo.
- **Galeria de Imagens:** Exibe as fotos em um layout de galeria claro e organizado.
- **Detalhes da Foto:** Cada foto apresenta informações como a câmera utilizada e a data terrestre.
- **Paginação:** Navega facilmente por centenas ou milhares de fotos disponíveis.
- **Design Responsivo:** Interface moderna e adaptável para desktops, tablets e celulares.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando um stack moderno e robusto, focado em performance e escalabilidade.

- **Frontend:**
  - **Next.js:** Framework React para renderização no servidor (SSR) e geração de sites estáticos (SSG).
  - **React:** Biblioteca para construção de interfaces de usuário.
  - **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
- **Estilização:**
  - **Tailwind CSS:** Framework de CSS "utility-first" para estilização rápida e customizável.
  - **shadcn/ui:** Coleção de componentes de UI reutilizáveis e acessíveis.
- **Comunicação com API:**
  - **Fetch API:** Para realizar as chamadas à API da NASA.
- **Qualidade de Código:**
  - **ESLint:** Para garantir um padrão de código consistente e identificar problemas.

---

## 📂 Estrutura do Projeto

A arquitetura do projeto foi organizada para garantir a separação de responsabilidades e facilitar a manutenção.

```
/
├── src/
│   ├── app/                # Arquivos principais da aplicação (rotas, layout, página inicial)
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/         # Componentes React reutilizáveis
│   │   ├── Filters.tsx     # Componente com os filtros de busca
│   │   ├── Gallery.tsx     # Galeria que exibe as fotos
│   │   ├── RoverCard.tsx   # Card individual para cada foto
│   │   └── ui/             # Componentes base da UI (Button, Calendar, etc.)
│   └── lib/                # Lógica de negócio e comunicação com serviços externos
│       ├── nasa.ts         # Módulo responsável por toda a comunicação com a API da NASA
│       └── utils.ts        # Funções utilitárias
├── public/                 # Arquivos estáticos (imagens, ícones)
└── package.json            # Dependências e scripts do projeto
```

---

## ⚙️ Como Funciona (Passo a Passo)

O fluxo de dados da aplicação ocorre da seguinte maneira:

1.  **Interação do Usuário (`src/app/page.tsx`):** A página principal renderiza os componentes de filtro (`Filters.tsx`) e a galeria (`GalleryContainer.tsx`). O estado dos filtros (rover, câmera, data) é gerenciado nesta página.

2.  **Atualização dos Filtros:** Quando o usuário altera um filtro, o estado na `page.tsx` é atualizado. Isso dispara uma nova busca de dados.

3.  **Chamada à API (`src/lib/nasa.ts`):** A `page.tsx` invoca uma função assíncrona (ex: `getRoverPhotos`) definida em `nasa.ts`. Esta função recebe os parâmetros dos filtros como argumentos.

4.  **Construção da URL:** Dentro de `nasa.ts`, a função constrói a URL final para a API da NASA, incluindo os parâmetros de busca e a chave da API (armazenada de forma segura em variáveis de ambiente).

5.  **Busca dos Dados:** A função utiliza o `fetch` para fazer a requisição HTTP GET para a API da NASA.

6.  **Processamento da Resposta:** A resposta (um JSON com a lista de fotos) é recebida e processada. O módulo `nasa.ts` pode também realizar a validação e formatação dos dados, garantindo que apenas dados consistentes cheguem à UI.

7.  **Exibição na UI (`src/components/Gallery.tsx`):** Os dados processados são passados como `props` para o componente `Gallery.tsx`.

8.  **Renderização dos Cards:** O componente `Gallery.tsx` itera sobre a lista de fotos e renderiza um componente `RoverCard.tsx` para cada uma, exibindo a imagem e suas informações.

---

## 🏁 Como Executar Localmente

Para executar este projeto em sua máquina, siga os passos abaixo.

**Pré-requisitos:**

- Node.js (v18 ou superior)
- npm ou yarn
- Uma chave de API da NASA (obtenha uma gratuitamente em [api.nasa.gov](https://api.nasa.gov/))

**Instalação:**

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    cd seu-repositorio
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**

    - Crie um arquivo chamado `.env.local` na raiz do projeto.
    - Adicione sua chave da API da NASA a este arquivo:
      ```
      NASA_API_KEY=SUA_CHAVE_API_AQUI
      ```

4.  **Execute o servidor de desenvolvimento:**

    ```bash
    npm run dev
    ```

5.  **Abra no navegador:**
    Acesse [http://localhost:3000](http://localhost:3000) para ver a aplicação em funcionamento.

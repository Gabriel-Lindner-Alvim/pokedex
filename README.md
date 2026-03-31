# Pokédex App

Projeto frontend desenvolvido como exercício prático de React e consumo de APIs REST, utilizando a [PokéAPI](https://pokeapi.co) como fonte de dados. O visual foi inspirado na estética retrô do **Game Boy Advance**, com paleta verde LCD, fontes pixel art e scanlines.

---

## Sobre o projeto

Este é um projeto de portfólio sem fins comerciais, criado com o objetivo de praticar:

- Consumo de API REST pública com Axios
- Gerenciamento de estado assíncrono com React Query
- Componentização e arquitetura de pastas em React
- Filtragem, busca e ordenação de dados no frontend
- Animações com Framer Motion
- CSS Modules e design system com variáveis CSS
- Responsividade com CSS Grid

---

## Funcionalidades

- **Listagem** de todos os 1025 pokémons com sprites oficiais
- **Busca** por nome em tempo real
- **Filtro** por tipo (Fogo, Água, Grama, etc.)
- **Ordenação** por ID, Nome, HP, Ataque, Defesa, Velocidade
- **Paginação** com seleção de 40, 120 ou 360 pokémons por página
- **Modal de detalhes** com stats, habilidades, peso e altura
- **Shiny toggle** no card e no modal — troca o sprite ao vivo
- **Formas alternativas** — pokémons com múltiplas formas e transformações, (ex: Formas Regionais, Megaevoluções e Gmax) podem ter suas formas navegadas no modal
- **Border dual-type** — cards de pokémons com dois tipos exibem metade da borda em cada cor
- **Skeleton** — feedback visual de carregamento no formato do grid real

---

## Stack

| Tecnologia | Uso |
|---|---|
| [React 18](https://react.dev) | Biblioteca principal de UI |
| [Vite](https://vitejs.dev) | Bundler e dev server |
| [React Router v6](https://reactrouter.com) | Roteamento entre páginas |
| [TanStack Query v5](https://tanstack.com/query) | Cache e estado assíncrono |
| [Axios](https://axios-http.com) | Requisições HTTP |
| [Framer Motion](https://www.framer.com/motion) | Animações |
| [Lucide React](https://lucide.dev) | Ícones |
| CSS Modules | Estilização com escopo por componente |

---

## Estrutura de pastas

```
src/
├── components/
│   ├── FilterPanel/      # Pills de tipo e select de ordenação
│   ├── Navbar/           # Barra de navegação superior
│   ├── Pagination/       # Navegação entre páginas
│   ├── PokemonCard/      # Card individual do pokémon
│   ├── PokemonModal/     # Modal de detalhes com formas e shiny
│   ├── SearchBar/        # Campo de busca
│   └── Skeleton/         # Skeleton loading do grid
├── hooks/
│   └── usePokemon.js     # Custom hooks com React Query
├── pages/
│   └── Home/             # Página principal com grid
├── services/
│   └── pokeApi.js        # Funções de chamada à PokéAPI
├── utils/
│   └── typeColors.js     # Mapeamento de tipos para cores
└── index.css             # Design system e variáveis CSS globais
```

---

## Como rodar localmente

**Pré-requisitos:** Node.js 18+

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/pokedex-app.git
cd pokedex-app

# Instale as dependências
npm install

# Rode em modo desenvolvimento
npm run dev
```

Acesse `http://localhost:5173` no navegador.

```bash
# Build para produção
npm run build
```

---

## API utilizada

Todos os dados são provenientes da **[PokéAPI](https://pokeapi.co)** — uma API pública, gratuita e sem necessidade de autenticação.

Endpoints utilizados:

```
GET /pokemon?limit=1025          # Lista todos os pokémons
GET /pokemon/{name}              # Detalhes de um pokémon
GET /pokemon-species/{name}      # Formas alternativas
```

---

## Aprendizados

Alguns conceitos praticados durante o desenvolvimento:

- **Lifting state up** — estados de busca e filtro vivem no componente pai e descem via props
- **Valores derivados com `useMemo`** — a lista filtrada é calculada a partir dos estados, sem criar estados desnecessários
- **Cache com React Query** — os dados da API ficam em cache por 10 minutos, evitando requisições repetidas
- **`useEffect` com cleanup** — event listeners e overflow do body são limpos corretamente na desmontagem
- **`stopPropagation`** — o shiny toggle no card não dispara o onClick do card pai

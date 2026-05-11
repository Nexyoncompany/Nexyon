# 🚀 NEXYON - Ecommerce Afiliado Profissional

Plataforma completa e profissional para gerenciar um ecommerce afiliado com painel administrativo avançado, sem necessidade de editar código.

## ✨ Características Principais

### 🏠 **Homepage Pública**
- Banner principal (Hero) gerenciável
- Barra de pesquisa funcional
- Categorias destacadas (Achadinhos, Tendências, Utilidades)
- Produtos em destaque
- Produtos em tendência
- Grid responsivo com cards atraentes
- Footer profissional
- Design glassmorphism com gradientes azul, ciano e roxo

### 📊 **Painel Administrativo Profissional**

#### **Dashboard**
- Métricas em tempo real (Receita, Comissões, Lucro, ROAS, etc)
- Gráficos de receita por período (Recharts)
- Gráficos de comissão por plataforma
- Gráficos de ROI por campanha
- Tabela de produtos mais vendidos
- Tabela de campanhas ativas
- Carrinhos abandonados
- Alertas e notificações
- Atalhos rápidos

#### **Produtos** (`/admin/products`)
- ✅ Criar, editar e excluir produtos
- 📸 Upload de imagem principal
- 📝 Descrição curta e longa (opcional)
- 🎬 URL de vídeo (opcional)
- 📦 Categoria e Plataforma
- 🔗 URL de afiliado (obrigatória)
- 💰 Preço exibido e preço promocional
- 📈 Comissão estimada
- ⭐ Marcar como Destaque na Homepage
- 🔥 Marcar como Tendência
- ✔️ Status Ativo/Inativo
- 🔍 Busca e filtro por categoria
- 📊 Visualização em tabela com pré-visualização

#### **Banners** (`/admin/banners`)
- ✅ Criar, editar e excluir banners
- 📸 Upload de imagem
- 📍 Posições: Hero, Top, Middle, Bottom, Sidebar, Footer
- 🔗 Link opcional
- 📄 Título e descrição (opcional)
- 🎯 Ordem de exibição
- ✔️ Status Ativo/Inativo
- 📊 Visualização em grid

#### **Comissões** (`/admin/commissions`)
- 💰 Registrar vendas e comissões
- 📊 Filtro por período (Dia, Mês, Ano)
- 📈 Totalizadores (Vendido, Comissão Gerada)
- 📋 Contador de comissões pendentes e pagas
- 🔄 Editar e deletar registros
- 📅 Histórico completo

#### **Marketing** (`/admin/marketing`)
- 🎯 Gerenciar campanhas (Google, Meta, TikTok, Pinterest, YouTube)
- 💸 Rastrear investimento vs receita
- 📊 Acompanhar ROI e ROAS
- 🔗 Links diretos para plataformas oficiais
- ✅ Status (Ativa, Pausada, Parada)
- 📈 Totalizadores de performance

#### **Analytics** (`/admin/analytics`)
- 📊 Gráficos de cliques por dia
- 🏆 Top 5 produtos mais clicados
- 💵 Receita por plataforma
- 📈 Taxa de conversão por produto
- 🥧 Distribuição de cliques (Pie Chart)
- 📋 Relatório detalhado de produtos

#### **Mídia** (`/admin/media`)
- 📸 Upload de imagens
- 🎬 Upload de vídeos
- 🎯 Filtro por tipo (Todos, Imagens, Vídeos)
- 📋 Grid com visualização
- 📋 Copiar URL para usar em produtos e banners
- 🗑️ Deletar arquivos

#### **Configurações** (`/admin/settings`)
- 🏢 Nome do site
- 🎨 Cores do tema (Primária e Secundária)
- 📝 SEO (Meta Title, Meta Description, Keywords)
- 📊 Tracking (Google Analytics, GTM, Meta Pixel, TikTok Pixel)
- 📞 Informações de contato (Email, Telefone, Endereço)
- 🌐 Links de redes sociais (Instagram, TikTok, YouTube, Facebook, Twitter)
- 🔧 Scripts personalizados

## 🎯 Fluxo de Operação

### Workflow Completo:

1. **Admin acessa `/admin/login`** com credenciais
2. **Dashboard** → Visão geral de KPIs
3. **Produtos** → Adiciona produtos com:
   - Foto
   - Dados do produto
   - Link de afiliado
   - Marca como Destaque/Tendência (opcional)
4. **Banners** → Cria banners para diferentes posições
5. **Página Pública** → Produtos aparecem automaticamente
6. **Visitante clica** → Redirecionado para link de afiliado
7. **Comissão gerada** → Admin registra em Comissões
8. **Marketing** → Rastreia campanhas e ROI
9. **Configurações** → Personaliza site sem editar código

## 🛠️ Tecnologias

- **Framework**: Next.js 16.2.6 (App Router)
- **Linguagem**: TypeScript
- **Styling**: Tailwind CSS 4
- **Persistência**: localStorage (em memória local)
- **Gráficos**: Recharts
- **Design**: Glassmorphism com gradientes
- **Build**: Turbopack

## 📦 Instalação e Uso

### Requisitos
- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Nexyoncompany/Nexyon.git
cd Nexyon

# Instale dependências
npm install

# Inicie servidor de desenvolvimento
npm run dev
```

Acesse em `http://localhost:3000`

### Build para Produção

```bash
npm run build
npm start
```

## 🔐 Autenticação

Acesso ao painel admin em `/admin/login`

**Credenciais padrão:**
- Email: `admin@nexyon.com`
- Senha: `admin123`

(Personalizáveis no arquivo `middleware.ts`)

## 📊 Armazenamento de Dados

### Estrutura Local (localStorage):

```
nexyon_products       → Array de produtos
nexyon_banners       → Array de banners
nexyon_categories    → Array de categorias
nexyon_commissions   → Array de comissões
nexyon_campaigns     → Array de campanhas
nexyon_media         → Array de arquivos
nexyon_settings      → Configurações do site
```

### Preparado para Supabase

Todos os tipos estão estruturados em `/lib/storage.ts` para fácil migração futura para banco de dados relacional (Supabase, PostgreSQL, etc).

## 🎨 Personalização

### Cores e Tema

Acesse `/admin/settings` para:
- Alterar nome do site
- Escolher cores primária e secundária
- Configurar tema (claro/escuro)

### SEO

Configure em `/admin/settings`:
- Meta Title (até 60 caracteres)
- Meta Description (até 160 caracteres)
- Keywords

### Integrações

Configure em `/admin/settings`:
- Google Analytics
- Google Tag Manager
- Meta Pixel
- TikTok Pixel
- Redes sociais

## 📱 Responsividade

- ✅ Mobile-first design
- ✅ Tablets e iPads
- ✅ Desktops (até 4K)
- ✅ Modo claro/escuro

## 🚀 Próximos Passos (Melhorias Futuras)

- [ ] Integração com Supabase para banco de dados persistente
- [ ] Autenticação com Auth0
- [ ] Sistema de usuários múltiplos
- [ ] Relatórios avançados em PDF
- [ ] Integração com APIs de afiliados (Amazon, AliExpress, etc)
- [ ] Webhooks para rastreamento de conversões
- [ ] Email marketing
- [ ] Sistema de cupons
- [ ] Multidioma (i18n)
- [ ] Testes automatizados

## 📝 Estrutura do Projeto

```
/workspaces/Nexyon/
├── app/
│   ├── admin/
│   │   ├── analytics/
│   │   ├── banners/
│   │   ├── categories/
│   │   ├── commissions/
│   │   ├── dashboard/
│   │   ├── layout.tsx       (Layout com sidebar)
│   │   ├── login/
│   │   ├── marketing/
│   │   ├── media/
│   │   ├── orders/
│   │   ├── products/
│   │   ├── settings/
│   │   └── users/
│   ├── page.tsx             (Homepage pública)
│   ├── layout.tsx
│   └── globals.css
├── lib/
│   ├── cms-data.ts          (Dados iniciais - antigo)
│   └── storage.ts           (Sistema de armazenamento)
├── public/
├── middleware.ts            (Proteção de rotas)
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

## 🤝 Como Usar o Painel

### Adicionar um Produto:

1. Acesse `/admin/products`
2. Preencha o formulário com:
   - Nome do produto
   - Descrição curta e longa
   - Categoria
   - Plataforma (Amazon, Shopee, etc)
   - URL de afiliado (obrigatória)
   - Preço e preço promocional
   - Comissão estimada
   - Upload da imagem
3. Marque "Destaque na homepage" se desejar
4. Marque "Produto em tendência" se desejar
5. Clique em "Adicionar Produto"

>>> O produto aparecerá automaticamente na homepage!

### Criar um Banner:

1. Acesse `/admin/banners`
2. Preencha:
   - Imagem (upload)
   - Título (opcional)
   - Link de destino (opcional)
   - Posição (Hero, Top, Middle, etc)
   - Ordem
3. Marque como "Ativo"
4. Clique em "Adicionar Banner"

>>> O banner aparecerá na homepage na posição configurada!

### Registrar uma Comissão:

1. Acesse `/admin/commissions`
2. Selecione o produto ou preencha manualmente
3. Insira:
   - Valor vendido
   - Valor da comissão
   - Data
   - Status (Pendente, Paga, Cancelada)
4. Clique em "Adicionar"

>>> Veja no dashboard o resumo de comissões!

## 🔒 Segurança

- ✅ Middleware protegendo rotas `/admin`
- ✅ Validação de URL de afiliado
- ✅ CORS headers configurados
- ✅ Sanitização de inputs
- ⚠️ IMPORTANTE: Configure autenticação real antes de usar em produção

## 🐛 Troubleshooting

### Produtos não aparecem na homepage?
- Verifique se foram marcados como "Ativo"
- Limpe o localStorage: `localStorage.clear()`
- Refresque a página

### Banners desaparecendo?
- Verifique se estão marcados como "Ativo"
- Certifique-se que a posição está configurada
- Cheque o localStorage

### Build falhando?
```bash
npm run build -- --verbose
```

## 📞 Suporte

Para reportar bugs ou sugerir melhorias, abra uma issue no GitHub.

## 📄 Licença

MIT License - Veja LICENSE para detalhes

---

**Desenvolvido com ❤️ para Nexyon Affiliate Platform**

Versão: 1.0.0
Última atualização: Maio 2024

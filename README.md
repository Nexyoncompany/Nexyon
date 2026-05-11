# 🚀 NEXYON - Ecommerce Afiliado Profissional

Plataforma completa e gerenciável sem editar código para criar um ecommerce afiliado profissional com dashboard administrativo avançado.

## ⚡ Quick Start

```bash
# Instalar dependências
npm install

# Iniciar desenvolvimento
npm run dev
```

Acesse:
- **Homepage Pública**: http://localhost:3000
- **Painel Admin**: http://localhost:3000/admin/login
  - Email: `admin@nexyon.com`
  - Senha: `admin123`

## 📊 Módulos Inclusos

### 🏠 **Frontend Público**
- Homepage dinâmica com produtos e banners
- Barra de pesquisa
- Categorias (Achadinhos, Tendências, Utilidades)
- Cards responsivos com links de afiliados
- Footer profissional
- Design moderno com glassmorphism

### 📋 **Painel Administrativo**

| Módulo | Funcionalidade |
|--------|---------------|
| 📊 **Dashboard** | Métricas em tempo real, gráficos de receita/comissão/ROI |
| 📦 **Produtos** | CRUD completo com upload de imagem e validação de URL |
| 🎯 **Banners** | Gerenciar banners por posição (Hero, Top, Bottom, etc) |
| 💰 **Comissões** | Rastrear vendas e comissões por período |
| 📣 **Marketing** | Campanhas em Google, Meta, TikTok, Pinterest, YouTube |
| 📈 **Analytics** | Gráficos de cliques, conversões, CTR e receita |
| 📸 **Mídia** | Biblioteca de uploads (imagens e vídeos) |
| ⚙️ **Configurações** | SEO, Redes Sociais, Tracking, Tema |

## 🎯 Fluxo Principal

1. **Admin cadastra produto** com foto, preço e link de afiliado
2. **Produto aparece automaticamente** na homepage
3. **Visitante clica** → redirecionado para afiliado
4. **Comissão é gerada** → Admin registra em Comissões
5. **Dashboard mostra** métricas e performance

## 🛠️ Tecnologias

- **Next.js 16.2.6** (React App Router)
- **TypeScript** para maior segurança
- **Tailwind CSS** para design moderno
- **Recharts** para gráficos
- **localStorage** para dados (pronto para Supabase)

## 💾 Armazenamento

Usa localStorage localmente. **Preparado para migrar para Supabase** - basta conectar API.

## 📚 Documentação Completa

Veja [GUIA_COMPLETO.md](./GUIA_COMPLETO.md) para instruções detalhadas.

## ✅ Checklist de Recursos

- ✅ Dashboard profissional com gráficos
- ✅ CRUD de produtos com imagem
- ✅ Gerenciamento de banners por posição
- ✅ Rastreamento de comissões
- ✅ Análise de campanhas de marketing
- ✅ Analytics com conversões
- ✅ Biblioteca de mídia
- ✅ Configurações do site (SEO, integrações)
- ✅ Homepage dinâmica
- ✅ Autenticação de admin
- ✅ Design responsivo
- ✅ Armazenamento estruturado

## 🚀 Deploy

```bash
npm run build
npm start
```

## 📝 Notas

- Dados salvos em localStorage (persiste no browser)
- Pronto para integração com Supabase/banco real
- Autenticação básica - configure a sua antes de produção

---

**Para documentação completa, veja [GUIA_COMPLETO.md](./GUIA_COMPLETO.md)**

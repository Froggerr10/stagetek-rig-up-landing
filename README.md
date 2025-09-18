# 🚀 Stagetek Rig-UP Landing Page

**Landing Page Profissional para os produtos Rig-UP™ da Stagetek**

Desenvolvida com **React** + **Vite** + **TailwindCSS** para máxima performance e conversão.

## ✨ Características

- 🎯 **Otimizada para conversão** - CTAs estratégicamente posicionados
- 📱 **100% Responsiva** - Mobile, tablet e desktop 
- ⚡ **Performance máxima** - Vite + otimizações de build
- 🎨 **Design profissional** - Brand Stagetek + efeitos visuais
- 🔗 **Integração WhatsApp** - Contato direto com vendas
- 📊 **Catálogo completo** - P/Q25, P/Q30, P/Q50, L15, LED variants
- 💼 **Seção B2B** - Pricing e containers para exportação

## 🚀 Deploy Imediato

### Vercel (Recomendado)

1. **Fork este repositório**
2. **Conecte ao Vercel**: https://vercel.com
3. **Deploy automático** - Pronto em 2 minutos!

### Netlify

1. **Fork este repositório** 
2. **Conecte ao Netlify**: https://netlify.com
3. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`

## 🛠️ Desenvolvimento Local

```bash
# Clone o repositório
git clone https://github.com/Froggerr10/stagetek-rig-up-landing.git
cd stagetek-rig-up-landing

# Instale dependências
npm install

# Servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 📁 Estrutura

```
├── public/                   # Assets estáticos
│   ├── favicon.svg
│   ├── STAGETEK_logo-11.png # Logo Stagetek
│   ├── freepik_edit.png     # Hero image
│   ├── Foto_Q25.png         # Produto P/Q25
│   ├── Foto_Q30.png         # Produto P/Q30
│   ├── Foto_Q50.png         # Produto P/Q50
│   ├── Foto_L15.png         # Produto L15
│   ├── Foto_Rig-UP LED Q30.png
│   └── Foto_Riig_ups_Black.png
├── src/
│   ├── styles/
│   │   └── index.css        # TailwindCSS + custom styles
│   ├── App.jsx              # Componente principal
│   └── main.jsx             # Entry point React
├── index.html               # HTML base
├── package.json             # Dependências
├── vite.config.js           # Configuração Vite
├── tailwind.config.js       # Configuração TailwindCSS
└── postcss.config.js        # PostCSS
```

## 🎨 Customização

### Cores da marca (CSS Variables)
```css
--stagetek-red-primary: #e90101
--stagetek-red-medium: #862128  
--stagetek-red-dark: #63141a
```

### Contatos
Configure em `src/App.jsx`:
```jsx
const CONTENT = {
  wa: "5511981728855",           // WhatsApp
  email: "contato@stagetek.com.br"
};
```

## 📦 Build Otimizado

- **Vendor chunking** - React/ReactDOM separados
- **Tree shaking** - Código não usado removido
- **Asset optimization** - Imagens otimizadas
- **CSS purging** - TailwindCSS apenas classes usadas

## 🔗 Links Importantes

- **Demo Live**: [Em breve]
- **Repositório**: https://github.com/Froggerr10/stagetek-rig-up-landing
- **Issues**: https://github.com/Froggerr10/stagetek-rig-up-landing/issues

## 📞 Suporte

Para dúvidas técnicas sobre o projeto:
- Abra uma **Issue** no GitHub
- Contate: contato@stagetek.com.br

---

**🏭 Desenvolvido para Stagetek - Líder em soluções para eventos**
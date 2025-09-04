<a alt="URL Hider - Extensão Chrome">
<img src="https://github.com/tuliosousapro/chrome-url-hider/blob/d5a42863a3e1e6c23d317c2a0e9a0e6535fb3aba/source/icons/icon128.png">
</a>

<h1 align="center">URL Hider - Extensão Chrome</h1>

<h6 align="center">Uma extensão Chrome com design clean e minimalista que permite esconder a barra de URL durante meets e gravações, protegendo sua privacidade. Inclui estatísticas de uso em formato de gráfico.</h6>

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg">  <img src="https://img.shields.io/badge/Platform-Chromium%20Extension-green">  <img src="https://img.shields.io/badge/Made%20with-JavaScript-yellow">  <img src="https://img.shields.io/badge/Made%20with-HTML-orange">  <img src="https://img.shields.io/badge/Made%20with-CSS-purple">
</p>

---

## 🚀 Funcionalidades

- **Esconder Barra de URL**: Abre páginas em janelas popup sem barra de URL visível
- **Interface Minimalista**: Design clean com gradientes roxos e interface intuitiva
- **Estatísticas de Uso**: Gráficos mostrando os domínios mais acessados
- **Ativação/Desativação**: Controle fácil para ativar ou desativar a funcionalidade
- **Coleta de Dados Local**: Todos os dados ficam armazenados localmente no seu navegador

## 📦 Instalação

### 1. Preparar os Arquivos
Certifique-se de que você tem todos os arquivos da extensão:
```
chrome-url-hider/
├── manifest.json
├── background.js
├── popup.html
├── popup.js
├── popup.css
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

### 2. Instalar no Chrome

1. **Abrir Chrome Extensions**
   - Digite `chrome://extensions/` na barra de endereços
   - Ou vá em Menu → Mais ferramentas → Extensões

2. **Ativar Modo Desenvolvedor**
   - Clique no toggle "Developer mode" no canto superior direito

3. **Carregar Extensão**
   - Clique em "Load unpacked" (Carregar sem compactação)
   - Navegue até a pasta `chrome-url-hider`
   - Selecione a pasta e clique em "Selecionar pasta"

4. **Verificar Instalação**
   - A extensão "URL Hider" deve aparecer na lista
   - O ícone deve aparecer na barra de ferramentas do Chrome

## 🎯 Como Usar

### Esconder URL de uma Página

1. **Abrir o Popup**
   - Clique no ícone da extensão na barra de ferramentas

2. **Inserir URL**
   - O campo será preenchido automaticamente com a URL da aba atual
   - Ou digite manualmente a URL que deseja abrir

3. **Esconder URL**
   - Clique no botão "Esconder URL"
   - Uma nova janela será aberta sem barra de URL visível

### Visualizar Estatísticas

- As estatísticas aparecem automaticamente no popup
- Mostra os 5 domínios mais acessados
- Contador total de URLs abertas
- Gráfico de barras interativo

### Ativar/Desativar

- Use o botão "Ativar/Desativar" no canto superior direito do popup
- Quando desativada, o botão "Esconder URL" fica indisponível

## 🎨 Design

A extensão segue um design **clean e minimalista**:

- **Cores**: Gradiente roxo (#667eea → #764ba2)
- **Tipografia**: Fontes do sistema (San Francisco, Segoe UI, Roboto)
- **Layout**: Espaçamento generoso, elementos bem organizados
- **Animações**: Transições suaves e efeitos hover
- **Responsivo**: Funciona bem em diferentes tamanhos

## 🔒 Privacidade

- **Dados Locais**: Todas as informações ficam no seu navegador
- **Sem Envio de Dados**: Nenhuma informação é enviada para servidores externos
- **Controle Total**: Você pode limpar os dados a qualquer momento
- **Código Aberto**: Todo o código está disponível para inspeção

## 🛠️ Estrutura Técnica

### Arquivos Principais

- **`manifest.json`**: Configuração da extensão (Manifest V3)
- **`background.js`**: Service worker para funcionalidades em background
- **`popup.html/css/js`**: Interface do usuário da extensão

### Permissões Utilizadas

- `activeTab`: Para obter URL da aba atual
- `storage`: Para salvar estatísticas localmente
- `tabs`: Para criar novas janelas

### APIs do Chrome Utilizadas

- `chrome.windows.create()`: Criar janelas popup sem barra de URL
- `chrome.storage.local`: Armazenamento local de dados
- `chrome.tabs.query()`: Obter informações da aba atual

## 🐛 Solução de Problemas

### Extensão não aparece
- Verifique se o modo desenvolvedor está ativado
- Certifique-se de que todos os arquivos estão na pasta correta

### Botão "Esconder URL" não funciona
- Verifique se a extensão está ativada (botão no popup)
- Certifique-se de que a URL é válida

### Estatísticas não aparecem
- Use a funcionalidade algumas vezes para gerar dados
- Verifique se o armazenamento local está funcionando

## 📝 Notas Importantes

1. **Limitação do Chrome**: A extensão não pode esconder a barra de URL de abas existentes por questões de segurança. Em vez disso, ela abre uma nova janela popup.

2. **Compatibilidade**: Funciona com Chrome e navegadores baseados em Chromium.

3. **Dados**: Os dados de uso são limitados aos últimos 100 registros para otimizar performance.

## 🎯 Casos de Uso Ideais

- **Apresentações**: Esconder URLs durante apresentações ao vivo
- **Gravações de Tela**: Manter URLs privadas em vídeos
- **Meetings**: Proteger informações sensíveis durante videochamadas
- **Demonstrações**: Focar no conteúdo sem distrações da URL

---

**Desenvolvido com foco em privacidade e usabilidade** 🔒✨

---

## License

This project is licensed under the MIT License.

---

## Disclaimer

This is an independent project. Please read the full [Legal Disclaimer](DISCLAIMER.md).

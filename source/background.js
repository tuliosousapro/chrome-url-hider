// Background script para a extensão URL Hider - Versão Corrigida

// Função para salvar dados de uso
async function saveUsageData(url, timestamp) {
  try {
    const result = await chrome.storage.local.get(['usageData']);
    const usageData = result.usageData || [];
    
    usageData.push({
      url: url,
      timestamp: timestamp,
      domain: new URL(url).hostname
    });
    
    // Manter apenas os últimos 100 registros para não sobrecarregar o storage
    if (usageData.length > 100) {
      usageData.splice(0, usageData.length - 100);
    }
    
    await chrome.storage.local.set({ usageData: usageData });
  } catch (error) {
    // Silenciar erros para evitar abertura do console
    // console.error('Erro ao salvar dados de uso:', error);
  }
}

// Função para criar janela sem barra de URL - Corrigida
async function createHiddenUrlWindow(url) {
  try {
    // Obter informações da janela atual para posicionamento
    const currentWindow = await chrome.windows.getCurrent();
    
    // Configurações otimizadas para evitar problemas de janela
    const windowOptions = {
      url: url,
      type: 'popup',
      width: Math.min(1200, currentWindow.width - 100),
      height: Math.min(800, currentWindow.height - 100),
      left: currentWindow.left + 50,
      top: currentWindow.top + 50,
      focused: true,
      state: 'normal'
    };
    
    const window = await chrome.windows.create(windowOptions);
    
    // Salvar dados de uso
    await saveUsageData(url, Date.now());
    
    return window;
  } catch (error) {
    // Retornar erro sem usar console.error para evitar abertura do console
    throw new Error('Erro ao criar janela: ' + error.message);
  }
}

// Listener para mensagens do popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    if (request.action === 'createHiddenWindow') {
      createHiddenUrlWindow(request.url)
        .then((window) => {
          sendResponse({ success: true, windowId: window.id });
        })
        .catch((error) => {
          sendResponse({ success: false, error: error.message });
        });
      return true; // Indica que a resposta será assíncrona
    }
    
    if (request.action === 'getUsageData') {
      chrome.storage.local.get(['usageData'])
        .then((result) => {
          sendResponse({ success: true, data: result.usageData || [] });
        })
        .catch((error) => {
          sendResponse({ success: false, error: error.message });
        });
      return true;
    }
  } catch (error) {
    // Tratar erros silenciosamente
    sendResponse({ success: false, error: 'Erro interno da extensão' });
  }
});

// Inicialização silenciosa
chrome.runtime.onInstalled.addListener(() => {
  // Inicialização silenciosa sem console.log
});


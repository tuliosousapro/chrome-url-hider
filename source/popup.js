// Script do popup da extensão URL Hider - Versão Corrigida

let isEnabled = true;

// Função para obter a URL da aba ativa
async function getCurrentTabUrl() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab.url || '';
  } catch (error) {
    // Retornar string vazia em caso de erro
    return '';
  }
}

// Função para criar janela sem URL
async function createHiddenWindow(url) {
  try {
    const response = await chrome.runtime.sendMessage({
      action: 'createHiddenWindow',
      url: url
    });
    
    if (response && response.success) {
      showMessage('Janela criada com sucesso!', 'success');
    } else {
      showMessage('Erro ao criar janela: ' + (response?.error || 'Erro desconhecido'), 'error');
    }
  } catch (error) {
    showMessage('Erro de comunicação com a extensão', 'error');
  }
}

// Função para obter dados de uso
async function getUsageData() {
  try {
    const response = await chrome.runtime.sendMessage({
      action: 'getUsageData'
    });
    
    if (response && response.success) {
      return response.data || [];
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
}

// Função para exibir mensagens
function showMessage(text, type) {
  try {
    const messageDiv = document.getElementById('message');
    if (messageDiv) {
      messageDiv.textContent = text;
      messageDiv.className = `message ${type}`;
      messageDiv.style.display = 'block';
      
      setTimeout(() => {
        messageDiv.style.display = 'none';
      }, 3000);
    }
  } catch (error) {
    // Falhar silenciosamente se não conseguir exibir a mensagem
  }
}

// Função para processar dados para o gráfico
function processDataForChart(usageData) {
  try {
    const domainCounts = {};
    
    usageData.forEach(item => {
      if (item && item.domain) {
        domainCounts[item.domain] = (domainCounts[item.domain] || 0) + 1;
      }
    });
    
    // Pegar os top 5 domínios mais acessados
    const sortedDomains = Object.entries(domainCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
    
    return {
      labels: sortedDomains.map(([domain]) => domain),
      data: sortedDomains.map(([,count]) => count)
    };
  } catch (error) {
    return { labels: [], data: [] };
  }
}

// Função para criar gráfico simples (sem biblioteca externa)
function createSimpleChart(chartData) {
  try {
    const chartContainer = document.getElementById('chart');
    if (!chartContainer) return;
    
    chartContainer.innerHTML = '';
    
    if (!chartData || chartData.labels.length === 0) {
      chartContainer.innerHTML = '<p class="no-data">Nenhum dado disponível</p>';
      return;
    }
    
    const maxValue = Math.max(...chartData.data);
    if (maxValue === 0) {
      chartContainer.innerHTML = '<p class="no-data">Nenhum dado disponível</p>';
      return;
    }
    
    chartData.labels.forEach((label, index) => {
      const value = chartData.data[index];
      const percentage = (value / maxValue) * 100;
      
      const barContainer = document.createElement('div');
      barContainer.className = 'bar-container';
      
      const barLabel = document.createElement('div');
      barLabel.className = 'bar-label';
      barLabel.textContent = label;
      
      const barWrapper = document.createElement('div');
      barWrapper.className = 'bar-wrapper';
      
      const bar = document.createElement('div');
      bar.className = 'bar';
      bar.style.width = percentage + '%';
      
      const barValue = document.createElement('div');
      barValue.className = 'bar-value';
      barValue.textContent = value;
      
      barWrapper.appendChild(bar);
      barWrapper.appendChild(barValue);
      
      barContainer.appendChild(barLabel);
      barContainer.appendChild(barWrapper);
      
      chartContainer.appendChild(barContainer);
    });
  } catch (error) {
    // Falhar silenciosamente se não conseguir criar o gráfico
  }
}

// Função para atualizar estatísticas
async function updateStats() {
  try {
    const usageData = await getUsageData();
    const chartData = processDataForChart(usageData);
    createSimpleChart(chartData);
    
    // Atualizar contador total
    const totalCountElement = document.getElementById('totalCount');
    if (totalCountElement) {
      totalCountElement.textContent = usageData.length;
    }
  } catch (error) {
    // Falhar silenciosamente se não conseguir atualizar as estatísticas
  }
}

// Função para alternar estado da extensão
function toggleExtension() {
  try {
    isEnabled = !isEnabled;
    const toggleBtn = document.getElementById('toggleBtn');
    const hideUrlBtn = document.getElementById('hideUrlBtn');
    
    if (toggleBtn && hideUrlBtn) {
      if (isEnabled) {
        toggleBtn.textContent = 'Desativar';
        toggleBtn.classList.remove('disabled');
        hideUrlBtn.disabled = false;
        showMessage('Extensão ativada', 'success');
      } else {
        toggleBtn.textContent = 'Ativar';
        toggleBtn.classList.add('disabled');
        hideUrlBtn.disabled = true;
        showMessage('Extensão desativada', 'info');
      }
    }
  } catch (error) {
    // Falhar silenciosamente se não conseguir alternar o estado
  }
}

// Função para validar URL
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// Inicialização quando o popup é carregado
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Preencher campo de URL com a URL da aba atual
    const currentUrl = await getCurrentTabUrl();
    const urlInput = document.getElementById('urlInput');
    if (urlInput && currentUrl) {
      urlInput.value = currentUrl;
    }
    
    // Configurar event listeners
    const hideUrlBtn = document.getElementById('hideUrlBtn');
    if (hideUrlBtn) {
      hideUrlBtn.addEventListener('click', async () => {
        if (!isEnabled) return;
        
        const urlInput = document.getElementById('urlInput');
        const url = urlInput ? urlInput.value.trim() : '';
        
        if (!url) {
          showMessage('Por favor, insira uma URL válida', 'error');
          return;
        }
        
        if (!isValidUrl(url)) {
          showMessage('URL inválida', 'error');
          return;
        }
        
        await createHiddenWindow(url);
      });
    }
    
    const toggleBtn = document.getElementById('toggleBtn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleExtension);
    }
    
    // Atualizar estatísticas
    await updateStats();
  } catch (error) {
    // Falhar silenciosamente se houver erro na inicialização
  }
});


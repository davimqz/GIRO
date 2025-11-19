// Script para limpar service workers e cache do navegador
// Execute este código no console do navegador

(async function cleanServiceWorkers() {
  console.log('🧹 Limpando Service Workers e Cache...');
  
  try {
    // Remover todos os service workers
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      console.log(`📋 Encontrados ${registrations.length} service workers`);
      
      for (const registration of registrations) {
        console.log('🗑️ Removendo service worker:', registration.scope);
        await registration.unregister();
      }
    }

    // Limpar cache
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      console.log(`📋 Encontrados ${cacheNames.length} caches`);
      
      for (const cacheName of cacheNames) {
        console.log('🗑️ Removendo cache:', cacheName);
        await caches.delete(cacheName);
      }
    }

    // Limpar localStorage e sessionStorage
    localStorage.clear();
    sessionStorage.clear();
    console.log('🗑️ Storage limpo');

    console.log('✅ Limpeza concluída! Recarregue a página (Ctrl+F5)');
    
  } catch (error) {
    console.error('❌ Erro na limpeza:', error);
  }
})();

/* 
INSTRUÇÕES:
1. Abra o DevTools (F12)
2. Vá para a aba Console
3. Cole este código e pressione Enter
4. Recarregue a página com Ctrl+F5 (hard reload)
*/
// EXECUTE NO CONSOLE DO NAVEGADOR (F12 > Console)
// Cole este código completo e pressione Enter:

(async function() {
  console.log('🧹 Removendo Service Workers...');
  
  // Unregister all service workers
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    console.log(`Encontrados ${registrations.length} service workers`);
    
    for (let registration of registrations) {
      console.log('Removendo:', registration.scope);
      await registration.unregister();
    }
  }
  
  // Clear all caches
  if ('caches' in window) {
    const names = await caches.keys();
    console.log(`Encontrados ${names.length} caches`);
    
    await Promise.all(names.map(name => caches.delete(name)));
  }
  
  console.log('✅ Concluído! Recarregue com Ctrl+F5');
})();
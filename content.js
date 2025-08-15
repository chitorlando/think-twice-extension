(function() {
    const hostname = window.location.hostname.replace('www.', '');
    const fullUrl = window.location.href;
    const urlParams = new URLSearchParams(window.location.search);
    const allowParam = urlParams.get('thinkTwice_allow');
    
    if (allowParam) {
        const timestamp = parseInt(allowParam);
        const now = Date.now();
        
        // Si el parámetro es reciente (menos de 10 segundos)
        if (now - timestamp < 10000) {
            // Limpiar la URL para que se vea limpia
            const cleanUrl = window.location.origin + window.location.pathname + window.location.hash;
            window.history.replaceState({}, document.title, cleanUrl);
            
            // Guardar en localStorage para próximas navegaciones internas
            localStorage.setItem("thinkTwice_temp_allow", timestamp);
            return; // Permitir que la página se cargue
        }
    }
    
    // Verificar si hay permiso temporal en localStorage
    const tempAllow = localStorage.getItem("thinkTwice_temp_allow");
    if (tempAllow) {
        const timestamp = parseInt(tempAllow);
        const now = Date.now();
        
        // Si es reciente (menos de 30 segundos para navegación interna)
        if (now - timestamp < 30000) {
            // Configurar limpieza automática cuando se cierre/salga de la página
            setupPermissionCleanup();
            return; // Permitir navegación interna
        } else {
            localStorage.removeItem("thinkTwice_temp_allow");
        }
    }
    
    // Si no hay permiso válido, redirigir pasando la URL completa
    const encodedUrl = encodeURIComponent(fullUrl);
    window.location.href = chrome.runtime.getURL(`block.html?site=${hostname}&url=${encodedUrl}`);
})();

// Función para configurar la limpieza del permiso cuando se cierre la ventana
function setupPermissionCleanup() {
    // Limpiar al salir de la página
    window.addEventListener('beforeunload', () => {
        localStorage.removeItem("thinkTwice_temp_allow");
    });
    
    // Limpiar cuando se pierde el foco de la ventana (al cambiar de pestaña/ventana)
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
            // Limpiar después de 10 segundos de estar oculto
            setTimeout(() => {
                if (document.visibilityState === 'hidden') {
                    localStorage.removeItem("thinkTwice_temp_allow");
                }
            }, 10000);
        }
    });
    
    // Limpiar cuando se pierde el foco de la ventana
    window.addEventListener('blur', () => {
        setTimeout(() => {
            localStorage.removeItem("thinkTwice_temp_allow");
        }, 5000);
    });
}
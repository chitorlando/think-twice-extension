const scienceFacts = [
  {
    fact: "¿Sabías que cada 'like' que recibes libera dopamina como una droga?",
    quote: "El sistema de recompensas del cerebro se activa de la misma manera con las redes sociales que con el alcohol o las drogas",
    author: "Dr. Anna Lembke, Stanford Psychiatry",
    detail: "Las interacciones en redes sociales activan los mismos circuitos neurales que las sustancias adictivas.",
    source: "Stanford Medicine",
  },
  {
    fact: "¿Sabías que el scrolling infinito fue diseñado como una máquina tragamonedas?",
    quote: "Es como una máquina tragamonedas... Estás apostando tu atención por recompensas que no sabes si van a llegar",
    author: "Tristan Harris, ex-Google Design Ethicist",
    detail: "El diseño de feeds infinitos usa refuerzo de intervalo variable, el mismo principio de los casinos.",
    source: "Center for Humane Technology",
  },
  {
    fact: "¿Sabías que revisar redes sociales constantemente cambia tu estructura cerebral?",
    quote: "Los comportamientos habituales de verificación de redes sociales están asociados con cambios en el desarrollo cerebral",
    author: "Estudio de neuroimagen, PMC",
    detail: "El uso habitual de redes sociales modifica físicamente las conexiones neuronales en adolescentes.",
    source: "PMC - National Center for Biotechnology",
  },
  {
    fact: "¿Sabías que el creador del 'Like' se arrepiente de haberlo inventado?",
    quote: "El botón de 'me gusta' era supuestamente para difundir positividad, pero no consideré las consecuencias no deseadas",
    author: "Justin Rosenstein, creador del botón 'Like'",
    detail: "Incluso sus creadores reconocen los efectos negativos no previstos de estas funcionalidades.",
    source: "The Guardian",
  },
  {
    fact: "¿Sabías que tu cerebro confunde las redes sociales con interacción social real?",
    quote: "Las interacciones virtuales activan el sistema de recompensa social, pero proporcionan menos satisfacción que las presenciales",
    author: "Dr. Sherry Turkle, MIT",
    detail: "Obtienes un 'falso positivo' de conexión social que no satisface realmente tu necesidad humana de conexión.",
    source: "MIT Technology Review",
  },
  {
    fact: "¿Sabías que las notificaciones activan tu cortisol (hormona del estrés)?",
    quote: "Cada notificación genera una pequeña respuesta de estrés, manteniendo el cuerpo en estado de alerta constante",
    author: "Dr. Larry Rosen, Profesor Emérito de Psicología",
    detail: "Las interrupciones constantes mantienen tu sistema nervioso en modo 'lucha o huida'.",
    source: "Psychology Today",
  },
  {
    fact: "¿Sabías que los algoritmos están diseñados para maximizar tu tiempo en pantalla, no tu bienestar?",
    quote: "Los algoritmos optimizan para el engagement, no para el bienestar humano... es un problema fundamental de diseño",
    author: "Aza Raskin, co-fundador Center for Humane Technology",
    detail: "Las plataformas priorizan que pases tiempo en ellas, independientemente del impacto en tu vida.",
    source: "Center for Humane Technology",
  }
];

// Función para obtener un hecho aleatorio
function getRandomScienceFact() {
  const randomIndex = Math.floor(Math.random() * scienceFacts.length);
  return scienceFacts[randomIndex];
}

// Mensajes de reflexión mejorados con citas
const scientificReflectionMessages = [
  {
    message: '🧠 ¿Sabías que un ex-VP de Facebook admitió: "Los bucles de dopamina que creamos están destruyendo la sociedad"? ¿Es este tu caso?',
    source: "Chamath Palihapitiya, Stanford GSB"
  },
  {
    message: "🔄 Un experto de Google dice: 'Es como una máquina tragamonedas, apostando tu atención'. ¿Estás apostando tu tiempo?",
    source: "Tristan Harris, ex-Google"
  },
  {
    message: "⏰ Científicos descubrieron que tardas 23 minutos en recuperar la concentración. ¿Vale la pena interrumpir lo que hacías?",
    source: "Dr. Gloria Mark, UC Irvine"
  },
  {
    message: "🧪 El 95% de tus decisiones son inconscientes. Esta pausa te permite tomar una decisión consciente. ¿La aprovechas?",
    source: "Harvard Health Publishing"
  },
  {
    message: "🧠 El uso habitual de redes 'cambia tu estructura cerebral', según estudios de neuroimagen. ¿Qué cambios quieres?",
    source: "PMC Neuroscience Research"
  },
  {
    message: "📱 Tu cerebro confunde las redes con interacción real, pero te da menos satisfacción. ¿No sería mejor hablar con alguien?",
    source: "Dr. Sherry Turkle, MIT"
  },
  {
    message: "🚨 Cada notificación activa tu cortisol (hormona del estrés). ¿Necesitas más estrés en tu vida?",
    source: "Psychology Today Research"
  },
  {
    message: "🎯 Los algoritmos 'optimizan para engagement, no para bienestar humano'. ¿Estás siendo optimizado?",
    source: "Center for Humane Technology"
  },
  {
    message: "💊 El creador del 'Like' se arrepiente: 'No consideré las consecuencias'. ¿Las consideras tú?",
    source: "Justin Rosenstein, The Guardian"
  }
];

document.getElementById("continueBtn").addEventListener("click", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const site = urlParams.get('site');
  const originalUrl = urlParams.get('url');
  
  if (originalUrl) {
    // Decodificar la URL original
    const decodedUrl = decodeURIComponent(originalUrl);
    // Agregar el parámetro de autorización a la URL original
    const separator = decodedUrl.includes('?') ? '&' : '?';
    window.location.href = `${decodedUrl}${separator}thinkTwice_allow=${Date.now()}`;
  } else if (site) {
    // Fallback si no hay URL original
    window.location.href = `https://www.${site}?thinkTwice_allow=${Date.now()}`;
  } else {
    window.location.href = "https://google.com";
  }
});

document.getElementById("goBackBtn").addEventListener("click", () => {
  window.history.back();
});

const allMessages = [
  ...scientificReflectionMessages.map(item => ({
    type: "reflection",
    message: item.message,
    source: item.source
  })),
  ...scienceFacts.map(item => ({
    type: "fact",
    message: `${item.fact}<br><blockquote>"${item.quote}"</blockquote>`,
    source: `${item.author} — ${item.source}`
  }))
];

let currentIndex = 0;
const reflectionElement = document.querySelector('.reflection-text');

function rotateUnifiedMessage() {
    currentIndex = (currentIndex + 1) % allMessages.length;
  const item = allMessages[currentIndex];

  reflectionElement.style.opacity = '0';
  setTimeout(() => {
    reflectionElement.innerHTML = `
      <div class="reflection-message">${item.message}</div>
      <div class="reflection-source">☞ ${item.source}</div>
    `;
    reflectionElement.style.opacity = '1';
  }, 300);
}

function initUnifiedSystem() {
  reflectionElement.style.transition = 'opacity 0.3s ease';
  
  // Mostrar mensaje inicial aleatorio
  const firstIndex = Math.floor(Math.random() * allMessages.length);
  currentIndex = firstIndex;
  const firstItem = allMessages[firstIndex];
  reflectionElement.innerHTML = `
    <div class="reflection-message">${firstItem.message}</div>
    <div class="reflection-source">☞ ${firstItem.source}</div>
  `;

  // Rotar mensajes cada 5 segundos
  setInterval(rotateUnifiedMessage, 5000);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  initUnifiedSystem();
  showTargetUrl();
  initExtensionBadge();
});

// Función para inicializar el badge de la extensión
function initExtensionBadge() {
  const badge = document.querySelector('.extension-badge');
  
  if (badge) {
    // Efecto de pulso sutil cada 10 segundos
    setInterval(() => {
      badge.style.animation = 'none';
      badge.offsetHeight; // Trigger reflow
      badge.style.animation = 'pulse 0.6s ease-in-out';
    }, 10000);
    
    // Click en el badge para mostrar información (opcional)
    badge.addEventListener('click', () => {
      badge.style.transform = 'scale(0.95)';
      setTimeout(() => {
        badge.style.transform = '';
      }, 150);
    });
  }
}

// Función para mostrar la URL de destino
function showTargetUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const originalUrl = urlParams.get('url');
  
  console.log('URL params:', window.location.search); // Debug
  console.log('Original URL:', originalUrl); // Debug
  
  if (originalUrl) {
    const decodedUrl = decodeURIComponent(originalUrl);
    const urlInfo = document.getElementById('urlInfo');
    const targetUrl = document.getElementById('targetUrl');
    
    console.log('Decoded URL:', decodedUrl); // Debug
    console.log('urlInfo element:', urlInfo); // Debug
    
    if (urlInfo && targetUrl) {
      // Mostrar solo una versión limpia de la URL (sin parámetros muy largos)
      let displayUrl = decodedUrl;
      if (displayUrl.length > 60) {
        displayUrl = displayUrl.substring(0, 57) + '...';
      }
      
      targetUrl.textContent = displayUrl;
      urlInfo.style.display = 'block';
    }
}
}
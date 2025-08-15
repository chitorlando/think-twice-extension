document.getElementById("continueBtn").addEventListener("click", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const site = urlParams.get('site');
  
  if (site) {
    // Ir directamente con un parámetro especial
    window.location.href = `https://www.${site}?thinkTwice_allow=${Date.now()}`;
  } else {
    window.location.href = "https://google.com";
  }
});
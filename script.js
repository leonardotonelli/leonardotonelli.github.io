const themeButton = document.querySelector('.theme-toggle');

if (themeButton) {
  themeButton.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    try { localStorage.setItem('lt-theme', nextTheme); } catch (error) {}
  });
}

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

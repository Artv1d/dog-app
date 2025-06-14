import { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Получаем сохраненную тему из localStorage или используем 'light' по умолчанию
    const savedTheme = localStorage.getItem('dog-app-theme');
    return savedTheme || 'light';
  });
  const [selectedBreed, setSelectedBreed] = useState(null);

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('dog-app-theme', newTheme);
      return newTheme;
    });
  };

  // Применяем тему к body при изменении
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <AppContext.Provider value={{ 
      theme, 
      toggleTheme, 
      selectedBreed, 
      setSelectedBreed 
    }}>
      <div className={theme}>
        {children}
      </div>
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
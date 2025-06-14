import { useAppContext } from '../context/AppContext';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { theme } = useAppContext();

  return (
    <nav className={`navbar ${theme}`}>
      <h1 className="logo">Dog Breeds</h1>
      <ThemeToggle />
    </nav>
  );
}
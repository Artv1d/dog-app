import { lazy, Suspense } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

const BreedList = lazy(() => import('./components/BreedList'));
const BreedDetails = lazy(() => import('./components/BreedDetails'));

function AppContent() {
  const { selectedBreed } = useAppContext();

  return (
    <div className="app-container">
      <Navbar />
      <ErrorBoundary>
        <main className="content-area">
          <Suspense fallback={<LoadingSpinner />}>
            <div className="dog-content">
              <BreedList />
              <BreedDetails selectedBreed={selectedBreed} />
            </div>
          </Suspense>
        </main>
      </ErrorBoundary>
      <footer className="app-footer">
        <p>Data from <a href="https://dog.ceo/api" target="_blank" rel="noreferrer">Dog API</a></p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
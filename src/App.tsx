import { BrowserRouter } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import BottomNavbar from './components/BottomNavbar';
import SinglePage from './pages/SinglePage';
import { MotionProvider } from './components/MotionProvider';

function App() {
  return (
    <MotionProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#0a0a0a] text-white relative main-container">
          <AnimatePresence mode="wait">
            <SinglePage />
          </AnimatePresence>
          <BottomNavbar />
        </div>
      </BrowserRouter>
    </MotionProvider>
  );
}

export default App;
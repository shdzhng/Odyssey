import './App.css';
import AuthModal from './components/AuthModal';
import { ThemeProvider } from '@emotion/react';
import globalTheme from './constants/globalTheme';
import { AuthProvider } from './firebaseAuth/firebase';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={globalTheme}>
        <AuthModal />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

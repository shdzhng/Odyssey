import './App.css';
import { ThemeProvider } from '@emotion/react';
import globalTheme from './constants/globalTheme';
// import { AuthProvider } from './firebase/firebaseAuth';
import { AuthProvider } from './firebase';
import Home from './scenes/Home';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={globalTheme}>
        <Home />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

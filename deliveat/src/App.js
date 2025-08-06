import react from 'react';
import SignUp from './Components/Signup/CardSignUp';
function App() {
  return (
     <>
      <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <SignUp/>
    </AppTheme>
     </>
  )
}
export default App;

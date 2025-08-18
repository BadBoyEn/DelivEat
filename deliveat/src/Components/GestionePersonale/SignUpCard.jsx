import {
  Grid,
  Box,
  Button,
  CssBaseline,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  Link
} from '@mui/material';
import { SignUpContainer, StyledCard } from './SignUpContainer';
import { useSignUpLogic } from './SignUpLogic';
import AppTheme from '../../theme/AppTheme';
import ColorModeSelect from '../../theme/ColorModeSelect';
import { SitemarkIcon } from './CustomIcons';

export default function SignUp(props) {
  const {
    FirstNameError,
    FirstNameErrorMessage,
    LastNameError,
    LastNameErrorMessage,
    PhoneError,
    PhoneErrorMessage,
    BirthdateError,
    BirthdateErrorMessage,
    CityError,
    CityErrorMessage,
    AddressError,
    AddressErrorMessage,
    EmailError,
    EmailErrorMessage,
    PasswordError,
    PasswordErrorMessage,
    handleSubmit,
    validateInputs  
  } = useSignUpLogic();

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="center">
        <StyledCard variant="outlined">

          <Box className="color-switch">
            <ColorModeSelect />
          </Box>

          <Box className="logo-container logo-container--tight">
            <SitemarkIcon />
          </Box>

          <Typography component="h2" variant="h4" className="auth-title">
            Registrazione Staff
          </Typography>

          <Box component="form" onSubmit={handleSubmit} className="signup-form">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} lg={4}>
                  <FormControl fullWidth>
                    <FormLabel htmlFor="firstname">Nome</FormLabel>
                     <TextField
                      required
                      id="firstname"
                      placeholder="Mario"
                      name="firstname"
                      variant="outlined"
                      error={FirstNameError}
                      helperText={FirstNameErrorMessage}
                      fullWidth
                    />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <FormControl fullWidth>
                    <FormLabel htmlFor="lastname">Cognome</FormLabel>
                     <TextField
                      required
                      id="lastname"
                      placeholder="Rossi"
                      name="lastname"
                      variant="outlined"
                      fullWidth
                      error={LastNameError}
                      helperText={LastNameErrorMessage}
                     />
                    </FormControl>
                </Grid>
             </Grid>
          </Box>

        <Box component="form" onSubmit={handleSubmit} className="signup-form">
         <Grid container spacing={2}>
           <Grid item xs={12} sm={6} lg={4} className="grid-marginfix">
             <FormControl fullWidth>
              <FormLabel htmlFor="phone">Numero di telefono</FormLabel>
               <TextField
                required
                id="phone"
                name="phone"
                placeholder="+39 123 456 7890"
                variant="outlined"
                fullWidth
                error={PhoneError}
                helperText={PhoneErrorMessage}
                />
              </FormControl>
             </Grid>
             <Grid item xs={12} sm={6} lg={4} className="grid-marginfix">
              <FormControl fullWidth>
               <FormLabel htmlFor="birthdate">Data di nascita</FormLabel>
                <TextField
                 required
                 id="birthdate"
                 name="birthdate"
                 type="date"
                 variant="outlined"
                 InputLabelProps={{ shrink: true }}                   
                 fullWidth
                 error={BirthdateError}
                 helperText={BirthdateErrorMessage}
                 sx={{ minWidth: 203 }}
                />
               </FormControl>
              </Grid>
             </Grid>
        </Box>   

        <Box component="form" onSubmit={handleSubmit} className="signup-form">
         <Grid container spacing={2}>
          <Grid item xs={12} sm={6} lg={4} className="grid-marginfix">
               <FormControl fullWidth>
                <FormLabel htmlFor="city">Città</FormLabel>
                 <TextField
                  required
                  id="city"
                  name="city"
                  placeholder="Roma"
                  variant="outlined"
                  fullWidth
                  error={CityError}
                  helperText={CityErrorMessage}
                 />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} lg={4} className="grid-marginfix">
               <FormControl fullWidth>
                <FormLabel htmlFor="address">Indirizzo</FormLabel>
                 <TextField
                  required
                  id="address"
                  name="address"
                  placeholder="Via Roma 10"
                  variant="outlined"
                  fullWidth
                  error={AddressError}
                  helperText={AddressErrorMessage}
                 />
                </FormControl>
               </Grid>
         </Grid> 
        </Box>

        <Box component="form" onSubmit={handleSubmit} className="signup-form">
         <Grid container spacing={2}>
          <Grid item xs={12} sm={6} lg={4} className="grid-marginfix">
           <FormControl fullWidth>
            <FormLabel htmlFor="email">Email</FormLabel>
             <TextField
              required
              id="email"
              placeholder="tua@email.com"
              name="email"
              variant="outlined"
              fullWidth
              error={EmailError}
              helperText={EmailErrorMessage}                   
             />
            </FormControl>
           </Grid>
          <Grid item xs={12} sm={6} lg={4} className="grid-marginfix">
           <FormControl fullWidth>
            <FormLabel htmlFor="password">Password</FormLabel>
             <TextField
              required
              id="password"
              placeholder="******"
              name="password"
              variant="outlined"               
              fullWidth
              error={PasswordError}
              helperText={PasswordErrorMessage}
            />
          </FormControl>
         </Grid>
        </Grid>
       </Box>   

       <Button type="submit" fullWidth variant="contained" className="signup-button" onClick={validateInputs}>
        Registrati
       </Button>

       <Typography sx={{ textAlign: 'center' }}>
              Hai già un account?{' '}
              <Link
                href="/login"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Accedi
              </Link>
        </Typography>
                      
      </StyledCard>          
    </SignUpContainer>
  </AppTheme>
  )         
}
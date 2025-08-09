import {
  Grid,
  Select,
  Box,
  Button,
  CssBaseline,
  FormControl,
  FormLabel,
  TextField,
  MenuItem,
  Typography,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { SignUpContainer, StyledCard } from './SignUpContainer';
import { useSignUpLogic } from './SignUpLogic';
import AppTheme from '../../theme/AppTheme';
import ColorModeSelect from '../../theme/ColorModeSelect';
import { SitemarkIcon } from './CustomIcons';

const options = [
  { label: "Cameriere", value: "cameriere" },
  { label: "Manager", value: "manager" },
]

export default function SignUp(props) {
  const {
    FirstNameError,
    FirstNameErrorMessage,
    LastNameError,
    LastNameErrorMessage,
    EmailError,
    EmailErrorMessage,
    PasswordErrorMessage,
    PasswordError,
    validateInputs,
    handleSubmit    
  } = useSignUpLogic();

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="center">
        <StyledCard variant="outlined">
          <Box className="color-switch">
            <ColorModeSelect />
          </Box>
          <Box className="logo-container-signup">
            <SitemarkIcon />
          </Box>
          <Typography component="h2" variant="h4.5" className="signup-title">
            Registazione Staff
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
                      error={LastNameError}
                      helperText={LastNameErrorMessage}
                      fullWidth
                     />
                    </FormControl>
                </Grid>
             </Grid>
         </Box>
         <Grid item xs={12} sm={6} lg={4} className="grid-role">
          <FormControl fullWidth variant="outlined">
           <FormLabel htmlFor="Occupation">Occupazione</FormLabel>
            <Select
             required
             fullWidth
             labelId="occupation-label"
             id="Occupation"
             /*onChange={handleChange}*/
             name="occupation">
             {options.map((item) => (
             <MenuItem key={item.value} value={item.value}>
               {item.label}
             </MenuItem>
             ))}
             </Select>
          </FormControl>
        </Grid>
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
                 sx={{ minWidth: 223 }}
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
              error={EmailError}
              helperText={EmailErrorMessage}
              fullWidth                   
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
              error={PasswordError}
              helperText={PasswordErrorMessage}                 
              fullWidth
            />
          </FormControl>
         </Grid>
        </Grid>
       </Box>
       <FormControlLabel
        control={<Checkbox value="allowExtraEmails" color="primary" />}
        label="I want to receive updates via email."
       />             
       <Button type="submit" fullWidth variant="contained" className="signup-button" onClick={validateInputs}>
        Registrati
       </Button>              
      </StyledCard>          
    </SignUpContainer>
  </AppTheme>
  )         
}
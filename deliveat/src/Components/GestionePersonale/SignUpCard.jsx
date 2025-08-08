import {
  Grid,
  Select,
  Box,
  Button,
  CssBaseline,
  Divider,
  FormControl,
  FormLabel,
  TextField,
  MenuItem,
  Typography,
  InputLabel
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
                    <Grid container spacing={3}>
                       <Grid item xs={12} sm={6}>
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
                         sx={{ minWidth: 205 }}
                        />
                        </FormControl>
                       </Grid>
                     <Grid item xs={12} sm={6}>
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
                    sx={{ minWidth: 205 }}
                    />
                      </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                      <FormControl fullWidth variant="outlined">
                          <FormLabel htmlFor="Occupation">Occupazione</FormLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            htmlFor="Occupation"
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
                 </Grid>
                </Box>         
      </StyledCard>            











      </SignUpContainer>










    </AppTheme>
  )





               
}
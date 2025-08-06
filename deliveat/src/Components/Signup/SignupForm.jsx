import react from 'react';
import { Box, FormControl, FormLabel, TextField } from '@mui/material';
import './SignupForm.css';

function SignupForm({
    nameError,
    nameErrorMessage,
    emailError,
    emailErrorMessage,
    passwordError,
    passwordErrorMessage,
    handleSubmit
    }){
    return (
        <>
        {/* ACQUISIZIONE NOME */}
        <FormControl>
            <FormLabel htmlFor="name">Full name</FormLabel>
            <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                placeholder="Zio Paperone"
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? 'error' : 'primary'}
            /> {/* DA TOGLIERE! */}   
        </FormControl>

        {/* ACQUISIZIONE EMAIL */} 

        <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
                required
                fullWidth
                id="email"
                placeholder="pippo@gmail.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={passwordError ? 'error' : 'primary'} />
        </FormControl>
        
        {/* ACQUISIZIONE PASSWORD */} 

        <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? 'error' : 'primary'} />
        </FormControl>

        </>
    );
}
export default SignupForm;
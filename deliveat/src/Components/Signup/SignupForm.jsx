import react from 'react';
import { Box, FormControl, FormLabel, TextField } from '@mui/material';
import './SignupForm.css';

function SignupForm({
    emailError,
    emailErrorMessage,
    passwordError,
    passwordErrorMessage,
    handleSubmit
    }){
    return (
        <>
        <box
            component="form"
            onSubmit={handleSubmit}
            className="form-container"
        >
        {/* ACQUISIZIONE EMAIL */} 
        <FormControl className="form-control"> 
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
                color={emailError ? 'error' : 'primary'} />
        </FormControl>
        
        {/* ACQUISIZIONE PASSWORD */} 

        <FormControl className="form-control">
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
        </box>
        </>
    );
}
export default SignupForm;
import react from 'react';
import {Button} from '@mui/material';
import './ActionSignUp.css';

function ActionSignUp ({validateInputs}) {
    return (
        <Button
            type="submit"
            variant="contained"
            className="sub-btn"
            onClick={validateInputs}
            fullWidth >
        
        Sign Up

        </Button>
    );
}
export default ActionSignUp;
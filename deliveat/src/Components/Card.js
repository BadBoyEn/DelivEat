import react from 'react';
function Card () {
         
            <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive updates via email." />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={validateInputs}
            >
                Sign up
            </Button>
        </Box><Divider>
            <Typography sx={{ color: 'text.secondary' }}>or</Typography>
        </Divider><Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
                fullWidth
                variant="outlined"
                onClick={() => alert('Sign up with Google')}
                startIcon={<GoogleIcon />}
            >
                Sign up with Google
            </Button>
            <Button
                fullWidth
                variant="outlined"
                onClick={() => alert('Sign up with Facebook')}
                startIcon={<FacebookIcon />}
            >
                Sign up with Facebook
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
                Already have an account?{' '}
                <Link
                    href="/material-ui/getting-started/templates/sign-in/"
                    variant="body2"
                    sx={{ alignSelf: 'center' }}
                >
                    Sign in
                </Link>
            </Typography>
        </Box>
        </>
}
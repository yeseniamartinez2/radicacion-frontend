import Card from '@mui/material/Card';
import { SignInButton } from '../sign-in-button/SignInButton';

export function SignInBox() {
    return (
        <Card className="sign-in-card">
            <p>Es necesario iniciar sesión para utilizar esta aplicación.</p>
            <SignInButton />
        </Card>
    )
}
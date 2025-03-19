// File: /pages/login.js
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";

function LoginPage() {
    return (
        <main className="h-dvh flex flex-col items-center gap-6 text-4xl p-4">
            <h1>Repair Shop</h1>
            <Button asChild className="bg-white text-black">
                <LoginLink postLoginRedirectURL="/tickets">Sign In</LoginLink>
            </Button>
        </main>
    );
}

export default LoginPage;
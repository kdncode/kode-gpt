import "./sign-in-page.css";
import { SignIn } from "@clerk/clerk-react";

export const SignInPage = () => {
  return (
    <div className="sign-in-page">
      <SignIn path="/sign-in" signUpUrl="/sign-up" forceRedirectUrl="/dashboard" />
    </div>
  );
};

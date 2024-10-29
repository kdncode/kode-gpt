import "./sign-up-page.css";
import { SignUp } from "@clerk/clerk-react";

export const SignUpPage = () => {
  return (
    <div className="sign-up-page">
      <SignUp path="/sign-up" signInUrl="/sign-in"/>
    </div>
  );
};

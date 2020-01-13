import React from "react";

import SignInPart from "../../components/signinpart/signinpart";
import SignUpPart from "../../components/signuppart/signuppart";

import { SignInAndSignUpContainer } from './signinpage.styles';

const SignInPage = () => (
    <SignInAndSignUpContainer>
        <SignInPart />
        <SignUpPart />
  </SignInAndSignUpContainer>
)

export default SignInPage;
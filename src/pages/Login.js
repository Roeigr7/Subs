import React from "react";
import { Container as ContainerBase } from "components/misc/Layouts";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import googleIconImageSrc from "images/google-icon.png";
import illustration from "images/login-illustration.svg";
import logo from "images/logo.svg";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";

import { useAuth } from "../contexts/authContext";

const Container = tw(ContainerBase)`
  min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8
`;
const Content = tw.div`
  max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1
`;
const MainContainer = tw.div`
  lg:w-1/2 xl:w-5/12 p-6 sm:p-12
`;
const LogoLink = tw.a``;
const LogoImage = tw.img`
  h-12 mx-auto
`;
const MainContent = tw.div`
  mt-12 flex flex-col items-center
`;
const Heading = tw.h1`
  text-2xl xl:text-3xl font-extrabold
`;
const FormContainer = tw.div`
  w-full flex-1 mt-8
`;

const SocialButtonsContainer = tw.div`
  flex flex-col items-center
`;
const SocialButton = styled.a`
  ${tw`
    w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0
  `}
  .iconContainer {
    ${tw`
      bg-white p-2 rounded-full
    `}
  }
  .icon {
    ${tw`
      w-4
    `}
  }
  .text {
    ${tw`
      ml-4
    `}
  }
`;

const DividerTextContainer = tw.div`
  my-12 border-b text-center relative
`;
const DividerText = tw.div`
  leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent
`;

const Form = tw.form`
  mx-auto max-w-xs
`;
const Input = tw.input`
  w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0
`;
const SubmitButton = styled.button`
  ${tw`
    mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none
  `}
  .icon {
    ${tw`
      w-6 h-6 -ml-2
    `}
  }
  .text {
    ${tw`
      ml-3
    `}
  }
`;
const IllustrationContainer = tw.div`
  sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center
`;
const IllustrationImage = styled.div`
  ${(props) => `background-image: url("${props.imageSrc}");`}
  ${tw`
    m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat
  `}
`;

const LoginPage = () => {
  const { login, googleLogin } = useAuth();
  const [isPending, setIsPending] = React.useState(false);
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);
  const logoLinkUrl = "/";
  const illustrationImageSrc = illustration;
  const headingText = "התחבר לסאבס";
  const socialButtons = [
    {
      iconImageSrc: googleIconImageSrc,
      text: "התחבר עם גוגל",
      url: "https://google.com",
    },
  ];
  const submitButtonText = "התחבר";
  const SubmitButtonIcon = LoginIcon;
  const forgotPasswordUrl = "#";
  const signupUrl = "/components/innerPages/SignupPage";

  const handleGoogleLogin = async () => {
    setIsPending(true);
    try {
      setIsPending(true);
      setError(null);
      await googleLogin();
      navigate("/");
    } catch (err) {
      setError("error");
      setIsPending(false);
      return;
    }
  };
  const handleLogin = async (values) => {
    setIsPending(true);
    try {
      setIsPending(true);
      setError(null);
      await login(values.email, values.password);
      navigate("/");
    } catch (err) {
      setError("error");
      setIsPending(false);
      return;
    }
  };
  return (
    <AnimationRevealPage>
      <Container>
        <Content>
          <MainContainer>
            <LogoLink href={logoLinkUrl}>
              <LogoImage src={logo} />
            </LogoLink>
            <MainContent>
              <Heading>{headingText}</Heading>
              <FormContainer>
                <SocialButtonsContainer>
                  {socialButtons.map((socialButton, index) => (
                    <SocialButton
                      key={index}
                      href={socialButton.url}
                      onClick={handleGoogleLogin}
                    >
                      <span className="iconContainer">
                        <img
                          src={socialButton.iconImageSrc}
                          className="icon"
                          alt=""
                        />
                      </span>
                      <span className="text">{socialButton.text}</span>
                    </SocialButton>
                  ))}
                </SocialButtonsContainer>
                <DividerTextContainer>
                  <DividerText>או הירשם עם אימייל</DividerText>
                </DividerTextContainer>
                <Form onSubmit={handleLogin}>
                  <Input type="email" placeholder="מייל" />
                  <Input type="password" placeholder="סיסמא" />
                  <SubmitButton type="submit">
                    <span className="text">{submitButtonText}</span>
                    <SubmitButtonIcon className="icon" />
                  </SubmitButton>
                </Form>
                <p tw="mt-6 text-xs text-gray-600 text-center">
                  <a
                    href={forgotPasswordUrl}
                    tw="border-b border-gray-500 border-dotted"
                  >
                    שכחת סיסמא?
                  </a>
                </p>
                <p tw="mt-8 text-sm text-gray-600 text-center">
                  עוד אין לך משתמש?{" "}
                  <a
                    href={signupUrl}
                    tw="border-b border-gray-500 border-dotted"
                  >
                    הירשם
                  </a>
                </p>
              </FormContainer>
              {error}
            </MainContent>
          </MainContainer>
          <IllustrationContainer>
            <IllustrationImage imageSrc={illustrationImageSrc} />
          </IllustrationContainer>
        </Content>
      </Container>
    </AnimationRevealPage>
  );
};

export default LoginPage;

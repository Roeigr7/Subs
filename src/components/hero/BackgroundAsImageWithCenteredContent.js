import React from "react";
import { routes } from "ComponentRenderer.js";
import { useAuth } from "contexts/authContext.jsx";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import tw from "twin.macro";

import Header, {
  NavLink,
  NavLinks,
  PrimaryLink as PrimaryLinkBase,
  LogoLink,
  NavToggle,
  DesktopNavLinks,
} from "../headers/light.js";

const StyledHeader = styled(Header)`
  ${tw`pt-8 max-w-none w-full`}
  ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
    ${tw`text-gray-100 hover:border-gray-300 hover:text-gray-300`}
  }
  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-primary-500`}
  }
`;

const PrimaryLink = tw(PrimaryLinkBase)`rounded-full`;
const Container = styled.div`
  ${tw`relative -mx-8 -mt-8 bg-center bg-cover h-screen min-h-144`}
  background-image: url("https://images.unsplash.com/photo-1536300007881-7e482242baa5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=80");
`;

const OpacityOverlay = tw.div`z-10 absolute inset-0 bg-black opacity-75`;

const HeroContainer = tw.div`z-20 relative px-6 sm:px-8 mx-auto h-full flex flex-col`;
const Content = tw.div`px-4 flex flex-1 flex-col justify-center items-center`;

const Heading = styled.h1`
  ${tw`text-3xl text-center sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-100 leading-snug -mt-24 sm:mt-0`}
  span {
    ${tw`inline-block mt-2`}
  }
`;

const PrimaryAction = tw.button`rounded-full px-8 py-3 mt-10 text-sm sm:text-base sm:mt-16 sm:px-8 sm:py-4 bg-gray-100 font-bold shadow transition duration-300 bg-primary-500 text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:outline-none focus:shadow-outline`;

export default () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const navLinks = [
    <>
      <NavLinks key={1}>
        {!currentUser && (
          <>
            <NavLink href={routes.userPages.AboutUsPage.url}>פיצ'רים</NavLink>
            <NavLink href={routes.userPages.BlogIndexPage.url}>לקוחות</NavLink>
          </>
        )}
        {currentUser && (
          <>
            <NavLink href={routes.homePage.url}>בית</NavLink>
            <NavLink href={routes.userPages.pricingPage.url}>חבילות</NavLink>
          </>
        )}
        <NavLink href={routes.userPages.ContactUsPage.url}>צור קשר</NavLink>
      </NavLinks>
      <NavLinks key={2}>
        {currentUser && (
          <NavLink onClick={logout} href={routes.homePage.url} tw="lg:ml-12!">
            התנתק
          </NavLink>
        )}
        {!currentUser && (
          <>
            <NavLink href={routes.auth.loginPage.url} tw="lg:ml-12!">
              התחבר
            </NavLink>
            <PrimaryLink href={routes.auth.signupPage.url}>הירשם</PrimaryLink>
          </>
        )}
      </NavLinks>
    </>,
  ];

  return (
    <Container>
      <OpacityOverlay />
      <HeroContainer>
        <StyledHeader links={navLinks} />
        <Content>
          <Heading>
            סאבספארק
            <br />
            כתוביות אוטומטיות מבריקות
          </Heading>
          <PrimaryAction onClick={() => navigate(routes.auth.signupPage.url)}>
            נסו בחינם
          </PrimaryAction>
        </Content>
      </HeroContainer>
    </Container>
  );
};

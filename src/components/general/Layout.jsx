import styled from 'styled-components';

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SITE_TITLE = 'Crocuta Budget';
const SITE_DESCRIPTION = 'Crocuta NextJS Budget';

export default function Layout({
  children = null,
  className = '',
  isHomePage = false,
  title = SITE_TITLE,
  description = SITE_DESCRIPTION,
}) {
  const router = useRouter();

  return (
    <LayoutStyling className={className}>
      <Head>
        <link rel="shortcut icon" href="/vercel.svg" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="og:title" content={SITE_TITLE} />
      </Head>
      <StyledHeader>
        <div>
          <Link href="/">
            <a>
              <img src="/favicon.ico" /> Budget
            </a>
          </Link>
        </div>
        <HeaderLinksSectionStyling>
          <div>
            <Link href="/support/">
              <a>Support</a>
            </Link>
          </div>
          <div>
            <span>Hello</span>
          </div>
        </HeaderLinksSectionStyling>
      </StyledHeader>

      <StyledMain>{children}</StyledMain>

      <StyledFooter>
        <FooterSectionStyling>
          {!isHomePage && (
            <BackToHomeLinkStyling>
              <Link href="/">
                <a>&larr; Back to home</a>
              </Link>
            </BackToHomeLinkStyling>
          )}
        </FooterSectionStyling>
        <CopyrightTextStyling>
          {`Copyright © ${new Date().getFullYear()} - Crocuta Pty (Ltd). All Rights Reserved.`}
        </CopyrightTextStyling>
        <FooterSectionStyling />
      </StyledFooter>
    </LayoutStyling>
  );
}

const LayoutStyling = styled.div`
  /* min-height: 100vh; */
  /* padding: 0 0.5rem; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    padding-bottom: 1rem;
  }
`;

const StyledMain = styled.main`
  flex: 1;
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  /* align-items: center; */
  width: 100%;
`;

const HeaderLinksSectionStyling = styled.div`
  display: flex;
  flex-direction: row;
  & > div {
    margin-left: 10px;
  }
`;
const StyledHeader = styled.header`
  width: 100%;
  height: 51px;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    height: 40px;
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    color: black;
  }
`;
const StyledFooter = styled.footer`
  width: 100%;
  height: 51px;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const BackToHomeLinkStyling = styled.div`
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const FooterSectionStyling = styled.div`
  min-width: 150px;
  height: 50px;
`;

const CopyrightTextStyling = styled.div`
  justify-content: center;
`;

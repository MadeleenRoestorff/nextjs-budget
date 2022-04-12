import styled from '@emotion/styled';
import Container from '@mui/material/Container';

import Head from 'next/head';
import Link from '../../components/general/Link';

const SITE_TITLE = 'Crocuta Budget';
const SITE_DESCRIPTION = 'Crocuta NextJS Budget';

export default function Layout({
  children = null,
  className = '',
  isHomePage = false,
  title = SITE_TITLE,
  description = SITE_DESCRIPTION,
}) {
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
            <img src="/wallet.svg" /> Budget
          </Link>
        </div>
        <HeaderLinksSectionStyling>
          <div>
            <Link href="/summary/">Summary</Link>
          </div>
          <div>
            <span>Hello</span>
          </div>
        </HeaderLinksSectionStyling>
      </StyledHeader>

      <Container>{children}</Container>

      <StyledFooter>
        <FooterSectionStyling>
          {!isHomePage && (
            <BackToHomeLinkStyling>
              <Link href="/">&larr; Back to home</Link>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

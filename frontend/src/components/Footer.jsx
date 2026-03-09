// src/components/Footer.jsx
import styled from "styled-components";

const FooterWrapper = styled.footer`
  background: #1e293b;
  color: #f1f5f9;
  padding: 2rem;
  text-align: center;
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <p>© {new Date().getFullYear()} TravelBook. All rights reserved.</p>
    </FooterWrapper>
  );
}
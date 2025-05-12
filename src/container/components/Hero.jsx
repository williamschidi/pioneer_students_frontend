// import React from "react";

import styled from "styled-components";

const Container = styled.div`
  max-width: 50rem;
  opacity: 0.7;
  padding: 1.5rem;
  border-radius: 1rem;
  margin: 8rem auto;
  @media (max-width: 750px) {
    max-width: 40rem;
  }
`;

const H1 = styled.p`
  color: #f1f3f5;
  text-align: center;
  font-size: 2.4rem;
  font-family: "Ogg";
  font-weight: bold;
  font-style: italic;
  @media (max-width: 750px) {
    font-size: 1.8rem;
  }
  @media (max-width: 600px) {
    font-size: 1.4rem;
  }
  @media (max-width: 450px) {
    font-size: 1.2rem;
  }
`;

function Hero() {
  return (
    <Container>
      <H1>
        Pioneer Students <br /> of <br /> St. Mark&apos;s Secondary School
        Emene, Enugu.
      </H1>
    </Container>
  );
}

export default Hero;

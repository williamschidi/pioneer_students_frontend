import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  padding: 1rem 2rem;
`;

function PageNotFount() {
  return (
    <Container>
      <h2>Page not found! (404)</h2>
    </Container>
  );
}

export default PageNotFount;

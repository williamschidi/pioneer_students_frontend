import styled from 'styled-components';
import esther from './../../assets/esther.png';
import { useTheme } from '../components/ThemeContext';
import Button from '../components/Button';
import { useMediaQuery } from 'react-responsive';

const Main = styled.main`
  max-width: 55rem;
  box-shadow: 0 4rem 6rem rgba(0, 0, 0, 0.4);
  border-radius: 0.5rem;
  height: 22rem;
  margin: 3rem auto;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  @media (max-width: 900px) {
    max-width: 45rem;
  }
  @media (max-width: 750px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    max-width: 30rem;
    height: auto;
  }
`;

const Aside = styled.aside`
  max-width: 18rem;
  height: 100%;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1.5rem;
  border-right: 0.1rem solid gray;
  @media (max-width: 750px) {
    border-right: 0;
    width: 30rem;
    padding: 0.5rem;
    gap: 1rem;
  }
`;

const ImgContainer = styled.div`
  text-align: center;
  width: 18rem;
  height: 60%;
`;

const Img = styled.img`
  width: 80%;
  height: 100%;
  border-radius: 50%;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: ${(props) => props.theme.color};
  @media (max-width: 750px) {
    justify-content: center;
    align-items: center;
  }
`;

const H2 = styled.h2`
  font-size: 1.4rem;
  font-weight: bold;
  &.bio-heading {
    align-self: center;
    padding-bottom: 0.5rem;
    border-bottom: 0.1rem solid #fff;
  }
  @media (max-width: 900px) {
    font-size: 1.2rem;
  }
  @media (max-width: 750px) {
    font-size: 1.4rem;
  }
`;
const P = styled.p`
  font-size: 1rem;
  font-weight: 600;
  &.small {
    font-size: 0.8rem;
    font-weight: 600;
  }
  @media (max-width: 900px) {
    font-size: 0.8rem;
  }
  @media (max-width: 750px) {
    font-size: 0.9rem;
    &.small {
      font-weight: 500;
    }
  }
`;
const Section = styled.section`
  color: ${(props) => props.theme.color};
  padding: 1rem 0;
  flex: 1;
  height: 100%;
  background: ${(props) => props.theme.fieldsetBg};
  box-shadow: 4rem 6rem 8rem rgba(0, 0, 0, 0.4);
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;
  @media (max-width: 750px) {
    width: 30rem;
  }
`;
const BioContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem 2rem;
  @media (max-width: 900px) {
    padding: 0.5rem 1rem;
  }
  @media (max-width: 750px) {
    padding: 1rem 2rem;
  }
`;
const BioDetail = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 750px) {
    width: 100%;
  }
`;

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Profile() {
  const isMobile = useMediaQuery({ maxWidth: 750 });
  const { theme } = useTheme();
  return (
    <Main theme={theme}>
      <Aside>
        <ImgContainer>
          <Img src={esther} alt="profile pics" />
        </ImgContainer>
        <DetailContainer theme={theme}>
          <H2>William</H2>
          <P className="small">Civil servant</P>
        </DetailContainer>
        <BtnContainer>
          {!isMobile ? <Button noPadding>Edit</Button> : ''}
        </BtnContainer>
      </Aside>
      <Section theme={theme}>
        <H2 className="bio-heading">Bio Information</H2>
        <BioContainer>
          <BioDetail>
            <P>
              <b>Email: </b>
              <br />
              <br />
              Williamchidi@gmail.com
            </P>
            <P className="push">
              <b>Phone: </b>
              <br />
              <br />
              07033881174
            </P>
          </BioDetail>
          <hr />
          <BioDetail>
            <P>
              <b>Gender:</b>
              <br />
              <br />
              Male
            </P>
            <P className="push">
              <b>Marital Status:</b>
              <br />
              <br />
              Single
            </P>
          </BioDetail>
          <hr />
          <BioDetail>
            <P>
              <b>State: </b>
              <br />
              <br />
              Imo
            </P>
            <P className="push">
              <b>Local Govt.</b>
              <br />
              <br />
              Ikeduru
            </P>
          </BioDetail>
        </BioContainer>
      </Section>
    </Main>
  );
}

export default Profile;

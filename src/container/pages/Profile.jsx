import styled from 'styled-components';
import Button from '../components/Button';
import { useMediaQuery } from 'react-responsive';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useGetMemberQuery } from '../components/redux/apiSlice';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { useThemes } from '../components/ThemesContext';

const Main = styled.main`
  position: relative;
  max-width: 55rem;
  box-shadow: 0 4rem 4rem rgba(0, 0, 0, 0.7);
  border-radius: 0.5rem;
  height: 22rem;
  margin: 1rem auto;
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
    height: auto;
  }
`;

const Aside = styled.aside`
  width: 18rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  border-right: 0.1rem solid gray;
  background: #ecf0f1;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  padding: 1rem;
  @media (max-width: 750px) {
    width: 30rem;
    padding: 0.5rem;
    gap: 1rem;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    border-bottom-left-radius: 0;
  }
  @media (max-width: 500px) {
    width: 25rem;
    padding: 1rem;
    gap: 0.5rem;
  }
  @media (max-width: 450px) {
    width: 22rem;
  }
`;

const ImgContainer = styled.div`
  width: 10rem;
  heigth: 10rem;
  @media (max-width: 750px) {
    width: 15rem;
    height: 15rem;
  }

  @media (max-width: 500px) {
    width: 14rem;
    height: 14rem;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: ${(props) => props.theme.primary};
  text-align: center;
  @media (max-width: 750px) {
    justify-content: center;
    align-items: center;
    gap: 0.2rem;
  }
`;

const H2 = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  &.bio-heading {
    align-self: center;
    padding-bottom: 0.5rem;
    border-bottom: 0.1rem solid #fff;
  }

  @media (max-width: 750px) {
    font-size: 1.4rem;
  }

  @media (max-width: 500px) {
    font-size: 1.2rem;
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
      font-size: 1rem;
    }
    @media (max-width: 500px) {
      font-size: 0.8rem;
    }
  }
`;
const Section = styled.section`
  color: #f1f3f5;
  padding: 1rem 0;
  flex: 1;
  height: 100%;
  background: ${(props) => props.theme.primary};
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
    border-bottom-right-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
  }
  @media (max-width: 500px) {
    width: 25rem;
    gap: 1.5rem;
  }
  @media (max-width: 450px) {
    width: 22rem;
    gap: 1.5rem;
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
  @media (max-width: 500px) {
    padding: 1rem 1rem;
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
  const { myTheme } = useThemes();
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  const { data, isLoading } = useGetMemberQuery(id);

  if (!data && isLoading) {
    return <p style={{ color: '#fff' }}>Data Loading .......</p>;
  }

  return (
    <>
      <Button
        alignment="left"
        hover="transparent"
        style={{
          fontSize: '3rem',
          backgroundColor: 'transparent',
          color: '#fff',
          border: 'none',
          paddingLeft: '1rem',
          boxShadow: 'none',
          marginTop: `${isMobile ? '3rem' : '5rem'}`,
        }}
        onClick={() => {
          navigate(`/members?page=${page}`);
        }}
      >
        <HiArrowNarrowLeft />
      </Button>
      <Main>
        <Aside>
          <ImgContainer>
            <Img src={data?.data?.member?.profilePic.url} alt="profile pics" />
          </ImgContainer>
          <DetailContainer theme={myTheme}>
            <H2>
              {data?.data?.member?.firstName} {data?.data?.member?.lastName}
            </H2>
            <P className="small">{data?.data?.member?.occupation}</P>
          </DetailContainer>
          <BtnContainer>
            <Button noPadding onClick={() => navigate(`/update/${id}`)}>
              Edit
            </Button>
          </BtnContainer>
        </Aside>
        <Section theme={myTheme}>
          <H2 className="bio-heading">Bio Information</H2>
          <BioContainer>
            <BioDetail>
              <P>
                <b>Email: </b>
                <br />
                <br />
                {data?.data?.member?.email}
              </P>
              <P className="push">
                <b>Phone: </b>
                <br />
                <br />
                {data?.data?.member?.phone}
              </P>
            </BioDetail>
            <hr />
            <BioDetail>
              <P>
                <b>Gender:</b>
                <br />
                <br />
                {data?.data?.member?.gender}
              </P>
              <P className="push">
                <b>Marital Status:</b>
                <br />
                <br />
                {data?.data?.member?.maritalStatus}
              </P>
            </BioDetail>
            <hr />
            <BioDetail>
              <P>
                <b>State: </b>
                <br />
                <br />
                {data?.data?.member?.state}
              </P>
              <P className="push">
                <b>Local Govt.</b>
                <br />
                <br />
                {data?.data?.member?.localGov}
              </P>
            </BioDetail>
          </BioContainer>
        </Section>
      </Main>
    </>
  );
}

export default Profile;

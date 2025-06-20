import styled from 'styled-components';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../components/Button';
import { useEffect, useState } from 'react';
import { useLazyGetMembersQuery } from '../components/redux/apiSlice';
import { useThemes } from '../components/ThemesContext';
import { useDispatch, useSelector } from 'react-redux';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { resetSearchedMembers } from '../components/redux/userSlice';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
// import { apiSlice } from '../components/redux/apiSlice';

const Container = styled.main`
  margin: 2rem auto;
  width: 50rem;

  @media (max-width: 900px) {
    width: 40rem;
  }
  @media (max-width: 750px) {
    width: 35rem;
  }

  @media (max-width: 600px) {
    width: 30rem;
  }

  @media (max-width: 500px) {
    width: 25rem;
  }

  @media (max-width: 450px) {
    width: 20rem;
  }
`;

const Heading = styled.h2`
  color: ${(props) => props.theme.textColor1};
  text-transform: uppercase;

  text-shadow: 0.3rem 0.4rem 0.5rem rgba(0, 0, 0, 0.5);

  @media (max-width: 750px) {
    font-size: 1.4rem;
  }

  @media (max-width: 600px) {
    font-size: 1.2rem;
  }

  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 0.5rem;
  margin: 1rem 0;
  border: 0.1rem solid gray;
  border-radius: 0.5rem;
  background: ${(props) => props.theme.primary};
  box-shadow: 1rem 2rem 3rem rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-in-out;
  opacity: 0.9;
  &:hover {
    background: #3c3fba;
    color: #e3fafc;
    cursor: pointer;
  }

  @media (max-width: 500px) {
    gap: 1rem;
    padding: 0.5rem 0;
  }
  @media (max-width: 400px) {
    gap: 0.6rem;
    padding: 0.4rem;
  }
`;

const Section = styled.section`
  width: 25rem;
  height: 100%;

  @media (max-width: 500px) {
    width: 22rem;
  }

  @media (max-width: 500px) {
    width: 20rem;
  }

  &.image-container {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;

    @media (max-width: 500px) {
      height: 2.5rem;
    }
  }
  &.info-container {
    font-size: 0.9rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    @media (max-width: 600px) {
      font-size: 0.8rem;
      padding: 0.5rem 0.8rem;
    }
    @media (max-width: 500px) {
      gap: 0.5rem;
      font-size: 0.7rem;
      padding: 0.4rem 0.5rem;
    }
  }
`;
// const H3 = styled.h3`
//   color: #fff;
//   text-align: center;
//   margin-top: 8rem;
//   background-color: rgba(0, 0, 0, 0.5);
//   padding: 1rem 1.5rem;
//   border-radius: 0.8rem;
//   @media (max-width: 900px) {
//     font-size: 1rem;
//     padding: 0.8rem 1rem;
//   }
//   @media (max-width: 750px) {
//     margin-top: 6rem;
//     font-size: 0.8rem;
//     padding: 0.7rem 0.8rem;
//   }
//   @media (max-width: 600px) {
//     margin-top: 5rem;
//     font-size: 0.7rem;
//     padding: 0.5rem 0.7rem;
//   }
// `;
const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;
const StyledLinkNav = styled(NavLink)`
  text-decoration: none;
  color: ${(props) => props.theme.textColor1};
`;

const P = styled.p`
  &.clip {
    width: 5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &.clipPhoneNum {
    width: 8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 600px) {
      width: 5.2rem;
    }
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  margin-top: 3rem;
  @media (max-width: 400px) {
    padding: 0 1rem;
  }
`;

const Span = styled.span`
  padding: 0 1rem;
  margin: 0 2rem;
  color: #fff;
  &.active {
    background: #fff;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: ${(props) => props.theme.primary};
  }
  @media (max-width: 600px) {
    margin: 0 1rem;
  }
  @media (max-width: 500px) {
    margin: 0 0.8rem;
  }
  @media (max-width: 450px) {
    margin: 0 0.5rem;
  }
  @media (max-width: 400px) {
    margin: 0 0.3rem;
  }
`;

function Members() {
  const { myTheme } = useThemes();
  const [searchParams, setSearchParams] = useSearchParams();
  const paramPage = parseInt(searchParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(paramPage);
  const [showButton, setShowButton] = useState(0);
  const [showMembers, setShowMember] = useState('');

  const [fetchResult, { data, isFetching, isError, error }] =
    useLazyGetMembersQuery();
  const searchedMembers = useSelector((state) => state.user.searchedMembers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setSearchParams({ page: currentPage });
    fetchResult({ page: currentPage, limit: 5 });
  }, [fetchResult, currentPage, setSearchParams]);

  const totalPages = data?.data?.totalPages || 1;

  function nextPage() {
    if (totalPages > currentPage) {
      setCurrentPage((curPage) => curPage + 1);
    }
  }

  function prevPage() {
    if (currentPage > 1) {
      setCurrentPage((curPage) => curPage - 1);
    }
  }

  useEffect(() => {
    if (searchedMembers?.data) {
      setShowMember(searchedMembers?.data?.searchedMembers);
      setShowButton(searchedMembers?.total);
    } else {
      setShowMember(data?.data?.members);
      setShowButton(data?.data.total);
    }
  }, [searchedMembers, data]);

  useEffect(() => {
    if (isError && error) {
      const errMessage = error?.error?.split(': ')[1];
      return toast.error(errMessage, {
        style: {
          color: 'red',
          borderLeft: '0.6rem solid red',
          marginTop: '4rem',
          width: '50rem',
          maxWidth: '70vw',
          fontSize: '.8rem',
        },
      });
    }
  }, [error, isError]);

  const isSearchFetching = useSelector((state) =>
    Object.values(state?.api?.mutations).some(
      (mutation) =>
        mutation.endpointName === 'getSearchMembers' &&
        mutation?.status === 'pending'
    )
  );

  if ((isFetching && !isError) || isSearchFetching) {
    return <Spinner />;
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
          paddingLeft: '2rem',
          boxShadow: 'none',
        }}
        onClick={() => {
          dispatch(resetSearchedMembers());
          navigate('/');
        }}
      >
        <HiArrowNarrowLeft />
      </Button>

      {!showMembers ? (
        ''
      ) : (
        <Container>
          <Heading theme={myTheme}>Members</Heading>
          {showMembers?.map((info, ind) => (
            <StyledLinkNav
              to={`/member/${info._id}?page=${currentPage}`}
              key={ind}
              theme={myTheme}
            >
              <Main theme={myTheme}>
                <Section className="image-container">
                  <Img src={info?.profilePic?.url} alt="profile_pic" />
                </Section>
                <Section className="info-container">
                  <P>
                    <strong>
                      {info.firstName} {info.lastName}
                    </strong>
                  </P>
                  <P className="clipPhoneNum">{info.phone}</P>
                  <P className="clip">{info.email}</P>
                </Section>
              </Main>
            </StyledLinkNav>
          ))}
          {showButton > 5 ? (
            <BtnContainer>
              <Button textColor="#fff" onClick={prevPage}>
                Prev
              </Button>
              {Array.from({ length: totalPages }, (_, i) => (
                <Span
                  theme={myTheme}
                  key={i}
                  className={currentPage === i + 1 ? 'active' : ' '}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Span>
              ))}

              <Button textColor="#fff" onClick={nextPage}>
                Next
              </Button>
            </BtnContainer>
          ) : (
            ''
          )}
        </Container>
      )}
    </>
  );
}

export default Members;

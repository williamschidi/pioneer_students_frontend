// import chidi from "./../../assets/chidi.jpg";
// import princess from "./../../assets/princess.png";
// import princess01 from "./../../assets/princess01.png";
// import loveth from "./../../assets/loveth.png";
import styled from "styled-components";
import { NavLink, useSearchParams } from "react-router-dom";
import { useTheme } from "../components/ThemeContext";
// import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { useLazyGetMembersQuery } from "../components/redux/apiSlice";

// const data = [
//   {
//     id: 1,
//     firstName: "William",
//     lastName: "Emeaso",
//     email: "William@gmail.com",
//     gender: "male",
//     phone: 7033881174,
//     photo: chidi,
//   },
//   {
//     id: 2,
//     firstName: "Chidi",
//     lastName: "Eze",
//     email: "Chidi@gmail.com",
//     gender: "male",
//     phone: 8033551174,
//     photo: loveth,
//   },
//   {
//     id: 3,
//     firstName: "Esther",
//     lastName: "Nze",
//     email: "Esther@gmail.com",
//     gender: "female",
//     phone: 7066889374,
//     photo: princess,
//   },
//   {
//     id: 4,
//     firstName: "Prince",
//     lastName: "Lucky",
//     email: "Prince@gmail.com",
//     gender: "male",
//     phone: 9055678912,
//     photo: princess01,
//   },
// ];

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
  color: ${(props) => props.theme.color};
  text-transform: uppercase;
  text-shadow: ${(props) => props.theme.textShadow};

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
  background: ${(props) => props.theme.navBg};
  box-shadow: 1rem 2rem 3rem rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-in-out;
  opacity: 0.9;
  &:hover {
    background: ${(props) => props.theme.hoverBg};
    color: #e3fafc;
    cursor: pointer;
  }

  @media (max-width: 500px) {
    gap: 1rem;
    padding: 0.5rem 0;
  }
  @media (max-width: 500px) {
    gap: 1rem;
    padding: 0.5rem;
  }
`;

const Section = styled.section`
  width: 25rem;
  height: 100%;

  @media (max-width: 500px) {
    width: 20rem;
  }

  @media (max-width: 500px) {
    width: 18rem;
  }

  &.image-container {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;

    @media (max-width: 500px) {
      width: 2.5rem;
      height: 2.5rem;
    }
    @media (max-width: 450px) {
      width: 2rem;
      height: 2rem;
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
    }
    @media (max-width: 500px) {
      gap: 0.7rem;
      font-size: 0.7rem;
    }
  }
`;
const H3 = styled.h3`
  color: #fff;
  text-align: center;
  margin-top: 8rem;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 1rem 1.5rem;
  border-radius: 0.8rem;
  @media (max-width: 900px) {
    font-size: 1rem;
    padding: 0.8rem 1rem;
  }
  @media (max-width: 750px) {
    margin-top: 6rem;
    font-size: 0.8rem;
    padding: 0.7rem 0.8rem;
  }
  @media (max-width: 600px) {
    margin-top: 5rem;
    font-size: 0.7rem;
    padding: 0.5rem 0.7rem;
  }
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;
const StyledLinkNav = styled(NavLink)`
  text-decoration: none;
  color: ${(props) => props.theme.color};
`;

const P = styled.p`
  &.clip {
    width: 5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  margin-top: 3rem;
`;

// const ArrorRight = styled(HiChevronRight)`
//   font-size: 3rem;
//   color: #fff;
// `;

function Members() {
  const { theme } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const paramPage = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(paramPage);

  const [fetchResult, { data, isFetching }] = useLazyGetMembersQuery();

  useEffect(() => {
    setSearchParams({ page: currentPage });
    fetchResult({ page: currentPage, limit: 2 });
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
  if (isFetching && !data) {
    return <p>Fetching ....</p>;
  }

  return (
    <Container>
      {!data ? (
        <H3>
          You do not have any registered member yet. Pls login to register
          members{" "}
        </H3>
      ) : (
        <>
          <Heading theme={theme}>Members</Heading>
          {data?.data?.members.map((info, ind) => (
            <StyledLinkNav
              to={`/member/${info._id}?page=${currentPage} `}
              key={ind}
              theme={theme}
            >
              <Main theme={theme}>
                <Section className="image-container">
                  <Img src={info.profilePic} alt="profile_pic" />
                </Section>
                <Section className="info-container">
                  <P>
                    <strong>
                      {info.firstName} {info.lastName}
                    </strong>
                  </P>
                  <P>{info.phone}</P>
                  <P className="clip">{info.email}</P>
                </Section>
              </Main>
            </StyledLinkNav>
          ))}
          <BtnContainer>
            <Button bgColor={theme.navBg} textColor="#fff" onClick={prevPage}>
              Prev
            </Button>

            <Button bgColor={theme.navBg} textColor="#fff" onClick={nextPage}>
              Next
            </Button>
          </BtnContainer>
        </>
      )}
    </Container>
  );
}

export default Members;

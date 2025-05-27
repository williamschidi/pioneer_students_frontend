import { useState } from "react";
import styled from "styled-components";
import { useTheme } from "./ThemeContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const tabContents = [
  {
    label: "Vision",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta ratione explicabo,laborum sint neque sunt molestiae quam expedita. Illum, velit culpa assumenda tenetur repellat facilis",
  },

  {
    label: "Mission",
    content:
      "laborum sint neque sunt molestiae quam expedita. Illum, velit culpa assumenda tenetur repellat facilis.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta ratione explicabo,laborum",
  },
  {
    label: "Motto",
    content:
      "Veniam dolores excepturi sed nobis velit culpa assumenda tenetur repellat facilis.laborum sint neque sunt molestiae quam expedita. Illum, velit culpa assumenda tenetur repellat facilis",
  },
];

const MainContainer = styled.section`
  background: #fff;
  padding: 3rem 0 2rem;
  z-index: 5;

  @media (max-width: 750px) {
    padding: 1.5rem 0;
  }
`;

const H1 = styled.h1`
  text-align: center;
  color: #212529;
  font-size: 2.4rem;
  text-shadow: ${(props) => props.theme.textShadow};

  @media (max-width: 750px) {
    font-size: 2rem;
    padding: 1rem 0;
  }
`;

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 50rem;
  height: 12rem;
  margin: 5rem auto;
  padding: 0 4rem 4rem;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.4);
  background: ${(props) => props.theme.fieldsetBg};
  border: none;
  border-radius: 0.5rem;
  opacity: 0.9;

  @media (max-width: 750px) {
    max-width: 35rem;
    margin: 3rem auto;
  }

  @media (max-width: 600px) {
    max-width: 30rem;
    padding: 0 2rem 2rem;
    gap: 2rem;
  }

  @media (max-width: 500px) {
    padding: 0 1.6rem 1.6rem;
    gap: 1.8rem;
    max-width: 25rem;
    margin: 2rem auto;
  }

  @media (max-width: 400px) {
    padding: 0 1.4rem 1.4rem;
    gap: 1.8rem;
    max-width: 22rem;
    margin: 2rem auto;
  }
`;

const TabList = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: -1rem;
`;

const Btn = styled.button`
  padding: 0.7rem 1rem;
  border: ${(props) =>
    props.isActive
      ? "0.1rem solid #e3fafc"
      : `0.1rem solid ${props.theme.borderColor}`};
  color: ${(props) => (props.isActive ? "#e3fafc" : "#343a40")};
  border-radius: 0.4rem;
  font-weight: bold;
  font-size: 1rem;
  width: 8rem;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 0.4rem 0.4rem rgba(0, 0, 0, 0.4);
  transform: ${(props) =>
    !props.isActive ? "translateY(.1rem)" : "translateY(-.5rem)"};
  background: ${(props) => (props.isActive ? props.theme.btnHoverBg : "#fff")};
  cursor: pointer;

  @media (max-width: 750px) {
    padding: 0.5rem 0.8rem;
    width: 7rem;
  }

  @media (max-width: 600px) {
    padding: 0.4rem 0.6rem;
    width: 6rem;
  }

  @media (max-width: 500px) {
    width: 5rem;
    font-size: 0.9rem;
    transform: ${(props) =>
      !props.isActive ? "translateY(.1rem)" : "translateY(-.4rem)"};
  }

  @media (max-width: 400px) {
    padding: 0.3rem 0.4rem;

    font-size: 0.8rem;
    transform: ${(props) =>
      !props.isActive ? "translateY(.1rem)" : "translateY(-.3rem)"};
  }
`;

const TabContent = styled.p`
  color: #fff;
  line-height: 2;

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }

  @media (max-width: 400px) {
    font-size: 0.8rem;
  }
`;

const ExcoDetailsContainer = styled.div`
  position: relative;
  margin: 3rem auto;
  max-width: 60rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  @media (max-width: 600px) {
    gap: 2rem;
    max-width: 40rem;
  }
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    width: 80%;
  }
`;

const H2 = styled.h2`
  padding: 1rem 1.5rem;
  border-radius: 0.6rem;
  color: #212529;
  text-align: center;
  font-size: 2rem;
  text-shadow: ${(props) => props.theme.textShadow};
  box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.2);

  @media (max-width: 750px) {
    font-size: 1.8rem;
  }

  @media (max-width: 600px) {
    font-size: 1.2rem;
    padding: 0.8rem 1rem;
    margin: 0 3.5rem;
  }
  @media (max-width: 500px) {
    font-size: 1rem;
  }
  @media (max-width: 450px) {
    font-size: 0.8rem;
  }
`;

const ExcoDetail = styled(SwiperSlide)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
  border: 0.1rem solid gray;
  box-shadow: 0 4rem 6rem rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  padding: 1rem 2rem 2rem;
  backdrop-filter: blur(3rem);
  background: ${(props) => props.theme.fieldsetBg};
  opacity: 0.9;
`;
const Img = styled.img`
  margin: 0 auto;
  width: 70%;
  height: 12rem;
  border-radius: 50%;
  border: 0.3rem solid rgba(255, 255, 255, 0.5);
  padding: 0.3rem;
`;

const BioInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  gap: 0.5rem;
`;

const Name = styled.p`
  font-weight: 700;
  font-size: 1rem;
  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
  @media (max-width: 450px) {
    font-size: 1rem;
  }
`;

const Position = styled.p`
  font-size: 0.8rem;
  font-weight: 500;
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const Contact = styled.p`
  font-size: 0.8rem;

  font-weight: 600;
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const Button = styled.button`
  width: 3rem;
  height: 3rem;
  background: #fff;
  border-radius: 50%;
  border: none;
  position: absolute;
  top: 50%;
  background-color: #fff;
  z-index: 500;
  box-shadow: 0 10rem 15rem rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transform: translateY(-50%);

  &.swiper-button-next::after {
    right: 0;
    font-size: 1rem;
    font-weight: 600;
    color: ${(props) => props.theme.borderColor};
  }
  &.swiper-button-prev::after {
    left: 0;
    font-size: 1rem;
    font-weight: 600;
    color: ${(props) => props.theme.borderColor};
  }
`;

function About() {
  const [activeTab, setActiveTab] = useState(0);
  const { theme } = useTheme();

  return (
    <MainContainer id="about" name="about">
      <H1>
        Know About Us
        <hr />
      </H1>

      <TabContainer theme={theme}>
        <TabList>
          {tabContents.map((tabContent, index) => (
            <Btn
              onClick={() => setActiveTab(index)}
              isActive={activeTab === index}
              key={index}
            >
              {tabContent.label}
            </Btn>
          ))}
        </TabList>
        <TabContent>{tabContents[activeTab].content}</TabContent>
      </TabContainer>
      <ExcoDetailsContainer>
        <H2 theme={theme}>Pioneer Students Executive members</H2>
        <StyledSwiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={15}
          slidesPerView={3}
          loop={true}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
            dynamicBullets: true,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          autoplay={{ delay: 5000, disabledOnInteraction: false }}
          breakpoints={{
            350: { slidesPerView: 1 },
            600: { slidesPerView: 2 },
            750: { slidesPerView: 3 },
          }}
        >
          <ExcoDetail>
            <Img src="/images/ezebig.jpeg" alt="image1" />
            <BioInfo>
              <Name>Chimezie Ezebuilo</Name>
              <Position>Chairmain</Position>
              <Contact>08036863049</Contact>
            </BioInfo>
          </ExcoDetail>
          <ExcoDetail>
            <Img src="/images/chika.jpeg" alt="image1" />
            <BioInfo>
              <Name>Chikodili Onwugamba</Name>
              <Position>Vice chairmain</Position>
              <Contact>07032205868</Contact>
            </BioInfo>
          </ExcoDetail>
          <ExcoDetail>
            <Img src="/images/desmond.jpeg" alt="image1" />
            <BioInfo>
              <Name>Desmond Nwadishi</Name>
              <Position>Secretary</Position>
              <Contact>08061698540</Contact>
            </BioInfo>
          </ExcoDetail>
          <ExcoDetail>
            <Img src="/images/steve.jpg" alt="image1" />
            <BioInfo>
              <Name>Onochie Mgbor</Name>
              <Position>Financial Secretary</Position>
              <Contact>07065235443</Contact>
            </BioInfo>
          </ExcoDetail>
          <ExcoDetail>
            <Img src="" alt="image1" />
            <BioInfo>
              <Name>Chizoba Eneh</Name>
              <Position>Welfare</Position>
              <Contact>08169934770</Contact>
            </BioInfo>
          </ExcoDetail>
          <ExcoDetail>
            <Img src="/images/meche.jpeg" alt="image1" />
            <BioInfo>
              <Name>Chinonso Ugwu</Name>
              <Position>Treasurer</Position>
              <Contact>09162340382</Contact>
            </BioInfo>
          </ExcoDetail>
          <ExcoDetail>
            <Img src="/images/chidera.jpeg" alt="image1" />
            <BioInfo>
              <Name>Chidera Ugwu</Name>
              <Position>P.R.O</Position>
              <Contact>08035994524</Contact>
            </BioInfo>
          </ExcoDetail>
          <ExcoDetail>
            <Img src="/images/chidi.jpeg" alt="image1" />
            <BioInfo>
              <Name>Emeaso Chidiebere</Name>
              <Position>Assistant Secretary</Position>
              <Contact>07033881174</Contact>
            </BioInfo>
          </ExcoDetail>
          <ExcoDetail>
            <Img src="" alt="image1" />
            <BioInfo>
              <Name>Chukwuebuka Ibeh</Name>
              <Position>Legal Advicer</Position>
              <Contact>07062117285</Contact>
            </BioInfo>
          </ExcoDetail>

          <Button theme={theme} className="swiper-button-next"></Button>
          <Button theme={theme} className="swiper-button-prev"></Button>
        </StyledSwiper>
      </ExcoDetailsContainer>
    </MainContainer>
  );
}

export default About;

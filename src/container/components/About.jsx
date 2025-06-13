import { useState } from 'react';
import styled from 'styled-components';
// import { useTheme } from './ThemeContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useThemes } from './ThemesContext';
import img1 from './../../assets/img1.png';
import img2 from './../../assets/img2.png';
import img3 from './../../assets/reminder.png';
import { useMediaQuery } from 'react-responsive';

const tabContents = [
  {
    label: 'Vision',
    content:
      'Our vision is to build a globally respected alumni community rooted in unity, service, and leadership. We aim to foster a strong, connected network of professionals from the 2002/2003 pioneer class—dedicated to supporting one another, advancing St. Mark’s Anglican Secondary School, Emene, and inspiring lasting impact through integrity, excellence, and mentorship.',
  },

  {
    label: 'Mission',
    content:
      "Our mission is to strengthen lifelong bonds among the 2002/2003 pioneer class through unity, respect, and collaboration. We are committed to enhancing the social, academic, and professional well-being of our members while giving back to our alma mater through developmental projects, mentorship, scholarships, and educational support—preserving the values and legacy of St. Mark's Anglican Secondary School, Emene.",
  },
  {
    label: 'Motto',
    content: " 'Together for Growth and Service.'",
  },
];

const MainContainer = styled.section`
  background: #fff;
  padding: 1.5rem 0 0;
  z-index: 5;

  @media (max-width: 750px) {
    padding: 1.5rem 0 0;
  }
`;

const SubHeadingContainer = styled.div`
  width: 100vw;
  background-color: rgba(244, 180, 0, 0.05);
`;

const SubHeading = styled.div`
  font-family: playfair;
  text-align: center;
  width: 25rem;
  margin: 0 auto;
  @media (max-width: 600px) {
    margin-bottom: 3rem;
  }
`;

const H1 = styled.h2`
  color: ${(props) => props.theme.secondary};
  font-size: 2rem;
  text-shadow: ${(props) => props.theme.textShadow};
  margin-bottom: 0.8rem;

  @media (max-width: 750px) {
    font-size: 1.4rem;
    padding: 1rem 0;
  }
  @media (max-width: 600px) {
    margin-bottom: 0;
    padding: 0.8rem 0 0.6rem 0;
  }
`;

const P = styled.p`
  color: ${(props) => props.theme.primary};
  font-size: 0.9rem;

  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const SubContent = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding: 2.4rem 2rem;
  max-width: 80rem;

  @media (max-width: 750px) {
    width: 90%;
  }
  @media (max-width: 600px) {
    width: 95%;
  }
  @media (max-width: 500px) {
    flex-direction: column;
    gap: 1.4rem;
    padding: 1.6rem;
  }
`;

const ImgContainer = styled.div`
  width: 45%;
  height: 15rem;

  @media (max-width: 600px) {
    height: 12rem;
  }
  @media (max-width: 500px) {
    height: 12rem;
    width: 100%;
  }
`;

const DetailContainer = styled.div`
  font-family: playfair;
  width: 35%;
  @media (max-width: 750px) {
    width: 40%;
  }
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const AsideHeading = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 0.6rem;

  &.sub-heading-right {
    color: ${(props) => props.theme.primary};
  }
  &.sub-heading-left {
    color: ${(props) => props.theme.secondary};

    @media (max-width: 1024px) {
      font-size: 1.4rem;
    }
    @media (max-width: 900px) {
      font-size: 1.2rem;
      margin-bottom: 0.4rem;
    }
    @media (max-width: 600px) {
      font-size: 1rem;
      margin-bottom: 0.4rem;
    }
    @media (max-width: 500px) {
    font-size: 1.5rem;

  }
  @media (max-width: 750px) {
    font-size: 1.2rem;
  }
  @media (max-width: 600px) {
    font-size: 1rem;
  }
    @media (max-width: 500px) {
    font-size: 1.5rem;
    margin-bottom: 0.2rem;
  }
`;

const AsideSubHeading = styled.p`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1.4rem;
  &.sub-topic-right {
    color: ${(props) => props.theme.secondary};
  }
  &.sub-topic-left {
    color: ${(props) => props.theme.primary};
  }
  @media (max-width: 900px) {
    margin-bottom: 1rem;
  }
  @media (max-width: 900px) {
    margin-bottom: 0.8rem;
  }
  @media (max-width: 750px) {
    font-size: 0.9rem;
  }
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

const AsideText = styled.p`
  font-size: 1rem;
  font-weight: 400;
  line-height: 2;
  color: ${(props) => props.theme.textColor};

  @media (max-width: 900px) {
    line-height: 1.8;
    font-size: 0.8rem;
  }
  @media (max-width: 900px) {
    line-height: 1.8;
    font-size: 1rem;
  }
`;

const Img1 = styled.img`
  width: 100%;
  height: 100%;
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
  background: ${(props) => props.theme.primary};
  border: none;
  border-radius: 0.5rem;

  @media (max-width: 750px) {
    max-width: 35rem;
    margin: 3rem auto;
    padding: 0 2rem 4rem;
  }

  @media (max-width: 600px) {
    max-width: 30rem;
    padding: 0 1rem 2rem;
    gap: 1.5rem;
  }

  @media (max-width: 500px) {
    padding: 0 1rem 1.5rem;
    gap: 1rem;
    max-width: 28rem;
    height: 14rem;
    font-size: 0.7rem;
    margin: 2rem auto;
  }

  @media (max-width: 400px) {
    padding: 0 0.8rem 1rem;
    max-width: 21rem;
    margin: 2rem auto;
  }
`;

const TabList = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: -1rem;
  @media (max-width: 600px) {
    justify-content: center;
    gap: 1.2rem;
  }
`;

const Btn = styled.button`
  padding: 0.7rem 1rem;
  border: ${(props) =>
    props.isActive
      ? '0.1rem solid #e3fafc'
      : `0.1rem solid ${props.theme.borderColor}`};
  color: ${(props) =>
    props.isActive ? props.theme.textColor1 : props.theme.primary};
  border-radius: 0.4rem;
  font-weight: bold;
  font-size: 1rem;
  width: 8rem;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 0.4rem 0.4rem rgba(0, 0, 0, 0.4);
  transform: ${(props) =>
    !props.isActive ? 'translateY(.1rem)' : 'translateY(-.5rem)'};
  background: ${(props) => (props.isActive ? props.theme.primary : '#fff')};
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
      !props.isActive ? 'translateY(.1rem)' : 'translateY(-.4rem)'};
  }

  @media (max-width: 400px) {
    padding: 0.3rem 0.4rem;

    font-size: 0.8rem;
    transform: ${(props) =>
      !props.isActive ? 'translateY(.1rem)' : 'translateY(-.3rem)'};
  }
`;

const TabContent = styled.p`
  color: #fff;
  line-height: 1.8;
  font-size: 0.9rem;

  @media (max-width: 750px) {
    font-size: 0.8rem;
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
  gap: 2.2rem;

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
  font-family: playfair;
  padding: 1rem 1.5rem 0.7rem;
  border-radius: 0.6rem;
  color: ${(props) => props.theme.secondary};
  text-align: center;
  font-size: 2rem;

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
  box-shadow: 0.3rem 0.4rem 0.4rem rgba(0, 0, 0, 0.4);
  border-radius: 1rem;
  padding: 1rem 2rem 2rem;
  backdrop-filter: blur(3rem);
  background: ${(props) => props.theme.primary};
`;
const Img = styled.img`
  margin: 0 auto;
  width: 70%;
  height: 12rem;
  border-radius: 50%;
  border: 0.3rem solid rgba(244, 180, 0, 0.5);
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

const CallToActionSection = styled.div`
  position: relative;
  height: 25rem;
  width: 100vw;
  background-image: linear-gradient(
    to right,
    rgba(44, 62, 148, 0.8),
    rgba(244, 180, 0, 0.5)
  );
`;

const CallToAction = styled.div`
  position: absolute;
  left: 5rem;
  bottom: 3rem;
  color: ${(props) => props.theme.textColor1};
  @media (max-width: 600px) {
    left: 3rem;
    bottom: 2rem;
  }
`;

const CtaHeading = styled.p`
  font-family: playfair;
  font-size: 1.6rem;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 1rem;
  @media (max-width: 600px) {
    font-size: 1.2rem;
    line-height: 1;
    margin-bottom: 0.8rem;
  }
`;

const CtaText = styled.p`
  font-size: 0.9rem;
  font-family: inter;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;
const CtaBtnContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CtaBtn = styled.button`
  color: ${(props) => props.theme.textColor1};
  padding: 0.7rem 1rem;
  text-decoration: none;
  font-weight: 600;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  border: none;
  background: ${(props) => props.theme.secondary};
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.textColor1};
    color: ${(props) => props.theme.textColor};
    transform: scale(1.05);
  }
  @media (max-width: 750px) {
    padding: 1rem 2rem;
  }

  @media (max-width: 600px) {
    padding: 0.8rem 1.4rem;
    font-size: 0.8rem;
  }
`;

function About() {
  const [activeTab, setActiveTab] = useState(0);
  const { myTheme } = useThemes();
  const isMobile = useMediaQuery({ maxWidth: 600 });
  const smMobile = useMediaQuery({ maxWidth: 500 });

  return (
    <MainContainer name="about">
      <SubHeading id="about">
        <H1 theme={myTheme}>Why We Exist</H1>
        <P theme={myTheme}>
          Keep pioneer students united, sharing memories,
          {isMobile ? <br /> : ' '} updating on life milestones
        </P>
      </SubHeading>
      <TabContainer theme={myTheme}>
        <TabList>
          {tabContents.map((tabContent, index) => (
            <Btn
              onClick={() => setActiveTab(index)}
              isActive={activeTab === index}
              key={index}
              theme={myTheme}
            >
              {tabContent.label}
            </Btn>
          ))}
        </TabList>
        <TabContent>{tabContents[activeTab].content}</TabContent>
      </TabContainer>
      {smMobile ? (
        <SubHeadingContainer>
          <SubContent>
            <DetailContainer>
              <AsideHeading className="sub-heading-right" theme={myTheme}>
                Share Your Memories
              </AsideHeading>
              <AsideSubHeading className="sub-topic-right" theme={myTheme}>
                Relive the Golden Days
              </AsideSubHeading>
              <AsideText theme={myTheme}>
                Upload throwback photos, tag classmates,
                {isMobile ? '' : <br />} and preserve unforgettable school
                {isMobile ? '' : <br />} moments forever
              </AsideText>
            </DetailContainer>
            <ImgContainer>
              <Img1 src={img1} alt="memories" />
            </ImgContainer>
          </SubContent>
          <SubContent>
            <DetailContainer>
              <AsideHeading className="sub-heading-left" theme={myTheme}>
                Connect With Classmates
              </AsideHeading>
              <AsideSubHeading className="sub-topic-left" theme={myTheme}>
                Find Old Friends
              </AsideSubHeading>
              <AsideText theme={myTheme}>
                Use our smart directory to search, message{' '}
                {isMobile ? '' : <br />}
                and reconnect with your classmates and {isMobile ? '' : <br />}
                old friends
              </AsideText>
            </DetailContainer>
            <ImgContainer>
              <Img1 src={img2} alt="memories" />
            </ImgContainer>
          </SubContent>
          <SubContent>
            <DetailContainer>
              <AsideHeading className="sub-heading-right" theme={myTheme}>
                Stay in the loop
              </AsideHeading>
              <AsideSubHeading className="sub-topic-right" theme={myTheme}>
                Never Miss an Event
              </AsideSubHeading>
              <AsideText theme={myTheme}>
                Stay updated with the upcoming reunions, celebrations, and class
                news - all in
                {isMobile ? '' : <br />} one place
              </AsideText>
            </DetailContainer>
            <ImgContainer>
              <Img1 src={img3} alt="memories" />
            </ImgContainer>
          </SubContent>
        </SubHeadingContainer>
      ) : (
        <SubHeadingContainer>
          <SubContent>
            <ImgContainer>
              <Img1 src={img1} alt="memories" />
            </ImgContainer>
            <DetailContainer>
              <AsideHeading className="sub-heading-right" theme={myTheme}>
                Share Your Memories
              </AsideHeading>
              <AsideSubHeading className="sub-topic-right" theme={myTheme}>
                Relive the Golden Days
              </AsideSubHeading>
              <AsideText theme={myTheme}>
                Upload throwback photos, tag classmates,
                {isMobile ? '' : <br />} and preserve unforgettable school
                {isMobile ? '' : <br />} moments forever
              </AsideText>
            </DetailContainer>
          </SubContent>
          <SubContent>
            <DetailContainer>
              <AsideHeading className="sub-heading-left" theme={myTheme}>
                Connect With Classmates
              </AsideHeading>
              <AsideSubHeading className="sub-topic-left" theme={myTheme}>
                Find Old Friends
              </AsideSubHeading>
              <AsideText theme={myTheme}>
                Use our smart directory to search, message{' '}
                {isMobile ? '' : <br />}
                and reconnect with your classmates and {isMobile ? '' : <br />}
                old friends
              </AsideText>
            </DetailContainer>

            <ImgContainer>
              <Img1 src={img2} alt="memories" />
            </ImgContainer>
          </SubContent>
          <SubContent>
            <ImgContainer>
              <Img1 src={img3} alt="memories" />
            </ImgContainer>
            <DetailContainer>
              <AsideHeading className="sub-heading-right" theme={myTheme}>
                Stay in the loop
              </AsideHeading>
              <AsideSubHeading className="sub-topic-right" theme={myTheme}>
                Never Miss an Event
              </AsideSubHeading>
              <AsideText theme={myTheme}>
                Stay updated with the upcoming reunions, celebrations, and class
                news - all in
                {isMobile ? '' : <br />} one place
              </AsideText>
            </DetailContainer>
          </SubContent>
        </SubHeadingContainer>
      )}

      <ExcoDetailsContainer>
        <H2 theme={myTheme}>Pioneer Students Executive Members</H2>
        <StyledSwiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={15}
          slidesPerView={3}
          loop={true}
          pagination={{
            clickable: true,
            el: '.swiper-pagination',
            dynamicBullets: true,
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          autoplay={{ delay: 5000, disabledOnInteraction: false }}
          breakpoints={{
            350: { slidesPerView: 1 },
            600: { slidesPerView: 2 },
            750: { slidesPerView: 3 },
          }}
        >
          <ExcoDetail theme={myTheme}>
            <Img src="/images/ezebig.jpeg" alt="image1" />
            <BioInfo>
              <Name>Chimeziem Ezebuilo</Name>
              <Position>Chairmain</Position>
              <Contact>08036863049</Contact>
            </BioInfo>
          </ExcoDetail>
          <ExcoDetail theme={myTheme}>
            <Img src="/images/chika.jpeg" alt="image1" />
            <BioInfo>
              <Name>Chikodili Onwugamba</Name>
              <Position>Vice chairmain</Position>
              <Contact>07032205868</Contact>
            </BioInfo>
          </ExcoDetail>
          <ExcoDetail theme={myTheme}>
            <Img src="/images/desmond.jpeg" alt="image1" />
            <BioInfo>
              <Name>Desmond Nwadishi</Name>
              <Position>Secretary</Position>
              <Contact>08061698540</Contact>
            </BioInfo>
          </ExcoDetail>
          <ExcoDetail theme={myTheme}>
            <Img src="/images/steve.jpg" alt="image1" />
            <BioInfo>
              <Name>Onochie Mgbor</Name>
              <Position>Treasurer</Position>
              <Contact>07065235443</Contact>
            </BioInfo>
          </ExcoDetail>
          <ExcoDetail theme={myTheme}>
            <Img src="" alt="image1" />
            <BioInfo>
              <Name>Chizoba Eneh</Name>
              <Position>D.O.S</Position>
              <Contact>08169934770</Contact>
            </BioInfo>
          </ExcoDetail>
          <ExcoDetail theme={myTheme}>
            <Img src="/images/meche.jpeg" alt="image1" />
            <BioInfo>
              <Name>Chinonso Ugwu</Name>
              <Position>Financial Secretary</Position>
              <Contact>09162340382</Contact>
            </BioInfo>
          </ExcoDetail>
          <ExcoDetail theme={myTheme}>
            <Img src="/images/chidera.jpeg" alt="image1" />
            <BioInfo>
              <Name>Chidera Ugwu</Name>
              <Position>P.R.O</Position>
              <Contact>08035994524</Contact>
            </BioInfo>
          </ExcoDetail>
          <ExcoDetail theme={myTheme}>
            <Img src="/images/chidi.jpeg" alt="image1" />
            <BioInfo>
              <Name>Emeaso Chidiebere</Name>
              <Position>Assistant Secretary</Position>
              <Contact>07033881174</Contact>
            </BioInfo>
          </ExcoDetail>
          <ExcoDetail theme={myTheme}>
            <Img src="" alt="image1" />
            <BioInfo>
              <Name>Chukwuebuka Ibeh</Name>
              <Position>Legal Advicer</Position>
              <Contact>07062117285</Contact>
            </BioInfo>
          </ExcoDetail>

          <Button theme={myTheme} className="swiper-button-next"></Button>
          <Button theme={myTheme} className="swiper-button-prev"></Button>
        </StyledSwiper>
      </ExcoDetailsContainer>
      <CallToActionSection>
        <CallToAction theme={myTheme}>
          <CtaHeading>
            Once a Pioneer, Always Family.
            <br /> Reconnect. Reminisce. Reunite.
          </CtaHeading>
          <CtaText>Join the community and be part of the legacy</CtaText>
          <CtaBtnContainer>
            <CtaBtn theme={myTheme}>Join the Community</CtaBtn>
          </CtaBtnContainer>
        </CallToAction>
      </CallToActionSection>
    </MainContainer>
  );
}

export default About;

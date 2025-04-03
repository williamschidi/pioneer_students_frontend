import { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { useTheme } from '../components/ThemeContext';

const Form = styled.form`
  margin: 0 auto;
  max-width: 50rem;
  padding: 3rem 0 2rem;
  @media (max-width: 900px) {
    max-width: 40rem;
  }
  @media (max-width: 700px) {
    max-width: 35rem;
    padding: 2rem 0 1rem;
  }
  @media (max-width: 600px) {
    max-width: 30rem;
    padding: 1rem 0 1rem;
  }
  @media (max-width: 500px) {
    max-width: 25rem;
  }
  @media (max-width: 400px) {
    max-width: 20rem;
  }
`;

const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  padding: 4rem 1.4rem 2rem;
  box-shadow: 0 4rem 6rem rgba(0, 0, 0, 0.4);
  background: ${(props) => props.theme.fieldsetBg};
  border: none;
  border-radius: 0.5rem;

  @media (max-width: 500px) {
    padding: 3.5rem 1rem 1.5rem;
    gap: 2rem;
  }

  @media (max-width: 400px) {
    padding: 3.5rem 0.8rem 1rem;
    gap: 1.8rem;
  }
`;

const Legend = styled.legend`
  color: #e3fafc;
  font-size: 1.8rem;
  font-weight: bold;
  padding-top: 3rem;
  font-style: italic;
  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

const InputFieldsContainer = styled.div`
  max-width: 60rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  @media (max-width: 600px) {
    gap: 1.2rem;
  }
`;

const InputFields = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  @media (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  @media (max-width: 600px) {
    gap: 0.7rem;
  }
  @media (max-width: 450px) {
    gap: 0.5rem;
  }
`;

const Label = styled.label`
  font-size: 1rem;
  color: #e3fafc;
  font-weight: 600;
  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
  @media (max-width: 400px) {
    font-size: 0.8rem;
  }
`;

const Input = styled.input`
  width: 30rem;
  padding: 0.5rem 1rem;
  border: 1px solid gray;
  border-radius: 0.8rem;
  outline: none;
  &:focus {
    border: none;
    border-left: 2px solid gray;
    border-bottom: 2px solid gray;
    background-color: #fff4e6;
    box-shadow: 0 0 0.5rem rgba(0, 0, 255, 0.5);
  }
  @media (max-width: 900px) {
    width: 25rem;
  }
  @media (max-width: 600px) {
    width: 22rem;
    padding: 0.4rem 0.8rem;
  }
  @media (max-width: 400px) {
    width: 18rem;
    padding: 0.3rem 0.6rem;
  }
`;

const P = styled.p`
  color: red;
  font-size: 0.8rem;
  text-align: center;
  padding: 0 0 0.4rem 0.8rem;
`;
const Span = styled.span`
  display: inline-block;
  color: red;
  border-left: 0.3rem solid red;
  border-bottom: 0.1rem solid red;
  padding: 0 0 0.4rem 0.8rem;
  border-radius: 0.4rem;
  margin-bottom: 1rem;
`;

const ShowPassword = styled(HiOutlineEye)`
  position: absolute;
  height: 1.2rem;
  width: 1.2rem;
  color: #212529;
  top: 0.5rem;
  right: 1rem;
  @media (max-width: 600px) {
    top: 0.4rem;
    right: 0.8rem;
    height: 1.2rem;
    width: 1.2rem;
  }
`;
const HidePassword = styled(HiOutlineEyeOff)`
  position: absolute;
  height: 1rem;
  width: 1rem;
  top: 0.5rem;
  right: 1rem;
  color: #212529;
  @media (max-width: 600px) {
    top: 0.4rem;
    right: 0.8rem;
    height: 1rem;
    width: 1rem;
  }
`;

const InputDiv = styled.div`
  position: relative;
`;

function Signup() {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    accessCode: '',
  });

  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState('');
  const { theme } = useTheme();

  const accessCodes = [1234, 2345, 3425, 4444];

  function handleOnChange(e) {
    setData({ ...data, [e.target.id]: e.target.value });
    setError({ ...error, [e.target.id]: '' });
  }

  function handleSubmit(e) {
    e.preventDefault();

    let newError = {};
    if (!data.firstName) {
      newError.firstName = 'First name is required';
    }
    if (!data.lastName) {
      newError.lastName = 'Last Name is required';
    }

    if (!data.email) {
      newError.email = 'Email is required';
    }
    if (!data.password) {
      newError.password = 'Password is required';
    }
    if (!data.accessCode) {
      newError.accessCode = 'Access Code is required';
    }
    if (!accessCodes.includes(data.accessCode * 1)) {
      setMsg('Wrong Access code. Pls provide a valid access code');
    } else {
      setMsg('');
    }

    if (Object.keys(newError).length > 0) {
      setError(newError);
    } else {
      setData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        accessCode: '',
      });
      console.log('Data submitted successful');
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {msg && <Span>{msg}</Span>}
        <Fieldset theme={theme}>
          <Legend>Signup</Legend>
          <InputFieldsContainer>
            <InputFields>
              <Label htmlFor="firstName">First Name :</Label>
              <InputDiv>
                {error.firstName && <P>{error.firstName}</P>}
                <Input
                  type="text"
                  id="firstName"
                  placeholder="first name"
                  value={data.firstName}
                  onChange={handleOnChange}
                  required
                />
              </InputDiv>
            </InputFields>

            <InputFields>
              <Label htmlFor="lastName">Last Name :</Label>
              <InputDiv>
                {error.lastName && <P>{error.lastName}</P>}
                <Input
                  type="text"
                  id="lastName"
                  placeholder="last name"
                  value={data.lastName}
                  onChange={handleOnChange}
                  required
                />
              </InputDiv>
            </InputFields>
            <InputFields>
              <Label htmlFor="email">Email :</Label>
              <InputDiv>
                {error.email && <P>{error.email}</P>}
                <Input
                  type="email"
                  id="email"
                  placeholder="email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                />
              </InputDiv>
            </InputFields>
            <InputFields>
              <Label htmlFor="password">Password :</Label>
              <InputDiv>
                {error.password && <P>{error.password}</P>}
                <Input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="password"
                  value={data.password}
                  onChange={handleOnChange}
                  required
                />
                {showPassword ? (
                  <ShowPassword
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <HidePassword
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </InputDiv>
            </InputFields>
            <InputFields>
              <Label htmlFor="accessCode">Access Code :</Label>
              <InputDiv>
                {error.accessCode && <P>{error.accessCode}</P>}
                <Input
                  type="Number"
                  id="accessCode"
                  placeholder="access code"
                  value={data.accessCode}
                  onChange={handleOnChange}
                  required
                />
              </InputDiv>
            </InputFields>
          </InputFieldsContainer>
          <Button>sign up</Button>
        </Fieldset>
      </Form>
    </>
  );
}

export default Signup;

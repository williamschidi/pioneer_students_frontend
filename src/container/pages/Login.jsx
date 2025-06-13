import { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';

import { useLoginMutation } from '../components/redux/apiSlice';
import { useDispatch } from 'react-redux';
import { setUsername } from '../components/redux/userSlice';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { useThemes } from '../components/ThemesContext';
import { toast } from 'react-toastify';

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
    padding: 1rem 0;
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
  background: ${(props) => props.theme.primary};
  border: none;
  border-radius: 0.5rem;
  opacity: 0.9;

  @media (max-width: 500px) {
    padding: 3.5rem 1rem 1.5rem;
    gap: 2rem;
  }

  @media (max-width: 400px) {
    padding: 3rem 0.8rem 1rem;
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
const Span = styled.span`
  color: #e3fafc;
  font-size: 0.9rem;
  font-weight: bold;
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

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [login, { data, isLoading }] = useLoginMutation();

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myTheme } = useThemes();

  const bg = myTheme.secondary;

  function handleOnChange(e) {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: id === 'email' ? value.toLowerCase() : value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const result = await login(formData).unwrap();
      dispatch(setUsername(result.data.name));
      result && navigate('/register');
    } catch (err) {
      const errorMessage = err?.data?.message || err?.error || 'unknown error';
      toast.error(errorMessage, {
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
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Fieldset theme={myTheme}>
          <Legend>Login</Legend>
          <InputFieldsContainer>
            {data?.message && (
              <p style={{ color: '#fff', fontSize: '.8rem' }}>
                {data?.message}
              </p>
            )}
            <InputFields>
              <Label htmlFor="email">Email :</Label>
              <Input
                type="email"
                id="email"
                placeholder="email"
                value={formData.email}
                onChange={handleOnChange}
                required
              />
            </InputFields>

            <InputFields>
              <Label htmlFor="password">Password :</Label>

              <InputDiv>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="password"
                  value={formData.password}
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

              {/* <Input
                type="password"
                id="password"
                placeholder="password"
                value={formData.password}
                onChange={handleOnChange}
                required
              /> */}
            </InputFields>
          </InputFieldsContainer>
          <Button type="submit">
            {isLoading ? 'Logging in....' : 'Login'}
          </Button>
          <Span>
            Don&apos;t have an Account?{' '}
            <Link
              to="/signup"
              style={{
                color: bg,
                textDecoration: 'none',
                fontSize: '1rem',
              }}
            >
              Sign Up
            </Link>
          </Span>
        </Fieldset>
      </Form>
    </>
  );
}

export default Login;

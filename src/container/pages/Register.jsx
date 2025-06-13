import { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';

import {
  useGetAllStatesQuery,
  useRegisterMemberMutation,
} from '../components/redux/apiSlice';
import { useSelector } from 'react-redux';
import { useThemes } from '../components/ThemesContext';
import { toast } from 'react-toastify';

const Form = styled.form`
  margin: 0 auto;
  width: 50rem;
  padding: 3rem 0 2rem;

  @media (max-width: 900px) {
    max-width: 40rem;
  }
  @media (max-width: 700px) {
    max-width: 35rem;
  }
  @media (max-width: 600px) {
    max-width: 30rem;
  }
  @media (max-width: 500px) {
    max-width: 25rem;
    padding: 3rem 0 2rem;
  }
  @media (max-width: 400px) {
    max-width: 22rem;
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
  @media (max-width: 900px) {
    padding: 3rem 1.4rem 2rem;
  }
  @media (max-width: 500px) {
    padding: 3rem 1rem 1.5rem;
    gap: 2rem;
  }

  @media (max-width: 400px) {
    padding: 2.5rem 0.8rem 1rem;
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

const RadioInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5rem;
  @media (max-width: 700px) {
    justify-content: flex-start;
    gap: 2rem;
  }
  @media (max-width: 600px) {
    gap: 2rem;
  }
`;

const Label = styled.label`
  font-size: 1rem;
  color: #e3fafc;
  font-weight: 600;
  @media (max-width: 700px) {
    font-size: 0.9rem;
  }
  @media (max-width: 600px) {
    font-size: 0.7rem;
  }
`;

const Input = styled.input`
  width: ${(props) => (props.type === 'radio' ? '6rem' : '30rem')};
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
    width: ${(props) => (props.type === 'radio' ? '4rem' : '25rem')};
  }
  @media (max-width: 700px) {
    width: ${(props) => (props.type === 'radio' ? '2rem' : '25rem')};
  }

  @media (max-width: 600px) {
    width: ${(props) => (props.type === 'radio' ? '2rem' : '22rem')};
    padding: 0.4rem 0.8rem;
  }

  @media (max-width: 400px) {
    width: ${(props) => (props.type === 'radio' ? '2rem' : '18rem')};
    padding: 0.3rem 0.6rem;
  }
`;

const Select = styled.select`
  width: 30rem;
  padding: 0.5rem 1rem;
  border: 1px solid gray;
  border-radius: 0.8rem;
  @media (max-width: 900px) {
    width: 25rem;
  }

  @media (max-width: 700px) {
    width: 25rem;
    padding: 0.4rem 0.8rem;
  }

  @media (max-width: 600px) {
    width: 22rem;
  }
  @media (max-width: 400px) {
    width: 18rem;
    padding: 0.3rem 0.6rem;
  }
`;
const P = styled.p`
  padding: 1rem 2rem;
  color: #fff;
  font-size: 0.9rem;
  font-weight: bold;
`;

function Register() {
  const { data } = useGetAllStatesQuery();
  const [register, { isLoading }] = useRegisterMemberMutation();
  const { username } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    maritalStatus: '',
    residence: '',
    occupation: '',
    state: '',
    localGov: '',
    profilePicture: null,
  });

  const { myTheme } = useThemes();

  function handleOnChange(e) {
    const { name, value } = e.target;

    const formatValue = (val) =>
      val.slice(0, 1).toUpperCase() + val.slice(1).toLowerCase();
    setFormData((prev) => ({ ...prev, [name]: formatValue(value) }));
  }

  function handleFileChange(e) {
    const file = e.target.files[0];

    if (file) {
      setFormData({
        ...formData,
        profilePicture: file,
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const formPayload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'profilePicture') {
          formPayload.append(key, value);
        }
      });

      if (formData.profilePicture) {
        formPayload.append('profilePic', formData.profilePicture);
      }

      await register(formPayload).unwrap();
      toast.success('Data submitted successful', {
        style: {
          color: 'green',
          borderLeft: '0.6rem solid green',
          marginTop: '4rem',
          width: '50rem',
          maxWidth: '70vw',
          fontSize: '.8rem',
        },
      });
    } catch (err) {
      console.log(err?.data?.message);
      const errorMessage =
        err?.data?.message || 'Something went wrong. Please try again later';
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
    } finally {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  const states = data?.data?.getStates;

  const lgas =
    states?.find((state) => state.value === formData.state)?.localGovernments ||
    [];

  return (
    <>
      <P>Welcome | {username}</P>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Fieldset theme={myTheme}>
          <Legend>Register Member </Legend>
          <InputFieldsContainer>
            <InputFields>
              <Label htmlFor="firstName">First name :</Label>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleOnChange}
                required
              />
            </InputFields>
            <InputFields>
              <Label htmlFor="lastName">Last name :</Label>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleOnChange}
              />
            </InputFields>
            <InputFields>
              <Label htmlFor="email">Email :</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleOnChange}
              />
            </InputFields>

            <InputFields>
              <Label htmlFor="phone">Phone Number :</Label>
              <Input
                type="text"
                id="phone"
                name="phone"
                placeholder="phone"
                value={formData.phone}
                onChange={handleOnChange}
              />
            </InputFields>
            <RadioInput>
              <Label htmlFor="gender">Gender :</Label>
              <div>
                <Input
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleOnChange}
                />
                <Label htmlFor="male">Male</Label>

                <Input
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleOnChange}
                />
                <Label htmlFor="female">Female</Label>
              </div>
            </RadioInput>
            <RadioInput>
              <Label>Marital Status :</Label>
              <div>
                <Input
                  type="radio"
                  name="maritalStatus"
                  id="single"
                  value="single"
                  checked={formData.maritalStatus === 'single'}
                  onChange={handleOnChange}
                />
                <Label htmlFor="single">Single</Label>
                <Input
                  type="radio"
                  name="maritalStatus"
                  id="married"
                  value="married"
                  checked={formData.maritalStatus === 'married'}
                  onChange={handleOnChange}
                />
                <Label htmlFor="married">Married</Label>

                <Input
                  type="radio"
                  name="maritalStatus"
                  id="divorced"
                  value="divorced"
                  checked={formData.maritalStatus === 'divorced'}
                  onChange={handleOnChange}
                />
                <Label htmlFor="divorced">Divorced</Label>
              </div>
            </RadioInput>
            <InputFields>
              <Label htmlFor="residence">Residential Address :</Label>
              <Input
                type="text"
                id="residence"
                name="residence"
                placeholder="Residential Address"
                value={formData.residence}
                onChange={handleOnChange}
              />
            </InputFields>

            <InputFields>
              <Label htmlFor="occupation">Occupation :</Label>
              <Input
                type="text"
                id="occupation"
                name="occupation"
                placeholder="Occupation"
                value={formData.occupation}
                onChange={handleOnChange}
              />
            </InputFields>
            <InputFields>
              <Label htmlFor="state">State of Origin</Label>
              <Select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleOnChange}
              >
                <option value="">Select State</option>
                {states?.map((state) => (
                  <option key={state._id} value={state.value}>
                    {state.state}
                  </option>
                ))}
              </Select>
            </InputFields>
            <InputFields>
              <Label htmlFor="lga">Local Government</Label>
              <Select
                id="lga"
                name="localGov"
                value={formData.localGov}
                onChange={handleOnChange}
                disabled={!formData.state}
              >
                <option>Select Local Government</option>
                {lgas?.map((lga) => (
                  <option key={lga.name} value={lga.value}>
                    {lga.name}
                  </option>
                ))}
              </Select>
            </InputFields>
            <InputFields>
              <Label htmlFor="photo">Profile Picture :</Label>
              <Input
                type="file"
                accept="image/*"
                id="photo"
                onChange={handleFileChange}
              />
            </InputFields>
          </InputFieldsContainer>
          <Button type="submit">
            {isLoading ? 'Registering' : 'Register'}
          </Button>
        </Fieldset>
      </Form>
    </>
  );
}

export default Register;

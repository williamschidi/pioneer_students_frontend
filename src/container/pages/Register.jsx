import { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';

const Form = styled.form`
  margin: 0 auto;
  width: 50rem;
  padding: 5rem 0;

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
  background: linear-gradient(to right, #212529, #495057);
  border: none;
  border-radius: 0.5rem;
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
  font-size: 1.6rem;
  font-weight: bold;
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
    width: ${(props) => (props.type === 'radio' ? '2rem' : '20rem')};
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
    width: 20rem;
    padding: 0.3rem 0.6rem;
  }
`;

function Register() {
  const stateLGData = {
    Lagos: ['Ikeja', 'Surulele', 'Epe', 'Ikorodu'],
    Enugu: ['Nsukka', 'Enugu East', 'Nkanu', 'Udi'],
    Kano: ['Kano Municipal', 'Dala', 'Gwale', 'Ungogo'],
    Rivers: ['Port Harcourt', 'Obi-Akpor', 'Eleme', 'Ikwere'],
  };

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    maritalStatus: '',
    ResidenceAddress: '',
    occupation: '',
    state: '',
    localGovernment: '',
    profilePictureUrl: '',
    profilePicture: null,
  });

  function handleOnChange(e) {
    setData(() => ({ ...data, [e.target.name]: e.target.value }));
  }

  function handleFileChange(e) {
    const file = e.target.file[0];

    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setData({ ...data, profilePicture: file, profilePictureUrl: imgUrl });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(data);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Fieldset>
        <Legend>Register Member </Legend>
        <InputFieldsContainer>
          <InputFields>
            <Label htmlFor="firstName">First name :</Label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={data.firstName}
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
              value={data.lastName}
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
              value={data.email}
              onChange={handleOnChange}
            />
          </InputFields>

          <InputFields>
            <Label htmlFor="phone">Phone Number :</Label>
            <Input
              type="number"
              id="phone"
              name="phone"
              placeholder="phone"
              value={data.phone}
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
                checked={data.gender === 'male'}
                onChange={handleOnChange}
              />
              <Label htmlFor="male">Male</Label>

              <Input
                type="radio"
                name="gender"
                id="female"
                value="female"
                checked={data.gender === 'female'}
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
                checked={data.gender === 'single'}
                onChange={handleOnChange}
              />
              <Label htmlFor="single">Single</Label>
              <Input
                type="radio"
                name="MaritalStatus"
                id="married"
                value="married"
                checked={data.gender === 'married'}
                onChange={handleOnChange}
              />
              <Label htmlFor="married">Married</Label>

              <Input
                type="radio"
                name="MaritalStatus"
                id="divorced"
                value="divorced"
                checked={data.gender === 'divorced'}
                onChange={handleOnChange}
              />
              <Label htmlFor="divorced">Divorced</Label>
            </div>
          </RadioInput>
          <InputFields>
            <Label htmlFor="occupation">Occupation :</Label>
            <Input
              type="text"
              id="occupation"
              name="occupation"
              placeholder="Occupation"
              value={data.occupation}
              onChange={handleOnChange}
            />
          </InputFields>
          <InputFields>
            <Label htmlFor="state">State of Origin</Label>
            <Select
              id="state"
              name="state"
              value={data.state}
              onChange={handleOnChange}
            >
              <option value="">Select State</option>
              {Object.keys(stateLGData).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </Select>
          </InputFields>
          <InputFields>
            <Label htmlFor="lga">Local Government</Label>
            <Select
              id="lga"
              name="localGovernment"
              value={data.localGovernment}
              onChange={handleOnChange}
              disabled={!data.state}
            >
              <option>Select Local Government</option>
              {data.state &&
                stateLGData[data.state].map((localGovernment) => (
                  <option key={localGovernment} value={localGovernment}>
                    {localGovernment}
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
        <Button />
      </Fieldset>
    </Form>
  );
}

export default Register;

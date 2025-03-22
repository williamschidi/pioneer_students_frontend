// import PropTypes from 'prop-types';
import styled from 'styled-components';

const BtnContainer = styled.div`
  width: 100%;
  text-align: center;
  padding-left: 5rem;
`;

const Btn = styled.button`
  padding: 0.4rem 1rem;
  border: 0.1rem solid gray;
  border-radius: 0.4rem;
  font-weight: bold;

  &:hover {
    background: linear-gradient(to right, #212529, #495057);
    color: #e3fafc;
    font-weight: bold;
    transition: all 0.5s;
  }
`;

function Button() {
  return (
    <BtnContainer>
      <Btn type="submit">Submit</Btn>
    </BtnContainer>
  );
}

export default Button;

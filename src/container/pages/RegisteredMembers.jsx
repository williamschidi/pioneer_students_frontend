import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import styled from 'styled-components';

const Table = styled.table`
  max-width: 80rem;
  width: 100%;
  margin: 3rem auto;
  color: #e3fafc;
  background-color: #323232;
  border-collapse: collapse;
`;

const Caption = styled.caption`
  text-align: left;
  text-transform: uppercase;
  color: #e3fafc;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.7rem 1rem;
`;

const Thead = styled.thead`
  background-color: hsla(0 0 0 / 0.8);
`;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: hsla(0 0 0 / 0.2);
  }
`;

const Th = styled.th`
  padding: 0.4rem 0.8rem;
  width: 10rem;
  font-size: 0.9rem;
  font-weight: bold;
  text-align: left;
`;
const Td = styled.td`
  color: #e3fafc;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  width: 10rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Span = styled.span`
  padding: 0 1rem 0 0.5rem;
  &:hover {
    cursor: pointer;
  }
`;

function RegisteredMembers() {
  const data = [
    {
      firstName: 'William',
      lastName: 'Emeaso',
      email: 'William@gmail.com',
      gender: 'male',
      phone: 7033881174,
    },
    {
      firstName: 'Chidi',
      lastName: 'Eze',
      email: 'Chidi@gmail.com',
      gender: 'male',
      phone: 8033551174,
    },
    {
      firstName: 'Esther',
      lastName: 'Nze',
      email: 'Esther@gmail.com',
      gender: 'female',
      phone: 7066889374,
    },
    {
      firstName: 'Prince',
      lastName: 'Lucky',
      email: 'Prince@gmail.com',
      gender: 'male',
      phone: 9055678912,
    },
  ];
  return (
    <Table>
      <Caption>Members of Pioneer Students of St. Marks Sec.Sch. Emene</Caption>
      <Thead>
        <Tr>
          <Th>S/N</Th>
          <Th>First Name</Th>
          <Th>Last Name</Th>
          <Th>Email</Th>
          <Th>Gender</Th>
          <Th>Phone Number</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((row, ind) => (
          <Tr key={ind}>
            <Td>{++ind}</Td>
            <Td>{row.firstName}</Td>
            <Td>{row.lastName}</Td>
            <Td>{row.email}</Td>
            <Td>{row.gender}</Td>
            <Td>{row.phone}</Td>
            <Td>
              <Span>
                <HiOutlinePencil />
              </Span>
              <Span>
                <HiOutlineTrash />
              </Span>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default RegisteredMembers;

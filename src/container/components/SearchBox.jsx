import { useEffect, useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import styled from 'styled-components';
import { useLazyGetSearchMembersQuery } from './redux/apiSlice';
import Spinner from './Spinner';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setSearchedMembers } from './redux/userSlice';
import { useNavigate } from 'react-router-dom';

const SearchContainer = styled.div`
  position: relative;
  margin-right: 3rem;

  @media (max-width: 1000px) {
    margin: 0 2rem 0 1rem;
  }
`;

const Search = styled.input`
  width: 18rem;
  padding: 0.4rem 1rem;
  border: 1px solid gray;
  border-radius: 1rem;
  outline: none;

  &:focus {
    border: none;
    border-left: 2px solid gray;
    border-bottom: 2px solid gray;
    background-color: #fff4e6;
    box-shadow: 0 0 0.5rem rgba(0, 0, 255, 0.5);
  }

  @media (max-width: 1000px) {
    width: 16rem;
    font-size: 0.7rem;
    padding: 0.3rem 0.8rem;
  }
  @media (max-width: 600px) {
    width: 14rem;
    padding: 0.2rem 0.7rem;
  }
  @media (max-width: 450px) {
    width: 12rem;
    font-size: 0.6rem;
  }
`;

const SearchIcon = styled(HiOutlineSearch)`
  position: absolute;
  top: 0.5rem;
  right: 0.8rem;
  @media (max-width: 900px) {
    top: 0.4rem;
  }
  @media (max-width: 600px) {
    width: 0.8rem;
    height: 0.8rem;
    top: 0.4rem;
    right: 0.6rem;
  }
`;

function SearchBox() {
  const [fetchData, { isError, isFetching }] = useLazyGetSearchMembersQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchMember() {
      if (search.length < 3) {
        return;
      }
      const user =
        search.slice(0, 1).toUpperCase() + search.slice(1).toLowerCase();
      try {
        const response = await fetchData(user).unwrap();

        dispatch(setSearchedMembers(response));
        navigate('/members');
        setSearch('');
      } catch (err) {
        const errorMessage =
          err?.data?.message || err?.error || 'Something went wrong';
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
    const delay = setTimeout(() => {
      fetchMember();
    }, 1000);
    return () => clearTimeout(delay);
  }, [search, dispatch, fetchData, navigate]);

  function handleOnChange(e) {
    setSearch(() => e.target.value);
  }

  if (isFetching && !isError) {
    return <Spinner />;
  }
  return (
    <SearchContainer>
      <Search
        type="text"
        name="search"
        value={search}
        aria-label="Search members by last name"
        placeholder="search member by last name"
        onChange={handleOnChange}
      />
      <SearchIcon />
    </SearchContainer>
  );
}

export default SearchBox;

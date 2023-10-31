import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types'; // ES6
import { useState } from 'react';

export const Searchbar = props => {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!searchValue) {
      return;
    }
    props.setQuery(searchValue);
  };
  const handleOnChange = e => {
    setSearchValue(e.target.value);
  };

  return (
    <StyledHeader className="searchbar">
      <form onSubmit={handleSubmit} className="form">
        <button
          disabled={props.query.trim() === searchValue.trim()}
          type="submit"
          className="button"
        >
          <span className="button-label">Search</span>
        </button>

        <input
          onChange={handleOnChange}
          className="input"
          type="search"
          autoComplete="off"
          autoFocus
          value={searchValue}
          placeholder="Enter any word for search"
        />
      </form>
    </StyledHeader>
  );
};

Searchbar.propTypes = {
  setQuery: propTypes.func.isRequired,
  query: propTypes.string.isRequired,
};

const StyledHeader = styled.div`
  background-color: lightseagreen;
  width: 100vw;
  display: flex;
  justify-content: center;
  padding: 10px 20px;
  align-items: center;
  border-bottom: 1px solid black;
  position: sticky;
  top: 0;
  left: 0;
  & button {
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    border-radius: 5px;
    /* width: 20px; */
    /* height: 20px; */
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 1px 1px 1px black;
    transition: all 0.2s ease;
    border: 1px solid black;
    &:hover {
      scale: 0.99;
      box-shadow: 0 0 0px 0px black;
    }
    &:disabled {
      scale: none;
      box-shadow: none;
      cursor: default;
    }
  }
  & form {
    display: flex;
    gap: 10px;
    max-width: 500px;
    min-width: 280px;
    width: 100%;
    position: relative;

    & input {
      width: 100%;
      padding: 10px 10px;
      border: 1px solid black;
      border-radius: 5px;
      box-shadow: 0 0 3px 1px black;
      padding-left: 70px;

      &::placeholder {
        text-align: center;
      }
      @media screen and (max-width: 768px) {
        padding: 5px 10px;
        padding-left: 70px;
      }

      &:hover {
        border: 1px solid gray;
      }
      &:focus {
        border: 1px solid gray;
        outline: none;
      }
    }
  }
`;

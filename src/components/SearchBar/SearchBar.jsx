import { useState } from 'react';
import { GoSearch } from 'react-icons/go';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import s from './SearchBar.module.css';
import { toast } from 'react-hot-toast';

const SearchBar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const handleChange = e => {
    setSearchQuery(e.target.value);
  };

  const trimmedQuery = searchQuery.trim();

  const handleSubmit = e => {
    e.preventDefault();
    if (trimmedQuery === '') {
      toast.error('Please enter a search term!');
      return;
    }

    onSubmit(trimmedQuery);
    setSearchQuery('');
  };

  const handleBtnClick = () => {
    if (trimmedQuery === '') {
      ErrorMessage('Please enter a search term!');
      return;
    }
    onSubmit(trimmedQuery);
    setSearchQuery('');
  };

  return (
    <header className={s.headerWrapper}>
      <form className={s.searchForm} onSubmit={handleSubmit}>
        <div className={s.inputWrapper}>
          <button type="submit" className={s.btn}>
            <GoSearch
              className={s.searchIcon}
              size={16}
              onClick={handleBtnClick}
            />
          </button>
          <input
            type="text"
            value={searchQuery}
            autoFocus
            autoComplete="off"
            onChange={handleChange}
            placeholder="Search images and photos"
            className={s.searchInput}
          />
        </div>
      </form>
    </header>
  );
};

export default SearchBar;

import React, { useState, useEffect, useReducer } from 'react';
import { Button } from './button/Button';
import { ImageGallery } from './imageGallery/ImageGallery';
import { Modal } from './modal/Modal';
import { Searchbar } from './searchbar/Searchbar';
import { fetchImage } from '../services/api';
import { Watch } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { imageReduce, initialState } from 'store/reducer';

export const App = () => {
  // const [images, setImages] = useState([]);
  // const [isOpen, setIsOpen] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [selectedImage, setSelectedImage] = useState(null);
  // const [page, setPage] = useState(1);
  // const [queryValue, setQ] = useState('');
  // const [totalHits, setTotalHits] = useState(null);
  // const [error, setError] = useState('');
  const [state, dispatch] = useReducer(imageReduce, initialState);
  const {
    images,
    isOpen,
    isLoading,
    selectedImage,
    page,
    queryValue,
    totalHits,
    error,
  } = state;

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'loader', payload: true });
      // setIsLoading(true);
      dispatch({ type: 'error', payload: '' });
      // setError('');

      try {
        const res = await fetchImage({
          page,
          q: queryValue,
          totalHits,
        });

        dispatch({ type: 'fetchImage', payload: res.hits });
        // setImages(prevImages => [...prevImages, ...res.hits]);

        dispatch({ type: 'totalHits', payload: res.totalHits });
        // setTotalHits(res.totalHits);
      } catch (err) {
        dispatch({ type: 'error', payload: err.message });
        // setError(err.message);
      } finally {
        dispatch({ type: 'loader', payload: false });
        // setIsLoading(false);
      }
    };

    queryValue && fetchData();
  }, [page, queryValue, totalHits]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);
  const handleLoadMore = () => {
    dispatch({ type: 'loadMorePage' });
    // setPage(prevPage => prevPage + 1);
  };

  const handleSetQuery = newQuery => {
    dispatch({ type: 'newQuery', payload: newQuery });
    // setQ(newQuery);
    // setPage(1);
    // setImages([]);
  };

  const handleToggleModal = selectedImage => {
    dispatch({ type: 'toggleModal', payload: selectedImage });
    // setIsOpen(prevIsOpen => !prevIsOpen);
    // setSelectedImage(selectedImage);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: 16,
        color: '#010101',
      }}
    >
      <Searchbar query={queryValue} setQuery={handleSetQuery} />
      {!images.length && <p>start you search...</p>}

      {images.length ? (
        <p>
          You find {totalHits} images {queryValue}
        </p>
      ) : null}

      {isLoading && !images.length ? (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <Watch
            height="180"
            width="180"
            radius="48"
            color="#4fa94d"
            ariaLabel="watch-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      ) : (
        <ImageGallery handleToggleModal={handleToggleModal} images={images} />
      )}
      {totalHits > images.length ? (
        <Button isLoading={isLoading} onClick={handleLoadMore} />
      ) : null}
      {isOpen ? (
        <Modal closeModal={handleToggleModal} selectedImage={selectedImage} />
      ) : null}
      <ToastContainer />
    </div>
  );
};

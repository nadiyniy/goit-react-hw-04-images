import React, { useState, useEffect } from 'react';
import { Button } from './button/Button';
import { ImageGallery } from './imageGallery/ImageGallery';
import { Modal } from './modal/Modal';
import { Searchbar } from './searchbar/Searchbar';
import { fetchImage } from '../services/api';
import { Watch } from 'react-loader-spinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  // const [total, setTotal] = useState(null);
  const [page, setPage] = useState(1);
  // const [per_page, setPer_page] = useState(12);
  const [q, setQ] = useState('');
  const [totalHits, setTotalHits] = useState(null);
  const [, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const res = await fetchImage({
          page,
          q,
          totalHits,
        });
        console.log(res);

        setImages(prevImages => [...prevImages, ...res.hits]);
        setTotalHits(res.totalHits);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (q !== '' && (page === 1 || totalHits !== null)) {
      fetchData();
    }
  }, [page, q, totalHits]);
  useEffect(() => {}, []);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSetQuery = newQuery => {
    setQ(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleToggleModal = selectedImage => {
    setIsOpen(prevIsOpen => !prevIsOpen);
    setSelectedImage(selectedImage);
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
      <Searchbar query={q} setQuery={handleSetQuery} />
      {!images.length && <p>start you search...</p>}

      {images.length ? (
        <p>
          You find {totalHits} images {q}
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

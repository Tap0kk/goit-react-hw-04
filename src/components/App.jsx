// import s from './App.module.css';
import ImageGallery from './ImageGallery/ImageGallery';
import SearchBar from './SearchBar/SearchBar';
import { useState } from 'react';
import { fetchImages } from '../api/fetchImages';
import ImageModal from './ImageModal/ImageModal';
import Loader from './Loader/Loader';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import { Toaster, toast } from 'react-hot-toast';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = async searchQuery => {
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
    await loadImages(searchQuery, 1);
  };

  const loadImages = async (searchQuery, page) => {
    setLoading(true);
    setError(null);
    try {
      const newImages = await fetchImages(searchQuery, page);
      setImages(prevImages => [...prevImages, ...newImages]);
    } catch (error) {
      setError('Failed to load images!');
      toast.error('Failed to load images!');
    } finally {
      setLoading(false);
    }
  };

  const openModal = id => {
    const image = images.find(img => img.id === id);
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <ImageGallery images={images} openModal={openModal} />
          {loading && <Loader />}
          {images.length > 0 && !loading && (
            <LoadMoreBtn onClick={() => loadImages(query, page + 1)} />
          )}
        </>
      )}
      {isModalOpen && (
        <ImageModal
          image={selectedImage}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
      <Toaster />
    </div>
  );
};

export default App;

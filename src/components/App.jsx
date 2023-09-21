import { useEffect, useState } from "react";
import React from 'react';
import { Searchbar } from "./Searchbar/Searchbar";
import { Button } from "./Button/Button";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { fetchImg } from "./api";
import {Modal} from "./Modal/Modal"
import { Loader } from "./Loader/Loader";


export const App = () => {

  const [query, setQuery] = useState('')
  const [images, setImages] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(false)
  const [modalImg, setModalImg] = useState('')
  const [showModal, setShowModal] = useState(false)


  const handleSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
    setShowLoadMoreButton(false);
  };
  
  const handleOpenModal = (src) => {
    setShowModal(true);
    setModalImg(src);
  }
  
  const handleCloseModal = () => {
    setShowModal(false);
  }
  
  useEffect(() => {
    if (!query) return;
  
    setLoading(true);
    fetchImg(query, page)
    .then(data => {
      const {hits, totalHits} = data;
      setImages(prevImages => [...prevImages, ...hits]);
      setShowLoadMoreButton(page < Math.ceil(totalHits / 12))
    })
    .catch(error => console.error('Error fetching images:', error))
    .finally(() => {setLoading(false)})
  }, [query, page]);
  
  
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  
  return (
    <div>
      <Searchbar onSubmit={handleSubmit}/>
      <ImageGallery 
        images={images} 
        onImageClick={handleOpenModal}/>
      {showLoadMoreButton && (
        <Button onLoad={handleLoadMore}/>
      )}
      <Loader loading={loading} />
      {showModal && (
          <Modal img={modalImg} onClose={handleCloseModal} />
        )}
    </div>
  
  );

};


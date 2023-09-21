import { useEffect } from 'react';
import { StyledOverlay, StyledModal } from './Modal.styled';

export const Modal = ({onClose, img}) => {

  useEffect(() => {
    const handleKeyPress = evt => {
      if (evt.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };

  }, [onClose]);


  // handleKeyPress = evt => {
  //   if (evt.code === 'Escape') {
  //     this.props.onClose();
  //   }
  // };

  const handleOverlayClick = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      onClose();
    }
  };

    return (
      <StyledOverlay onClick={handleOverlayClick}>
        <StyledModal>
          <img src={img} alt="" />
        </StyledModal>
      </StyledOverlay>
    );
  }
import { useState } from 'react';
import ActionButton from '../componets/buttons/ActionButton';
import Modal from '../componets/modals/Modal';

interface useConfirmationModalParameters {
  submitButtonOnClick: () => void;
  submitButtonText?: string;
  closeOnSubmit?: boolean;
  cancelButtonOnClick?: () => void;
  cancelButtonText?: string;
  showCancelButton?: boolean;
  confirmationText?: string;
}

const useConfirmationModal = (parameters: useConfirmationModalParameters) => {
  const {
    submitButtonOnClick = () => {},
    submitButtonText = 'submitButtonText',
    closeOnSubmit = true,
    cancelButtonOnClick = () => {},
    cancelButtonText = 'cancelar',
    showCancelButton = true,
    confirmationText = 'Tem a certeza?',
  } = parameters;

  const [isConfirmationModalOpened, setIsConfirmationModalOpened] =
    useState<boolean>(false);

  const showConfirmationModal = () => {
    setIsConfirmationModalOpened(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpened(false);
  };

  const handleSubmitConfirmationModal = () => {
    //console.log('Submit button clicked'); // Adiciona o console.log aqui

    window.location.reload();
    submitButtonOnClick();
    closeOnSubmit && closeConfirmationModal();
  };

  const handleCancelConfirmationModal = () => {
    cancelButtonOnClick && cancelButtonOnClick();
    closeConfirmationModal();
  };

  const confirmationModal = (
    <Modal
      isOpen={isConfirmationModalOpened}
      onRequestClose={closeConfirmationModal}
    >
      <h1>{confirmationText}</h1>
      <ActionButton
        text={submitButtonText}
        onClick={handleSubmitConfirmationModal}
      />
      {showCancelButton && (
        <ActionButton
          text={cancelButtonText}
          onClick={handleCancelConfirmationModal}
        />
      )}
    </Modal>
  );

  return { confirmationModal, showConfirmationModal, closeConfirmationModal };
};

export default useConfirmationModal;

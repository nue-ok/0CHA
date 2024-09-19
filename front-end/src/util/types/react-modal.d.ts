declare module 'react-modal' {
  import * as React from 'react';

  interface ModalProps {
    isOpen?: boolean;
    onRequestClose?: () => void;
    contentLabel?: string;
    shouldCloseOnOverlayClick?: boolean;
    shouldCloseOnEsc?: boolean;
    className?: string;
    overlayClassName?: string;
    ariaHideApp?: boolean;
    style?: {
      content?: React.CSSProperties;
      overlay?: React.CSSProperties;
    };
    children: React.ReactNode;
    // 필요한 다른 props들을 추가하세요
  }

  class Modal extends React.Component<ModalProps> {}

  export default Modal;
}

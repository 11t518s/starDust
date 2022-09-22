import styled from "@emotion/styled";
import React, { ReactNode } from "react";

type Props = {
  isModal: boolean;
  closeModal: () => void;
  children: ReactNode;
  title?: string;
};

const Modal: React.FC<Props> = ({ isModal, closeModal, children, title }) => {
  return (
    <>
      {isModal ? (
        <StyledModalOverlay>
          <StyledModal>
            <StyledModalHeader>
              <StyledModalCloseButton onClick={() => closeModal()}>
                x
              </StyledModalCloseButton>
            </StyledModalHeader>
            {title && <StyledModalTitle>{title}</StyledModalTitle>}
            <StyledModalBody>{children}</StyledModalBody>
          </StyledModal>
        </StyledModalOverlay>
      ) : null}
    </>
  );
};
export default Modal;

const StyledModalTitle = styled.div``;

const StyledModalCloseButton = styled.div`
  cursor: pointer;
`;

const StyledModalBody = styled.div`
  padding-top: 10px;
`;

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 25px;
`;

const StyledModal = styled.div`
  background: white;
  width: 500px;
  height: 600px;
  border-radius: 15px;
  padding: 15px;
`;
const StyledModalOverlay = styled.div`
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;


import styled from "styled-components";

const Modal = ({ isOpen, onClose, onConfirm, title, subtitle }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <IconContainer>
          <IconText>!</IconText>
        </IconContainer>
        <ModalTitle>{title}</ModalTitle>
        <ModalSubtitle>{subtitle}</ModalSubtitle>
        <ModalButtonContainer>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
        </ModalButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContainer = styled.div`
  width: 80%;
  max-width: 400px;
  background-color: #fff;
  border-radius: 10px;
  padding: 25px 18px 18px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconContainer = styled.div`
  width: 36px;
  height: 36px;
  background-color: #eaeaea;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
`;

const IconText = styled.span`
  color: #fff;
  font-weight: bold;
  font-size: 25px;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  text-align: center;
`;

const ModalSubtitle = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: #959595;
  margin-bottom: 21px;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const CancelButton = styled.button`
  flex: 1;
  background-color: #d9d9d9;
  padding: 12px 0;
  color: ${(props) => props.theme.colors.white};
  font-weight: 500;
  font-size: 18px;
  margin-right: 5px;
  border-radius: 5px;
  cursor: pointer;
`;

const ConfirmButton = styled.button`
  flex: 1;
  background-color: ${(props) => props.theme.colors.mainC};
  padding: 12px 0;
  color: ${(props) => props.theme.colors.white};
  font-weight: 500;
  font-size: 18px;
  margin-left: 5px;
  border-radius: 5px;
  cursor: pointer;
`;

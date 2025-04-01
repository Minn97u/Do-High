import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import backBtn from "../../assets/backBtn.svg";
import { getPostById, updatePost } from "../../api/BoardApi";
import ConfirmModal from "../../components/Modal";

const BoardEdit = () => {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  const isButtonDisabled =
    title.trim().length === 0 || content.trim().length === 0;

  useEffect(() => {
    const fetchExistingPost = async () => {
      try {
        const postId = Number(boardId);
        const response = await getPostById(postId);
        if (response.responseType === "SUCCESS") {
          const { title, content } = response.success;
          setTitle(title || "");
          setContent(content || "");
        } else {
          console.error("게시글 조회 실패:", response.error.message);
          alert("게시글을 불러오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("게시글 불러오기 실패:", error.message);
        alert("서버 오류로 게시글을 불러오지 못했습니다.");
      }
    };

    if (boardId) {
      fetchExistingPost();
    }
  }, [boardId]);

  const handleSubmit = async () => {
    if (!isButtonDisabled) {
      try {
        const postId = Number(boardId);
        await updatePost(postId, title, content);
        alert("게시글이 수정되었습니다.");
        navigate("/boardList");
      } catch (error) {
        console.error("게시글 수정 실패:", error.message);
        alert("게시글 수정에 실패했습니다.");
      }
    }
  };

  const handleBackButton = () => {
    setCancelModalOpen(true);
  };

  const handleCancelEdit = () => {
    setCancelModalOpen(false);
    navigate(`/boardList/${boardId}`);
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBackButton}>
          <img src={backBtn} alt="뒤로가기" />
        </BackButton>
        <HeaderTitle>게시글 수정</HeaderTitle>
      </Header>

      <Content>
        <InputContainer>
          <Label>제목</Label>
          <TextInput
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </InputContainer>

        <InputContainer>
          <Label>내용</Label>
          <TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </InputContainer>
      </Content>

      <SubmitButton
        type="button"
        disabled={isButtonDisabled}
        onClick={handleSubmit}
      >
        수정 완료
      </SubmitButton>

      <ConfirmModal
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        onConfirm={handleCancelEdit}
        title="게시글 수정을 중단하시겠습니까?"
        subtitle="수정사항은 삭제됩니다."
      />
    </Container>
  );
};

export default BoardEdit;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.white};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 15px 0;
  position: relative;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  left: 20px;
  top: 12px;
`;

const HeaderTitle = styled.h1`
  ${(props) => props.theme.fonts.semiBold};
  font-size: 18px;
  text-align: center;
  flex: 1;
  margin: 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  margin-top: 26px;
  gap: 24px;
`;

const InputContainer = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.div`
  ${(props) => props.theme.fonts.medium};
  font-size: 16px;
  color: ${(props) => props.theme.colors.gray2};
  margin-bottom: 6px;
  margin-left: 4px;
`;

const TextInput = styled.input`
  width: 100%;
  padding: 14px 20px;
  ${(props) => props.theme.fonts.semiBold};
  font-size: 14px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.gray};
  border: none;
  outline: none;

  ::placeholder {
    color: ${(props) => props.theme.colors.gray2};
  }

  &::-webkit-input-placeholder {
    color: ${(props) => props.theme.colors.gray2};
  }

  &:focus {
    outline: 2px solid ${(props) => props.theme.colors.mainC};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 14px 20px;
  ${(props) => props.theme.fonts.semiBold};
  font-size: 14px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.gray};
  border: none;
  outline: none;

  ::placeholder {
    color: ${(props) => props.theme.colors.gray2};
  }

  &::-webkit-input-placeholder {
    color: ${(props) => props.theme.colors.gray2};
  }

  &:focus {
    outline: 2px solid ${(props) => props.theme.colors.mainC};
  }
`;

const SubmitButton = styled.button`
  width: 90%;
  margin: auto;
  padding: 14px;
  max-width: 400px;
  ${(props) => props.theme.fonts.medium};
  font-size: 16px;
  border-radius: 50px;
  background: ${(props) =>
    props.disabled ? props.theme.colors.btnGray : props.theme.colors.btn};
  color: ${(props) => (props.disabled ? "#d3d3d5" : "#FFFFFF")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin-top: auto;
  margin-bottom: 73px;
`;

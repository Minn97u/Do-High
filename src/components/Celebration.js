import React, { useEffect, useState } from "react";
import styled from "styled-components";
import celebrationGif from "../assets/LvUp.gif";

const Celebration = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <Overlay>
      <Gif src={celebrationGif} alt="Celebration" />
    </Overlay>
  );
};

export default Celebration;

const Overlay = styled.div`
  position: fixed;
  bottom: 150px;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Gif = styled.img`
  width: 300px;
  height: auto;
`;

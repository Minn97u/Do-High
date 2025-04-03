import { useEffect, useRef, useState } from "react";

const useTooltipVisible = () => {
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return { visible, setVisible, wrapperRef };
};

export default useTooltipVisible;

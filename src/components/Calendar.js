import React, { useState } from "react";
import styled from "styled-components";

const Calendar = ({ selectedDate, setSelectedDate }) => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);

  const handleYearChange = (direction) => {
    setCurrentYear((prev) => prev + direction);
  };

  const handleMonthChange = (direction) => {
    if (currentMonth + direction > 12) {
      setCurrentYear((prev) => prev + 1);
      setCurrentMonth(1);
    } else if (currentMonth + direction < 1) {
      setCurrentYear((prev) => prev - 1);
      setCurrentMonth(12);
    } else {
      setCurrentMonth((prev) => prev + direction);
    }
  };

  const generateDays = () => {
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay();

    return [
      ...Array(firstDay).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];
  };

  return (
    <CalendarDropdown>
      <YearMonthSelector>
        <Section>
          <YearButton onClick={() => handleYearChange(-1)}>{"<"}</YearButton>
          <YearDisplay>{currentYear}년</YearDisplay>
          <YearButton onClick={() => handleYearChange(1)}>{">"}</YearButton>
        </Section>
        <Section>
          <MonthButton onClick={() => handleMonthChange(-1)}>{"<"}</MonthButton>
          <MonthDisplay>{currentMonth}월</MonthDisplay>
          <MonthButton onClick={() => handleMonthChange(1)}>{">"}</MonthButton>
        </Section>
      </YearMonthSelector>
      <CalendarGrid>
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <DayLabel key={day}>{day}</DayLabel>
        ))}
        {generateDays().map((day, index) => (
          <CalendarDay
            key={index}
            isSelected={
              day &&
              `${currentYear}-${String(currentMonth).padStart(2, "0")}-${String(
                day
              ).padStart(2, "0")}` === selectedDate
            }
            onClick={() =>
              day &&
              setSelectedDate(
                `${currentYear}-${String(currentMonth).padStart(
                  2,
                  "0"
                )}-${String(day).padStart(2, "0")}`
              )
            }
          >
            {day || ""}
          </CalendarDay>
        ))}
      </CalendarGrid>
    </CalendarDropdown>
  );
};

export default Calendar;

const CalendarDropdown = styled.div`
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  background-color: ${(props) => props.theme.colors.gray};
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 16px;
`;

const YearMonthSelector = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 16px;
`;

const Section = styled.div`
  display: flex;
  width: 46%;
  height: 40px;
  background-color: #efeff1;
  border-radius: 10px;
  align-items: center;
  justify-content: space-around;
`;

const YearButton = styled.button`
  ${(props) => props.theme.fonts.semiBold};
  font-size: 14px;
  color: ${(props) => props.theme.colors.gray3};
  background: none;
  border: none;
  cursor: pointer;
`;

const YearDisplay = styled.div`
  ${(props) => props.theme.fonts.semiBold};
  font-size: 14px;
  color: ${(props) => props.theme.colors.black3};
  margin: 0 10px;
`;

const MonthDisplay = styled(YearDisplay)``;

const MonthButton = styled(YearButton)``;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
`;

const DayLabel = styled.div`
  text-align: center;
  font-size: 12px;
  color: ${(props) => props.theme.colors.gray2};
`;

const CalendarDay = styled.div`
  ${(props) => props.theme.fonts.medium};
  font-size: 12px;
  color: ${(props) =>
    props.isSelected ? props.theme.colors.white : props.theme.colors.gray2};
  background-color: ${(props) =>
    props.isSelected ? props.theme.colors.mainC : "transparent"};
  border-radius: 50%;
  text-align: center;
  line-height: 45px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.gray2};
  }
`;

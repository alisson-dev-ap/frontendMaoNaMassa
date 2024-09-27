import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";


// Define o componente TimerBox com estilos usando styled
const TimerBox = styled("div")({
  display: "flex",
  marginLeft: 10,
  marginRight: 10,
  alignItems: "center",
});

// Define o tipo para o estado do timer
interface TimerState {
  minutes: number;
  seconds: number;
}

const RecordingTimer: React.FC = () => {
  // Estado inicial do timer
  const initialState: TimerState = {
    minutes: 0,
    seconds: 0,
  };

  // Define o estado do timer
  const [timer, setTimer] = useState<TimerState>(initialState);

  // Atualiza o estado do timer a cada segundo
  useEffect(() => {
    const interval = setInterval(
      () =>
        setTimer((prevState) => {
          if (prevState.seconds === 59) {
            return { ...prevState, minutes: prevState.minutes + 1, seconds: 0 };
          }
          return { ...prevState, seconds: prevState.seconds + 1 };
        }),
      1000
    );
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Função para adicionar zero aos números menores que 10
  const addZero = (n: number): string => {
    return n < 10 ? "0" + n : n.toString();
  };

  return (
    <TimerBox>
      <span>{`${addZero(timer.minutes)}:${addZero(timer.seconds)}`}</span>
    </TimerBox>
  );
};

export default RecordingTimer;

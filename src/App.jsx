import React, { useState, useEffect, useRef } from 'react';
import { Box, Card, CardActionArea, CardContent, Button } from '@mui/material';

function App() {
  const [matrix, setMatrix] = useState(Array(9).fill(null));
  const [clickHistory, setClickHistory] = useState([]);
  const [orangeSequenceActive, setOrangeSequenceActive] = useState(false);
  const orangeSequenceIndex = useRef(0);

  const handleClick = (index) => {
    if (!orangeSequenceActive) {
      const newMatrix = [...matrix];
      if (newMatrix[index] !== 'green') {
        newMatrix[index] = 'green';
        setMatrix(newMatrix);
        setClickHistory([...clickHistory, index]);
      }

      if (clickHistory.length + 1 === 9) {
        setOrangeSequenceActive(true);
        orangeSequenceIndex.current = 0;
      }
    }
  };

  useEffect(() => {
    if (orangeSequenceActive && clickHistory.length > 0 && orangeSequenceIndex.current < clickHistory.length) {
      const timer = setTimeout(() => {
        const indexToChange = clickHistory[orangeSequenceIndex.current];
        const newMatrix = [...matrix];
        newMatrix[indexToChange] = 'orange';
        setMatrix(newMatrix);
        orangeSequenceIndex.current++;
      }, 500);

      return () => clearTimeout(timer);
    } else if (orangeSequenceActive && orangeSequenceIndex.current === clickHistory.length) {
      setOrangeSequenceActive(false);
    }
  }, [orangeSequenceActive, clickHistory, matrix]);

  const handleReset = () => {
    setMatrix(Array(9).fill(null));
    setClickHistory([]);
    setOrangeSequenceActive(false);
    orangeSequenceIndex.current = 0;
  };

  const matrixRows = [];
  for (let i = 0; i < 9; i += 3) {
    matrixRows.push(matrix.slice(i, i + 3));
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      {matrixRows.map((row, rowIndex) => (
        <Box key={rowIndex} sx={{ display: 'flex', flexDirection: 'row', mb: 2 }}>
          {row.map((cellColor, colIndex) => {
            const index = rowIndex * 3 + colIndex;
            return (
              <Card
                key={index}
                sx={{
                  width: 80,
                  height: 80,
                  marginRight: 2,
                  ...(colIndex === 2 && { marginRight: 0 }),
                }}
              >
                <CardActionArea
                  onClick={() => handleClick(index)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    backgroundColor: cellColor || 'white',
                  }}
                >
                  <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: 0 }}>
                    {index + 1}
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
        </Box>
      ))}
      <Button variant="contained" onClick={handleReset} sx={{ mt: 3 }}>
        Reset
      </Button>
    </Box>
  );
}

export default App;
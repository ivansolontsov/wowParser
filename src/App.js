import React from "react";
import { CharactersList } from "./components/CharactersList";
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {

  const [update, setUpdate] = React.useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [countdown, setCountdown] = React.useState(0);

  React.useEffect(() => {
    countdown > 0 && setTimeout(() => setCountdown(countdown - 1), 1000);
  }, [countdown]);

  React.useEffect(() => {
    setIsButtonDisabled(true);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 60000)
    setCountdown(60)
  }, [])

  return (
    <React.Fragment>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container fixed maxWidth="lg">
          <div className="app__header">
            <h1>Чёрный Лотос</h1>
            {countdown !== 0 && (
              <span>Cooldown {countdown} sec</span>
            )}
            <div className="app__header-buttons">
              <IconButton disabled={isButtonDisabled} onClick={() => {
                setUpdate(!update)
                setIsButtonDisabled(true)
                setTimeout(() => {
                  setIsButtonDisabled(false);
                }, 60000)
                setCountdown(60)
              }} color="secondary" aria-label="Update Data">
                <RefreshIcon />
              </IconButton>
            </div>
          </div>
          <CharactersList update={update} />
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
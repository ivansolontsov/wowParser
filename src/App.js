import React from "react";
import { GuildRequest } from "./components/GuildRequest";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container fixed maxWidth="xl">
          <GuildRequest/>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
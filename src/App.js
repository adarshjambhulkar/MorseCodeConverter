import React, { useState, useMemo } from "react";
import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import {
  CssBaseline,
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  InputAdornment,
  Snackbar,
  Alert,
  Switch,
  FormControlLabel,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

// Morse Code Dictionary
const morseCodeDict = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  0: "-----",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "'": ".----.",
  "!": "-.-.--",
  "/": "-..-.",
  "(": "-.--.",
  ")": "-.--.-",
  "&": ".-...",
  ":": "---...",
  ";": "-.-.-.",
  "=": "-...-",
  "+": ".-.-.",
  "-": "-....-",
  _: "..--.-",
  '"': ".-..-.",
  $: "...-..-",
  "@": ".--.-.",
  "#": "...--.-",
  "%": ".....-",
  "^": "..-..-",
  "*": "---.-.",
  "(": "-.--.",
  ")": "-.--.-",
  _: "..--.-",
  "=": "-...-",
  "{": ".--..-",
  "}": ".-..-.",
  "[": "-..--.",
  "]": "-.-..-",
  "|": "-.-.-.",
  "~": "--...-",
  "`": "--..-.",
  " ": "/",
};

// Convert text to Morse code
const textToMorse = (text) =>
  text
    .toUpperCase()
    .split("")
    .map((letter) => morseCodeDict[letter] || letter)
    .join(" ");

// Convert Morse code to text
const morseToText = (morse) => {
  const reverseDict = Object.fromEntries(
    Object.entries(morseCodeDict).map(([letter, code]) => [code, letter])
  );
  return morse
    .split(" ")
    .map((code) => reverseDict[code] || code)
    .join("");
};

function App() {
  const [text, setText] = useState("");
  const [morse, setMorse] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleTextChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    setMorse(textToMorse(newText));
  };

  const handleMorseChange = (event) => {
    const newMorse = event.target.value;
    setMorse(newMorse);
    setText(morseToText(newMorse));
  };

  const copyToClipboard = (content) => {
    navigator.clipboard
      .writeText(content)
      .then(handleSnackbarOpen)
      .catch(console.error);
  };

  const clearFields = () => {
    setText("");
    setMorse("");
  };

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: "'Slabo 27px', serif",
        },
        palette: {
          mode: mode,
        },
      }),
    [mode]
  );

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <Container maxWidth="sm">
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Ensures background color matches the theme */}
        <Container maxWidth="sm">
          <Box sx={{ my: 2 }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              color={"primary"}
            >
              -- --- .-. ... . Code Converter
            </Typography>
            <Box
              sx={{
                my: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
                gap: 0,
              }}
            >
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Switch
                    checked={mode === "dark"}
                    onChange={toggleColorMode}
                  />
                }
                label={mode === "dark" ? "Dark Mode" : "Light Mode"}
              />
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  multiline
                  fullWidth
                  label="Text"
                  variant="outlined"
                  value={text}
                  onChange={handleTextChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button onClick={() => copyToClipboard(text)}>
                          <ContentCopyIcon />
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  label="Morse Code"
                  variant="outlined"
                  value={morse}
                  onChange={handleMorseChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button onClick={() => copyToClipboard(morse)}>
                          <ContentCopyIcon />
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={clearFields}
                  fullWidth
                >
                  Clear
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Copied to clipboard!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;

import React from "react";// @ts-ignore
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./app/home";
import Play from "./app/play";
import { NativeBaseProvider, extendTheme } from "native-base";
import './globals.css';

const theme = extendTheme({
  config: {
    initialColorMode: "light",
  },
});

type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType { }
}

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/play/:index" element={<Play />} />
    </Routes>
  )
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <NativeBaseProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NativeBaseProvider>
  </React.StrictMode>
);
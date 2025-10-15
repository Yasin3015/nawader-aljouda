import { useState } from 'react';
import Button from './components/UI/Button';
import SearchComponent from './components/UI/SearchComponent';
import LanguageSwitcher from './components/Layout/Navbar/LanguageSwitcher';
import NavLinks from './components/Layout/Navbar/NavLinks';
import AppRouter from './routes/AppRouter';
import { RouterProvider } from 'react-router-dom';

function App() {

  return (
    <>
      <RouterProvider router={AppRouter}>
        <p>HIIIIIIIIIIIIII</p>
      </RouterProvider>
      {/* <RouterProvider router={AppRouter}/> */}
    </>
  )
}

export default App

import logo from './logo.svg';
import * as ReactDOM from "react-dom/client";
import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Header from './Components/Header';
import Client from './Components/Client';
import Stretch from './Components/Stretch';
import ClientStretch from './Components/ClientStretch';
import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div className="App">
    
    <Client></Client>
  </div>,
  },
  {
    path: "/client",
    element: <div className="App">
    <Client></Client>
  </div>,
  },
  {
    path: "/stretch",
    element: <div className="App">
    <Stretch></Stretch>
  </div>,
  },
  {
    path: "/client-stretch",
    element: <div className="App">
    <ClientStretch></ClientStretch>
  </div>,
  },
  
]);

function App() {
  return (
    <React.StrictMode>
    <Header></Header>
    <RouterProvider router={router} />
  </React.StrictMode>
  );
}

export default App;

// import { createBrowserRouter, BrowserRouter, RouterProvider } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import Theme from './Theme'
// import About from './pages/About';
// import HomeLayout from './pages/HomeLayout';
// import Cocktail from './pages/Cocktail';
// import Landing from './pages/Landing';
// import Newsletter from './pages/Newsletter';
// import Error from './pages/Error';
// import SinglePageError from './pages/SinglePageError';
// import { Router, Routes, Route } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import {
  About,
  HomeLayout,
  Landing,
  Error,
  Newsletter,
  Cocktail,
  SinglePageError,
} from './pages';

import { loader as landingLoader } from './pages/Landing';
// const theme = {
//   h1 {
//     color: #2f6ab7
//   }
// }

const router = createBrowserRouter([
  {
    path:'/', 
    element: <HomeLayout />,
    // global error page
    errorElement:<Error />,
    children: [
      {
        index: true, 
        element: <Landing />,
        errorElement: <SinglePageError />,
        loader: landingLoader,
      },
      {
        path:'cocktail', 
        element: <Cocktail />
      },
      {
        path:'newsletter', 
        element: <Newsletter />
      },
      {
        path:'about', 
        element: <About />,
        children: [
          {
            index: true, 
            element: <h2>Our company</h2>
          },
          {
            path:'person', 
            element: <h2>Person</h2>
          }
        ]
      }
    ]
  }
])

const App = () => {
  return (
    <Theme>
      <RouterProvider router={router} />
    </Theme>
  )
}

export default App

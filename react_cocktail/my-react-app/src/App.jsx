import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

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
import {loader as singleCocktailLoader } from './pages/Cocktail'
import {action as newsletterAction } from './pages/Newsletter'

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      // how long the query will be valid, 1000 * 60 = 1 minute
      staleTime: 1000 * 60 * 5 // 5 mins
    }
  }
})

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
        // queryClient can be passed down here, as an instance
        // the landingLoader is being invoked here, it will run right away
        loader: landingLoader(queryClient),
      },
      {
        path:'cocktail/:id', 
        errorElement: <SinglePageError />,
        loader: singleCocktailLoader(queryClient),
        element: <Cocktail />
      },
      {
        path:'newsletter', 
        element: <Newsletter />,
        action: newsletterAction,
        errorElement: <SinglePageError />,
      },
      {
        path:'about', 
        element: <About />,
      },
    ]
  }
])

const App = () => {
  return (
    // client prop
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />;
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  )
}

export default App
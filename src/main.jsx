import { Toaster } from "@/components/ui/sonner";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import App from './App.jsx';
import CreateTrip from './create-trip/index.jsx';
import './index.css';
import Header from './components/custom/Header.jsx';
import Viewtrip from './view-trip/[tripid]/index';
import MyTrips from './my-trips/index.jsx';

const Layout = () => (
  <>
    <Header />
    <Outlet />  {/* This allows child routes to render their components */}
  </>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,  // Using Layout to include Header across all pages
    children: [
      { path: '', element: <App /> },
      { path: 'create-trip', element: <CreateTrip /> },
      { path: 'view-trip/:tripId', element: <Viewtrip /> },
      { path: 'my-trips', element: <MyTrips /> }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Toaster />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);

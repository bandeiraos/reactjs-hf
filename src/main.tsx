import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { BookingProvider } from './context/context';
import router from './routes/router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BookingProvider>
      <RouterProvider router={router} />
    </BookingProvider>
  </React.StrictMode>,
);

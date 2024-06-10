import * as React from 'react';
import { ScrollRestoration } from 'components/core/scroll-restoration';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Root } from 'root';
import { routes } from 'routes';

const root = createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Root>
        <ScrollRestoration />
        <Outlet />
      </Root>
    ),
    children: [...routes],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

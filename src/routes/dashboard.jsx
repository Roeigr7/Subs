import * as React from 'react';
import { Layout as DashboardLayout } from 'components/dashboard/layout/layout';
import { Outlet } from 'react-router-dom';

export const route = {
  path: 'dashboard',
  element: (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ),
  children: [
    {
      index: true,
      lazy: async () => {
        const { Page } = await import('pages/dashboard/overview');
        return { Component: Page };
      },
    },
  ],
};

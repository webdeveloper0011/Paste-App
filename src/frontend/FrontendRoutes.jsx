import React from 'react'
import Layout from './Layout'
import Home from './container/pages/Home'
import AllPastes from './container/pages/AllPastes'
import ViewPaste from './container/pages/ViewPaste'
import PageNotFound from './container/pages/PageNotFound'

const FrontendRoutes = [
  {
    path: '/',
    element: <Layout />,
    children: [
        {
            path: '/',
            element: <Home/>
        },
        {
            path: 'all-pastes',
            element: <AllPastes/>
        },
        {
            path: 'view-paste/:id',
            element: <ViewPaste/>
        },
        {
            path: '*',
            element: <PageNotFound/>
        }
    ]
  }
]

export default FrontendRoutes

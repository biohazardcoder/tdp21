import React from 'react';
import { Navbar } from '../components/shared/navbar';
import {Sidebar} from '../components/shared/sidebar';

export const DocsLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="h-screen">
         <Navbar LoadPage={false} />
         <div className="grid grid-cols-12">
           <Sidebar />
           {children}
         </div>
       </div>
  )
}

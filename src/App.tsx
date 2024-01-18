import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'

const Clients = lazy(() => import('./pages/Clients'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {


  return (
    <Suspense fallback={<div className='loader'></div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Clients />}/>
          <Route path="/*" element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </Suspense>

  )
}

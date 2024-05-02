import React from 'react'
import ReactDOM from 'react-dom/client'
import Pong from '.'

const root = document.getElementById('root')
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Pong size={{ width: window.innerWidth/2, height: window.innerHeight/2 }} />
    </React.StrictMode>
  )
} else throw Error(`root not found`)

import { PropsWithChildren } from 'react'

export const AppContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div style={style}>
      {children}
      <Info />
    </div>
  )
}

const Info = () => {
  return (
    <div>
      <span style={{ marginRight: '2em' }}>
        {window.innerWidth > 800 ? `Control: ↑↓(online) / WSOK(offline)` : ``}
      </span>
      <span style={{ marginRight: '2em' }}>© Katsumi Yoshida 2024</span>
      <span>
        <a style={{ color: 'white' }} href="https://github.com/yozibak/pong-online">
          Github
        </a>
      </span>
    </div>
  )
}

const style: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  alignContent: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0,0,20)',
  height: '100dvh',
  width: '100vw',
  fontFamily: 'monospace',
  color: 'rgb(200,200,200)',
  textAlign: 'center',
  lineHeight: 2,
}

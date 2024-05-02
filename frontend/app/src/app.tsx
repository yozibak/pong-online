import Pong from 'pong'

export default () => {
  return (
    <>
      <Pong size={{ width: window.innerWidth / 2, height: window.innerHeight / 2 }} />
    </>
  )
}

import './styles/main.css';

import logoImg from './assets/logo-nlw-esports.svg'

export function App() {
  return (
    <div className="max-w-[1344px] mx-auto my-20 flex flex-col items-center">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{' '}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">duo</span>{' '}
        está aqui
      </h1>
    </div>
  )
}

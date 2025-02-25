import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Counter from './components/Counter'

function App() {
  const [count, setCount] = useState(0)

  // function updateCount() {
  //   setCount(count+1);
  // }

  // arraw function

  const updateCount = (count) => {
    return count + 1
  }

  const updateCount1 = () => count + 1;

  const dados = {
    "nome" : "fulano",
    "atualiza": (novo_nome) => `Novo nome e ${novo_nome}`,
    "endereco": {
      "rua": "geu",
      "numero": "111",
      "complementos": ["casa", "na esquina"]
    }

  };

  dados.atualiza("gerson");
  dados.endereco.complementos[1];

  return (
    <>
    <Counter title="Contador"/>
    <Counter initial="100"/>
    </>
  )
}

export default App

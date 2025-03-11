import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Counter from './components/Counter'
import Photo from './components/Photo'

function App() {
  const [count, setCount] = useState(0)
  const [photos, setPhotos] = useState([])

  const fetchPhotos = async () => {
    try {
      const url = 'https://jsonplaceholder.typicode.com/albums/1/photos';
      const response = await fetch(url);
      console.log(response)
      if (response.status === 200) {
        const data = await response.json();
        const updatedPhotos = data.map( (photo) => ({
          ...photo,
          thumbnailUrl: `https://picsum.photos/150?random=${photo.id}`
        }))
        // Se colocar apenas 'photo' a resposta seria { photo: {id: 1, title: "rótulo,..."}}
        // Se colocar apenas '...photo' a resposta seria {id: 1, title: "rótulo,..."}
        setPhotos(updatedPhotos);
      }

    } catch (error) {
      console.error('Erro ao buscar fotos', error)
    }
  }

  useEffect(() => {
    fetchPhotos();
  }, []);

  // function updateCount() {
  //   setCount(count+1);
  // }

  // array function

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
    <Counter title="Contando..."/>
    <Counter initial="100"/>
    <article>
      <h1>Album da API</h1>
      {photos.map( (photo) => (
        // <article key={photo.id}>
        //   <h2>ID #{photo.id} {photo.title}</h2>
        //   <img src={photo.thumbnailUrl} alt={photo.title} />
        // </article>
        <Photo photo={photo}/>
      ))}
    </article>
    </>
  )
}

export default App

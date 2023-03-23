import {useState} from 'react'

function App() {

  const anecdotes = [
    'Se fazer algo dói, faça isso com mais frequência.',
    'Contratar mão de obra para um projeto de software que já está atrasado, faz com que se atrase mais ainda!',
    'Os primeiros 90% do código correspondem aos primeiros 10% do tempo de desenvolvimento... Os outros 10% do código correspondem aos outros 90% do tempo de desenvolvimento.',
    'Qualquer tolo escreve código que um computador consegue entender. Bons programadores escrevem código que humanos conseguem entender.',
    'Otimização prematura é a raiz de todo o mal.',
    'Antes de mais nada, depurar é duas vezes mais difícil do que escrever o código. Portanto, se você escrever o código da forma mais inteligente possível, você, por definição, não é inteligente o suficiente para depurá-lo.',
    'Programar sem o uso extremamente intenso do console.log é o mesmo que um médico se recusar a usar raio-x ou testes sanguíneos ao diagnosticar pacientes.',
    'A única maneira de ir rápido é ir bem.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0, 0])
  const [mostVoted, setMostVoted] = useState(0)
  
  function selectNext() {
    setSelected(parseInt(Math.random() * 8))
  }
  
  function setPoint () {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)

    var mostVotedItem = Math.max(...copy)

    copy.forEach((item, index) => {
      if (item == mostVotedItem){
        setMostVoted(index)
      }
    })
  }

  return (
    <div className="App">
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      {points[selected] == 1 ? <p>has {points[selected]} vote</p> : <p>has {points[selected]} votes</p>}
      <button onClick={setPoint}>vote</button>
      <button onClick={selectNext}>next anecdote</button>

      <h2>Anecdote with most vote</h2>
      
      <p>{anecdotes[mostVoted]}</p>
    </div>
  );
}

export default App;

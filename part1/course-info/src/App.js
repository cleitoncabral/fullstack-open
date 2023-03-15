import Content from './components/Content';
import Header from './components/Header';
import Total from './components/Total';

function App() {
  const course = 'Desenvolvimento de aplicação Half Stack'
  const parts = {part1:'Fundamentos da biblioteca React', part2:'Usando props para passar dados', part3:'Estado de um componente'}
  const exercises = {exercises1: 10, exercises2: 7, exercises3: 14}

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} exercises={exercises} />
      <Total total={exercises.exercises1 + exercises.exercises2 + exercises.exercises3} />
    </div>
  );
}

export default App;

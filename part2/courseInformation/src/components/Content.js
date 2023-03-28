import Part from '../components/Part'

function Content({parts}){
  
  return (
    <div>
      {parts.map((part) => {
        return <Part key={part.id} parts={part.name} exercises={part.exercises} />
      })}
    </div>
  )
}

export default Content;
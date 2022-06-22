import { Outlet, Link } from "react-router-dom"


const decisions=[
    {id:'45354', name:'decision 1'},
    {id:'5345', name:'decision 2'},
    {id:'453gdfg54', name:'decision 3'},
    {id:'4534654', name:'decision 4'}
]

const Main = () => {
   
  return (
    <div>
        <h2>Decisions</h2>
        <ul>
        <Link to={`/`}><li >main page</li></Link>
            {decisions.map(decision=><Link key={decision.id} to={`/decisions/${decision.id}`}><li >{decision.name}</li></Link>)}
        </ul>
        <Outlet />
    </div>
  )
}

export default Main
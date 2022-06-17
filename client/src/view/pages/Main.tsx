import { Outlet, Link } from "react-router-dom"


const rooms=[
    {id:'45354', name:'Room 1'},
    {id:'5345', name:'Room 2'},
    {id:'453gdfg54', name:'Room 3'},
    {id:'4534654', name:'Room 4'}
]

const Main = () => {
   
  return (
    <div>
        <h2>Rooms</h2>
        <ul>
            {rooms.map(room=><Link key={room.id} to={`/${room.id}`}><li >{room.name}</li></Link>)}
        </ul>
        <Outlet />
    </div>
  )
}

export default Main
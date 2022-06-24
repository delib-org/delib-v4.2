import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { socket } from '../../../../index';

const Chat = () => {
  const {consultationId} = useParams();
  useEffect(()=>{
    socket.emit('join-consultation', consultationId)
    socket.on('consultation-message',(message)=>{
      console.log(message)
    })
    return ()=>{
      socket.off('consultation-message');
      socket.emit('leave-consultation', consultationId)
    }
  },[])

function handleSendMessage(ev:any){
  ev.preventDefault()
  try {
   const message = ev.target.message.value;
   if(message){
      socket.emit('consultation-message', {message,consultationId})
      ev.target.reset();
   }
  } catch (error) {
    console.error(error)
  }
}

  return (
    <div className='chat'>
      <main>
        <div className="wrapper">
          test
        </div>
      </main>
      <form onSubmit={handleSendMessage}>
        <input type="text" name="message" placeholder='הודעה...'/>
        <button type="submit">SEND</button>
      </form>
    </div>
  )
}

export default Chat
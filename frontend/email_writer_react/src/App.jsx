import { useState } from 'react'
import './App.css'

function App() {
  const [emailContent,setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generateReply, setGenerateReply] = useState('');
  const [loading, serLoading] = useState(false);
  const [error, setError] = useState('');
  return (
    <>
      <p>Ку</p>
    </>
  )
}

export default App

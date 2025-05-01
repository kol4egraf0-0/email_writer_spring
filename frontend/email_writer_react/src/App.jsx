import { useState } from 'react'
import './App.css'
import { Box, Button, CircularProgress, Container, FormControl, Input, InputLabel, Menu, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';

function App() {
  const [emailContent,setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generateReply, setGenerateReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailContent,
        tone
      });
      setGenerateReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data)); //строка или json ответ
    } catch (error) {
      setError('Ошибка в генерации ответа');
      console.error(error);
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="md" sx={{py:4}}>
      <Typography variant='h3' component="h1" gutterBottom>
        Генератор Ответа
      </Typography>

      <Box sx={{mx:3}}>
        <TextField
        fullWidth
        multiline
        rows={6}
        variant='outlined'
        label="Содержание письма"
        value={emailContent || ''}
        onChange={(e)=> setEmailContent(e.target.value)}
        sx={{mb:2}}/>
        <FormControl fullWidth sx={{mb:2}}>
          <InputLabel>Тон ответа</InputLabel>
          <Select
            value={tone || ''}
            label={"Tone (Optional)"}
            onChange={(e)=>setTone(e.target.value)}>
            <MenuItem value="">Без</MenuItem>
            <MenuItem value="Профессиональный">Профессиональный</MenuItem>
            <MenuItem value="Повседневный">Повседневный</MenuItem>
            <MenuItem value="Дружелюбный">Дружелюбный</MenuItem>
          </Select>
        </FormControl>
        <Button
        variant='contained'
        onClick={handleSubmit}
        disabled={!emailContent || loading}
        fullWidth>
          {loading ? <CircularProgress size={24}/>: "Сгенерировать ответ"}
        </Button>
      </Box>
      {error &&(
        <Typography color='error' sx={{mb:2}}>
          {error}
        </Typography>
      )}

      {generateReply && (
        <Box sx={{mt:3}}>
          <Typography variant='h6' gutterBottom> 
            Сгенерированный ответ:
          </Typography>
          <TextField 
          fullWidth
          multiline
          rows={6}
          variant='outlined'
          value={generateReply || ''}
          inputProps={{readOnly: true}}/>

      <Button
      variant='outlined'
      sx={{mt:2}}
      onClick={()=> navigator.clipboard.writeText(generateReply)}>
        Скопировать
      </Button>
        </Box>
      )}
    </Container>
  )
}

export default App

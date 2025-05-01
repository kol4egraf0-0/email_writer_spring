import { useState } from 'react'
import './App.css'
import { Box, Button, CircularProgress, Container, FormControl, Input, InputLabel, Menu, MenuItem, Select, TextField, Typography } from '@mui/material';

function App() {
  const [emailContent,setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generateReply, setGenerateReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    
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
          <InputLabel>Tone (Optional)</InputLabel>
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
    </Container>
  )
}

export default App

import { useEffect, useState } from 'react'
import io from 'socket.io-client'
let socket;

export default function Home() {
   const [form, setForm] = useState({
        author: '',
        messages: ''
    })
    const [data, setData] = useState([]);
    const [url, setUrl] = useState('');

    useEffect(() => {
        getPosts();
        socketInitializer();
    },[])

    const getPosts = async () => {
        const body = await fetch('/api/posts');
        const json = await body.json();
        setData(json);
    }

    const socketInitializer = async () => {
        await fetch('/api/socket');
        socket = io();

        socket.on('connect', () => {
            console.log('connected')
        })

        socket.on('msg', msg => { 
             getPosts();      
        })

        socket.on('url', url => {  
            setUrl(url)           
        })
    }

    const handleChange = (e) => {
        setForm(old => {
            return {
                ...old,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSetUrl = (url) => {
        socket.emit('url', url)
    }

    const handleSend = async() => {
        await fetch('/api/posts', {
            method: "POST",
            body: JSON.stringify(form),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        });
        socket.emit('msg', form)
        setForm(old => {
            return {
                ...old,
                messages: ''
            }
        })

    }

    return (
        <>
            <label>Nome:</label>
            <input name='author' value={form.author} onChange={handleChange} /><br />
            <label>Mensagem:</label>
            <input name='messages' value={form.messages} onChange={handleChange} /><br/>
            <button onClick={handleSend}>Enviar</button>
            <button onClick={() => handleSetUrl('https://www.youtube.com/embed/wqM10BfkZPk')}>Criar sala</button>
            <iframe width="400" height="200" src={url} title="EMINEM - NOT AFRAID. EN VIVO." frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <hr />
            <p>{data.length > 0 &&
                data.map((value, key) => (
                    <>
                    <strong>{value.author}:</strong>
                        <p>{value.messages}</p>
                    </>
                        )
                )
            }</p>
      </>
      

  )
}

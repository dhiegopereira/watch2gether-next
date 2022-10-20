import { useEffect, useState } from 'react'
import io from 'socket.io-client'
let socket;

export default function Home() {
   const [form, setForm] = useState({
        author: '',
        messages: ''
    })
    const [data, setData] = useState([]);

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
    }

    const handleChange = (e) => {
        setForm(old => {
            return {
                ...old,
                [e.target.name]: e.target.value
            }
        })
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

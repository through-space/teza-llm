'use client'
import * as React from 'react'
import { useEffect, useState } from 'react'

export default function Home() {
    const [name, setName] = useState('')
    const [people, setPeople] = useState<string[]>([])

    useEffect(() => {
        fetch('/api/submit')
            .then(res => {
                console.log(res);
                return res.json();
            })
            .then(data => setPeople(data))
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await fetch('/api/submit', {
            method: 'POST',
            body: JSON.stringify({ name }),
            headers: { 'Content-Type': 'application/json' },
        })
        setName('')
        const updated = await fetch('/api/submit').then(res => res.json())
        setPeople(updated)
    }

    return (
        <main style={{ padding: 20 }}>
            <h1>Hello2</h1>
            <form onSubmit={handleSubmit}>
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your name"
                />
                <button type="submit">Submit</button>
            </form>
            <ul>
                {people.map((p, i) => (
                    <li key={i}>{p}</li>
                ))}
            </ul>
        </main>
    )
}

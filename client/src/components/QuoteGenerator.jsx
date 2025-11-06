import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function QuoteGenerator(){
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function fetchQuote(){
    try{
      setLoading(true); setError(''); setQuote(null)
      const BASE = import.meta.env.VITE_API_BASE || '';

      const res = await axios.get(`${BASE}/api/quote`)
      if(res.data && res.data.success) setQuote(res.data.quote)
      else setError('Unexpected response from quote API')
    }catch(err){
      console.error(err)
      setError('Could not fetch quote')
    } finally { setLoading(false) }
  }

  useEffect(()=>{ fetchQuote() }, [])

  return (
    <section className="module">
      <h2>Motivational Quote</h2>
      <div>
        <button onClick={fetchQuote}>New Quote</button>
      </div>

      {loading && <p>Loading quote…</p>}
      {error && <p className="error">{error}</p>}

      {quote && (
        <blockquote className="quote-box">
          <p>“{quote.text}”</p>
          <footer>— {quote.author || 'Unknown'}</footer>
        </blockquote>
      )}
    </section>
  )
}

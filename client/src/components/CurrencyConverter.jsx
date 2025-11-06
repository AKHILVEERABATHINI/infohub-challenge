import React, { useState } from 'react'
import axios from 'axios'

export default function CurrencyConverter(){
  const [amount, setAmount] = useState(100)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function convert(){
    try{
      setLoading(true); setError(''); setResult(null)
      const res = await axios.get(`/api/currency?amount=${encodeURIComponent(amount)}`)
      if(res.data && res.data.success) setResult(res.data)
      else setError('Unexpected response from currency API')
    }catch(err){
      console.error(err)
      setError(err.response?.data?.error || 'Could not fetch currency rates')
    } finally { setLoading(false) }
  }

  return (
    <section className="module">
      <h2>Currency Converter (INR → USD/EUR)</h2>
      <div className="inline-form">
        <label htmlFor="amt">INR amount</label>
        <input id="amt" type="number" value={amount} onChange={e=>setAmount(e.target.value)} />
        <button onClick={convert}>Convert</button>
      </div>

      {loading && <p>Converting…</p>}
      {error && <p className="error">{error}</p>}

      {result && result.results && (
        <div className="result-box">
          <p><strong>{result.amount}</strong> INR → <strong>{result.results.usd}</strong> USD</p>
          <p><strong>{result.amount}</strong> INR → <strong>{result.results.eur}</strong> EUR</p>
        </div>
      )}
    </section>
  )
}

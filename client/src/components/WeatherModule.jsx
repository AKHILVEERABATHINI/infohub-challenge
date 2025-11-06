import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function WeatherModule(){
  const [city, setCity] = useState('London')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function fetchWeather(qCity){
    try{
      setLoading(true); setError(''); setData(null)
      const res = await axios.get(`/api/weather?city=${encodeURIComponent(qCity)}`)
      if(res.data && res.data.success){
        setData(res.data.weather)
      } else {
        setError('Unexpected response from weather API')
      }
    }catch(err){
      console.error(err)
      setError(err.response?.data?.error || 'Could not fetch weather')
    } finally { setLoading(false) }
  }

  useEffect(()=>{ fetchWeather(city) }, [])

  return (
    <section className="module">
      <h2>Weather</h2>
      <form className="inline-form" onSubmit={e=>{ e.preventDefault(); fetchWeather(city) }}>
        <label htmlFor="city-input">City</label>
        <input id="city-input" value={city} onChange={e=>setCity(e.target.value)} />
        <button type="submit">Get</button>
      </form>

      {loading && <p>Loading weather…</p>}
      {error && <p className="error">{error}</p>}

      {data && (
        <div className="weather-card">
          <h3>{data.city}</h3>
          <div className="weather-grid">
            {data.icon && <img src={data.icon} alt={data.condition} />}
            <div>
              <p className="temp">{data.temperatureC}°C / {Math.round(data.temperatureF)}°F</p>
              <p className="cond">{data.condition}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

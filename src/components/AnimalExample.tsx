import { fetchCat, fetchDog } from '@/api/animalApi'
import React, { useState, useEffect } from 'react'

const useFetchDog = () => {
 const [dog, setDog] = useState<string>()
 const initFetchDog = async () => {
  const response = await fetchDog()
  setDog(response.data.message)
 }

 return {
  dog,
  initFetchDog,
 }
}

const useFetchCat = () => {
 const [cat, setCat] = useState<string>()
 const initFetchCat = async () => {
  const response = await fetchCat()

  setCat((response.data && response.data[0].url) || '')
 }
 return { cat, initFetchCat }
}

const useFetchAnimals = () => {
 const { dog, initFetchDog } = useFetchDog()
 const { cat, initFetchCat } = useFetchCat()

 const fetchAnimals = () => {
  initFetchDog()
  initFetchCat()
 }
 useEffect(() => {
  fetchAnimals()
 }, [])

 return {
  dog,
  cat,
  fetchAnimals,
 }
}

const styles = {
 imgsContainer: { display: 'flex', height: '90%' },
 imgContainer: {
  width: '50%',
  justifyContent: 'center',
 },
 img: { maxWidth: '100%', maxHeight: '100%' },
 container: {
  width: '95vw',
  padding: '2em',
  display: 'flex',
  flexDirection: 'column' as 'column',
  justifyContent: 'space-around',
  height: '90vh',
  alignItems: 'center',
  gap: '1em',
 },
 button: {
  width: 'max-content',
  padding: '0.7em 1em',
  color: 'white',
  backgroundColor: 'cornflowerblue',
 },
}

const AnimalExample = () => {
 const { dog, cat, fetchAnimals } = useFetchAnimals()
 return (
  <main style={styles.container}>
   <div style={styles.imgsContainer}>
    <div style={styles.imgContainer}>
     {cat ? <img src={cat} style={styles.img} /> : null}
    </div>
    <div style={styles.imgContainer}>
     {' '}
     {dog ? <img src={dog} style={styles.img} /> : null}
    </div>
   </div>
   <button onClick={fetchAnimals} style={styles.button}>
    Fetch Animals
   </button>
  </main>
 )
}

export default AnimalExample

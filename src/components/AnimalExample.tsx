import { fetchCat, fetchDog } from '@/api/animalApi'
import React, { useState, useEffect } from 'react'

const useFetchDog = () => {
 const [dog, setDog] = useState<string>()
 const [isLoadingDog, setIsLoading] = useState<Boolean>(false)
 const [isErrorDog, setIsError] = useState<Boolean>(false)
 const initFetchDog = async () => {
  try {
   setIsLoading(true)
   const response = await fetchDog()
   isErrorDog && setIsError(false)
   setDog(response.data.message)
   setIsLoading(false)
  } catch (err) {
   setIsError(true)
   console.log('Error while loading dog', err)
  }
 }

 return {
  dog,
  isErrorDog,
  isLoadingDog,
  initFetchDog,
 }
}

const useFetchCat = () => {
 const [cat, setCat] = useState<string>()
 const [isLoadingCat, setIsLoading] = useState<Boolean>(false)
 const [isErrorCat, setIsError] = useState<Boolean>(false)
 const initFetchCat = async () => {
  try {
   setIsLoading(true)
   const response = await fetchCat()
   isErrorCat && setIsError(false)
   setCat((response.data && response.data[0].url) || '')
   setIsLoading(false)
  } catch (err) {
   console.log('Error while loading cat', err)
   setIsError(true)
  }
 }
 return { cat, isErrorCat, isLoadingCat, initFetchCat }
}

const useFetchAnimals = () => {
 const { dog, isErrorDog, isLoadingDog, initFetchDog } = useFetchDog()
 const { cat, isErrorCat, isLoadingCat, initFetchCat } = useFetchCat()

 const fetchAnimals = () => {
  initFetchDog()
  initFetchCat()
 }
 useEffect(() => {
  fetchAnimals()
 }, [])

 return {
  dog,
  isErrorDog,
  isLoadingDog,
  cat,
  isErrorCat,
  isLoadingCat,
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
 const {
  dog,
  isErrorDog,
  isLoadingDog,
  cat,
  isErrorCat,
  isLoadingCat,
  fetchAnimals,
 } = useFetchAnimals()
 return (
  <main style={styles.container}>
   <div style={styles.imgsContainer}>
    <div style={styles.imgContainer}>
     {isErrorDog ? (
      <p>Problem Doggo Appeared!</p>
     ) : isLoadingDog ? (
      <p>Loading Dog</p>
     ) : dog ? (
      <img src={dog} style={styles.img} />
     ) : null}
    </div>
    <div style={styles.imgContainer}>
     {isErrorCat ? (
      <p>Problem Cate Appeared!</p>
     ) : isLoadingCat ? (
      <p>Loading Cat</p>
     ) : cat ? (
      <img src={cat} style={styles.img} />
     ) : null}
    </div>
   </div>
   <button onClick={fetchAnimals} style={styles.button}>
    Fetch Animals
   </button>
  </main>
 )
}

export default AnimalExample

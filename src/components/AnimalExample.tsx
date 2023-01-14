import { fetchCat, fetchDog } from '@/api/animalApi'
import { IDLE, SUCCESS, PENDING, ERROR } from '@/api/constants/apiStatus'
import { WithAsync } from '@/helpers/withAsync'
import React, { useState, useEffect } from 'react'

const useFetchDog = () => {
 const [dog, setDog] = useState<string>()
 const [fetchDogStatus, setFetchDogStatus] = useState(IDLE)
 const initFetchDog = async () => {
  setFetchDogStatus(PENDING)
  const { error, response } = await WithAsync(() => fetchDog())
  if (error) {
   console.log('Error while loading dog', error)
   setFetchDogStatus(ERROR)
  } else if (response) {
   setDog(response.data.message)
   setFetchDogStatus(SUCCESS)
  }
 }

 return {
  dog,
  fetchDogStatus,
  initFetchDog,
 }
}

const useFetchCat = () => {
 const [cat, setCat] = useState<string>()
 const [fetchCatStatus, setFetchCatStatus] = useState(IDLE)
 const initFetchCat = async () => {
  try {
   setFetchCatStatus(PENDING)
   const response = await fetchCat()
   setCat((response.data && response.data[0].url) || '')
   setFetchCatStatus(SUCCESS)
  } catch (err) {
   console.log('Error while loading cat', err)
   setFetchCatStatus(ERROR)
  }
 }
 return { cat, fetchCatStatus, initFetchCat }
}

const useFetchAnimals = () => {
 const { dog, fetchDogStatus, initFetchDog } = useFetchDog()
 const { cat, fetchCatStatus, initFetchCat } = useFetchCat()

 const fetchAnimals = () => {
  initFetchDog()
  initFetchCat()
 }
 useEffect(() => {
  fetchAnimals()
 }, [])

 return {
  dog,
  fetchDogStatus,
  cat,
  fetchCatStatus,
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

const AnimalExampleWithApiStates = () => {
 const { dog, fetchDogStatus, cat, fetchCatStatus, fetchAnimals } =
  useFetchAnimals()
 return (
  <main style={styles.container}>
   <div style={styles.imgsContainer}>
    <div style={styles.imgContainer}>
     {fetchDogStatus === IDLE ? (
      <p>Welcome!</p>
     ) : fetchDogStatus === ERROR ? (
      <p>Problem Doggo Appeared!</p>
     ) : fetchDogStatus === PENDING ? (
      <p>Loading Dog</p>
     ) : fetchDogStatus === SUCCESS ? (
      <img src={dog} style={styles.img} />
     ) : null}
    </div>
    <div style={styles.imgContainer}>
     {fetchCatStatus === IDLE ? (
      <p>Welcome!</p>
     ) : fetchCatStatus === ERROR ? (
      <p>Problem Cate Appeared!</p>
     ) : fetchCatStatus === PENDING ? (
      <p>Loading Cat</p>
     ) : fetchCatStatus === SUCCESS ? (
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

export default AnimalExampleWithApiStates

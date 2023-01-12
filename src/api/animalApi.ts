import api from './'

const URLs = {
 fetchDogUrl: 'breeds/image/random',
 fetchCatUrl: 'images/search?format=json',
}

export type DogData = {
 message: string
 status: 'success' | 'error'
}

export const fetchDog = () => {
 return api.get<DogData>(URLs.fetchDogUrl, { baseURL: 'https://dog.ceo/api' })
}

export type CatData = [
 {
  height: number
  id: string
  url: string
  width: number
 }
]

export const fetchCat = () => {
 return api.get<CatData>(URLs.fetchCatUrl, {
  baseURL: 'https://api.thecatapi.com/v1',
 })
}

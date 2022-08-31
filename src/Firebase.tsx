import { initializeApp } from 'firebase/app'
import {getAuth,GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'

type firebaseConfigType = {
  apiKey: string,
  authDomain: string,
  projectId: string,
  storageBucket: string,
  messagingSenderId:string,
  appId: string
}
const firebaseConfig : firebaseConfigType = {
  apiKey: process.env.REACT_APP_API_KEY as string,
  authDomain:process.env.REACT_APP_AUTH_DOMAIN as string,
  projectId: process.env.REACT_APP_PROJECT_ID as string,
  storageBucket:process.env.REACT_APP_STORAGE_BUCKET as string,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID as string,
  appId: process.env.REACT_APP_APP_ID as string
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db:any =  getDatabase(app)
export const storage = getStorage(app)
const provider = new GoogleAuthProvider()

export const signInwithGoogle = () => signInWithPopup(auth, provider)


export const Logout = () => signOut(auth)
    

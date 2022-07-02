import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCEynjdaaAm5iTvrxFI1ZUDP4UkuoVIKOc",
    authDomain: "reiki-f973a.firebaseapp.com",
    projectId: "reiki-f973a",
    storageBucket: "reiki-f973a.appspot.com",
    messagingSenderId: "373745038942",
    appId: "1:373745038942:web:d85aa2329620ae6045e6cf",
    measurementId: "G-0TMEFJPVM1"
}

firebase.initializeApp(firebaseConfig)
export const firestore = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()

export default firebase
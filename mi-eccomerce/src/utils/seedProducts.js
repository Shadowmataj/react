import { addDoc, collection, where } from "firebase/firestore"
import { db } from "../config/FireBaseConfig"

const productsList = [
    { iframe: "https://www.youtube.com/embed/DTfAffmQQJM?si=BBS7hgFT651vc4Bp" },
    { iframe: "https://www.youtube.com/embed/p34rU08bBoA?si=KBdPlUmTwbDAm4QS" },
    { iframe: "https://www.youtube.com/embed/3VDwftqlhv0?si=cfQOwYtF8b7qt6k_" },
    { iframe: "https://www.youtube.com/embed/1JVID0JDSpA?si=Nzxwyhv57inMkKNO" },
]


export const seedProducts = () => {
    productsList.forEach(product => {
        console.log(product)
        addDoc(collection(db, "iframes"), product)
    })
}

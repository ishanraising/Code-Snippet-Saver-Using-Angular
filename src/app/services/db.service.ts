import { Injectable } from '@angular/core';
import { doc, getFirestore } from "firebase/firestore";
import { collection, addDoc , getDocs,getDoc } from "firebase/firestore"; 
import { AuthService } from './auth.service';
import { Sinppet } from '../../models/Snippet';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private db?:any
  constructor(private authService : AuthService , private router : Router) { 
    this.db=getFirestore()
  }
  async create  (snippet : Sinppet){
    try {
      const docRef = await addDoc(collection(this.db, "snippet"),{
        ...snippet,
        By : this.authService.getUid()
      });
      console.log("Document written with ID: ", docRef.id);
      this.router.navigate(["/"])
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Error")
    }
    
  }

  async getAllSnipet(){
    let result:any[]=[];
    const querySnapshot = await getDocs(collection(this.db, "snippet"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        result.push({id:doc.id,...doc.data()})
      });
      return result
  }

  async getSnippetById(docId: string) {
    const docRef = doc(this.db, "snippet",docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data()
    } else {
      // docSnap.data() will be undefined in this case
      return {
        id:"1",
        title:"non found",
        code:"not found"
      }
    }
  }
}

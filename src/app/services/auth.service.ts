import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword, signOut,onAuthStateChanged } from "firebase/auth";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private uid?:string
  constructor(private router : Router) {

    const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    this.uid=user.uid
    console.log("User loged in",user.email)
  } else {
    this.uid=undefined
    console.log("User Loged Out")
  }
});
  
    
 }

 isAuthenticated(){
  return this.uid?true:false
 }
 getUid(){
  return this.uid
 }

  register(email : string , password : string){
   

const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log({user})
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    alert("Something went wrong try Again")
    // ..
  });
  }

  loginUser(email : string , password : string){
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      this.router.navigate(["/"])
      // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    alert("Something went wrong try Again")
  });
  }

  logout(){
    const auth = getAuth();
signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
  }
}

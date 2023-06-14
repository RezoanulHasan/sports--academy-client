import React, { createContext, useEffect, useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../../Firebase/Firebase.init';
import axios from "axios";
export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser ] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    
    const signInWithGoogle = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleAuthProvider);
    }

    const signInWithGithub = () =>{
        setLoading(true);
        return signInWithPopup(auth,  githubProvider);
    }


    
    const logOut = () =>{
        return signOut(auth);
    }

 



    // observer user auth state 
useEffect( ()=>{
 const unsubscribe = onAuthStateChanged(auth, currentUser => {
 setUser(currentUser);
 console.log('current user', currentUser);
                        // get and set token
 if(currentUser){
    axios.post('https://sports-academy-two.vercel.app/jwt', {email: currentUser.email})
    .then(data =>{
        // console.log(data.data.token)
        localStorage.setItem('access-token', data.data.token)
        setLoading(false);
    })
}
else{
    localStorage.removeItem('access-token')
}                         
        });

        // stop observing while unmounting 
        return () =>{
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        signInWithGoogle,
        signInWithGithub,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
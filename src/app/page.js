'use client'
import { useEffect } from "react";

export default function Home() {
  
  const checkUser = async () => {
    try{
      const res = await fetch('/api/currentUser');
      const data = await res.json();
      if(data.user){
        localStorage.setItem('user', JSON.stringify(data.user));
      }
    }catch(error){
      console.error(error);
    }
  }

  useEffect(() => {
    checkUser();
  }, []);
  return (
    <div>
      Home
    </div>
  );
}

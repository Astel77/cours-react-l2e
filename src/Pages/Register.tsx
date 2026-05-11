import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../utils/auth";

export default function Register(){
  const [form,setForm]=useState({nom:"",prenom:"",email:"",password:""});
  const nav = useNavigate();

  const handle = ()=>{
    setUser(form);
    nav("/");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <div className="bg-gray-800 p-6 rounded">
        <input placeholder="Nom" className="block mb-2 p-2 text-black" onChange={e=>setForm({...form,nom:e.target.value})}/>
        <input placeholder="Prenom" className="block mb-2 p-2 text-black" onChange={e=>setForm({...form,prenom:e.target.value})}/>
        <input placeholder="Email" className="block mb-2 p-2 text-black" onChange={e=>setForm({...form,email:e.target.value})}/>
        <input type="password" placeholder="Password" className="block mb-2 p-2 text-black" onChange={e=>setForm({...form,password:e.target.value})}/>

        <button onClick={handle} className="bg-green-600 p-2 w-full">Créer compte</button>
      </div>
    </div>
  );
}
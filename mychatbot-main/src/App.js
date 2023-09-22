// import { json } from "express";

import { useState,useEffect } from "react"



function App() {
  const [value,setValue] = useState('')
  const [message, setMessage] = useState('')
  const [previousChat, setPreviousChat] =  useState([])
  const [currentTitle, setCurrentTitle] = useState(null)

  const createNewchat = () =>{
    setMessage(null)
    setValue("")
    setCurrentTitle(null)

  }
  
    const handleClick = (uniqueTitle) =>{
       setCurrentTitle(uniqueTitle)
       setMessage(null)
       setValue("")
    }

  const getMessage = async () =>{
    const options = {
      method : "POST",
      body : JSON.stringify({
        message : value
      }),
      headers : {
        "Content-Type" : "application/json"
      }
    }
    try{
        const response = await fetch('http://localhost:8000/completions',options)
        const data = await response.json()
       // console.log(data)
        setMessage(data.choices[0].message)  // revisit
    }catch(error){
      console.error(error)
    }

  }
   useEffect (() =>{

    if(!currentTitle && value && message){
      setCurrentTitle(value)
    }
    if(currentTitle && value && message){
      setPreviousChat(previousChat =>(
        [... previousChat,
         {
          title : currentTitle,
          role : "user",
          content : value
              
            
         },
         {
          title : currentTitle,
          role : message.role,
          content : message.content

         }
      ]
      ))
    }
   },[message,currentTitle])
 //console.log(previousChat)

 const currentChat = previousChat.filter(prvchat=> prvchat.title === currentTitle)
 const uniqueTitles = Array.from( new Set(previousChat.map(prvchat => prvchat.title)))
 console.log(uniqueTitles)

  return (
    <div className="app">
    <section className="side-bar">
      <button onClick={createNewchat}> + New Chat</button>
      <ul className="history">
        {uniqueTitles?.map((uniqueTitle,index)=> <li key={index} onclick = {() =>handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
          
      </ul>
      <nav className="bottombar">
        <p> made by AkhilReddy</p>
      </nav>
    </section>
    <section className="main">
        <h1>CHATGPT</h1>
        <ul className="feed">
          {currentChat?.map((chatMessage,index) =><li key = {index}>
            <p className="role">{chatMessage.role}</p>
            <p>{chatMessage.content}</p>
          </li>)}
         </ul>
          <div className="bottom-section">
            <div className="input-container">
                <input value = {value} onChange = { (e) =>setValue(e.target.value)}/>
                <div id="submit" onClick={getMessage}>ask</div>
            </div>
            <p className="info">
            Free Research Preview. ChatGPT may produce inaccurate information about people, places, or facts. ChatGPT May 24 Version
            </p>
          </div>

    </section>
    </div>
  );
}

export default App;

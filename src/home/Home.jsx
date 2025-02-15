import React, { useState } from 'react'
import axios from 'axios';


const Home = () => {
    const [data, setData] = useState("")
    const [sendingData, setSendingData] = useState("")

    const callChatApi = async (data) => {
        if(data.contents.length>=1 && data.contents[0].parts[0].text.length>5 ){
            await axios.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyArgcTXwAMyTu07JetCZGBNnQBmgMBcCEs", data)
                .then((response) => {
                    console.log(response.data.candidates[0].content.parts[0].text)
                    const  resData =  response.data.candidates[0].content.parts[0].text
                    setData(resData)
                    
                    setSendingData("")
                }).catch((error) => {
                    console.log("Error fetching Data : ", error)
                })         
        }
        else{
            setData("Type something as you want to ask me. ")
        }
    }

    const handleSendData = (e) =>{
        console.log(e.target.value)
        setSendingData(e.target.value)
    }

    const sendData = {
        contents: [{
          "parts":[{text: sendingData}]
          }]
      }

  return (
    <div className=' bg-gray-300  py-10 flex flex-col justify-center items-center h-[630px] rounded-lg   ' >
        <h1 className='  mb-8 text-5xl text-gray-500 font-bold ' >Welcome to AI Generated Chat !</h1>
        <div className=" text-lg px-14 flex justify-center items-center  h-[450px] overflow-y-auto overflow-hidden  ">
            {
                data.length>5 ? <p className='pt-80 ' >{data}</p>
                : <h2 className='text-transparent text-2xl bg-clip-text bg-gradient-to-r from-pink-500 via-red-400 to-red-400 animate-pulse ' > ask me anything I'll try to answer you or will learn first ! </h2>
            }
        </div>
        <div className=" flex  justify-around bg-[#B7B7B7] rounded-lg w-[80%] mt-10 py-2 text-lg  ">
            <input onChange={(e)=>handleSendData(e)} value={sendingData}  type="text" placeholder=' type your Message to AI ' className=' text-lg  w-[80%] outline-0   ' />
            <button onClick={()=>callChatApi(sendData)} className=' py-1 px-4 cursor-pointer bg-[#d2c1c2]  rounded-lg  font-semibold my-1 ' > Send </button>
        </div>
        
    </div>
  )
}

export default Home



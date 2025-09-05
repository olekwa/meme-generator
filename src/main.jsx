import React, { useEffect, useState } from "react";
import Meme from "./assets/Group 1.png"
import html2canvas from "html2canvas";


export default function Form(){
  
  const [meme, setMeme] = React.useState({
    topText: "One does not simply",
    bottomText: "Walk into Mordor",
    randomImage: "http://i.imgflip.com/1bij.jpg"
  })

 function handleChange(event){
    const {value, name} = event.currentTarget
    setMeme(prevMeme => ({
      ...prevMeme,
      [name]: value
    }))
 }

 const [allMemes, setAllMemes] = useState([])
 const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
    .then(res => res.json())
    .then(data => setAllMemes(data.data.memes)) 
  }, [])


  function getMemeImage(){
    setLoading(true);
    setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * allMemes.length)
      const newMemeUrl = allMemes[randomNumber].url
      setMeme(prevMeme => ({
        ...prevMeme,
        randomImage: newMemeUrl
      }))
      setLoading(false);
    }, 800)
      
  }

  function downloadMeme(){
    const memeElememt = document.querySelector(".meme");
    html2canvas(memeElememt, { useCORS: true }).then(canvas => {
      const link = document.createElement("a");
      link.download = "meme.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    })
  }
  
  
  return(
    <main>
      <div className="form">
        <label>Top Text
          <input
            type="text"
            placeholder="One does not simply"
            name="topText"
            onChange={handleChange}
            value={meme.topText}
          />
        </label>

        <label>Bottom Text
            <input
              type="text"
              placeholder="Walk into Mordor"
              name="bottomText"
              onChange={handleChange}
              value={meme.bottomText}
            />
        </label>
          <button 
          onClick={getMemeImage}
          disabled={loading}
          className="meme-btn">{loading ? <div className="spinner"></div> : "Get a new meme image 🖼"}</button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} alt="meme" crossOrigin="anonymous" />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>

      <button className="download-btn" onClick={downloadMeme}>Download Meme</button>
    </main>
    
    
  )
}
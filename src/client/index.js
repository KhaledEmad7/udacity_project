import { checkURL } from './js/checkURL'

import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'
import './styles/resets.scss'

const POST_REQUEST = async ( url = '', data = {})=>{
    //totally copy pasted part from "Udacity | Evaluate A News Article with Natural Language Processing | Walk Through" video
    //This part is responsible for making the post HTTP request
    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),    
  })
    try {
         const returned_Info = await response.json()
         return returned_Info
    }catch(error) {
        console.log("errror");
    }
 }
 
 window.addEventListener('DOMContentLoaded', ()=>{
     const  submission_button = document.getElementById('submit-btn')
     submission_button.addEventListener('click', submitForm)
 })


 function submitForm(e){
     e.preventDefault()
     const url = document.getElementById('article-url').value
     if(checkURL(url)){
         POST_REQUEST('http://localhost:8081/data', {url: url}).then((res) => {
            document.getElementById('text').innerHTML = `Text is: ${res.text}`
            document.getElementById('agreement').innerHTML = `Agreement state: ${res.agreement}`
            document.getElementById('subjectivity').innerHTML = `Subjectivity sate: ${res.subjectivity}`
            document.getElementById('confidence').innerHTML = `Degree of confidence: ${res.confidence}`
            document.getElementById('irony').innerHTML = `Irony state: ${res.irony}`
            document.getElementById('score_tag').innerHTML = `Score Tag: ${res.score_tag}`
            }
         )    
     }
     else{ 
         alert('The entered URL is invalid, PLease enter a correct URL') 
     }
 }
const wform=document.querySelector(".wform");
const cinput=document.querySelector(".cityinput");
const card=document.querySelector(".card");

const apikey="87ab540505b6d135d9fb5f40f08ddc11";

wform.addEventListener("submit",async event=>{
    event.preventDefault();
    const city=cinput.value;
    if(city){
         try{
            const wdata=await getweather(city);
            display(wdata);
         }
         catch(error){
            console.error(error);
            displayerror(error);
         }
    }
    else{
        displayerror("Please Enter a city");
    }
});

async function getweather(city) {
    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response=await fetch(apiurl);
    if(!response.ok){
        throw new Error("Could not find data");
    }
    return await response.json();
}
function display(data){
    const {name:city, main:{temp,humidity},weather:[{description,id}]}=data;
    card.textContent="";
    card.style.display="flex";
    const cdisp=document.createElement("h1");
    const tdisp=document.createElement("p");
    const hdisp=document.createElement("p");
    const descdisp=document.createElement("p");
    const wemoji=document.createElement("p");
cdisp.textContent=city;
tdisp.textContent=`${(temp-273.15).toFixed(2)} C`;
hdisp.textContent=`Humidity:${humidity}%`;
descdisp.textContent=description;
wemoji.textContent=getemoji(id);
hdisp.classList.add("hdisplay");
cdisp.classList.add("citydisplay");
tdisp.classList.add("tempdisplay");
descdisp.classList.add("desc");
wemoji.classList.add("emoji");
card.appendChild(cdisp);
card.appendChild(tdisp);
card.appendChild(hdisp);
card.appendChild(descdisp);
card.appendChild(wemoji);
}
function getemoji(wid){
    switch(true){
        case (wid >=200 && wid < 300):
            return "⛈️";
        case (wid >=300 && wid < 400):
            return "☔";
        case (wid >=500 && wid < 600):
            return "⛈️🌧️";
        case (wid >=600 && wid < 700):
            return "❄️☃️❄️";
        case (wid >=700 && wid < 800):
            return "🌫️";
        case (wid === 800):
            return "☀️🌞☀️";
        case (wid >=801 && wid < 810):
            return "☁️";
        default:
            return "❓🤔❓"
        
    }
}
function displayerror(message){
    const errordisplay=document.createElement("p");
    errordisplay.textContent=message;
    errordisplay.classList.add("errordisplay");
    card.textContent="";
    card.style.display="flex";
    card.appendChild(errordisplay);
}

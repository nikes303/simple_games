const msg = document.querySelector('.msg');
const guess = document.querySelector('input');
const btn = document.querySelector('.btn');
let play = false;
let newWords = "";
let randWords = "";
let sWords=["cat", "baby", "dog", "bird", "car", "cow", "ax", "bull", "html", "c#", "cake", "plate", "incredible", "awesome", "beautiful", "handsome", "pretty", "bark", "fish", "egg", "tom", "jerry", "spiderman", "marvel", "python", "java", "javascript", "c++", "css", "bootstrap", "grid", "money", "honey", "welcome", "android", "angular", "reactjs", "sql", "php", "ruby", "script"]

const createNewWords = () =>{
    let ranNum = Math.floor(Math.random()*sWords.length);
    //console.log(ranNum);
    let newTempSwords = sWords[ranNum];
    // console.log(newTempSwords.split(""));
    return newTempSwords;
}
const scrambleWords = (arr) => {
    for(let i = arr.length-1; i>0; i--){
        let temp = arr[i];
        // console.log(temp);
        let j = Math.floor(Math.random()*(i+1));
        // console.log(i);
        // console.log(j);
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}
btn.addEventListener('click', function(){
    if(!play){
        play=true;
        btn.innerHTML = "Guess";
        guess.classList.toggle('hidden');
        newWords = createNewWords();
        randWords = scrambleWords(newWords.split("")).join("");
        // console.log(randWords.join(""));
        msg.innerHTML = `Guess the Word: ${randWords}`;
    }
    else{
        let tempWord = guess.value;
        if(tempWord == newWords){
            console.log('correct');
            play = false;
            msg.innerHTML = `Great :) It's correct. It is ${newWords}.`;
            btn.innerHTML = "Start Again";
            guess.classList.toggle('hidden');
            guess.value = "";
        }
        else{
            msg.innerHTML = `Sorry :( It's correct. Please try again ${randWords}`;
            console.log('incorrect');
            btn.innerHTML = "Try Again";
        }
    }
})
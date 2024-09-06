let arr=["you",  "latina" ,"for",  "hello", "a","portal","to",   "chb" ,"7abib"  ,"learn", "can", "gregori", "be", "maka","amigo","lama","melo","rck","realmen","absolut","amazing","yes","war","grand","master" ];

console.log(arr);

// setings levels 
const level = {
    "easy": 5,
    "Normal": 3,
    "hard": 2,
}
//default level of playing you can change level
let defaultlevel = "Normal";
let defaultlevelseconds = level[defaultlevel];
console.log()
//selectors catching
let container = document.querySelector(".container");
let stratbutton = document.querySelector(".start");
let lvlNamespan = document.querySelector(".mesege .lvl");
let secondsspan = document.querySelector(".mesege .seconds");
let theword = document.querySelector(".theword");
let upcomingwords = document.querySelector(".upcomingwords");
let input = document.querySelector(".input");
let timeLeftspan = document.querySelector(".time span");
let scoregot = document.querySelector(".score .got");
let scoretotal = document.querySelector(".score .total")
let finish = document.querySelector(".finish");

lvlNamespan.innerHTML = defaultlevel;
secondsspan.innerHTML = defaultlevelseconds;
timeLeftspan.innerHTML = defaultlevelseconds;
scoretotal.innerHTML = arr.length;

// disable paste event the user canot use copy paste 
input.onpaste = function () {
    return false;
};


// starting game 
stratbutton.onclick = function () {
    stratbutton.remove();
    input.focus()
    // word function is strat
    generatewords();
    
}
function generatewords() {
    let randomword = arr[Math.floor(Math.random() * arr.length)];
    // set the upcoming word 
    theword.innerHTML = randomword;
    //get the index of the word 
    let index = arr.indexOf(randomword);
    //remove this word from the array
    arr.splice(index, 1);
    upcomingwords.innerHTML = '';
    // generate upcoming words
    for (i = 0; i < arr.length; i++) {
        let wordwillcome = document.createElement("div");
        wordwillcome.innerHTML = arr[i];
        upcomingwords.appendChild(wordwillcome);
    }
    // start play function or call the function that calculte the time
    startplay();
}




function startplay() {
    timeLeftspan.innerHTML = defaultlevelseconds;
    let start = setInterval(() => {
        timeLeftspan.innerHTML--;
        if (timeLeftspan.innerHTML === "0") {
            //stop the time
            clearInterval(start);
          // compare the word typed by the user with the upcoming word
            if (theword.innerHTML.toLowerCase() === input.value.toLowerCase()) {
                // incemante the score 
                scoregot.innerHTML++;
                // remove the current word (clear the input )
                input.value = "";
                if (arr.length>0) {
                    generatewords();

                } else { //that mean he finish all the word 
                    let span = document.createElement("span");
                span.className = "good";  // this class is alerdy difiend in the css
                let spantext = document.createTextNode("congratulation bro you are legend!");
                span.appendChild(spantext);
                finish.appendChild(span);
                    input.value = "";
                    //from here this code is to the reload button
                    reload();
              
                }
            } else {
                //WHEN YOU LOSE 
                let span = document.createElement("span");
                span.className = "bad";  // this class is alerdy difiend in the css
                let spantext = document.createTextNode("Game over");
                span.appendChild(spantext);
                finish.appendChild(span);
                input.value = "";
                console.log("bad");
                    //from here this code is to the reload button
                             reload();
            }
            
        }
    }, 1000);

  


    
}


    //the relod function
function reload() {
    let buttonrelod = document.createElement("span");
                buttonrelod.className = "newbutton";
                buttonrelod.innerHTML="reload page" ;
                container.appendChild(buttonrelod);
                buttonrelod.onclick=function refreshPage() {
                       window.location.reload();
                    } 
                
}




/// the result of this progect:::

///// be cerfull dont repeat your self use the functions that you create 





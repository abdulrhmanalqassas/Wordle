fetch("https://wordsapiv1.p.rapidapi.com/words/.22-caliber/pertainsTo", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
		"x-rapidapi-key": "4ba95fa239mshb1a87eb13adca9fp1a656bjsn1da88a342d75"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});



class pos {
  constructor(indeinputElem,letter,valu,otherpos=null){
    this.indeinputElem = indeinputElem;
    this.letter = letter;
    this.valu = valu;
    this.otherpos = otherpos;

  }
  
}

function validteWord(word,corectWord,length){
    
    if ((word.length!==corectWord.length)|(corectWord.length)!== length)throw new Error("invalid input");
    let confirm = [];
    for (let i = 0 ; i<word.length ; i++ ){
      let letter= word[i]
      if (corectWord.search(letter)!= -1 ){
        for(let j = 0 ; j<word.length ; j++ ) {
           let corectLetter = corectWord[j]
                if (letter===corectLetter) {
                  if(i===j){
                    confirm.push(new pos(i,letter,"green"))
                  }else {
                    confirm.push(new pos(i,letter,"yellow",j))
                  }
                }
              };
            }else  confirm.push(new pos(i,letter,"gray"));
    };
    return confirm

}



function filterOut (array,indeinputElem=null,valu=null,einputElemtraArgaArray=null){
  let out = array
  if (indeinputElem !== null ){
    out = out.filter( input =>{return input.indeinputElem == indeinputElem }
    )
  }
  if (valu !== null ){
    out = out.filter( input =>{return input.valu == valu }
    )
  }
  if (einputElemtraArgaArray !== null ){
    out = out.filter( input =>{return input[einputElemtraArgaArray[0]] == einputElemtraArgaArray[1] }
    )
  }
  return out;
}

function showResult(array) {
  let result = [];
  let mainputElemIndeinputElem = array[array.length-1].indeinputElem;

  for (i = 0 ; i<= mainputElemIndeinputElem; i++){
    let indeinputElemValus =  filterOut(array,i)
    anotherpos = []
    let prop = indeinputElemValus.length
    if (prop==1) result.push(indeinputElemValus[0].valu);
    else{
     let  isGreen = filterOut(array,i,'green').length
      if(isGreen) result.push(filterOut(array,i,'green')[0].valu);
      else {
        let isYallow = filterOut(array,i,'yallow')
        
        for (let elem of isYallow){
         anotherpos.push( elem.otherpos )
        }

        //  result.push(["yallow",anotherpos])}
        result.push("yellow")
      }
    }
  
    }
  return result
}


function getInput(id){
   let fild = document.getElementById(id)
   fild = fild.querySelectorAll("input")

  let inputArr = []
  for (let elem of fild ){
      inputArr.push(elem.value)
  }
  return inputArr.join("")
  } ;

  function changeColor(colorArr,id) {
    let inputElem = document.getElementById(id)
    inputElem = inputElem.querySelectorAll("input")
    let i = 0;
  for (let elem of inputElem ){
    elem.style.backgroundColor = colorArr[i];
    elem.disabled = true;
    i++;
  }
    
  }
  

  // function rowCreator(parint,shildTag,shildclass = null){
  //    let chiled = document.createElement(shildTag);
  //    if (shildclass != null){chiled.setAttribute("class",`${shildclass}`)};
  //     parint.appendChild(chiled)
  // }

  function setWord(word,id) {
    let inputElem = document.getElementById(id)
    inputElem = inputElem.querySelectorAll("input")
    let i = 0;
  for (let elem of inputElem ){
    elem.value = word[i]
     i++;
  }
    
  }
  

function restState(corectWord){
  localWord = localStorage.getItem("localWord")
  if (localWord != corectWord){
    localStorage.clear()
    localStorage.setItem("id",1)
    localStorage.setItem("localWord",corectWord)
  }

}

function restorState(id,corectWord){
  if (id > 1){
    for(let i=1 ; i<=id ; i++){
        let word = localStorage.getItem(i);
        setWord(word,i)
        let validation = validteWord(word,corectWord,5) ;
        changeColor(showResult(validation),i);
    }
}
}
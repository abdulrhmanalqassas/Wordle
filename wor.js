// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com',
// 		'X-RapidAPI-Key': '4ba95fa239mshb1a87eb13adca9fp1a656bjsn1da88a342d75'
// 	}
// };

// fetch('https://www.dictionaryapi.com/api/v3/references/collegiate/json/voluminous?key=your-api-key')
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

class pos {
  constructor(indeinputElem, letter, valu, otherpos = null) {
    this.indeinputElem = indeinputElem;
    this.letter = letter;
    this.valu = valu;
    this.otherpos = otherpos;
  }
}

function validteWord(word, corectWord, length) {
  if ((word.length !== corectWord.length) | (corectWord.length !== length))
    throw new Error("invalid input");

  let confirm = [];
  for (let i = 0; i < word.length; i++) {
    let letter = word[i];
    if (corectWord.search(letter) != -1) {
      for (let j = 0; j < word.length; j++) {
        let corectLetter = corectWord[j];
        if (letter === corectLetter) {
          if (i === j) {
            confirm.push(new pos(i, letter, "#538d4e"));
          } else {
            confirm.push(new pos(i, letter, "#b59f3b", j));
          }
        }
      }
    } else confirm.push(new pos(i, letter, "#f5793a"));
  }
  return confirm;
}

function filterOut(
  array,
  indeinputElem = null,
  valu = null,
  einputElemtraArgaArray = null
) {
  let out = array;
  if (indeinputElem !== null) {
    out = out.filter((input) => {
      return input.indeinputElem == indeinputElem;
    });
  }
  if (valu !== null) {
    out = out.filter((input) => {
      return input.valu == valu;
    });
  }
  if (einputElemtraArgaArray !== null) {
    out = out.filter((input) => {
      return input[einputElemtraArgaArray[0]] == einputElemtraArgaArray[1];
    });
  }
  return out;
}

function showResult(array) {
  let result = [];
  let mainputElemIndeinputElem = array[array.length - 1].indeinputElem;

  for (i = 0; i <= mainputElemIndeinputElem; i++) {
    let indeinputElemValus = filterOut(array, i);
    anotherpos = [];
    let prop = indeinputElemValus.length;
    if (prop == 1) result.push(indeinputElemValus[0].valu);
    else {
      let isGreen = filterOut(array, i, "#538d4e").length;
      if (isGreen) result.push(filterOut(array, i, "#538d4e")[0].valu);
      else {
        let isYallow = filterOut(array, i, "#b59f3b");

        for (let elem of isYallow) {
          anotherpos.push(elem.otherpos);
        }

        //  result.push(["yallow",anotherpos])}
        result.push("#b59f3b");
      }
    }
  }
  return result;
}

function getInput(id) {
  let fild = document.getElementById(id);

  fild = fild.querySelectorAll("input");

  let inputArr = [];
  for (let elem of fild) {
    inputArr.push(elem.value);
  }
  return inputArr.join("");
}

function outPut(colorArr, id) {
  let inputElem = document.getElementById(id);
  inputElem = inputElem.querySelectorAll("input");
  let i = 0;
  let out = true;
  for (let elem of inputElem) {
    let color = colorArr[i];
    if ((out === true) & (color !== "#538d4e")) out = false;
    elem.style.backgroundColor = color;
    elem.style.color = "white";
    i++;
  }
  return out;
}

// function rowCreator(parint,shildTag,shildclass = null){
//    let chiled = document.createElement(shildTag);
//    if (shildclass != null){chiled.setAttribute("class",`${shildclass}`)};
//     parint.appendChild(chiled)
// }

function setWord(word, id) {
  let inputElem = document.getElementById(id);
  inputElem = inputElem.querySelectorAll("input");
  let i = 0;
  for (let elem of inputElem) {
    elem.value = word[i];
    elem.disabled = true;
    i++;
  }
}

function restState(corectWord) {
  localWord = localStorage.getItem("localWord");
  if (localWord != corectWord) {
    localStorage.clear();
    localStorage.setItem("curint", 1);
    localStorage.setItem("id", 1);
    localStorage.setItem("localWord", corectWord);
    localStorage.setItem("gameState", true);
  }
}

function restorState(id, corectWord) {
  if (id > 1) {
    for (let i = 1; i <= id; i++) {
      let word = localStorage.getItem(i);
      setWord(word, i);
      let validation = validteWord(word, corectWord, 5);
      outPut(showResult(validation), i);
    }
  }
}

function disabled() {
  let allInput = document.querySelectorAll("input");
  for (let elem of allInput) {
    elem.disabled = true;
  }
}

function unabled() {
  let curint = localStorage.getItem("curint");
  let curintPos = document.getElementById(curint);
  let inGroup = curintPos.querySelectorAll("input");
  for (let elem of inGroup) {
    elem.disabled = false;
  }
}
function start() {
  if (localStorage.getItem("id")) {
    id = localStorage.getItem("id");
    let c = id;
    if (id > 1) {
      c++;
    }

    localStorage.setItem("curint", c);
  } else {
    localStorage.setItem("curint", 1);
    localStorage.setItem("id", 1);
    id = localStorage.getItem("id");
  }
  if (localStorage.getItem("gameState") === "false") {
    disabled();
  } else {
    disabled();
    unabled();
  }
}

function stopGame(input) {
  disabled();
  console.log("stop????????????????");
  input.disabled = true;
  localStorage.setItem("gameState", false);
}

let categorys = {
  plant: ["apple", "chard", "choko", "lemon", "mango"],
  cars: ["VOLVO", "HONDA"],
  food: ["bagel", "bread", "bacon"],
};

class category {
  constructor(categorys) {
    this.categorys = categorys;
  }
  get all() {
    return Object.keys(this.categorys);
  }

  word(choise) {
    let items = this.categorys[choise];
    return items[Math.floor(Math.random() * items.length)].toLowerCase();
  }
}
let myCategorys = new category(categorys);

function inputValidation(id, button) {
  let word = getInput(id).toLowerCase();

  let validation = validteWord(word, corectWord, 5);
  if (outPut(showResult(validation), id) === true) {
    stopGame(button);
  }
  localStorage.setItem(id, word);
  localStorage.setItem("id", id++);

  if (localStorage.getItem("gameState") !== "false") {
    localStorage.setItem("curint", id);
    disabled();
    unabled();
  }
}


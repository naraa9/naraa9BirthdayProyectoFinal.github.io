const birthdate =["01/05/1992", "15/03/1987", "20/06/2001", "25/09/1994", "10/11/1980",
"08/02/1998", "30/04/1985", "12/07/2003", "22/10/1990", "01/12/1978",
"15/06/1995", "04/08/1982", "27/11/1999", "19/02/1988", "01/04/1976",
"08/09/1993", "02/11/1984", "24/03/2002", "11/05/1997", "30/08/1981",
"13/12/1991", "01/02/1979", "18/05/1996", "09/07/1983", "05/10/2000",
"28/12/1989", "07/04/1994", "26/07/1980", "15/10/1998", "03/01/1987",
"16/03/2001", "21/06/1994", "26/09/1980", "11/12/1997", "09/02/1986",
"01/04/1993", "13/07/1987", "23/10/2002", "02/12/1990", "16/05/1978",
"05/08/1995", "28/11/1981", "20/02/1999", "02/04/1988", "20/07/1976",
"06/10/1993", "29/12/1989", "08/04/1994", "27/07/1980", "16/10/1998",
"04/01/1987", "17/03/2001", "23/06/1994", "28/09/1980", "13/11/1997",
"12/02/1986", "04/02/1993", "14/07/1987", "24/10/2002", "03/12/1990",
"17/05/1978", "06/08/1995", "29/11/1981", "21/02/1999", "04/03/1988",
"22/07/1976", "09/10/1993", "31/12/1989", "09/04/1994", "30/07/1980",
"19/10/1998", "07/01/1987", "20/03/2001", "25/06/1994", "30/09/1980",
"13/11/1997", "12/02/1986", "04/03/1993", "16/07/1987", "26/10/2002",
"05/12/1990", "18/05/1978", "07/08/1995", "30/11/1981", "22/02/1999",
"04/06/1988", "23/07/1976", "09/10/1993", "01/12/1989", "10/04/1994",
"30/07/1980", "19/10/1998", "07/01/1987", "20/03/2001", "25/06/1994",
"30/09/1980", "13/11/1997", "12/02/1986", "04/03/1993", "16/07/1987",
"26/10/2002", "05/12/1990", "18/05/1978", "07/08/1995", "30/11/1981",
"22/02/1999", "04/06/1988", "23/07/1976", "09/10/1993", "01/12/1989",
"10/04/1994", "30/07/1980", "19/10/1998", "07/01/1987", "20/03/2001",
"25/06/1994", "30/09/1980", "13/11/1997", "12/02/1986", "04/03/1993",
"16/07/1987", "26/10/2002", "05/12/1990", "18/05/1978", "07/08/1995",
"30/11/1981", "22/02/1999", "04/06/1988", "23/07/1976", "09/10/1993",
"01/12/1989", "10/04/1994", "30/07/1980", "19/10/1998", "07/01/1987",
"20/03/2001", "25/06/1994", "30/09/1980", "13/11/1997", "12/02/1986",
"04/03/1993", "16/07/1987", "26/10/2002", "05/12/1990", "18/05/1978",
"07/08/1995", "30/11/1981", "22/02/1999", "04/06/1988", "23/07/1976",
"09/10/1993", "01/12/1989", "10/04/1994", "30/07/1980", "19/10/1998",
"07/01/1987", "20/03/2001", "25/06/1994", "30/09/1980", "13/11/1997",
"12/02/1986", "04/03/1993", "16/07/1987", "26/10/2002", "05/12/1990",
"18/05/1978", "07/08/1995", "30/11/1981", "22/02/1999", "04/06/1988",
"23/07/1976", "09/10/1993", "01/12/1989", "10/04/1994", "30/07/1980",
"19/10/1998", "07/01/1987", "20/03/2001", "25/06/1994", "30/09/1980"];


const state = {
  secret: birthdate[Math.floor(Math.random() * birthdate.length)],
  grid: Array(6)
    .fill()
    .map(() => Array(10).fill('')),
  currentRow: 0,
  currentCol: 0,
};
console.log(state.secret);

function drawGrid(container) {
  const grid = document.createElement('div');
  grid.className = 'grid';

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 10; j++) {
      drawBox(grid, i, j);
    }
  }

  container.appendChild(grid);
}

function updateGrid() {
  for (let i = 0; i < state.grid.length; i++) {
    for (let j = 0; j < state.grid[i].length; j++) {
      const box = document.getElementById(`box${i}${j}`);
      box.textContent = state.grid[i][j];
    }
  }
}

function drawBox(container, row, col, number = '') {
  const box = document.createElement('div');
  box.className = 'box';
  box.textContent = number;
  box.id = `box${row}${col}`;

  container.appendChild(box);
  return box;
}

function registerKeyboardEvents() {
  document.body.onkeydown = (e) => {
    const key = e.key;
    if (key === 'Enter') {
      if (state.currentCol === 10) {
        const word = getCurrentWord();
          revealWord(word);
          state.currentRow++;
          state.currentCol = 0;

      }
    }
    if (key === 'Backspace') {
      removeLetter();
    }
    if (isLetter(key)) {
      addLetter(key);
    }

    updateGrid();
  };
}

function getCurrentWord() {
  return state.grid[state.currentRow].reduce((prev, curr) => prev + curr);
}


function getNumOfOccurrencesInWord(word, number) {
  let result = 0;
  for (let i = 0; i < word.length; i++) {
    if (word[i] === number) {
      result++;
    }
  }
  return result;
}

function getPositionOfOccurrence(word, number, position) {
  let result = 0;
  for (let i = 0; i <= position; i++) {
    if (word[i] === number) {
      result++;
    }
  }
  return result;
}

function revealWord(guess) {
  const row = state.currentRow;
  const animation_duration = 500; 

  for (let i = 0; i < 10; i++) {
    const box = document.getElementById(`box${row}${i}`);
    const number = box.textContent;
    const numOfOccurrencesSecret = getNumOfOccurrencesInWord(
      state.secret,
      number
    );
    const numOfOccurrencesGuess = getNumOfOccurrencesInWord(guess, number);
    const letterPosition = getPositionOfOccurrence(guess, number, i);

    setTimeout(() => {
      if (
        numOfOccurrencesGuess > numOfOccurrencesSecret &&
        letterPosition > numOfOccurrencesSecret
      ) {
        box.classList.add('empty');
      } else {
        if (number === state.secret[i]) {
          box.classList.add('right');
        } else if (state.secret.includes(number)) {
          box.classList.add('wrong');
        } else {
          box.classList.add('empty');
        }
      }
    }, ((i + 1) * animation_duration) / 2);

    box.classList.add('animated');
    box.style.animationDelay = `${(i * animation_duration) / 2}ms`;
  }

  const isWinner = state.secret === guess;
  const isGameOver = state.currentRow === 5;

  setTimeout(() => {
    if (isWinner) {
      terminar('Felicidades ganaste!🤩🎊');
    } else if (isGameOver) {
      terminar(`Lo lamento perdiste ☹️🥀, el cumpleaños era: ${state.secret}.`);
    }
  }, 6 * animation_duration);
}

function terminar(mensaje){
  let contenedor= document.getElementById("mensaje");
  contenedor.innerHTML= mensaje;
}
function isLetter(key) {
  return key.length === 1 && key.match(/[0-9-/]/i);
}

function addLetter(number) {
  if (state.currentCol === 10) return;
  state.grid[state.currentRow][state.currentCol] = number;
  state.currentCol++;
}

function removeLetter() {
  if (state.currentCol === 0) return;
  state.grid[state.currentRow][state.currentCol - 1] = '';
  state.currentCol--;
}

function startup() {
  const game = document.getElementById('game');
  drawGrid(game);

  registerKeyboardEvents();
}

startup();
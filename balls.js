'use strict';


(() => {
  const balls = {
    countPlayer: 5,
    countBot: 5,
  };
  let flag = true;

  // Создаем функцию: Если число отрицательное, то выводим 0
  const getBallsCount = () => {
    if (balls.countPlayer < 0) {
      balls.countPlayer = 0;
    }
    if (balls.countBot < 0) {
      balls.countBot = 0;
    }
    alert(`Количество шариков:\n*************************
\nИгрок: ${balls.countPlayer}\nБот: ${balls.countBot}`);
  };

  // Ходит игрок
  const playerGame = () => {
    const tempPlayer = prompt(`Ход игрока\n*******************
  \nВведи число от 1 до ${balls.countPlayer}`);

    if (tempPlayer === null) {
      return flag = false;
    }

    const playerPrompt = +tempPlayer;

    // Делаем проверку правильно ли введено число и целое ли оно!
    if (!Number.isInteger(playerPrompt) ||
    playerPrompt > balls.countPlayer ||
    playerPrompt <= 0) {
      alert('Введи другое число');
      return playerGame();
    }

    // Приводим бота и игрока к булевому типу
    const player = !(playerPrompt % 2);
    const bot = !getRandomInt(0, 1);

    if (bot === player) {
      alert(`Бот угадал и игрок лишается ${playerPrompt} шариков`);
      balls.countPlayer -= playerPrompt;
      balls.countBot += playerPrompt;
    } else {
      alert(`Бот не угадал и игрок получает ${playerPrompt} шариков`);
      balls.countPlayer += playerPrompt;
      balls.countBot -= playerPrompt;
    }
  };

  // Ход бота
  const botGame = () => {
    const botNumber = getRandomInt(1, balls.countBot);
    const player = confirm(`Бот загадал число\n*******************
  \nУгадай, четное число?\n"ОК" - четное, "Отмена" - нечетное`);

    const bot = !(botNumber % 2); // Приводим бота к булевому типу

    if (player === bot) {
      alert(`Игрок угадал и получает ${botNumber} шариков`);
      balls.countPlayer += botNumber;
      balls.countBot -= botNumber;
    } else {
      alert(`Игрок не угадал и лишается ${botNumber} шариков`);
      balls.countPlayer -= botNumber;
      balls.countBot += botNumber;
    }
  };

  // Определяем, кто начинает (камень-ножницы-бумага)
  const gameRSP = () => {
    const FIGURES = ['камень', 'ножницы', 'бумага'];

    // Загадываются слова
    const str = prompt('камень, ножницы, бумага?');
    const computerWord = FIGURES[getRandomInt(0, 2)];


    // Приведение возможно сокращенной формы загаданного слова к полному слову

    // Метод find() возвращает значение первого найденного в массиве элемента
    const playerFullWord = (str, arr) => arr.find(item => item[0] === str[0]);

    // Проверяем введенную пользователем информацию
    if (str === null) {
      alert('Конец игры!');
      return;
    }

    // some() возвращает true, если вызов callback вернёт true
    const incorrect = FIGURES.some(item =>
      (item.includes(str.toLowerCase())));
    if (!incorrect) {
      alert('Вводи правильно!');
      return gameRSP();
    } else {
      const playerWord = playerFullWord(str.toLowerCase(), FIGURES);
      game(playerWord, computerWord);
    }

    // Игра RSP
    function game(playerWord, computerWord) {
      const wordsGame =
    `Компьютер: ${computerWord}\nВы: ${playerWord}`;
      if (playerWord === computerWord) { // Определяем нечью
        alert(`${wordsGame}\nНичья!`);
        return gameRSP();
      } else {
        const current = playerWord + computerWord;
        // eslint-disable-next-line no-constant-condition
        if (current === 'камень', 'ножницы' ||
          current === 'ножницы', 'бумага' ||
          current === 'бумага', 'камень') {
          alert(`${wordsGame}\nВы Выиграли!
          \nВам предоставляется право первого хода`);
          getBallsCount();
          return startGame(1);
        } else {
          alert(`${wordsGame}\nКомпьютер выиграл!\nПервым ходит бот`);
          getBallsCount();
          return startGame(0);
        }
      }
    }
  };

  // Запуск игры Марблы
  function startGame(n) {
    while (balls.countPlayer > 0 &&
      balls.countBot > 0) {
      if (n % 2) {
        playerGame();
      } else {
        botGame();
      }
      getBallsCount();
      if (flag === false) {
        break;
      }
      n++;
    }

    alert('Конец игры');
    const moreGame = confirm('Хотите сыграть еще?');
    if (moreGame) {
      balls.countPlayer = 5;
      balls.countBot = 5;
      flag = true;
      gameRSP(); // Начинаем игру заново
    } else {
      alert('Пока!');
    }
  }

  // Компьютерный рандом
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log('bot:', number);
    return number;
  }
  window.start = gameRSP;
})();



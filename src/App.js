import React from "react";
import "./App.css";
import Die from "./componants/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [rolls, setRolls] = React.useState(0);
  const [bestRoll, setBestRoll] = React.useState(parseInt(localStorage.getItem("bestRoll")) || 0
  );

  React.useEffect(() => {
    const allDiceHeld = dice.every((die) => die.isHeld);
    const topValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === topValue);
    if (allDiceHeld && allSameValue) {
      setTenzies(true);
      console.log("You Won");
    }
  });
  React.useEffect(() => {
    localStorage.setItem("bestRoll", bestRoll.toString());
  }, [bestRoll]);

  function genrateDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }
  function allNewDice() {
    const diceArray = [];
    for (let i = 0; i < 10; i++) {
      diceArray.push(genrateDice());
    }

    return diceArray;
  }
  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id
          ? {
              ...die,
              isHeld: !die.isHeld,
            }
          : die;
      })
    );
  }
  const diceElement = dice.map((num) => (
    <Die
      key={num.id}
      value={num.value}
      isHeld={num.isHeld}
      holdDice={() => holdDice(num.id)}
    />
  ));

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : genrateDice();
        })
      );
      setRolls((oldRolls) => oldRolls + 1);
    } else {
      setTenzies(false);

      if (!bestRoll || rolls < bestRoll) {
        setBestRoll(rolls);
      }

      setDice(allNewDice());
      setRolls(0);
    }
  }


  return (
    <main>
      {tenzies && <Confetti width={900} height={400} />}
      <h1 className="title">Tenzies</h1>
      {tenzies ? (
        <p className="game-win">Congratulation You Won The Game</p>
      ) : (
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      )}
      <div className="dice-container">{diceElement}</div>
      <button className="roll-btn" onClick={rollDice}>
      {tenzies ? "New Game" : "Roll"}
    </button>
      
      <div className="stats">
      <div>Rolls:<br />{rolls}</div>
      {bestRoll ? <div>Best:<br />{bestRoll}</div> : ""}
    </div>
    </main>
  );
}

export default App;

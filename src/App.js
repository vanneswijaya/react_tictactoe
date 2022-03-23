import { useState } from "react";

function Square({ val }) {
  return (
    <div className="w-20 h-20 border-4 cursor-pointer border-black text-7xl font-bold text-center">
      {val}
    </div>
  );
}

function Board() {
  const [board, setBoard] = useState([
    { key: 0, val: null },
    { key: 1, val: null },
    { key: 2, val: null },
    { key: 3, val: null },
    { key: 4, val: null },
    { key: 5, val: null },
    { key: 6, val: null },
    { key: 7, val: null },
    { key: 8, val: null },
  ]);
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleClick = (key) => {
    if (!winner) {
      let temp = [...board];
      temp.forEach((cell) => {
        if (cell.key === key && cell.val == null) {
          temp[key] = { key: key, val: player };
          setBoard(temp);
          win.forEach((line) => {
            if (
              temp[line[0]].val === player &&
              temp[line[1]].val === player &&
              temp[line[2]].val === player
            ) {
              console.log("win");
              setWinner(player);
            }
          });
          player === "X" ? setPlayer("O") : setPlayer("X");
        }
      });
    }
  };

  const restart = () => {
    setBoard(
      board.map((x) => {
        return {
          key: x.key,
          val: null,
        };
      })
    );
    setWinner(null);
  };

  return (
    <div className="flex">
      <div className="grid grid-cols-3 w-60">
        {board.map((cell) => (
          <div
            onClick={() => {
              handleClick(cell.key);
            }}
            key={cell.key}
          >
            <Square val={cell.val}></Square>
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        {!winner && (
          <div className="font-bold text-3xl ml-10">
            Current player: {player}
          </div>
        )}
        {winner && (
          <div className="font-bold text-3xl ml-10">WINNER: {winner}</div>
        )}
        {winner && (
          <button
            onClick={restart}
            className="font-bold text-3xl border-4 border-black mt-10 h-10 w-50 ml-10 bg-amber-200"
          >
            RESTART
          </button>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App p-20">
      <Board></Board>
    </div>
  );
}

export default App;

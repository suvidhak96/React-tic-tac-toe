import "./App.css";
import { useEffect, useState } from "react";
import { connect,Provider } from "react-redux";
// import{createStore} from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import Popup from "./Popup";
 
// REDUX: Initial State
const initial_state = {
  marks: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  player: 1,
  gameOver: false
};

const rootReducer=(state=initial_state,action)=>{
switch(action.type){
  case 'SET_PLAYER':
    return{...state,player:action.payload}
  case 'SET_MARKS':
      return{...state,marks:action.payload}
  case 'SET_GAMEOVER':
      return{...state,gameOver:action.payload}
  default:
        return state
}
}

const store = configureStore({
  reducer: rootReducer,
});

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <BoardContainer></BoardContainer>
      </Provider>
    </div>
  );
}

// BoardContainer Component using Connect and Map functions
const mapStateToProps = (state)=>{
  return {
    marks : state.marks,
    player: state.player,
    gameOver: state.gameOver
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    setMarks : (marks)=>{
      dispatch({type:'SET_MARKS',payload:marks})
    },
    setPlayer : (player)=>{
      dispatch({type:'SET_PLAYER',payload:player})
    },
    setGameOver : (status)=>{
      dispatch({type:'SET_GAMEOVER',payload:status})
    }
  } 
}
const BoardContainer = connect(mapStateToProps,mapDispatchToProps)(Board);


// Board Component
function Board({marks, player,gameOver,setGameOver,setMarks,setPlayer}) {
  const [showPopup, setShowPopup] = useState(false);
  const winningPlayer = player === 1 ? 2 : 1; // Determine the opposite player as the winner
  
  useEffect(() => {
    const combinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let c of combinations) {
      if (marks[c[0]] === 1 && marks[c[1]] === 1 && marks[c[2]] === 1) {
        setTimeout(() => setGameOver(true), 0); // Delay the action using setTimeout
        setShowPopup(true);
      }
      if (marks[c[0]] === 2 && marks[c[1]] === 2 && marks[c[2]] === 2) {
        setTimeout(() => setGameOver(true), 0); // Delay the action using setTimeout
        setShowPopup(true);
      }
    }
  }, [marks, setGameOver]);

  const restartGame = () => {
    setShowPopup(false);
    setGameOver(false);
    setMarks(initial_state.marks);
    setPlayer(1);
  };

  const changeMark = (i) => {
    const m = [...marks];
    if (m[i] === 0 && !gameOver) {
      m[i] = player;
      setMarks(m);
      setPlayer(player === 1 ? 2 : 1);
    } else {
      alert('please click on empty blocks');
    }
  };
  return (
    <>
    <div className="board">
      <div>
        <Block mark={marks[0]} position={0} changeMark={changeMark}></Block>
        <Block mark={marks[1]} position={1} changeMark={changeMark}></Block>
        <Block mark={marks[2]} position={2} changeMark={changeMark}></Block>
      </div>
      <div>
        <Block mark={marks[3]} position={3} changeMark={changeMark}></Block>
        <Block mark={marks[4]} position={4} changeMark={changeMark}></Block>
        <Block mark={marks[5]} position={5} changeMark={changeMark}></Block>
      </div>
      <div>
        <Block mark={marks[6]} position={6} changeMark={changeMark}></Block>
        <Block mark={marks[7]} position={7} changeMark={changeMark}></Block>
        <Block mark={marks[8]} position={8} changeMark={changeMark}></Block>
      </div>
    </div>
    <div style={{ display: "inline"}}>
    {showPopup && <Popup onClose={restartGame} player={winningPlayer} />}
    </div>
  
    </>
  );
}

function Block({mark,changeMark, position}) {
  return <div className={`block mark${mark}`}
  onClick={e=>changeMark(position)}>

  </div>;
}

export default App;

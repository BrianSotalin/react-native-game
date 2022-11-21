import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import {  Pressable, StyleSheet, Text, View } from 'react-native';
import Card from './Card'

const cards = [
  // "🥹",
  // "🗣️",
  // "🦷",
  // "🍑",
  // "🌪️",
  "🌎",
  "🐷",
  //"🪝",
  "⚛️",
  "🔑",
  "🥕",
  "🥑",
  // "👻",
  // "🥶",
  // "🥵",
];
export default function App() {
  const [board,setBoard]=React.useState(()=>shuffle([...cards,...cards]));
  const [selectedCards,setSelectedCards]=React.useState([]);
  const [matchedCards,setMatchedCards]=React.useState([]);
  const [score,setScore]=React.useState(15);

  React.useEffect(()=>{
    if(selectedCards.length <2)return;
    if(board[selectedCards[0]] === board[selectedCards[1]]){
      setMatchedCards([...matchedCards,...selectedCards]);
      setSelectedCards([]);
      setScore(score + 2);
    }else{
      const timeOutId = setTimeout(()=>setSelectedCards([],1000));
      return()=>clearTimeout(timeOutId);
    }
  },[selectedCards]);

  const handleTapCard = index =>{
   if(selectedCards.length>=2 || selectedCards.includes(index)) return;
   setSelectedCards([...selectedCards,index]);
   setScore(score - 1);
   off();
  };
  const win =()=> matchedCards.length===board.length;
  const resetGame =()=>{
    setMatchedCards([]);
    setScore(15);
    setSelectedCards([]);
  };

  const off =()=> {
    if(score==0){
      alert('Game over')
      resetGame();
    }
  }
  const over =()=> score===0;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{win()?"Ganaste papa👻!!!":"Memorama"}</Text>
      <Text style={styles.score}>Movimientos restantes: {score}</Text>
      <Text style={styles.title}>{over()?"Perdiste papa🥶!!!":""}</Text>
      <View style={styles.board}>
      {board.map((card,index)=>{
        const isTurnedOver=
        selectedCards.includes(index) || matchedCards.includes(index);
      return <Card 
      key={index}
      isTurnedOver={isTurnedOver}
      onPress={()=>handleTapCard(index)}
      >
        {card}
        </Card>;
      
      })}
     
      </View>
    
   <Pressable onPress={()=>resetGame()}>
    <Text style={styles.boton}>reset</Text>
   </Pressable>
      <StatusBar style="light" />
    </View>

      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    color:'white',
    fontSize:32,
    fontWeight:'700'
  } ,
  over:{
    color:'#0f172a',
    fontSize:32,
    fontWeight:'700'
  },
    board: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    
  },
  score:{
    color:'gold',
    fontSize:20,
    fontWeight:'500'
  },
  boton:{
    color:'crimson',
    backgroundColor:'#0f172a'
  }
});
/**
 * Returns the array shuffled into a random order.
 * Do not edit this function.
 */
 function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap the elements at i and randomIndex
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}
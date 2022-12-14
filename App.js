import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import {  Pressable, StyleSheet, Text, View } from 'react-native';
import { CheckBox } from '@rneui/themed';
import Card from './Card'

const cards = [
  // "ðĨđ",
  // "ðĢïļ",
  // "ðĶ·",
  // "ð",
  // "ðŠïļ",
  "ð",
  "ð·",
  //"ðŠ",
  "âïļ",
  "ð",
  "ðĨ",
  "ðĨ",
  // "ðŧ",
  // "ðĨķ",
  // "ðĨĩ",
 
];
const emoji =[
  "ð",
  "âðĩââ",
  "ðī",
  "âðĪŠ",
  "âðâ",
  "âð"
];
export default function App() {
 // const [board,setBoard]=React.useState(()=>shuffle([...cards,...cards]));
 const [board,setBoard]=React.useState([]);
  const [selectedCards,setSelectedCards]=React.useState([]);
  const [matchedCards,setMatchedCards]=React.useState([]);
  const [check, setCheck] = React.useState(false);
  const [score,setScore]=React.useState();
  const [baraja,setBaraja]=React.useState(false);


  React.useEffect(()=>{
    if(selectedCards.length <2)return;
    if(board[selectedCards[0]] === board[selectedCards[1]]){
      setMatchedCards([...matchedCards,...selectedCards]);
      setSelectedCards([]);
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
  const win =()=> matchedCards.length===board.length && matchedCards.length>0;
  //const win =()=>  board.length==0;
 
  const gameAgain=()=>{
    setMatchedCards([]);
    setSelectedCards([]);
    setBoard([]);
    setBaraja(false);
  };
  const novato =()=>{
    setMatchedCards([]);
    setScore(45);
    setSelectedCards([]);
    setBaraja(true);
    if(check){
      setBoard(shuffle([...emoji,...emoji]));
    }else{
      setBoard(shuffle([...cards,...cards]));
    }
  };
  const medium =()=>{
    setMatchedCards([]);
    setScore(35);
    setSelectedCards([]);
    setBaraja(true);
    if(check){
      setBoard(shuffle([...emoji,...emoji]));
    }else{
      setBoard(shuffle([...cards,...cards]));
    }
  };
  const hero =()=>{
    setMatchedCards([]);
    setScore(20);
    setSelectedCards([]);
    setBaraja(true);
    if(check){
      setBoard(shuffle([...emoji,...emoji]));
    }else{
      setBoard(shuffle([...cards,...cards]));
    }
  };
  const off =()=> {
    if(score==0 ){
      //alert('Game over')c
      setBoard([]);
    }
   
  }

  const over =()=> score==0 || score<0;
  const visible =()=>  board.length>0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{win()?"Ganaste papaðŧ!!!":"M E M O R A M A"+''}</Text>
      <Text style={styles.score}  >{over()?'Perdiste ðĨķ!!!âIntentalo otra vezâððŧâððŧâ':""}</Text>

      <View style={styles.option}>
      <Text style={styles.textOption}>Baraja:</Text>
      <CheckBox
      disabled={baraja}
      title={check?'emoji':'alterno'}
      checkedIcon="dot-circle-o"
      uncheckedIcon="circle-o"
      checked={check}
      containerStyle={styles.checkBtn}
      checkedColor='aqua'
      onPress={() => setCheck(!check)}
    />
      </View>
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
    <Text style={styles.score}  >{visible()?'Movimientos restantes: '+score:''}</Text>
    <Pressable onPress={()=>hero()}>
    <Text style={styles.levels}>{visible()?'':'Experto'}</Text>
   </Pressable>
   <Pressable onPress={()=>medium()}>
    <Text style={styles.levels}>{visible()?'':'Intermedio'}</Text>
   </Pressable>
   <Pressable onPress={()=>novato()}>
    <Text style={styles.levels}>{visible()?'':'Principiante'}</Text>
   </Pressable>
   <Pressable onPress={()=>gameAgain()}>
    <Text style={styles.again}>{visible()?'Jugar de nuevo':''}</Text>
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
    fontSize:25,
    fontWeight:'700'
  } ,
  over:{
    color:'aqua',
    fontSize:15,
    fontWeight:'700'
  },
  gallina:{
    color:'purple',
    fontSize:15,
    fontWeight:'700'
  },
    board: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    
  },
  score:{
    color:'gold',
    fontSize:12,
    fontWeight:'500'
  },
  again:{
    color:'crimson',
    backgroundColor:'#0f172a',
  },
  levels:{
    color:'crimson',
    backgroundColor:'#0f172a',
    marginBottom:5
  },
  textOption:{
    color:'aqua',
    backgroundColor:'#0f172a',
    fontSize:15
  },
  option:{
    flexDirection:'row',
    backgroundColor:'#0f172a',
  },
  checkBtn:{
    fontSize:10,
    padding:0,
    margin:0,
    backgroundColor:'#0f172a',
    color:'green'
  },
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
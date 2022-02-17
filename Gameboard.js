import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable } from 'react-native';
import styles from './styles/Styles';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Col } from "react-native-easy-grid";

let board = [];
let board2 = [];
let board3 = [];
let board4 = [];
const NBR_OF_THROWS = 3;
const NBR_OF_DICE = 5;
const NBR_OF_POINTS = 6;
const POINTS_LEFT = 63;

export default function Gameboard() {
  const [ nbrOfThrowsLeft, setNbrOfThrowsLeft ] = useState(NBR_OF_THROWS);
  const [ nbrOfPointsLeft, setNbrOfPointsLeft ] = useState(nbrOfPointsLeft);
  const [ status, setStatus ] = useState('');
  const [ selectedDice, setSelectedDice ] = useState(new Array(NBR_OF_DICE).fill(false));
  const [ selectedPoints, setSelectedPoints ] = useState(new Array(NBR_OF_POINTS).fill(false));
  const [ totalPoints, setTotalPoints ] = useState(0);
  const [ pointsLeft, setPointsLeft ] = useState(POINTS_LEFT);
  const [ message, setMessage ] = useState('');
  
  useEffect(() => {
    if (nbrOfThrowsLeft < 0) {
      setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
    }
  }, {nbrOfThrowsLeft});

  function diceColor(i){ 
    return selectedDice[i] ? "black" : "steelblue";
  }
  
  function pointColor(i) {
    return selectedPoints[i] ? "black" : "steelblue";
  }

  useEffect(() => {
    checkWinner();
    if (nbrOfPointsLeft===0){
        setGameOn(false);
    }
    if (nbrOfThrowsLeft === NBR_OF_THROWS) {
        setStatus('Throw dices');
    }
    if (nbrOfThrowsLeft < 0){
        setNbrOfThrowsLeft(NBR_OF_THROWS-1);
    }
    if (pointsLeft===0 || pointsLeft<0) {
        setMessage(<Text>You got the bonus!</Text>)
    } else {
        setMessage(<Text>You are {pointsLeft} points away from the bonus</Text>)
    }
    if(nbrOfPointsLeft===0){
        setStatus('Game Over');
      }
    }, [nbrOfThrowsLeft]);

  const dice = [];
  for(let i = 0; i < NBR_OF_DICE; i++) {
    dice.push(
      <Pressable
      key={"row" + i}
      onPress={() => selected(i)}>
      <MaterialCommunityIcons
      name={board[i]}
      key={"row" + i}
      size={60}
      color={diceColor(i)}>
      </MaterialCommunityIcons>
      </Pressable>
    )
  }

  const stats = [];
  for (let i = 0; i < (NBR_OF_POINTS); i++) {
    stats.push (
      <Col style={styles.stats} size={5}>
      {board4[i]}
      </Col>
    );
  }

  const points = [];
  for (let i = 0; i < (NBR_OF_POINTS); i++) {
    points.push(
      <Pressable
      key={"points" + i}
      onPress={() => selectPoint(i)}>
      <MaterialCommunityIcons
      name={board2[i]}
      color={pointColor(i)}
      size={50}
      key={"points" + i}>
      </MaterialCommunityIcons>
      </Pressable>
    )
  }

    function selected(i) {
      if (nbrOfThrowsLeft === 3) {
        return
      }
      let dice = [...selectedDice];
      dice[i] = selectedDice[i] ? false : true;
      setSelectedDice(dice);
    } 
 
  function selectPoint(i){
     if(nbrOfPointsLeft===0){
         return
     }
     if(selectedPoints[i]===true){
         setStatus('You already selected points for ' + (i+1));
         return
     } else if (nbrOfThrowsLeft>0){
         setStatus('Throw 3 times before setting points')
         return
 
     }
     let points = [...selectedPoints];
     points[i] = selectedPoints[i]=true;
     setSelectedPoints(points);
     let numbers = i+1;
     let sum = 0;
     for(let x=0 ; x<NBR_OF_DICE; x++){
     
     if(numbers===board3[x]){
         sum+=board3[x];
     }
 
     board4[(i)]=sum;
     const sum1 =  board4.reduce((result,number)=> result+number);
     setTotalPoints(sum1);
     setPointsLeft(POINTS_LEFT-sum1);
     setNbrOfThrowsLeft(3);
     setSelectedDice(new Array(NBR_OF_DICE).fill(false));
     setNbrOfPointsLeft(nbrOfPointsLeft-1);
      }
  }
 
    function throwDice() {
      if(nbrOfPointsLeft===0){
        return
    }
     if(nbrOfThrowsLeft===0){
         setStatus('select points for this turn');
         return
     }
     
      if (board4.lenght===0) {
        board4=[0, 0, 0, 0, 0, 0]
      }
      for (let i = 0; i < NBR_OF_DICE; i++) {
        if(!selectedDice[i]) {
          let randomNumber = Math.floor(Math.random() * 6 + 1);
          board[i] = 'dice-' + randomNumber;
          board3[i] = randomNumber;
        }
      }
      for (let i = 0; i < NBR_OF_POINTS; i++) {
        board2[i] = 'numeric-' + (i+1) + '-circle'
      }

      setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);

    }

    function checkWinner(){
     
      if(nbrOfThrowsLeft === 0){
           setStatus('Select points');
          
        }  else{
            setStatus('keep on throwing');
        }
    }   

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>{dice}</View>
      <View style={styles.header}><Text style={{fontWeight: "bold", color: "white", fontSize: '20px'}}>Mini Yatzy</Text></View>
      <Text style={{fontSize: '20px', paddingBottom: '5px'}}>Throws left: {nbrOfThrowsLeft}</Text>  
      <Text style={{fontSize: '20px', paddingBottom: '20px'}}>{status}</Text>
      <Pressable style={styles.button}
        onPress={() => throwDice()}>
        <Text>Throw Dice</Text>
        </Pressable>
      <Text style={{fontSize: '30px', paddingTop: '20px'}}>Total: {totalPoints} </Text>
      <Text style={{paddingTop: '10px'}}>{message}</Text>
      <View style={{flexDirection: 'row', paddingTop: '20px', marginHorizontal: '10'}}>{stats}</View>
      <View style={{flexDirection: 'row', paddingTop: '20px'}}>{points}</View>
      <View style={styles.footer}><Text style={{fontWeight: "bold", color: "white"}}>Author: Arttu Heikkinen</Text></View>
      <StatusBar style="auto" />
    </View>
  );
}
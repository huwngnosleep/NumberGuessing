import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'

import Header from './components/Header'

export default function App() {
  const [userNumber, setUserNumber] = useState()
  const [guessCount, setGuessCount] = useState(0)

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber)
    setGuessCount(0)
  }

  const gameOverHandler = (numberOfGuesses) => {
    setGuessCount(numberOfGuesses)
  }

  const restartGameHandler = () => {
    setGuessCount(0)
    setUserNumber(null)
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />

  if(userNumber && guessCount <= 0) {
    content = <GameScreen userChoice={userNumber} count={guessCount} onGameOver={gameOverHandler}/>
  } else if(guessCount > 0) {
    content = <GameOverScreen restartGame={restartGameHandler} userChoice={userNumber} count={guessCount}/>
  }

  return (
    <View style={styles.container}>
      <Header title="Guess a number"/>
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

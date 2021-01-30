import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'

import Header from './components/Header'

const fetchFonts = () => {
  return Font.loadAsync({
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })
}

export default function App() {
  const [userNumber, setUserNumber] = useState()
  const [guessCount, setGuessCount] = useState(0)
  const [dataLoaded, setDataLoaded] = useState(false)

  if(!dataLoaded) {
      return (
        <AppLoading 
          startAsync={fetchFonts}
          onFinish={() => setDataLoaded(true)}
          onError={(err) => console.log(err)}
        />
      ) 
  }

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

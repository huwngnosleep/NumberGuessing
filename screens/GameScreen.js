import React, { useState, useRef, useEffect, } from 'react'
import { StyleSheet, View, Text, Button, Alert, } from 'react-native'

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'

const randomNumberGenerator = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const randomNumber = Math.floor(Math.random() * (max - min)) + min
    if( randomNumber === exclude) {
        return randomNumberGenerator(min, max, exclude)
    } else {
        return randomNumber
    }
}


const GameScreen = (props) => {
    const [currentGuest, setCurrentGuest] = useState(randomNumberGenerator(1, 100, props.userChoice))
    const [guessCount, setGuessCount] = useState(0)

    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    const { userChoice, onGameOver } = props
    useEffect(() => {
        if(currentGuest === userChoice) {
            onGameOver(guessCount)
        }
    }, [currentGuest, userChoice, onGameOver])    

    const nextGuessHandler = (direction) => {
        if(
            (direction === 'lower' && currentGuest < props.userChoice)
            ||
            (direction === 'greater' && currentGuest > props.userChoice)
        ) {
            Alert.alert("Don't lie!", 'you know that this is wrong...', [{ text: 'Sorry!', style: 'cancel'}])
            return
        }

        if( direction === 'lower') {
            currentHigh.current = currentGuest
        } else {
            currentLow.current = currentGuest
        }

        const nextGuess = randomNumberGenerator(currentLow.current, currentHigh.current, currentGuest)
        setCurrentGuest(nextGuess)
        setGuessCount(guessCount => guessCount + 1)
    }
    
    return(
        <View style={styles.screen}>
            <Text>Your Guess</Text>
            <NumberContainer>{currentGuest}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="Lower" onPress={nextGuessHandler.bind(this,'lower')}/>
                <Button title="Greater" onPress={nextGuessHandler.bind(this, 'greater')}/>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%',
    },
})

export default GameScreen
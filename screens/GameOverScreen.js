import React from 'react'
import { Button, StyleSheet, Text, View, } from 'react-native'

const GameOverScreen = (props) => {
    return(
        <View style={styles.screen}>
            <Text>Game over!!!</Text>
            <Text>Your number: {props.userChoice}</Text>
            <Text>Number of guesses: {props.count}</Text>
            <Button title="Restart" onPress={props.restartGame} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default GameOverScreen
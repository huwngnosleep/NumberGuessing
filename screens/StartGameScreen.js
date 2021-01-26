import React from 'react'
import { StyleSheet, View, Text, TextInput, Button, } from 'react-native'

import Colors from '../constants/colors'

import Card from '../components/Card'

const StartGameScreen = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Start Game</Text>
            <Card style={styles.inputContainer}>
                <TextInput placeholder="Enter a number"/>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}><Button title="Reset" color={Colors.primary}/></View>
                    <View style={styles.button}><Button title="Confirm" color={Colors.secondary}/></View>
                </View>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,

    },
    title: {
        fontSize: 25,
        paddingVertical: 10,
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 20,
    },
    button: {
        width: 100,
    },
})

export default StartGameScreen
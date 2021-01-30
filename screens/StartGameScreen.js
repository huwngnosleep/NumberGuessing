import React, { useState } from 'react'
import { 
    StyleSheet,
    View, 
    Text, 
    TouchableWithoutFeedback,
    Keyboard, 
    Alert,
} from 'react-native'

import Colors from '../constants/colors'

import Card from '../components/Card'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'
import MainButton from '../components/MainButton'

const StartGameScreen = (props) => {
    const [input, setInput] = useState('')
    const [chosenNumber, setChosenNumber] = useState()
    const [confirmed, setConfirmed] = useState(false)
    
    const inputChangeHandler = (textInput) => {
        setInput(textInput.replace(/[^0-9]/g, ''))
    }

    const resetButtonHandler = () => {
        setInput('')
        setConfirmed(false)
    }

    const confirmButtonHandler = () => {
        if(input === NaN || input <= 0) {
            Alert.alert(
                'Invalid number!',
                'Number has to be between 1 and 99.',
                [{ text: 'Okay', style: 'destructive', onPress: resetButtonHandler }]
            )
            return
        }
        setChosenNumber(Number(input))
        setInput('')
        setConfirmed(true)
        Keyboard.dismiss()
    }

    return(
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
            <View style={styles.container}>
                <Text style={styles.title}>Start a new game</Text>
                <Card style={styles.inputContainer}>
                    <Input 
                        style={styles.input}
                        placeholder="Enter a number"
                        blurOnSubmit
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="number-pad"
                        maxLength={2}
                        onChangeText={inputChangeHandler}
                        value={input}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <MainButton onPress={resetButtonHandler} style={styles.resetButton}>Reset</MainButton>
                        </View>
                        <View style={styles.button}>
                            <MainButton onPress={confirmButtonHandler}>Confirm</MainButton>
                        </View>
                    </View>
                </Card>
                {
                    confirmed ?
                        <Card style={styles.summaryContainer}>
                            <Text>Your number</Text>
                            <NumberContainer>{chosenNumber}</NumberContainer>
                            <MainButton onPress={() => props.onStartGame(chosenNumber)}>Start game</MainButton>
                        </Card> 
                        
                    : null
                }
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,

    },
    title: {
        fontSize: 22,
        paddingVertical: 10,
        opacity: 0.8,
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    input: {
        fontSize: 20,
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
    resetButton: {
        backgroundColor: Colors.secondary,
    },
    summaryContainer: {
        marginTop: 50,
        alignItems: 'center',
    },  
})

export default StartGameScreen
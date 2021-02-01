import React, { useEffect, useState } from 'react'
import { 
    StyleSheet,
    View, 
    Text, 
    TouchableWithoutFeedback,
    Keyboard, 
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView,
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
    const [buttonWidth, setButtonWidth] = useState(deviceWidth / 4)

    const updateLayout = () => {
        setButtonWidth(Dimensions.get('window').width / 4)
    }

    useEffect(() => {
        Dimensions.addEventListener('change', updateLayout)
        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    })
    

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
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
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
                                <View style={{...styles.button ,width: buttonWidth}}>
                                    <MainButton onPress={resetButtonHandler} style={styles.resetButton}>Reset</MainButton>
                                </View>
                                <View style={{...styles.button ,width: buttonWidth}}>
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
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginBottom: deviceHeight > 600 ? 10 : 5
    },
    title: {
        fontSize: deviceHeight > 600 ? 27 : 22,
        marginVertical: deviceHeight / 23,
        opacity: 0.7,
    },
    inputContainer: {
        width:'80%',
        minWidth: 300,
        alignItems: 'center',
    },
    input: {
        fontSize: deviceHeight > 600 ? 25 : 20,
        marginBottom: deviceHeight / 30,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: deviceHeight / 40,
    },
    button: {
        minWidth: 100,
    },
    resetButton: {
        backgroundColor: Colors.secondary,
    },
    summaryContainer: {
        alignItems: 'center',
        marginTop: deviceHeight / 20,
    },  
})

export default StartGameScreen
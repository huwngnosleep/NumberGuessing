import React, { useState, useRef, useEffect, } from 'react'
import { StyleSheet, View, Text, Alert, ScrollView, Dimensions, } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import MainButton from '../components/MainButton'

import Colors from '../constants/colors'

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
    const [lastGuesses, setLastGuesses] = useState([currentGuest])
    const [deviceWidth, setDeviceWith] = useState(Dimensions.get('window').width)

    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    const updateLayout = () => {
        setDeviceWith(Dimensions.get('window').width)
    }

    useEffect(() => {
        Dimensions.addEventListener('change', updateLayout)
        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    })

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
            currentLow.current = currentGuest + 1
        }

        const nextGuess = randomNumberGenerator(currentLow.current, currentHigh.current, currentGuest)
        setCurrentGuest(nextGuess)
        setGuessCount(guessCount => guessCount + 1)
        setLastGuesses(curLastGuesses => [ ...curLastGuesses, nextGuess])
    }
    
    if( deviceWidth > 600 ) {
        return(
            <View style={styles.screen}>
                <Text style={styles.title}>Is it your number?</Text>
                <Card style={styles.landscapeButtonContainer}>
                    <MainButton style={{backgroundColor: Colors.secondary}} onPress={nextGuessHandler.bind(this,'lower')}>
                        <Ionicons name="md-remove" size={24} color="white" />
                    </MainButton>
                    <NumberContainer>{currentGuest}</NumberContainer>
                    <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name="md-add" size={24} color="white" />
                    </MainButton>
                </Card>
                <View style={styles.landScapeListContainer}>
                    <ScrollView contentContainerStyle={styles.list}>
                        {
                            lastGuesses.map((item, index) => 
                                <View key={item} style={styles.listItem}>
                                    <Text>#{index + 1}</Text>
                                    <Text>{item}</Text>
                                </View>
                            )
                        } 
                    </ScrollView>
                </View>
            </View>
        )
    }

    return(
        <View style={styles.screen}>
            <Text style={styles.title}>Is it your number?</Text>
            <NumberContainer>{currentGuest}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton style={{backgroundColor: Colors.secondary}} onPress={nextGuessHandler.bind(this,'lower')}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {
                        lastGuesses.map((item, index) => 
                            <View key={item} style={styles.listItem}>
                                <Text>#{index + 1}</Text>
                                <Text>{item}</Text>
                            </View>
                        )
                    }
                </ScrollView>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 25,
        marginBottom: Dimensions.get('window').height / 40,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%',
    },
    landscapeButtonContainer: {
        width: '40%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listContainer: {
        width: '80%',
        flex: 1,
    },
    landScapeListContainer: {
        width: '60%',
        flex: 1,
    },  
    list: {
        flexDirection: 'column-reverse',
    },
    listItem: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        padding: 15,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})

export default GameScreen
import React from 'react'
import { StyleSheet, Text, View, Image, } from 'react-native'
import Colors from '../constants/colors'

import MainButton from '../components/MainButton'

const GameOverScreen = (props) => {
    return(
        <View style={styles.screen}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image} 
                    source={require('../assets/success.png')} 
                />
            </View>
            <Text style={{...styles.text, fontSize: 35}}>Game over!!!</Text>
            <Text style={styles.text}>Your number: <Text style={styles.highlightText}>{props.userChoice}</Text></Text>
            <Text style={styles.text}>Number of guesses: <Text style={styles.highlightText}>{props.count}</Text></Text>
            <MainButton onPress={props.restartGame}>Restart</MainButton>
            
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: 250,
        height: 250,
        borderRadius: 125,
        borderWidth: 3,
        overflow: 'hidden',
        marginBottom: 10,
    },
    image: {
        height: '100%',
        width: '100%',
    },
    text: {
        marginBottom: 10,
        fontSize: 20,
        fontFamily: 'open-sans-bold'
    },
    highlightText: {
        color: Colors.primary,
    },
})

export default GameOverScreen
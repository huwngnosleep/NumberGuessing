import React, { useState, useEffect, } from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    Image,
    Dimensions,
} from 'react-native'
import Colors from '../constants/colors'

import MainButton from '../components/MainButton'


const GameOverScreen = (props) => {
    const [deviceWidth, setDeviceWith] = useState(deviceWidth)

    const updateLayout = () => {
        setDeviceWith(Dimensions.get('window').width)
    }

    useEffect(() => {
        Dimensions.addEventListener('change', updateLayout)
        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    })
    
    if(deviceWidth > 600) {
        return(
            <View style={{...styles.screen, flexDirection: 'row',}}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image} 
                        source={require('../assets/success.png')} 
                    />
                </View>
                <View>
                    <Text style={{...styles.text, fontSize: 35}}>Game over!!!</Text>
                    <Text style={styles.text}>Your number: <Text style={styles.highlightText}>{props.userChoice}</Text></Text>
                    <Text style={styles.text}>Number of guesses: <Text style={styles.highlightText}>{props.count}</Text></Text>
                    <MainButton onPress={props.restartGame}>Restart</MainButton>  
                </View>
            </View>
        )
    } 

    return(
        <View style={styles.screen}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image} 
                    source={require('../assets/success.png')} 
                />
            </View>
            <View>
                <Text style={{...styles.text, fontSize: 35}}>Game over!!!</Text>
                <Text style={styles.text}>Your number: <Text style={styles.highlightText}>{props.userChoice}</Text></Text>
                <Text style={styles.text}>Number of guesses: <Text style={styles.highlightText}>{props.count}</Text></Text>
                <MainButton onPress={props.restartGame}>Restart</MainButton>  
            </View>
            
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
        height: Dimensions.get('window').width * 0.7,
        width: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.35,
        borderWidth: 3,
        overflow: 'hidden',
        marginBottom: Dimensions.get('window').width / 25,
    },
    image: {
        height: '100%',
        width: '100%',
    },
    text: {
        marginBottom: Dimensions.get('window').width / 27,
        fontSize: Dimensions.get('window').height > 600 ? 22 : 18,
        fontFamily: 'open-sans-bold'
    },
    highlightText: {
        color: Colors.primary,
    },
})

export default GameOverScreen
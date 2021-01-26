import React from 'react'
import { StyleSheet, View, } from 'react-native'

const Card = (props) => {
    return(
        <View style={{...styles.cardContainer, ...props.style}}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 5,
        shadowOpacity: 0.25,
        elevation: 10,
        backgroundColor: 'white',
        padding: 20,
    }
})

export default Card
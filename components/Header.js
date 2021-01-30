import React from 'react'

import { View, Text, StyleSheet, } from 'react-native'

const Header = (props) => {
    return(
        <View style={styles.wrapper}>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        paddingTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontFamily: 'open-sans-bold',
    }
})

export default Header
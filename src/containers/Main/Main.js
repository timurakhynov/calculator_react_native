import React from "react"
import { View, Text, StyleSheet } from "react-native"
import Display from "../../components/Display/Display"
import InputPanel from "../../components/InputPanel/InputPanel"


const Main = () => {
    return (
        <View style={styles.Main}>
            <Display/>
            <View style={styles.hr}/>
            <InputPanel/>

        </View>
    )
}

const styles = StyleSheet.create({
    Main: {
        flex: 1,
        marginTop: 40
    },
    hr: {
        height: 2,
        width: '90%',
        borderRadius: 1,
        backgroundColor: 'grey',
        margin: '5%'
    }
})

export default Main
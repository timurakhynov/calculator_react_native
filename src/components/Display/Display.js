import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { shallowEqual, useSelector } from "react-redux";

const Display = () => {
    const {result, line, input} = useSelector(state => state.calculator, shallowEqual)
    return (
        <View style={styles.Display}>
            <Text style={styles.input}>{line + input}</Text>
            <Text style={styles.result}>{result}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    Display: {
        height: '30%',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: 30
    },
    input: {
        maxWidth: "99%",
        fontSize: 35
    },
    result: {
        fontSize: 20,
        color: 'grey'

    }
})

export default Display
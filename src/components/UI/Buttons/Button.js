import React, { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useDispatch } from "react-redux";
import { addSymbol } from "../../../store/calculator.slice";

const Button = (props) => {
    const [state, setState] = useState({active: ''})
    const dispatch = useDispatch()
    return (
        <Pressable style={[styles.button, props.children === '=' ? styles.equals : '', state.active]}
        onTouchStart={() => {
            setState({active: props.children === '=' ? styles.equalsActive : styles.buttonActive})
        }}
        onTouchEnd={() => {
            setState({active: ''})
        }}
        onPress={() => {
            dispatch(addSymbol(props.children))
        }}
        >
            <Text style={[styles.buttonText, !isNaN(props.children) 
            ? styles.number 
            : props.children === 'C' 
            ? styles.clear 
            : props.children === '=' 
            ? styles.equals
            : styles.symbol, state.active]}>{props.children}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'rgba(217,217,217,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    equals: {
        backgroundColor: 'purple',
        color: '#d9d9d9'
    },
    buttonActive: {
        fontSize: 20,
        backgroundColor: '#c9c9c9',
    },
    equalsActive: {
        fontSize: 20,
        backgroundColor: '#431d5a',
    },
    buttonText: {
        fontSize: 25
    },
    number: {
        color: 'blue',
    },
    clear: {
        color: 'red',
    }, 
    symbol: {
        color: 'purple',
    }
})

export default Button
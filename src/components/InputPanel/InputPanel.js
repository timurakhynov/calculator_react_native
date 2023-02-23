import React from "react";
import { StyleSheet, View } from "react-native";
import Button from "../UI/Buttons/Button";

const InputPanel = () => {
    return (
        <View style={styles.InputPanel}>
            <Button>C</Button>
            <Button>{'<'}</Button>
            <Button>( )</Button>
            <Button>/</Button>
            <Button>7</Button>
            <Button>8</Button>
            <Button>9</Button>
            <Button>*</Button>
            <Button>4</Button>
            <Button>5</Button>
            <Button>6</Button>
            <Button>-</Button>
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
            <Button>+</Button>
            <Button>-/+</Button>
            <Button>0</Button>
            <Button>.</Button>
            <Button>=</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    InputPanel: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        height: '65%'
    }
})

export default InputPanel
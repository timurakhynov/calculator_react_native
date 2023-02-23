import { createSlice } from "@reduxjs/toolkit";


const namespace = 'calculator';

export const calculatorSlice = createSlice ({
    name: namespace,
    initialState: {
        line: '',
        input: '',
        result: '',
        equalState: false,
        parentheses: 0,
        temporaryData: ''
    },
    reducers: {
        addSymbol(state, action) {
            if (action.payload === '=') {
                if (state.result) {
                    state.input = String(Math.round(state.result*10000000000)/10000000000)
                    state.result = ''
                    state.line = ''
                    state.parentheses = 0
                    state.temporaryData = ''
                    state.equalState = true
                }
            } else if (action.payload === 'C') {
                state.line = ''
                state.input = ''
                state.result = ''
                state.equalState = false
                state.parentheses = 0
            } else if (action.payload === '<') {
                if (state.input.length) {
                    if (state.input[state.input.length - 1] === '(') {
                        state.parentheses -= 1
                    } else if (state.input[state.input.length - 1] === ')') {
                        state.parentheses += 1
                    }
                    state.input = state.input.slice(0, -1)
                } else if(state.line.length) {
                    if (state.line[state.line.length - 1] === '(') {
                        state.parentheses -= 1
                    } else if (state.line[state.line.length - 1] === ')') {
                        state.parentheses += 1
                    }
                    state.line = state.line.slice(0, -1)
                }
            }
            if (state.input.length + state.line.length < 35) {
                if (!isNaN(action.payload) || action.payload === '.') {
                    if(state.equalState) {
                        state.input = ''
                        state.equalState = false
                    }
                    if (action.payload === '.') {
                        if (state.input.indexOf('.') < 0) {
                            state.input += action.payload
                        }
                    } else {
                        if (state.line[state.line.length - 1] === ')') {
                            state.line += '*'
                        }
                        if (state.input.length < 11) {
                            state.input += action.payload
                        }
                    }
                } else if (action.payload === '-/+') {
                    state.equalState = false
                    if (state.input.indexOf('-') < 0) {
                        state.input = "(-" + state.input
                        state.parentheses += 1
                    } else {
                        if (state.input.length) {
                            state.input = state.input.substring(2)
                            state.parentheses -= 1
                        }
                    }
                } else if (action.payload === "( )") {
                    state.equalState = false
                    if (state.parentheses === 0 && state.input.length) {
                        state.line += state.input + '*' + '('
                        state.parentheses += 1
                        state.input = ''
                    } else if (state.input.length) {
                        if (!isNaN(state.input[state.input.length - 1])) {
                            state.line += state.input + ')'
                            state.input = ''
                            state.parentheses -= 1
                        } else {
                            state.line += state.input + '('
                            state.input = ''
                            state.parentheses += 1
                        }
                    } else if (state.parentheses === 0) {
                        if (state.line[state.line.length - 1] === ')' || !isNaN(state.line[state.line.length - 1])) {
                            state.line += '*('
                            state.parentheses += 1
                        } else {
                            state.line += '('
                            state.parentheses += 1
                        }
                    } else if (state.parentheses > 0) {
                        if (state.line[state.line.length - 1] === ')') {
                            state.line += ')'
                            state.parentheses -= 1
                        } else if (state.line[state.line.length - 1] === '(' || state.line[state.line.length - 1] === '+' || state.line[state.line.length - 1] === '-' || state.line[state.line.length - 1] === '/' || state.line[state.line.length - 1] === '*') {
                            state.line += '('
                            state.parentheses += 1
                        }
                    }
                } else if (action.payload === '+' || action.payload === '-' || action.payload === '/' || action.payload === '*') {
                    state.equalState = false
                    if (state.input.length) {
                        if (state.input[state.input.length - 1] !== '(' && state.input[state.input.length - 1] !== '-') {
                            state.line += state.input + action.payload
                            state.input = ''
                        }
                    } else if (state.line[state.line.length - 1] === '+' || state.line[state.line.length - 1] === '-' || state.line[state.line.length - 1] === '/' || state.line[state.line.length - 1] === '*') {
                        state.line = state.line.slice(0, -1) + action.payload
                    } else if (state.line.length) {
                        if (state.line[state.line.length - 1] !== '(') {
                            state.line += action.payload
                        }
                    }
                }
                state.result = ''
                if (state.line) {
                    state.temporaryData = ''
                    if (state.parentheses > 0) {
                        for (let i = 0; i < state.parentheses; i++) {
                            state.temporaryData += ')'
                        }
                    }
                    if (!isNaN(parseInt(state.input[state.input.length - 1])) || (state.line[state.line.length - 1] === ')' && state.input[state.input.length - 1] !== '-' &&  state.input[state.input.length - 1] !== '(') || (!isNaN(state.line[state.line.length - 1]) && !state.equalState)) {
                        state.result = eval(state.line + state.input + state.temporaryData)
                        state.result = Math.round(state.result*10000000000)/10000000000
                        if (String(state.result) === state.line) {
                            state.result = ''
                        }
                    }
                }
            }
        }
    }
})

export const {addSymbol} = calculatorSlice.actions
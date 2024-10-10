import React, { Children } from 'react'
import { View, Pressable, StyleSheet, Text } from 'react-native'

export default function PressableButton({ children, pressedFunction, componentStyle, pressedStyle }) {
    return (
        <Pressable onPress={pressedFunction} style= {({pressed}) => {return [pressed? pressedStyle : componentStyle];}}>
            <View>{children}</View>
        </Pressable>
    )
}

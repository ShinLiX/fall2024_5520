import React, { Children } from 'react'
import { View, Pressable, StyleSheet, Text } from 'react-native'

export default function PressableButton({ children, pressedFunction, componentStyle, pressedStyle }) {
    return (
        <Pressable onPress={pressedFunction} 
        style= {({pressed}) => {
            return [styles.defaultStyle, componentStyle, pressed && pressedStyle, pressed && styles.defaultPressedStyle];}}>
            <View>{children}</View>
        </Pressable>
    )

}

const styles = StyleSheet.create({
    defaultStyle: {
        backgroundColor: "#aaa",
    },
    defaultPressedStyle: {
        backgroundColor: "#aaa",
        opacity: 0.5,
    },
});

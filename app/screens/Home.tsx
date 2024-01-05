import { View, Text, Button } from 'react-native'
import React from 'react'
import { HomePageProps } from '../navigation/RootStack'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

const Home = ({ navigation }: HomePageProps) => {

    const width = useSharedValue(100)
    const height = useSharedValue(100)
    const backgroundColor = useSharedValue('red')

    const startAnimation = () => {
        width.value = 200
        height.value = 200
        backgroundColor.value = 'blue'
    }

    const animatedStyles = useAnimatedStyle(() => {
        return {
            width: width.value,
            height: height.value,
            backgroundColor: backgroundColor.value
        }
    })

    return (
        <View>
            <Animated.View style={animatedStyles} />
            <Button title="Start Animation" onPress={startAnimation} />
        </View>
    )
}

export default Home
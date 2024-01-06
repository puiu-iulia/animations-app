import { View, Text, Button, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { HomePageProps } from '../navigation/RootStack'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { Product, data } from '../../assets/fake'
import { sharedElementTransition } from '../utils/SharedElementTransition';

const AnimatedInput = Animated.createAnimatedComponent(TextInput)

const Home = ({ navigation }: HomePageProps) => {

    const width = useSharedValue(100)
    const height = useSharedValue(100)
    const backgroundColor = useSharedValue('red')

    const startAnimation = () => {

        const randomWidth = Math.floor(Math.random() * 300) + 50;
        const randomHeight = Math.floor(Math.random() * 300) + 50;
        const randomColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`

        width.value = withTiming(randomWidth, {
            duration: 1000,
            easing: Easing.bezier(0.5, 0.01, 0, 1)
        })
        height.value = withTiming(randomHeight, {
            duration: 1000,
            easing: Easing.exp
        })
        backgroundColor.value = withTiming(randomColor, {
            duration: 1000,
            easing: Easing.linear
        })
    }

    const animatedStyles = useAnimatedStyle(() => {
        return {
            width: width.value,
            height: height.value,
            backgroundColor: backgroundColor.value
        }
    })

    const animatedInputStyles = useAnimatedStyle(() => {
        return {
            backgroundColor: backgroundColor.value
        }
    })

    return (
        <ScrollView>
            <AnimatedInput style={[animatedInputStyles, { height: 50, margin: 10 }]} />
            <Animated.View style={animatedStyles} />
            <Button title="Start Animation" onPress={startAnimation} />
            <Button title='Go to List' onPress={() => navigation.navigate('List')} />
            {data.map((product: Product) => (
                <View key={product.id} style={{ padding: 10, backgroundColor: 'white' }}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
                        onPress={() => navigation.navigate('Details', { item: product })}>
                        <Animated.Image
                            sharedTransitionTag={`image-${product.id}`}
                            sharedTransitionStyle={sharedElementTransition}
                            source={{ uri: product.image }}
                            style={{ width: 50, height: 50}}
                        />
                        <View style={{ flex: 1 }}>
                            <Animated.Text style={{ fontWeight: '600', fontSize: 16, color: '#404040' }}>
                                {product.title}
                            </Animated.Text>
                            <Text style={{ fontSize: 16, color: '#404040' }}>${product.price}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    )
}

export default Home
import { View, Text } from 'react-native'
import React from 'react'
import { HomePageProps } from '../navigation/RootStack'

const Home = ({navigation} : HomePageProps) => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Home
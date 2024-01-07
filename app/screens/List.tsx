import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Animated, { FadeIn, Layout, SlideOutLeft } from 'react-native-reanimated';

const List = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood',
      );
      const json = await response.json();
      setItems(json.meals.slice(0, 4));
    }
    fetchMeals();
  }, []);

  const addItem = () => {
    const addRandomMeal = async () => {

      const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/random.php',
      );
      const json = await response.json();
      setItems([...items, json.meals[0]]);
    }
    addRandomMeal();
  };

  const onDelete = useCallback((strMeal: string) => {
    setItems((currentItems) => {
      return currentItems.filter((item) => item.strMeal !== strMeal);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        {items.map((item, index) => (
          <Animated.View
            key={item.idMeal}
            style={styles.item}
            onTouchEnd={() => onDelete(item.strMeal)}
            layout={Layout.delay(50)}
            entering={FadeIn.delay(50 * index)}
            exiting={SlideOutLeft}>
            <Image
              source={{ uri: item.strMealThumb }}
              style={{ width: 40, height: 40, borderRadius: 4 }}
            />
            <Text style={{ color: '#505050', marginLeft: 8 }}>{item.strMeal}</Text>
          </Animated.View>
        ))}
      </ScrollView>

      <View style={{ position: 'absolute', bottom: 40, right: 20 }}>
        <TouchableOpacity
          onPress={addItem}
          style={{
            backgroundColor: '#c4c9d7',
            borderRadius: 24,
            width: 48,
            height: 48,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ fontSize: 24 }}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    alignItems: 'center',
  },
});

export default List;
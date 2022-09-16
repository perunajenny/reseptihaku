import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, StatusBar, Image } from 'react-native';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [meals, setMeals] = useState([]);
 
  const fetchUrl = async () => {
    try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    const data = await response.json();
    setMeals(data.meals)
    } catch (error) {
        Alert.alert('Error', error.message); 
    }    
  }
  
  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <FlatList 
        style={{marginLeft : "5%"}}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({item}) => 
          <View>
            <Text style={{fontSize: 18, fontWeight: "bold"}}>{item.strMeal}</Text>
            <Image 
             style={styles.image}
              source={{uri: item.strMealThumb}} 
            />
          </View>}
        data={meals} 
        ItemSeparatorComponent={listSeparator} /> 
      <TextInput style={{fontSize: 18, width: 200}} placeholder='keyword' 
        onChangeText={text => setKeyword(text)} />
      <Button title="Find" onPress={fetchUrl} />
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
 },
image: {
   width: 60,
   height: 60
 }
});
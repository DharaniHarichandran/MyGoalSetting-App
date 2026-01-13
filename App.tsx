import React, { useState } from 'react';
import {View,Text,StyleSheet,TextInput,Button,FlatList,ImageBackground} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addGoal, deleteGoal, editGoal } from './src/store/goalsSlice';
import type { RootState, AppDispatch } from './src/store/store';

const App = () => {
  const [enteredGoal, setEnteredGoal] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const goals = useSelector((state: RootState) => state.goals.goals);
  const dispatch = useDispatch<AppDispatch>();

  const submitHandler = () => {
    if (!enteredGoal.trim()) return;

    if (editingId) {
      dispatch(editGoal({ id: editingId, newText: enteredGoal }));
      setEditingId(null);
    } else {
      dispatch(addGoal(enteredGoal));
    }

    setEnteredGoal('');
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={{uri:'https://wallpaperaccess.com/full/11046459.jpg'}}
      style={styles.imageBg}  
      resizeMode="cover"
      >
         <Text style={styles.title}>My Goal Setting App</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Type your goal" placeholderTextColor={"gray"}
          value={enteredGoal}
          onChangeText={setEnteredGoal}
        />
        <Button
          title={editingId ? 'Update' : 'Add'}
          onPress={submitHandler}
        />
      </View>

      <FlatList
        data={goals} // Redux-connected data
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.goalItem}>
            <Text style={styles.goalText}>{item.text}</Text>
            <View style={styles.actions}>
              <Button
                title="Edit"
                onPress={() => {
                  setEnteredGoal(item.text);
                  setEditingId(item.id);
                }}
              />
              <Button
                title="Delete"
                color="red"
                onPress={() => dispatch(deleteGoal(item.id))}
              />
            </View>
          </View>
        )}
      />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
    imageBg: {
    flex: 1,
   },

  title: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    padding: 20,
    color: 'white',
    textShadowRadius:20,
    textShadowColor:'white',
    marginTop:20
  },
  inputRow: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  input: {
    width: '85%',
    borderWidth: 2,
    borderColor: 'black',
    marginRight: 10,
    paddingLeft: 10,
    backgroundColor:'white',
    
  },
  goalItem: {
    backgroundColor: '#fff',
    padding: 12,
    margin: 10,
    borderRadius: 6,
  },
  goalText: {
    fontSize: 18,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
});

export default App;

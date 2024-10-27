import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from './firebaseConfig';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';


const TodoScreen = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    // Fetch Todos from Firebase
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, "todos"));

        let todosData = [];
        querySnapshot.forEach((doc) => {
            todosData.push({id: doc.id, ...doc.data()})
        });

        setTodos(todosData);
    }

    // Add a New Todo
    const addTodo = async () => {
        if (newTodo.trim()) {
            await addDoc(collection(db, "todos"), {
                title: newTodo,
                timestamp: Date.now()
            });

            fetchData();
            setNewTodo('');
        }
    };

    // Toggle Completion Status
    const toggleComplete = async (id, completed) => {
        const docRef = doc(db, 'todos', id);

        await updateDoc(docRef, {
            completed: !completed
        });

        fetchData();
    };

    // Delete Todo
    const deleteTodo = async (id) => {
        await deleteDoc(doc(db, "todos", id));    
        fetchData();
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Add a new todo..."
                value={newTodo}
                onChangeText={setNewTodo}
            />
            <Button style={{ marginBottom: 10 }} title="Add Todo" onPress={addTodo} />
            <FlatList
                style={{ marginTop: 10 }}
                data={todos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View key={item.id} style={styles.todoContainer}>
                        <TouchableOpacity
                            onPress={() => toggleComplete(item.id, item.completed)}
                            style={styles.todoItem}
                        >
                            <Text style={[styles.todoText, item.completed && styles.completed]}>
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                        <Button title="Delete" color="red" onPress={() => deleteTodo(item.id)} />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
    },
    input: {
        padding: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 5,
    },
    todoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    todoItem: {
        flex: 1,
    },
    todoText: {
        fontSize: 16,
    },
    completed: {
        textDecorationLine: 'line-through',
        color: 'grey',
    },
});

export default TodoScreen;

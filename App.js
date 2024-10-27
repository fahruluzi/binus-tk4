// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './HomeScreen';
import TodoListScreen from './TodoListScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'TodoList') {
              iconName = 'list';
            } else if (route.name === 'Home') {
              iconName = 'map';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="TodoList" component={TodoListScreen} options={{ title: 'To-Do List' }} />
        <Tab.Screen name="Home" component={Home} options={{ title: 'Map' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './HomeScreen';
import TodoListScreen from './TodoListScreen';
import LoginScreen from './LoginScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  const [auth, setAuth] = useState(false)

  return (
    <NavigationContainer>
      {auth ?
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
          <Tab.Screen name="Home" component={Home} options={{ title: 'Map' }} />
          <Tab.Screen name="TodoList" component={TodoListScreen} options={{ title: 'To-Do List' }} />
        </Tab.Navigator> :
        <LoginScreen setAuth={setAuth} />
      }
    </NavigationContainer>
  );
}

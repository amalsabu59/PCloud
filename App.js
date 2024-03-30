import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
// You'll need to create these components in your project
import HomeScreen from './screens/Home';
import UploadScreen from './screens/Upload';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={() => ({
            tabBarLabelStyle: { display: "none" },
            headerShown: true,
            tabBarActiveTintColor: "#28B446", // Color of the active tab
            tabBarInactiveTintColor: "#D9D9D9", // Color of the inactive tabs
            tabBarLabelStyle: {
              fontFamily: 'Inter',
              fontSize: 12,
              fontWeight: '500',
              lineHeight: 14.4,
              letterSpacing: -0.01,
              textAlign: 'left',
            },
            tabBarStyle: [
              {
                display: "flex",
                backgroundColor: "#3C4752",
                borderTopLeftRadius: 35,
                borderTopRightRadius: 35,
                width: "100%",
                height: 60,
              },
            ],
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Upload" component={UploadScreen} />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
}




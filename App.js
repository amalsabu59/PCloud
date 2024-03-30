import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import HomeScreen from './screens/Home';
import UploadScreen from './screens/Upload';
import { Entypo } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={{ flex: 1, backgroundColor: '#22272C' }}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarLabelStyle: { display: 'none' },
            headerShown: false,
            tabBarActiveTintColor: '#28B446',
            tabBarInactiveTintColor: '#D9D9D9',
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
                display: 'flex',
                backgroundColor: '#3C4752',
                borderTopLeftRadius: 35,
                borderTopRightRadius: 35,
                width: '100%',
                height: 60,
              },
            ],
            contentContainerStyle: {
              flex: 1,
              backgroundColor: '#22272C',
            },
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home'; // Specify the icon name for the Home tab
              } else if (route.name === 'Upload') {
                iconName = 'upload'; // Specify the icon name for the Upload tab
              }

              // Return the Entypo component with the specified icon name, color, and size
              return <Entypo name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Upload" component={UploadScreen} />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
}

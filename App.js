
// App.js
// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewsComponent from './components/NewsComponent';
import { SafeAreaView, StatusBar } from 'react-native';
import NavBar from './components/Navbar';
import { StyleSheet } from 'react-native';


const Stack = createNativeStackNavigator();

export default function App() {
  const country = 'us';
  const pageSize = 10;

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar />
        <NavBar />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home">
            {(props) => (
              <NewsComponent {...props} category="general" country={country} pageSize={pageSize} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Business">
            {(props) => (
              <NewsComponent {...props} category="business" country={country} pageSize={pageSize} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Sports">
            {(props) => (
              <NewsComponent {...props} category="sports" country={country} pageSize={pageSize} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Health">
            {(props) => (
              <NewsComponent {...props} category="health" country={country} pageSize={pageSize} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Entertainment">
            {(props) => (
              <NewsComponent {...props} category="entertainment" country={country} pageSize={pageSize} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
});

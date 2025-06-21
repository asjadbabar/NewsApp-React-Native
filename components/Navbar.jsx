// NavBar.js (React Native version)
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NavBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.navbar}>
      <Text style={styles.title}>News Feed</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.menu}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.link}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Business')}>
          <Text style={styles.link}>Business</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Sports')}>
          <Text style={styles.link}>Sports</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Health')}>
          <Text style={styles.link}>Health</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Entertainment')}>
          <Text style={styles.link}>Entertainment</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('General')}>
          <Text style={styles.link}>General</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8
  },
  menu: {
    flexDirection: 'row'
  },
  link: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#007bff'
  }
});

export default NavBar;

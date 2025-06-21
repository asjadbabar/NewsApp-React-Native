// NewsItem.js
import React from 'react';
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity } from 'react-native';

const NewsItem = ({ title, description, imgUrl, url, date }) => {
  return (
    <View style={styles.card}>
      {imgUrl && <Image source={{ uri: imgUrl }} style={styles.image} />}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{description}</Text>
      <Text style={styles.date}>{new Date(date).toLocaleString()}</Text>
      <TouchableOpacity onPress={() => Linking.openURL(url)}>
        <Text style={styles.readMore}>Read More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fafafa',
  },
  image: {
    height: 180,
    borderRadius: 6,
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  desc: {
    fontSize: 14,
    marginBottom: 6,
  },
  date: {
    fontSize: 12,
    color: 'gray',
  },
  readMore: {
    color: '#1e90ff',
    marginTop: 6,
  },
});

export default NewsItem;

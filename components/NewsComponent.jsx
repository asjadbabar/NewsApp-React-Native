// // NewsComponent.js
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Button, FlatList, ActivityIndicator } from 'react-native';
// import NewsItem from './NewsItem';

// const NewsComponent = (props) => {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [totalArticles, setTotalArticles] = useState(0);

//   const update = async () => {
//     setLoading(true);
//     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4e7eec4a2ffe4d6a859f9d0974c36b7a&page=${page}&pageSize=${props.pageSize}`;
//     const data = await fetch(url);
//     const parsedData = await data.json();
//     setArticles(parsedData.articles);
//     setTotalArticles(parsedData.totalResults);
//     setLoading(false);
//   };

//   useEffect(() => {
//     update();
//   }, []);

//   const nextClick = async () => {
//     setPage((prevPage) => prevPage + 1);
//     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4e7eec4a2ffe4d6a859f9d0974c36b7a&page=${page + 1}&pageSize=${props.pageSize}`;
//     const data = await fetch(url);
//     const parsedData = await data.json();
//     setArticles(parsedData.articles);
//     setTotalArticles(parsedData.totalResults);
//   };

//   const previousClick = async () => {
//     if (page === 1) return;
//     setPage((prevPage) => prevPage - 1);
//     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4e7eec4a2ffe4d6a859f9d0974c36b7a&page=${page - 1}&pageSize=${props.pageSize}`;
//     const data = await fetch(url);
//     const parsedData = await data.json();
//     setArticles(parsedData.articles);
//     setTotalArticles(parsedData.totalResults);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Top Headlines</Text>

//       {loading ? (
//         <ActivityIndicator size="large" color="#000" />
//       ) : (
//         <FlatList
//           data={articles}
//           keyExtractor={(item) => item.url}
//           renderItem={({ item }) => (
//             <NewsItem
//               url={item.url}
//               title={item.title}
//               description={item.description}
//               imgUrl={item.urlToImage}
//               date={item.publishedAt}
//             />
//           )}
//         />
//       )}

//       <View style={styles.buttonContainer}>
//         <Button title="Previous" onPress={previousClick} disabled={page <= 1} />
//         <Button title="Next" onPress={nextClick} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: 50,
//     paddingHorizontal: 10,
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   heading: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     alignSelf: 'center',
//     marginBottom: 10,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginVertical: 10,
//   },
// });

// export default NewsComponent;
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import NewsItem from './NewsItem';

const NewsComponent = (props) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const fetchArticles = async (pageNum = 1, append = false) => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4e7eec4a2ffe4d6a859f9d0974c36b7a&page=${pageNum}&pageSize=${props.pageSize}`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (append) {
        setArticles((prev) => [...prev, ...data.articles]);
      } else {
        setArticles(data.articles);
      }

      setTotalArticles(data.totalResults);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const loadMoreArticles = async () => {
    if (articles.length >= totalArticles || isFetchingMore) return;

    setIsFetchingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchArticles(nextPage, true);
  };

  const renderItem = useCallback(({ item }) => (
    <NewsItem
      url={item.url}
      title={item.title}
      description={item.description}
      imgUrl={item.urlToImage}
      date={item.publishedAt}
    />
  ), []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Top Headlines</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item) => item.url}
          renderItem={renderItem}
          onEndReached={loadMoreArticles}
          onEndReachedThreshold={0.5}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          windowSize={5}
          ListFooterComponent={
            isFetchingMore ? <ActivityIndicator size="small" color="#555" /> : null
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
  },
});

export default NewsComponent;

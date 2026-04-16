// SearchScreen.js
import React, { useState } from 'react';
import {
  View, Text, TextInput, Image, FlatList,
  TouchableOpacity, StyleSheet, SafeAreaView,
  StatusBar, Dimensions,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TILE = SCREEN_WIDTH / 3 - 1;

const EXPLORE = [
  { id: '1',  uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80' },
  { id: '2',  uri: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80' },
  { id: '3',  uri: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80' },
  { id: '4',  uri: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80' },
  { id: '5',  uri: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80' },
  { id: '6',  uri: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&q=80' },
  { id: '7',  uri: 'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?w=400&q=80' },
  { id: '8',  uri: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80' },
  { id: '9',  uri: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=80' },
  { id: '10', uri: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80' },
  { id: '11', uri: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&q=80' },
  { id: '12', uri: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80' },
];

function chunk(arr, n) {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const rows = chunk(EXPLORE, 3);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.searchBar}>
        <Text style={{ fontSize: 14, marginRight: 6 }}>🔍</Text>
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="#8e8e8e"
          value={query}
          onChangeText={setQuery}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Text style={{ fontSize: 14, color: '#8e8e8e' }}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={rows}
        keyExtractor={(_, i) => String(i)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: row, index: ri }) => (
          <View style={styles.row}>
            {row.map((img, ci) => {
              const big = ri % 3 === 0 && ci === 0;
              return (
                <TouchableOpacity key={img.id} style={[styles.tile, big && styles.tileBig]} activeOpacity={0.85}>
                  <Image source={{ uri: img.uri }} style={styles.tileImg} resizeMode="cover" />
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#efefef', borderRadius: 10, margin: 10, paddingHorizontal: 10, paddingVertical: 8 },
  input:     { flex: 1, fontSize: 14, color: '#262626' },
  row:       { flexDirection: 'row', gap: 1.5, marginBottom: 1.5 },
  tile:      { width: TILE, height: TILE },
  tileBig:   { width: TILE * 2 + 1.5, height: TILE * 2 + 1.5 },
  tileImg:   { width: '100%', height: '100%' },
});
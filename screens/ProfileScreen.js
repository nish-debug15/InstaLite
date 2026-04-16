// ProfileScreen.js
import React, { useState } from 'react';
import {
  View, Text, Image, TouchableOpacity, FlatList,
  StyleSheet, SafeAreaView, StatusBar, Dimensions,
} from 'react-native';

const { width: W } = Dimensions.get('window');
const TILE = W / 3 - 1;

const PROFILE = {
  username: 'rahulx0',
  name: 'Rahul Sharma',
  bio: '📍 Delhi, India\n🏔️ Mountains > Cities\n✈️ Travel | Photography | Life',
  avatar: 'https://i.pravatar.cc/150?img=11',
  posts: 48, followers: '12.4K', following: 382,
};

const HIGHLIGHTS = [
  { id: '1', label: 'Manali',    cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150' },
  { id: '2', label: 'Jaipur',   cover: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=150' },
  { id: '3', label: 'Kasol',    cover: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=150' },
  { id: '4', label: 'Rishikesh',cover: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=150' },
];

const GRID = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
  'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400',
  'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400',
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400',
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400',
  'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?w=400',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400',
  'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400',
];

function chunk(arr, n) {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

export default function ProfileScreen({ navigation }) {
  const [tab, setTab] = useState('grid');
  const rows = chunk(GRID, 3);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <FlatList
        data={rows}
        keyExtractor={(_, i) => String(i)}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Top bar */}
            <View style={styles.topBar}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ fontSize: 22, color: '#262626' }}>←</Text>
              </TouchableOpacity>
              <Text style={styles.topUsername}>{PROFILE.username}</Text>
              <Text style={{ fontSize: 20, color: '#262626' }}>☰</Text>
            </View>

            {/* Avatar + Stats */}
            <View style={styles.profileRow}>
              <Image source={{ uri: PROFILE.avatar }} style={styles.avatar} />
              <View style={styles.statsRow}>
                {[
                  { label: 'Posts',     val: PROFILE.posts },
                  { label: 'Followers', val: PROFILE.followers },
                  { label: 'Following', val: PROFILE.following },
                ].map(s => (
                  <View key={s.label} style={{ alignItems: 'center' }}>
                    <Text style={styles.statVal}>{s.val}</Text>
                    <Text style={styles.statLabel}>{s.label}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Bio */}
            <View style={styles.bio}>
              <Text style={styles.name}>{PROFILE.name}</Text>
              <Text style={styles.bioText}>{PROFILE.bio}</Text>
            </View>

            {/* Buttons */}
            <View style={styles.btnRow}>
              <TouchableOpacity style={styles.editBtn}><Text style={styles.btnTxt}>Edit Profile</Text></TouchableOpacity>
              <TouchableOpacity style={styles.editBtn}><Text style={styles.btnTxt}>Share Profile</Text></TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn}><Text>👤</Text></TouchableOpacity>
            </View>

            {/* Highlights */}
            <View style={styles.highlights}>
              {HIGHLIGHTS.map(h => (
                <View key={h.id} style={{ alignItems: 'center', width: 70 }}>
                  <View style={styles.hlRing}>
                    <Image source={{ uri: h.cover }} style={styles.hlImg} />
                  </View>
                  <Text style={styles.hlLabel}>{h.label}</Text>
                </View>
              ))}
            </View>

            {/* Tab bar */}
            <View style={styles.tabBar}>
              {['grid', 'tagged'].map(t => (
                <TouchableOpacity
                  key={t}
                  style={[styles.tabBtn, tab === t && styles.tabBtnActive]}
                  onPress={() => setTab(t)}
                >
                  <Text style={{ fontSize: 18 }}>{t === 'grid' ? '⊞' : '🏷️'}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        }
        renderItem={({ item: row }) => (
          <View style={styles.gridRow}>
            {row.map((uri, i) => (
              <TouchableOpacity key={i} style={styles.tile} activeOpacity={0.85}>
                <Image source={{ uri }} style={styles.tileImg} resizeMode="cover" />
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:        { flex: 1, backgroundColor: '#fff' },
  topBar:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: '#dbdbdb' },
  topUsername: { fontSize: 16, fontWeight: '700', color: '#262626' },
  profileRow:  { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 },
  avatar:      { width: 86, height: 86, borderRadius: 43, borderWidth: 1, borderColor: '#dbdbdb', marginRight: 24 },
  statsRow:    { flex: 1, flexDirection: 'row', justifyContent: 'space-around' },
  statVal:     { fontSize: 16, fontWeight: '700', color: '#262626' },
  statLabel:   { fontSize: 12, color: '#262626' },
  bio:         { paddingHorizontal: 16, paddingBottom: 12 },
  name:        { fontSize: 14, fontWeight: '700', color: '#262626', marginBottom: 4 },
  bioText:     { fontSize: 13.5, color: '#262626', lineHeight: 19 },
  btnRow:      { flexDirection: 'row', gap: 6, paddingHorizontal: 12, paddingBottom: 14 },
  editBtn:     { flex: 1, backgroundColor: '#efefef', borderRadius: 8, paddingVertical: 7, alignItems: 'center' },
  btnTxt:      { fontSize: 13, fontWeight: '600', color: '#262626' },
  iconBtn:     { backgroundColor: '#efefef', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 7 },
  highlights:  { flexDirection: 'row', paddingHorizontal: 12, paddingBottom: 14, gap: 12 },
  hlRing:      { width: 62, height: 62, borderRadius: 31, borderWidth: 1.5, borderColor: '#dbdbdb', overflow: 'hidden' },
  hlImg:       { width: '100%', height: '100%' },
  hlLabel:     { fontSize: 11, color: '#262626', marginTop: 4, textAlign: 'center' },
  tabBar:      { flexDirection: 'row', borderTopWidth: 0.5, borderTopColor: '#dbdbdb' },
  tabBtn:      { flex: 1, alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1.5, borderBottomColor: 'transparent' },
  tabBtnActive:{ borderBottomColor: '#262626' },
  gridRow:     { flexDirection: 'row', gap: 1.5, marginBottom: 1.5 },
  tile:        { width: TILE, height: TILE },
  tileImg:     { width: '100%', height: '100%' },
});
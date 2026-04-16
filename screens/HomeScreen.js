// HomeScreen.js
// Lab 5 – Networking & API  +  Lab 6 – Camera Permission
// Posts fetched from: https://jsonplaceholder.typicode.com/posts
// Photos fetched from: https://jsonplaceholder.typicode.com/photos

import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, ScrollView, TouchableOpacity,
  FlatList, StyleSheet, StatusBar, SafeAreaView,
  Dimensions, ActivityIndicator, RefreshControl,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ─── 5 hardcoded users mapped to API userIds 1–5 ────────────────────────────
const USERS = {
  1: { username: 'rahulx0',   avatar: 'https://i.pravatar.cc/150?img=11', location: 'Himachal Pradesh, India' },
  2: { username: 'john_doe',  avatar: 'https://i.pravatar.cc/150?img=33', location: 'Kasol, India' },
  3: { username: 'meera.s',   avatar: 'https://i.pravatar.cc/150?img=47', location: 'Jaipur, Rajasthan' },
  4: { username: 'aarav_k',   avatar: 'https://i.pravatar.cc/150?img=5',  location: 'Mumbai, Maharashtra' },
  5: { username: 'priya_21',  avatar: 'https://i.pravatar.cc/150?img=48', location: 'Bengaluru, Karnataka' },
};

// Real Unsplash photos mapped to userIds 1–5
const POST_IMAGES = {
  1: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85',
  2: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=85',
  3: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=85',
  4: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=85',
  5: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=85',
};

const MY_AVATAR = 'https://i.pravatar.cc/150?img=11';

const STORIES = [
  { id: '1', username: 'rahulx0',  avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: '2', username: 'john_doe', avatar: 'https://i.pravatar.cc/150?img=33' },
  { id: '3', username: 'meera.s',  avatar: 'https://i.pravatar.cc/150?img=47' },
  { id: '4', username: 'aarav_k',  avatar: 'https://i.pravatar.cc/150?img=5'  },
  { id: '5', username: 'priya_21', avatar: 'https://i.pravatar.cc/150?img=48' },
];

// ─── Story Ring ───────────────────────────────────────────────────────────────
function StoryRing({ children, active }) {
  if (!active) return <View style={styles.ringInactive}>{children}</View>;
  return (
    <View style={styles.ringActive}>
      <View style={styles.ringWhite}>{children}</View>
    </View>
  );
}

// ─── Post Card ────────────────────────────────────────────────────────────────
function PostCard({ post, onLike, onSave }) {
  const user = USERS[post.userId] || USERS[1];
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <StoryRing active>
            <Image source={{ uri: user.avatar }} style={styles.postAvatar} />
          </StoryRing>
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.username}>{user.username}</Text>
            <Text style={styles.location}>{user.location}</Text>
          </View>
        </View>
        <Text style={styles.moreBtn}>•••</Text>
      </View>

      {/* Image */}
      <Image
        source={{ uri: POST_IMAGES[post.userId] || POST_IMAGES[1] }}
        style={styles.postImage}
        resizeMode="cover"
      />

      {/* Action Row */}
      <View style={styles.actionRow}>
        <View style={{ flexDirection: 'row', gap: 14 }}>
          <TouchableOpacity onPress={() => onLike(post.id)}>
            <Text style={[styles.actionIcon, post.liked && { color: '#ed4956' }]}>
              {post.liked ? '♥' : '♡'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.actionIcon}>💬</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.actionIcon}>📤</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => onSave(post.id)}>
          <Text style={styles.actionIcon}>{post.saved ? '🔖' : '🏷️'}</Text>
        </TouchableOpacity>
      </View>

      {/* Meta */}
      <View style={styles.cardMeta}>
        <Text style={styles.likeCount}>{post.likeCount.toLocaleString()} likes</Text>
        {/* Caption from API */}
        <Text style={styles.caption} numberOfLines={2}>
          <Text style={styles.username}>{user.username} </Text>
          {post.body}
        </Text>
        <Text style={styles.viewComments}>View all {post.comments} comments</Text>
        <Text style={styles.timeAgo}>{post.timeAgo}</Text>
      </View>
    </View>
  );
}

// ─── Home Screen ──────────────────────────────────────────────────────────────
export default function HomeScreen({ navigation }) {
  const [posts, setPosts]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab]   = useState('home');

  const TIME_LABELS = ['1 hour ago', '2 hours ago', '3 hours ago', '5 hours ago', '8 hours ago'];

  // ── Fetch posts from JSONPlaceholder API ──────────────────────────────────
  const fetchPosts = async () => {
    try {
      setError(null);
      // Fetch only userIds 1–5, one post each
      const responses = await Promise.all(
        [1, 2, 3, 4, 5].map(uid =>
          fetch(`https://jsonplaceholder.typicode.com/posts?userId=${uid}&_limit=1`)
            .then(r => r.json())
            .then(data => data[0])
        )
      );
      const enriched = responses.map((post, i) => ({
        ...post,
        liked:     false,
        saved:     false,
        likeCount: Math.floor(Math.random() * 5000) + 200,
        comments:  Math.floor(Math.random() * 300) + 10,
        timeAgo:   TIME_LABELS[i],
      }));
      setPosts(enriched);
    } catch (e) {
      setError('Failed to load posts. Check your internet connection.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const onRefresh = () => { setRefreshing(true); fetchPosts(); };

  const handleLike = id =>
    setPosts(prev => prev.map(p =>
      p.id === id
        ? { ...p, liked: !p.liked, likeCount: p.liked ? p.likeCount - 1 : p.likeCount + 1 }
        : p
    ));

  const handleSave = id =>
    setPosts(prev => prev.map(p => p.id === id ? { ...p, saved: !p.saved } : p));

  const handleTabPress = tab => {
    setActiveTab(tab);
    if (tab === 'add')     { navigation.navigate('Camera');  return; }
    if (tab === 'search')  { navigation.navigate('Search');  return; }
    if (tab === 'reels')   { navigation.navigate('Reels');   return; }
    if (tab === 'profile') { navigation.navigate('Profile'); return; }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.logo}>InstaLite</Text>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <TouchableOpacity><Text style={{ fontSize: 22 }}>🤍</Text></TouchableOpacity>
          <TouchableOpacity><Text style={{ fontSize: 22 }}>📨</Text></TouchableOpacity>
        </View>
      </View>

      {/* Loading */}
      {loading && (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#e1306c" />
          <Text style={styles.loadingText}>Loading posts from API…</Text>
        </View>
      )}

      {/* Error */}
      {error && !loading && (
        <View style={styles.centered}>
          <Text style={{ fontSize: 32 }}>⚠️</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={fetchPosts}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Feed */}
      {!loading && !error && (
        <FlatList
          data={posts}
          keyExtractor={item => String(item.id)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#e1306c" />
          }
          ListHeaderComponent={
            /* Stories */
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.storiesWrap}
              contentContainerStyle={styles.storiesContent}
            >
              {/* Your Story */}
              <View style={styles.storyItem}>
                <View style={{ position: 'relative', width: 64, height: 64 }}>
                  <Image source={{ uri: MY_AVATAR }} style={styles.yourAvatar} />
                  <View style={styles.plusBadge}>
                    <Text style={styles.plusText}>+</Text>
                  </View>
                </View>
                <Text style={styles.storyName} numberOfLines={1}>Your story</Text>
              </View>
              {STORIES.map(s => (
                <View key={s.id} style={styles.storyItem}>
                  <StoryRing active>
                    <Image source={{ uri: s.avatar }} style={styles.storyAvatar} />
                  </StoryRing>
                  <Text style={styles.storyName} numberOfLines={1}>{s.username}</Text>
                </View>
              ))}
            </ScrollView>
          }
          renderItem={({ item }) => (
            <PostCard post={item} onLike={handleLike} onSave={handleSave} />
          )}
        />
      )}

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        {[
          { id: 'home',    label: '🏠' },
          { id: 'search',  label: '🔍' },
          { id: 'add',     label: '➕' },
          { id: 'reels',   label: '▶️' },
          { id: 'profile', label: null },
        ].map(({ id, label }) => (
          <TouchableOpacity key={id} style={styles.navBtn} onPress={() => handleTabPress(id)}>
            {id === 'profile' ? (
              <View style={[styles.navAvatarWrap, activeTab === 'profile' && styles.navAvatarActive]}>
                <Image source={{ uri: MY_AVATAR }} style={styles.navAvatar} />
              </View>
            ) : (
              <Text style={[styles.navIcon, activeTab === id && styles.navIconActive]}>{label}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe:        { flex: 1, backgroundColor: '#fafafa' },

  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#fff', borderBottomWidth: 0.5, borderBottomColor: '#dbdbdb',
    paddingHorizontal: 14, paddingVertical: 10,
  },
  logo: { fontSize: 24, fontStyle: 'italic', fontWeight: '700', color: '#262626', fontFamily: 'serif' },

  centered:    { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  loadingText: { fontSize: 14, color: '#8e8e8e', marginTop: 8 },
  errorText:   { fontSize: 14, color: '#262626', textAlign: 'center', paddingHorizontal: 30 },
  retryBtn:    { marginTop: 8, backgroundColor: '#0095f6', paddingHorizontal: 28, paddingVertical: 10, borderRadius: 8 },
  retryText:   { color: '#fff', fontWeight: '600', fontSize: 14 },

  storiesWrap:    { backgroundColor: '#fff', borderBottomWidth: 0.5, borderBottomColor: '#dbdbdb', marginBottom: 2 },
  storiesContent: { paddingHorizontal: 12, paddingVertical: 12, gap: 14 },
  storyItem:      { alignItems: 'center', width: 72 },
  storyName:      { fontSize: 11, color: '#262626', marginTop: 5, textAlign: 'center', width: 70 },

  ringActive:   { width: 68, height: 68, borderRadius: 34, padding: 2.5, backgroundColor: '#e1306c', alignItems: 'center', justifyContent: 'center' },
  ringWhite:    { backgroundColor: '#fff', borderRadius: 31, padding: 2, alignItems: 'center', justifyContent: 'center' },
  ringInactive: { width: 68, height: 68, borderRadius: 34, borderWidth: 1, borderColor: '#dbdbdb', alignItems: 'center', justifyContent: 'center' },
  storyAvatar:  { width: 56, height: 56, borderRadius: 28 },

  yourAvatar: { width: 64, height: 64, borderRadius: 32, borderWidth: 1, borderColor: '#dbdbdb' },
  plusBadge:  { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#0095f6', borderRadius: 11, width: 22, height: 22, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#fff' },
  plusText:   { color: '#fff', fontSize: 16, fontWeight: '300', lineHeight: 20 },

  card:       { backgroundColor: '#fff', marginBottom: 2 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, paddingVertical: 10 },
  postAvatar: { width: 38, height: 38, borderRadius: 19 },
  username:   { fontWeight: '600', fontSize: 13.5, color: '#262626' },
  location:   { fontSize: 11.5, color: '#8e8e8e', marginTop: 1 },
  moreBtn:    { fontSize: 13, color: '#262626', letterSpacing: 2 },
  postImage:  { width: SCREEN_WIDTH, height: SCREEN_WIDTH },

  actionRow:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10 },
  actionIcon: { fontSize: 24, color: '#262626' },

  cardMeta:     { paddingHorizontal: 12, paddingBottom: 12 },
  likeCount:    { fontWeight: '600', fontSize: 13.5, color: '#262626', marginBottom: 5 },
  caption:      { fontSize: 13.5, color: '#262626', lineHeight: 20, marginBottom: 5 },
  viewComments: { fontSize: 13.5, color: '#8e8e8e', marginBottom: 4 },
  timeAgo:      { fontSize: 10, color: '#c7c7c7', letterSpacing: 0.5, textTransform: 'uppercase' },

  bottomNav:       { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', borderTopWidth: 0.5, borderTopColor: '#dbdbdb', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 8, paddingBottom: 16 },
  navBtn:          { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 },
  navIcon:         { fontSize: 26, opacity: 0.5 },
  navIconActive:   { opacity: 1 },
  navAvatarWrap:   { width: 30, height: 30, borderRadius: 15, overflow: 'hidden', borderWidth: 2, borderColor: 'transparent' },
  navAvatarActive: { borderColor: '#262626' },
  navAvatar:       { width: '100%', height: '100%' },
});
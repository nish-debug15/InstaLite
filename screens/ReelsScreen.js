// ReelsScreen.js
import React, { useState } from 'react';
import {
  View, Text, Image, FlatList, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar, Dimensions,
} from 'react-native';

const { width: W, height: H } = Dimensions.get('window');

const REELS = [
  { id: '1', username: 'rahulx0',  avatar: 'https://i.pravatar.cc/150?img=11', thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=90', caption: 'Sunrise from 4000m 🌄 #himalayas #travel', likes: '12.4K', comments: '342', audio: 'Original Audio – rahulx0' },
  { id: '2', username: 'meera.s',  avatar: 'https://i.pravatar.cc/150?img=47', thumbnail: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=90', caption: 'Jaipur colours 🌸 #jaipur #india', likes: '8.1K', comments: '201', audio: 'Kesariya – Brahmastra' },
  { id: '3', username: 'john_doe', avatar: 'https://i.pravatar.cc/150?img=33', thumbnail: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=90', caption: 'Golden hour forest walk 🌲 #nature', likes: '5.9K', comments: '98',  audio: 'Lo-fi Chill' },
  { id: '4', username: 'priya_21', avatar: 'https://i.pravatar.cc/150?img=48', thumbnail: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=90', caption: 'This valley is unreal 🏞️ #wanderlust', likes: '21K', comments: '534', audio: 'Tum Hi Ho – Arijit Singh' },
  { id: '5', username: 'aarav_k',  avatar: 'https://i.pravatar.cc/150?img=5',  thumbnail: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=90', caption: 'City lights at night ✨ #cityscape', likes: '9.3K', comments: '176', audio: 'Blinding Lights – The Weeknd' },
];

function ReelItem({ item }) {
  const [liked, setLiked] = useState(false);
  return (
    <View style={{ width: W, height: H }}>
      <Image source={{ uri: item.thumbnail }} style={StyleSheet.absoluteFill} resizeMode="cover" />
      <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.22)' }]} />

      {/* Right bar */}
      <View style={styles.rightBar}>
        <TouchableOpacity style={styles.rAction} onPress={() => setLiked(l => !l)}>
          <Text style={[styles.rIcon, liked && { color: '#ed4956' }]}>{liked ? '♥' : '♡'}</Text>
          <Text style={styles.rLabel}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rAction}>
          <Text style={styles.rIcon}>💬</Text>
          <Text style={styles.rLabel}>{item.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rAction}>
          <Text style={styles.rIcon}>📤</Text>
          <Text style={styles.rLabel}>Share</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom info */}
      <View style={styles.bottom}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <Image source={{ uri: item.avatar }} style={styles.reelAvatar} />
          <Text style={styles.reelUser}>{item.username}</Text>
          <View style={styles.followChip}><Text style={styles.followText}>Follow</Text></View>
        </View>
        <Text style={styles.reelCaption} numberOfLines={2}>{item.caption}</Text>
        <Text style={styles.audioLine}>🎵 {item.audio}</Text>
      </View>
    </View>
  );
}

export default function ReelsScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <FlatList
        data={REELS}
        keyExtractor={i => i.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
        renderItem={({ item }) => <ReelItem item={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rightBar:    { position: 'absolute', right: 12, bottom: 160, alignItems: 'center', gap: 22 },
  rAction:     { alignItems: 'center' },
  rIcon:       { fontSize: 28, color: '#fff' },
  rLabel:      { fontSize: 12, color: '#fff', marginTop: 2 },
  bottom:      { position: 'absolute', bottom: 60, left: 12, right: 76 },
  reelAvatar:  { width: 36, height: 36, borderRadius: 18, borderWidth: 2, borderColor: '#fff' },
  reelUser:    { fontSize: 14, fontWeight: '700', color: '#fff' },
  followChip:  { borderWidth: 1.5, borderColor: '#fff', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 3 },
  followText:  { fontSize: 12, fontWeight: '600', color: '#fff' },
  reelCaption: { fontSize: 13, color: '#fff', lineHeight: 18, marginBottom: 6 },
  audioLine:   { fontSize: 12, color: '#fff' },
});
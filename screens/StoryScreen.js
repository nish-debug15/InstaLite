import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, Image, TouchableOpacity, TouchableWithoutFeedback,
  StyleSheet, SafeAreaView, StatusBar, FlatList, Animated,
  Dimensions, Modal,
} from 'react-native';

const { width: W, height: H } = Dimensions.get('window');

const USERS = [
  {
    id: '1',
    username: 'alex.ray',
    avatar: 'https://i.pravatar.cc/150?img=1',
    stories: [
      { id: 's1', uri: 'https://picsum.photos/seed/s1/400/800' },
      { id: 's2', uri: 'https://picsum.photos/seed/s2/400/800' },
    ],
  },
  {
    id: '2',
    username: 'maya_k',
    avatar: 'https://i.pravatar.cc/150?img=5',
    stories: [
      { id: 's3', uri: 'https://picsum.photos/seed/s3/400/800' },
    ],
  },
  {
    id: '3',
    username: 'dev.jones',
    avatar: 'https://i.pravatar.cc/150?img=8',
    stories: [
      { id: 's4', uri: 'https://picsum.photos/seed/s4/400/800' },
      { id: 's5', uri: 'https://picsum.photos/seed/s5/400/800' },
      { id: 's6', uri: 'https://picsum.photos/seed/s6/400/800' },
    ],
  },
  {
    id: '4',
    username: 'luna.pics',
    avatar: 'https://i.pravatar.cc/150?img=9',
    stories: [
      { id: 's7', uri: 'https://picsum.photos/seed/s7/400/800' },
      { id: 's8', uri: 'https://picsum.photos/seed/s8/400/800' },
    ],
  },
  {
    id: '5',
    username: 'rj_shoots',
    avatar: 'https://i.pravatar.cc/150?img=12',
    stories: [
      { id: 's9', uri: 'https://picsum.photos/seed/s9/400/800' },
    ],
  },
];

const STORY_DURATION = 4000; // ms per story

// ─── Story Viewer ────────────────────────────────────────────────────────────

function StoryViewer({ user, onClose, onPrevUser, onNextUser }) {
  const [index, setIndex] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;
  const anim = useRef(null);

  const stories = user.stories;

  const startProgress = (idx) => {
    progress.setValue(0);
    anim.current?.stop();
    anim.current = Animated.timing(progress, {
      toValue: 1,
      duration: STORY_DURATION,
      useNativeDriver: false,
    });
    anim.current.start(({ finished }) => {
      if (finished) goNext();
    });
  };

  useEffect(() => {
    startProgress(index);
    return () => anim.current?.stop();
  }, [index]);

  const goNext = () => {
    if (index < stories.length - 1) {
      setIndex(i => i + 1);
    } else {
      onNextUser?.();
    }
  };

  const goPrev = () => {
    if (index > 0) {
      setIndex(i => i - 1);
    } else {
      onPrevUser?.();
    }
  };

  return (
    <View style={sv.root}>
      <StatusBar hidden />

      {/* Full screen image */}
      <Image
        source={{ uri: stories[index].uri }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />

      {/* Dark gradient overlay top */}
      <View style={sv.gradTop} pointerEvents="none" />
      {/* Dark gradient overlay bottom */}
      <View style={sv.gradBottom} pointerEvents="none" />

      {/* Progress bars */}
      <SafeAreaView style={sv.progressRow}>
        {stories.map((st, i) => (
          <View key={st.id} style={sv.track}>
            <Animated.View
              style={[
                sv.fill,
                {
                  width:
                    i < index
                      ? '100%'
                      : i === index
                      ? progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0%', '100%'],
                        })
                      : '0%',
                },
              ]}
            />
          </View>
        ))}
      </SafeAreaView>

      {/* User info */}
      <SafeAreaView style={sv.userRow} pointerEvents="none">
        <View style={sv.userInfo}>
          <Image source={{ uri: user.avatar }} style={sv.avatar} />
          <Text style={sv.username}>{user.username}</Text>
        </View>
      </SafeAreaView>

      {/* Close button */}
      <SafeAreaView style={sv.closeWrap}>
        <TouchableOpacity onPress={onClose} hitSlop={s.hit}>
          <Text style={sv.closeX}>✕</Text>
        </TouchableOpacity>
      </SafeAreaView>

      {/* Tap zones */}
      <View style={sv.tapLayer}>
        <TouchableWithoutFeedback onPress={goPrev}>
          <View style={sv.tapLeft} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={goNext}>
          <View style={sv.tapRight} />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const sv = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },

  gradTop: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 160,
    background: 'transparent',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  gradBottom: {
    position: 'absolute', bottom: 0, left: 0, right: 0, height: 100,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },

  progressRow: {
    position: 'absolute', top: 0, left: 0, right: 0,
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingTop: 52,
    gap: 4,
  },
  track: {
    flex: 1, height: 2.5,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  fill: { height: '100%', backgroundColor: '#fff', borderRadius: 2 },

  userRow: {
    position: 'absolute', top: 60, left: 0, right: 0,
    paddingHorizontal: 14,
    paddingTop: 10,
  },
  userInfo: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: { width: 36, height: 36, borderRadius: 18, borderWidth: 2, borderColor: '#fff' },
  username: { color: '#fff', fontWeight: '700', fontSize: 14 },

  closeWrap: {
    position: 'absolute', top: 60, right: 0,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  closeX: { color: '#fff', fontSize: 20, fontWeight: '300' },

  tapLayer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    marginTop: 100,
  },
  tapLeft: { flex: 1 },
  tapRight: { flex: 1 },
});

// ─── Story Bubble ─────────────────────────────────────────────────────────────

function StoryBubble({ user, onPress }) {
  return (
    <TouchableOpacity style={b.wrap} onPress={() => onPress(user)} activeOpacity={0.8}>
      <View style={b.ring}>
        <Image source={{ uri: user.avatar }} style={b.avatar} />
      </View>
      <Text style={b.name} numberOfLines={1}>{user.username}</Text>
    </TouchableOpacity>
  );
}

const b = StyleSheet.create({
  wrap: { alignItems: 'center', width: 72, marginHorizontal: 6 },
  ring: {
    width: 66, height: 66, borderRadius: 33,
    padding: 2.5,
    background: 'transparent',
    borderWidth: 2.5,
    borderColor: '#e1306c',
  },
  avatar: { width: '100%', height: '100%', borderRadius: 28 },
  name: { color: '#fff', fontSize: 11, marginTop: 5, textAlign: 'center' },
});

// ─── StoryScreen ─────────────────────────────────────────────────────────────

export default function StoryScreen() {
  const [activeUserIdx, setActiveUserIdx] = useState(null);

  const openStory = (user) => {
    const idx = USERS.findIndex(u => u.id === user.id);
    setActiveUserIdx(idx);
  };

  const closeViewer = () => setActiveUserIdx(null);

  const goNextUser = () => {
    if (activeUserIdx < USERS.length - 1) setActiveUserIdx(i => i + 1);
    else closeViewer();
  };

  const goPrevUser = () => {
    if (activeUserIdx > 0) setActiveUserIdx(i => i - 1);
    else closeViewer();
  };

  return (
    <View style={s.screen}>
      <StatusBar barStyle="light-content" />

      <SafeAreaView>
        <Text style={s.heading}>Stories</Text>
        <FlatList
          data={USERS}
          horizontal
          keyExtractor={u => u.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 10 }}
          renderItem={({ item }) => (
            <StoryBubble user={item} onPress={openStory} />
          )}
        />
      </SafeAreaView>

      {/* Full screen modal viewer */}
      <Modal
        visible={activeUserIdx !== null}
        animationType="fade"
        statusBarTranslucent
        onRequestClose={closeViewer}
      >
        {activeUserIdx !== null && (
          <StoryViewer
            user={USERS[activeUserIdx]}
            onClose={closeViewer}
            onNextUser={goNextUser}
            onPrevUser={goPrevUser}
          />
        )}
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0a0a0a' },
  heading: {
    color: '#fff', fontSize: 22, fontWeight: '700',
    paddingHorizontal: 16, paddingTop: 12,
  },
  hit: { top: 10, bottom: 10, left: 10, right: 10 },
});
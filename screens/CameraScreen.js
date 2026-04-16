import React, { useRef, useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, StatusBar, Alert, ActivityIndicator,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

export default function CameraScreen({ navigation }) {
  const { hasPermission, requestPermission } = useCameraPermission();
  const [permissionRequested, setPermissionRequested] = useState(false);
  const [cameraFacing, setCameraFacing] = useState('back');

  const device = useCameraDevice(cameraFacing);
  const camera = useRef(null);
  const [capturing, setCapturing] = useState(false);

  useEffect(() => {
    if (!hasPermission && !permissionRequested) {
      requestPermission();
      setPermissionRequested(true);
    }
  }, [hasPermission]);

  const toggleCamera = () =>
    setCameraFacing(f => (f === 'back' ? 'front' : 'back'));

  if (!hasPermission) {
    return (
      <SafeAreaView style={s.dark}>
        <View style={s.center}>
          <Text style={s.white}>Camera permission required</Text>
          <TouchableOpacity style={s.btn} onPress={requestPermission}>
            <Text style={s.btnTxt}>Grant Permission</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={s.back}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!device) {
    return (
      <SafeAreaView style={s.dark}>
        <View style={s.center}>
          <ActivityIndicator color="#fff" size="large" />
          <Text style={s.white}>No camera found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const takePhoto = async () => {
    if (!camera.current || capturing) return;
    setCapturing(true);
    try {
      const photo = await camera.current.takePhoto({ flash: 'off' });
      Alert.alert('Photo Taken', photo.path, [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setCapturing(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />

      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />

      {/* Top Bar */}
      <SafeAreaView style={s.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={s.white}>Close</Text>
        </TouchableOpacity>
      </SafeAreaView>

      {/* Bottom Bar */}
      <View style={s.bottomBar}>
        {/* Flip button left */}
        <TouchableOpacity style={s.flipBtn} onPress={toggleCamera}>
          <Text style={s.flipTxt}>🔄</Text>
        </TouchableOpacity>

        {/* Shutter center */}
        <TouchableOpacity
          style={[s.shutter, capturing && { opacity: 0.5 }]}
          onPress={takePhoto}
          disabled={capturing}
        >
          {capturing
            ? <ActivityIndicator color="#000" />
            : <View style={s.inner} />}
        </TouchableOpacity>

        {/* Spacer right for symmetry */}
        <View style={s.flipBtn} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  dark: { flex: 1, backgroundColor: '#000' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20 },

  white: { color: '#fff', fontSize: 16 },
  back: { color: '#aaa', marginTop: 10 },

  btn: {
    backgroundColor: '#0095f6',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
  },
  btnTxt: { color: '#fff', fontWeight: '700' },

  topBar: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    padding: 16,
  },

  bottomBar: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 30,
  },

  shutter: {
    width: 80, height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    width: 65, height: 65,
    borderRadius: 32,
    backgroundColor: '#fff',
  },

  flipBtn: {
    width: 50, height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipTxt: { fontSize: 28 },
});
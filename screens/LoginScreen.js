import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'

export default function LoginScreen({ navigation }) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {

    if (!username || !password) {
      alert("Please enter username and password")
      return
    }

    navigation.navigate("MainTabs")
  }

  return (
    <View style={styles.container}>

      <Image
        source={require('../assets/instagram_logo.jpeg')}
        style={styles.logo}
        resizeMode="contain"
      />

      <TextInput
        placeholder="Username, email or mobile number"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.signupText}>
          Don't have an account? <Text style={styles.signupLink}>Sign up</Text>
        </Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: 'white'
  },

  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 40
  },

  input: {
    borderWidth: 1,
    borderColor: '#dbdbdb',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
    backgroundColor: '#fafafa'
  },

  button: {
    backgroundColor: '#0095f6',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },

  signupText: {
    textAlign: 'center',
    marginTop: 20
  },

  signupLink: {
    color: '#0095f6',
    fontWeight: 'bold'
  }

})
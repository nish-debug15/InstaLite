import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';

export default function RegisterScreen({ navigation }) {

  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = () => {
    if (!contact || !password || !month || !day || !year || !name || !username) {
      alert("Please fill all fields");
      return;
    }

    alert("Account created successfully!");
    navigation.navigate("Login");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inner}>

        <Image
          source={require('../assets/instagram_logo.jpeg')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Get started on InstaLite</Text>

        <Text style={styles.subtitle}>
          Sign up to see photos and videos from your friends.
        </Text>

        {/* Contact */}
        <Text style={styles.label}>Mobile number or email</Text>

        <TextInput
          placeholder="Mobile number or email"
          style={styles.input}
          value={contact}
          onChangeText={setContact}
        />

        {/* Password */}
        <Text style={styles.label}>Password</Text>

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        {/* Birthday */}
        <Text style={styles.label}>Birthday</Text>

        <View style={styles.row}>

          <TextInput
            placeholder="Month"
            style={styles.birthdayInput}
            value={month}
            onChangeText={setMonth}
          />

          <TextInput
            placeholder="Day"
            style={styles.birthdayInput}
            value={day}
            onChangeText={setDay}
          />

          <TextInput
            placeholder="Year"
            style={styles.birthdayInput}
            value={year}
            onChangeText={setYear}
          />

        </View>

        {/* Name */}
        <Text style={styles.label}>Name</Text>

        <TextInput
          placeholder="Full name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        {/* Username */}
        <Text style={styles.label}>Username</Text>

        <TextInput
          placeholder="Username"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        {/* Login Navigation */}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.secondaryText}>
            I already have an account
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },

  inner: {
    padding: 25
  },

  logo: {
    width: 120,
    height: 60,
    alignSelf: 'center',
    marginBottom: 20
  },

  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center'
  },

  subtitle: {
    textAlign: 'center',
    color: '#555',
    marginBottom: 25
  },

  label: {
    fontWeight: '600',
    marginBottom: 6
  },

  input: {
    borderWidth: 1,
    borderColor: '#dbdbdb',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
    backgroundColor: '#fafafa'
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },

  birthdayInput: {
    borderWidth: 1,
    borderColor: '#dbdbdb',
    padding: 12,
    borderRadius: 6,
    backgroundColor: '#fafafa',
    width: '31%'
  },

  button: {
    backgroundColor: '#0095f6',
    padding: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600'
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10
  },

  secondaryText: {
    color: '#333'
  }

});
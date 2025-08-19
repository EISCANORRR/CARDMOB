import React, {useState} from "react";

import { View, TextInput, Button, StyleSheet, Text} from "react-native";

export default function LoginScreen({navigation}: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      console.log('Login ok');
    } catch (err: any) {
      setError(err);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Email:</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none"/>
      <Text>Email:</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} autoCapitalize="none"/>
      { error ? <Text style={{ color: 'red'}}>{error}</Text> : null }
      <Button title="Entrar" onPress={handleLogin}></Button>
      <Button title="Registrar" onPress={() => navigation.navigate('Register')}></Button>
    </View>    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 12,
  }
})
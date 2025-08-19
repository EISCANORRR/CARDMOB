import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useTheme } from '../contexts/ThemeContext';

function HomeScreen({ navigation }: any) {
    const { theme, toggleTheme } = useTheme(); 
    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <Text style={{ color: theme.colors.text, marginBottom: theme.spacing(1)}}>Home Screen</Text>
            <Button title="Alternar Tema" color={theme.colors.primary} onPress={toggleTheme}/>
            <Button title="Ir para Detalhes" onPress={() => navigation.navigate('Details')}/>
            <Button title="Login" onPress={() => navigation.navigate('Login')}/>
        </View>
    );
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
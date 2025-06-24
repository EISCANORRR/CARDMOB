import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TextInput, FlatList, Alert } from 'react-native';

// Endereço base do backend
const BASE_URL = 'http://10.81.205.39:5000';

export default function App() {
  // Estados principais para manipulação do catálogo
  const [lista, setLista] = useState([]); // Lista de produtos trazidos do backend
  const [nome, setNome] = useState(''); // Nome do novo produto
  const [preco, setPreco] = useState(null); // Preço do novo produto
  const [descricao, setDescricao] = useState(''); // Descrição do novo produto

  // Estados para edição de produtos
  const [editItemId, setEditItemId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState(null);
  const [editDescription, setEditDescription] = useState('');

  const [loading, setLoading] = useState(false); // Estado de carregamento

  // Buscar todos os itens do catálogo
  const fetchCompras = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/catalog?page=1`);
      const data = await response.json();
      setLista(data.catalog);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompras();
  }, []);

  // Criar novo item no catálogo
  const addItem = async () => {
    try {
      if (nome.trim() === '' || preco === null || descricao.trim() === '') {
        return;
      }
      const response = await fetch(`${BASE_URL}/api/catalog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: nome.trim(), description: descricao.trim(), price: Number(preco) }),
      });
      if (response.ok) {
        await fetchCompras();
        setNome('');
        setDescricao('');
        setPreco('');
      } else {
        console.error('Failed to add item:', response.status);
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  // Atualizar item existente
  const updateItem = async (id) => {
    try {
      if (editName.trim() === '' || editPrice === null || editDescription.trim() === '') {
        return;
      }
      const response = await fetch(`${BASE_URL}/api/catalog/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editName.trim(), description: editDescription.trim(), price: Number(editPrice) }),
      });
      if (response.ok) {
        await fetchCompras();
      } else {
        console.error('Failed to update item:', response.status);
      }
    } catch (error) {
      console.error('Error updating item:', error);
    } finally {
      setEditItemId(null);
      setEditName('');
      setEditDescription('');
      setEditPrice('');
    }
  };

  // Excluir item
  const deleteItem = async (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this item ?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const response = await fetch(`${BASE_URL}/api/catalog/${id}`, {
                method: 'DELETE'
              });
              if (response.ok) {
                await fetchCompras();
              } else {
                console.error('Failed to delete item:', response.status);
              }
            } catch (error) {
              console.error('Error deleting item:', error);
            }
          },
        }
      ],
      { cancelable: true }
    );
  };

  // Renderização dos itens (normal ou em modo de edição)
  const renderItem = ({ item }) => {
    if (item.id !== editItemId) {
      return (
        <View style={styles.item}>
          <Image source={{ uri: item.image }} style={{ width: 200, height: 200 }} />
          <Text style={styles.itemText}>{item.name}</Text>
          <Text style={styles.itemText}>{item.description}</Text>
          <Text style={styles.itemText}>{Number(item.price)}</Text>
          <View style={styles.buttons}>
            <Button title='Edit' onPress={() => {
              setEditItemId(item.id);
              setEditName(item.name);
              setEditPrice(item.price);
              setEditDescription(item.description);
            }} />
            <Button title='Delete' onPress={() => deleteItem(item.id)} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.item}>
          <TextInput
            style={styles.editInput}
            onChangeText={setEditName}
            value={editName}
          />
          <TextInput
            style={styles.editInput}
            onChangeText={setEditDescription}
            value={editDescription}
          />
          <TextInput
            style={styles.editInput}
            keyboardType="numeric"
            onChangeText={(text) => {
              const numericText = text.replace(/[^0-9.]/g, '');
              setEditPrice(numericText);
            }}
            value={editPrice?.toString()}
          />
          <Button title='Update' onPress={() => updateItem(item.id)} />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Inputs para novo item */}
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder='Enter name'
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={preco}
        onChangeText={(text) => {
          const numericText = text.replace(/[^0-9]/g, '');
          setPreco(Number(numericText));
        }}
        placeholder='Enter price'
      />
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        placeholder='Enter description'
      />
      <Button title='Add Item' onPress={addItem} />

      {/* Lista de itens */}
      <FlatList
        data={lista}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 60,
  },
  text: {
    fontSize: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  list: {
    marginTop: 20,
  },
  item: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  itemText: {
    flex: 1,
    marginRight: 10,
  },
  buttons: {
    flexDirection: 'row',
  },
  editInput: {
    flex: 1,
    marginRight: 10,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

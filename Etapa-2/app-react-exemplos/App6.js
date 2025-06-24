import React, { useState, useEffect } from 'react'; // novo: useEffect
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TextInput, FlatList, Alert } from 'react-native'; // novo: Alert

// Indicar o endereço do backend.
const BASE_URL = 'http://10.81.205.39:3000'; // novo

export default function App() {
  // Excluir tudo que tem relação com counter, pois não usar.
  /// CRUD em memória
  const [listaCompras, setListaCompras] = useState([]);
  const [novoItem, setNovoItem] = useState('');
  const [novaQuantidade, setNovaQuantidade] = useState('');
  const [editCompraId, setEditCompra] = useState(null);
  const [editItem, setEditItem] = useState('');
  const [editQuantidade, setEditQuantidade] = useState('');
  // loading ... efeito de carregando...
  const [loading, setLoading] = useState(false); // novo

  // Buscar tudo.
  const fetchCompras = async () => {
    setLoading(true);
    try {
      // executa o que precisa, se der erro entra no catch.
      const response = await fetch(`${BASE_URL}/compras`);
      const data = await response.json();
      console.log(JSON.stringify(data)); // debug
      setListaCompras(data);
      
    } catch (error) {
      // quando ocorre algum erro.
      console.error('Error fetching items:', error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCompras();
  }, [])


  // CREATE
  const addCompra = async () => {
    if (novoItem.trim() === '' || novaQuantidade.trim() === '' ) {
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/compras`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({item: novoItem.trim(), quant: novaQuantidade.trim()}),
      });
      if (response.ok) {
        await fetchCompras();
        setNovoItem('');
        setNovaQuantidade('');
      }
      else {
        console.error('Failed to add item:', response.status);
      }
    } 
    catch (error) {
      console.error('Error adding item:', error);
    }

  }

  // UPDATE
  const updateCompra = async (id) => {
    try {
      if (editItem.trim() === '' || editQuantidade.trim() === '' ) {
        return;
      }
      const response = await fetch(`${BASE_URL}/compras/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({item: editItem.trim(), quant: editQuantidade.trim()}),
      });
      if (response.ok) {
        await fetchCompras();
        setEditCompra(null);
        setEditItem('');
        setEditQuantidade('');
      }
      else {
        console.error('Failed to update item:', response.status);
      }
    }
    catch (error) {
      console.error('Error updating item:', error)
    }

  }

  // DELETE
  const deleteCompra = async (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this item ?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete',
          onPress: async () => {
            try {
              const response = await fetch(`${BASE_URL}/compras/${id}`, {
                method: 'DELETE'
              });
              if (response.ok) {
                await fetchCompras();
              }
              else {
                console.error('Failed to delete item:', response.status);
              }
            }
            catch (error) {
              console.error('Error deleting item:', error);
            }
          }, 
        }
      ],
      { cancelable: true }
    );
  };

  // READ -> um único item e/ou lista de itens
  const renderItem = ({item}) => {
    if (item.id != editCompraId) {
      return (
        <View style={styles.item}>
          <Text style={styles.itemText}>{item.item}</Text>
          <Text style={styles.itemText}>{item.quant}</Text>
          <View style={styles.buttons}>
            <Button title='Edit' onPress={() => { setEditCompra(item.id), setEditItem(item.item), setEditQuantidade(item.quant);}}></Button>
            <Button title='Delete' onPress={() => {deleteCompra(item.id)}}></Button>
          </View>
        </View>
      );

    } else {
      // Um item esta sendo editado

      return (
        <View style={styles.item}>
          <TextInput 
            style={styles.editInput}
            onChangeText={setEditItem}
            value={editItem}
            autoFocus
          />
          <TextInput 
            style={styles.editInput}
            onChangeText={setEditQuantidade}
            value={editQuantidade}
            autoFocus
          />
          <Button title='Update' onPress={() => updateCompra(item.id)}></Button>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input}
        value={novoItem}
        onChangeText={setNovoItem}
        placeholder='Coloque o item'
      />
      <TextInput 
        style={styles.input}
        value={novaQuantidade}
        onChangeText={setNovaQuantidade}
        placeholder='Coloque a quantidade'
      />
      <Button 
        title='Add Compra'
        onPress={addCompra}
      />
      <FlatList
        data={listaCompras}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
      <Image 
        source={{uri: "https://picsum.photos/200"}}
        style={{width: 200, height: 200}}
      />

      <StatusBar style="auto" />
      {/* <Text style={styles.text}>Counter: {counter}</Text>

      <View style={styles.buttonContainer}>
        <Button title='Increment' onPress={incrementCounter} />
        <Button title='Decrement' onPress={decrementCounter} />
      </View> */}
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
    flexDirection: 'row',
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
  }
});

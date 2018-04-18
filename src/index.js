//import liraries
import React, { Component } from 'react';
import { View, 
        ScrollView,
         Image,
         Text, 
         StyleSheet,
         Button,        
 } from 'react-native';

 import api from './services/api';

// create a component
 class App extends Component { 

    state = {
        errorMessage: null,
        produtos: [],
        message: 'teste',
    };

    getProdutoList = async () => {
        try {
            console.log("press lap");
           
            const response = await api.get('/product_cells_by_category_filtered?categoryId=358434');
  
            if (!this.state.isRunning) {
                this.setState({
                    produtos: []
                }) 
              }
            const { produtos } = response.data;            
            this.setState({ produtos: response.data });
        } catch (response) {
            this.setState({ errorMessage: response.data.error });
        }        
    };

    render() {
        return (
            <View style={styles.container}>
            <ScrollView >
                <View style={styles.header}>
                    <Text style={{textAlign: 'center', color: 'white'}}> Lojas Americanas </Text>
                </View>    
                <Button onPress={this.getProdutoList} title="Carregar Produtos" />                  
                {                  
                    this.state.produtos.map((produto) => (
                    <View style={styles.box} key={produto.prodId}> 
                                               
                         <Image
                            style={{width: 150, height: 150}}
                            source={{uri: produto.image}}
                            /> 
                         <Text style={{fontSize: 15, fontStyle: 'italic'}}> {produto.name}</Text>
                         <Text> </Text>    
                         <Text> {produto.price}</Text>    
                    </View>    
                    ))
                }
            </ScrollView>
            </View>
        );
    }
} 

// define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        flex: 1,
        justifyContent: 'space-around',
      },
    list: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    box: {
        flex: 1,
        backgroundColor: '#FFF',
        height: 250,
        borderColor: '#999',
        borderWidth: 2,
        margin: 10,
    },
    header: {
        height: 60,
        backgroundColor: 'red',
        paddingHorizontal: 20,
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'space-between',        
    }
});

//make this component available to the app
export default App;

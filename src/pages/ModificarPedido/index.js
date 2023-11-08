import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function CadastrarPedido({route}) {
    const [nomePet, setNomePet] = useState('')
    const [horarioPasseio, setHorarioPasseio] = useState('');
    const [telefone,setTelefone] = useState('');
    const [id, setId] = useState(0);
    const {username, itemId} = route.params;
        const navigation = useNavigation();

    const cadastrar = async () =>{
        if(!nomePet || !telefone || !horarioPasseio){
            Alert.alert('Preencher campos', 'Existem campos que não foram preenchidos');
        }
        else{
            try {

                const jsonArray = await AsyncStorage.getItem('passeios' + username);
                const convertedArray = JSON.parse(jsonArray);
                let array = [];
                for(let i = 0; i < convertedArray.length; i++){

                    if(convertedArray[i].id === itemId){
                        convertedArray[i].nomePet = nomePet;
                        convertedArray[i].horarioPasseio = horarioPasseio;
                        convertedArray[i].telefone = telefone;
                    }

                    array.push(convertedArray[i]);
                }

                const jsonValue = JSON.stringify(array);
                const response = await AsyncStorage.setItem('passeios' + username, jsonValue);
                console.log(jsonValue);
                if(response !== null) {
                    Alert.alert('Cadastro efetuado com sucesso!');
                    navigation.navigate('PetLove', {username, id});
                };
                
                
            } catch (error) {
                console.error(error);
            }
        }
    }
    return(
        <View style={styles.container}>
            <Animatable.View animation={"fadeInLeft"} delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Pedido</Text>
            </Animatable.View>

            <Animatable.View animation={'fadeInUp'} style={styles.containerForm}>
                <ScrollView style={{marginTop: 15}} showsVerticalScrollIndicator={false}>

                    <Text style={styles.title}>Nome do Pet</Text>
                    <TextInput placeholder='Username' style={styles.input}  value={nomePet} onChangeText={setNomePet}></TextInput>

                    <Text style={styles.title}>Horário do Passeio</Text>
                    <TextInput placeholder='Horario do passeio' style={styles.input} onChangeText={setHorarioPasseio}></TextInput>

                    <Text style={styles.title}>Telefone</Text>
                    <TextInput placeholder='Telefone' style={styles.input} onChangeText={setTelefone}></TextInput>

                    <Text style={styles.title}>Id</Text>
                    <TextInput placeholder='Telefone' style={styles.input} onChangeText={setId}></TextInput>

                    <TouchableOpacity style={styles.button} onPress={() =>{cadastrar()}}>
                        <Text style={styles.buttonText}>Modificar Pedido</Text>
                    </TouchableOpacity>
                </ScrollView>

            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#38a69d'
    },
    containerHeader: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',
    },
    message: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff'
    },
    containerForm: {
        backgroundColor: '#fff',
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    title: {
        fontSize: 20,
        marginTop: 28,
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
    },
    picker:{
        fontSize:40
    },  
    button: {
        backgroundColor: '#38a69d',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        marginBottom: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    }

})

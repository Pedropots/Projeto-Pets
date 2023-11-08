import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Deletar({route}) {

    const {itemId, username, toggle} = route.params;
    const navigation = useNavigation();
    const untoggle = !toggle;
    const deletar = async () =>{
        try {
            const jsonArray = await AsyncStorage.getItem('passeios' + username);
            const convertedArray = JSON.parse(jsonArray);
            let array = [];
            console.log(array);
            console.log(itemId);

            for(let i = 0; i < convertedArray.length; i++){
                array.push(convertedArray[i]);
            }
            console.log(array);

            for(let i = 0; i < array.length; i++){
                if(array[i].id === itemId){
                    console.log(array[i]);
                    array.splice(i,1);
                    break;
                }
            }
            console.log(array);

            const jsonValue = JSON.stringify(array);
            const response = await AsyncStorage.setItem('passeios' + username, jsonValue);
            console.log(jsonValue);
            if(response !== null) {
                Alert.alert('Pedido deletado com sucesso!');
                navigation.navigate('PetLove', {username, untoggle});
            };


        } catch (error) {
            console.error(error);
        }
    }

    return(
        <View style={styles.container}>
            <Animatable.View animation={"fadeInLeft"} delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Você tem certeza que deseja deletar esse pedido ?</Text>
            </Animatable.View>

            <Animatable.View animation={'fadeInUp'} style={styles.containerForm}>
                    <TouchableOpacity style={styles.buttonDeletar} onPress={deletar}>
                        <Text style={styles.buttonText}>Deletar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('PetLove', {username, untoggle})}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
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
        flex:2,
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',

    },
    message: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff'
    },
    containerForm: {
        backgroundColor: '#fff',
        flex: 1,
        alignContent:'center',
        justifyContent: 'center',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
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
    buttonDeletar: {
        backgroundColor: 'red',
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

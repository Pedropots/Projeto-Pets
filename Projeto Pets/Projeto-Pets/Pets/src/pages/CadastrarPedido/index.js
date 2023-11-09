import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Button } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import nextId from "react-id-generator";
import DateTimePicker from '@react-native-community/datetimepicker';




export default function CadastrarPedido({route}) {
    
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
    };
    
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
    
    const showDatepicker = () => {
      showMode('date');
    };
    
    const showTimepicker = () => {
      showMode('time');
    };      
    const [nomePet, setNomePet] = useState('')
    const [telefone,setTelefone] = useState('');
    const {username, toggle} = route.params;
   
    const untoggle = !toggle
    const navigation = useNavigation();

    const cadastrar = async () =>{
        if(!nomePet || !telefone){
            Alert.alert('Preencher campos', 'Existem campos que não foram preenchidos');
        }
        else{

                let dateTime = date.toLocaleString();
                let dateTimeConverted = dateTime.split(' ')
                let dia = dateTimeConverted[0];
                let time = dateTimeConverted[1];
                let timeSplited = time.split(':');
                let hour = timeSplited[0];
                let minutes = timeSplited[1];
            try {
                let id = nextId();
                stringId = id.toString();
                const data  = {
                id: stringId,
                dataInteira: date,
                nomePet: nomePet,
                data: dia,
                horarioPasseio: hour + ':' + minutes,
                telefone: telefone,
                };

                let array = [];
                const jsonArray = await AsyncStorage.getItem('passeios' + username);
                if (jsonArray === null || jsonArray === undefined) {
                    array.push(data);
                }else{

                    const convertedArray = JSON.parse(jsonArray);
                    for(let i = 0; i < convertedArray.length; i++){
                        array.push(convertedArray[i]);
                    }
                    array.push(data);
                }
                const jsonValue = JSON.stringify(array);
                const response = await AsyncStorage.setItem('passeios' + username, jsonValue);
                console.log(jsonValue);
                if(response !== null) {
                    Alert.alert('Cadastro efetuado com sucesso!');
                    navigation.navigate('PetLove', {username, untoggle});
                };
            } catch (error) {
                console.error(error);
            }
        }
    }
    return(
        <View style={styles.container}>
            <Animatable.View animation={"fadeInLeft"} delay={500} style={styles.containerHeader}>
                <Text style={styles.message}> Cadastrar Pedido</Text>
            </Animatable.View>
            <Animatable.View animation={'fadeInUp'} style={styles.containerForm}>
                <ScrollView style={{marginTop: 15}} showsVerticalScrollIndicator={false}>
                    <Text style={styles.title}>Nome do Pet</Text>
                    <TextInput placeholder='Nome do Pet' style={styles.input}  value={nomePet} onChangeText={setNomePet}></TextInput>
                    <Text style={styles.title}>Telefone</Text>
                    <TextInput placeholder='Telefone' inputMode='tel' style={styles.input} onChangeText={setTelefone}></TextInput>
                    <TouchableOpacity style={styles.button} onPress={showDatepicker}>
                        <Text style={styles.buttonText}>Escolha a data</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={showTimepicker}>
                        <Text style={styles.buttonText}>Escolha um horário</Text>
                    </TouchableOpacity>
                    {show && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChange}
                        />
                        )}
                    <TouchableOpacity style={styles.button} onPress={() =>{cadastrar()}}>
                        <Text style={styles.buttonText}>Cadastrar Pedido</Text>
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

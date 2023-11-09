import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function SignUp() {
    const [username, setUsername] = useState('')
    const [senha, setSenha] = useState('');
    const [selectedConta, setSelectedConta] = useState('');
    const [CPF, setCPF] = useState('');
    const [email, setEmail] = useState('')
    const data = {
        senha:senha,
        selectedConta:selectedConta,
        CPF:CPF,
        email:email
    };
    const navigation = useNavigation();

    

    const cadastrar = async () =>{
        if(!username || !senha || !selectedConta || !CPF || !email ){
            Alert.alert('Preencher campos', 'Existem campos que não foram preenchidos');
        }
        else{
            try {
                const jsonValue = JSON.stringify(data);
                await AsyncStorage.setItem(username, jsonValue);
                Alert.alert('Cadastro efetuado com sucesso!')
                navigation.navigate('SignIn');
            } catch (error) {
                console.error(e)
            }
        }
    }

    return(
        <View style={styles.container}>
            <Animatable.View animation={"fadeInLeft"} delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Cadastro</Text>
            </Animatable.View>

            <Animatable.View animation={'fadeInUp'} style={styles.containerForm}>
                <ScrollView style={{marginTop: 15}} showsVerticalScrollIndicator={false}>

                    <Text style={styles.title}>Username</Text>
                    <TextInput placeholder='Username' style={styles.input}  value={username} onChangeText={setUsername}></TextInput>

                    <Text style={styles.title}>Senha</Text>
                    <TextInput placeholder='Password' style={styles.input} secureTextEntry={true} value={senha} onChangeText={setSenha}></TextInput>

                    <Text style={styles.title}>E-mail</Text>
                    <TextInput placeholder='E-mail' inputMode = 'email' style={styles.input} value={email} onChangeText={setEmail}></TextInput>

                    <Text style={styles.title}>CPF</Text>
                    <TextInput placeholder='CPF'  inputMode='numeric' style={styles.input} onChangeText={setCPF}></TextInput>

                    <Text style={styles.title}>Endereço</Text>
                    <TextInput placeholder='Endereço' style={styles.input}></TextInput>

                    <Text style={styles.title}>Tipo de conta</Text>
                    <Picker
                        selectedValue={selectedConta}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedConta(itemValue)
                        }>
                        <Picker.Item label="Escolha..." value={null} />
                        <Picker.Item label="Pet Walker" value="PetWalker" />
                        <Picker.Item label="Pet Lover" value="PetLover" />
                    </Picker>



                    <TouchableOpacity style={styles.button} onPress={cadastrar}>
                        <Text style={styles.buttonText}>Cadastrar</Text>
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

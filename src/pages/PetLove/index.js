import React, { useEffect,useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Menu from '../Menu/Menu';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PetLove ({route}) {

    const navigation = useNavigation();
    const {username} = route.params;
    const[info, setInfo] = useState([]); 

     
    useEffect(()=>{
        const getData = async (username) =>{
            const jsonValue = await AsyncStorage.getItem('passeios' + username);
            const data = JSON.parse(jsonValue);
            setInfo(info => [...info,{
                id: data.id,
                nomePet:data.nomePet,
                horarioPasseio: data.horarioPasseio,
                telefone: data.telefone
                
            }]
            )
        }
        getData(username);
    },[])

    const deletar = (id)=>{

    }

    const modificarPedido = (id) =>{
        navigation.navigate('ModificarPedido');
    }


    return (
        <View style={styles.container}>
            <Animatable.View style={styles.containerHeader} delay={600} animation={'fadeInLeft'}>
                <Text style={styles.message}>Passeios</Text>
            </Animatable.View>

            <Animatable.View style={styles.containerPasseios} animation={'fadeInUp'}>
                <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('CadastrarPedido', {username})}>
                    <Text style={styles.buttonText}>Adicionar Pedido</Text>
                </TouchableOpacity>
                <FlatList
                    style={styles.title}
                    data={info}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <>
                            <Animatable.View animation={'bounceIn'} delay={600} style={styles.passeioText}>
                                <Text>{item.nomePet}</Text>
                                <Text>{item.horarioPasseio}</Text>
                                <Text>{item.telefone}</Text>
                            </Animatable.View>
                            <View style={{display: 'flex',flexDirection: 'row-reverse', justifyContent:'space-between'}}>
                            <TouchableOpacity onPress={()=> deletar(item.id)}>
                                <Text style={{color:'red'}}>Deletar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() =>modificarPedido(item.id)}>
                                <Text style={{color:'green'}}>Modificar</Text>
                            </TouchableOpacity>
                            </View>
                        </>
                    )}
                    />
            </Animatable.View>
            
            <Menu username ={username}/>
        </View>
    )
}
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#38a69d',
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
    containerPasseios: {
        backgroundColor: '#fff',
        flex: 10,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    title: {
        marginTop: 28,
    },
    passeioText: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#a1a1',
        borderRadius: 10,
        marginTop: 3,
        marginBottom: 3,
        paddingTop: "3%",
        paddingBottom: "3%",
        paddingStart: "5%"
    },
    button: {
        backgroundColor: '#38a69d',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        marginBottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    }
});
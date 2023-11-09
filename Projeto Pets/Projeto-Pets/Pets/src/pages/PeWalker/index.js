import React, { useEffect, useState } from "react";
import { View, Text,FlatList, StyleSheet} from 'react-native'
import * as Animatable from 'react-native-animatable';
;

import { styles } from "../PetLove";


export default function PetWalker() {
    return (
        <View style={styles.container}>
            <Animatable.View style={styles.containerHeader}>
                <Animatable.Text style={styles.message}>PetWalker</Animatable.Text>
            </Animatable.View>

            <Animatable.View style={{flex: 1, backgroundColor:'#ff0'}}>
                <FlatList
                    data={pedidos}
                    keyExtractor={(item) => item.loverCPF.toString()}
                    renderItem={({item}) => (
                        <View style = {{backgroundColor: '#000'}}>
                            <Text>Username: {item.username}</Text>
                            <Text>CPF: {item.loverCPF}</Text>
                            <Text>Senha: {item.senha}</Text>

                        </View>
                    )}
                />


                
            </Animatable.View>
        </View>
    )
}
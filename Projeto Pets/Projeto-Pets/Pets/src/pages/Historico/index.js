import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from "react-native";
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome'

import Menu from "../Menu/Menu";

export default function Historico() {
    const data = [
        { id: '1', title: 'Item 1' },
        { id: '2', title: 'Item 2' },
        { id: '3', title: 'Item 3' },
        { id: '4', title: 'Item 4' },
        { id: '5', title: 'Item 5' },
        { id: '6', title: 'Item 6' },
        { id: '7', title: 'Item 7' },
    ];
    return (
        <View style={styles.container}>
            <Animatable.View style={styles.containerHeader} delay={600} animation={'fadeInLeft'}>
                <Text style={styles.message}>Histórico</Text>
            </Animatable.View>

            <Animatable.View style={styles.containerHistorico} animation={'fadeInRight'}>
            <FlatList
                    style={styles.title}
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity>
                            <Animatable.Text animation={'bounceIn'} delay={600} style={styles.passeioText}>
                                {item.title}
                            </Animatable.Text>
                        </TouchableOpacity>
                    )}
                />
            </Animatable.View>
            <Menu/>
        </View>

    )
}

const styles = StyleSheet.create({
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
    containerHistorico: {
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
      
});

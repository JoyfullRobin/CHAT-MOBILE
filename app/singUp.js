import react from react
import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from "react-native";
import React, { useRef, useState } from "react";
//importa funçoes para criar layouts responsivos com base no tamanho da tela
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from "expo-status-bar";
import {Feather, Octicons} from '@expo/vector-icons';
//importa o hook de navegação de expo-router para navegação entre telas 
import { useRouter } from "expo-router";
import Loading from '../components/Loading'; //componente personalizado
import { useAuth } from '../context/authContext';

export default function SingUp(){
    const router = useRouter();
    const {register} = useAuth();
    const [loading,serLoading] = useState(false);

    const emailRef = useRef("");
    const passWordRef = useRef("");
    const usernameRef = useRef("");
    const profileRef = useRef("");

    const handleLogin = async () => {
        if (!emailRef.current || !passWordRef.current || !usernameRef.current || !profileRef.current)
        Alert.alert('Sing Up', "Por favor, preencha todos os campos");
        return;
    }
    setLoading(true);

    
}
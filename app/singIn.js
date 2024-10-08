import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from "react-native";
// importa o react, hooks de estado e referencias para gerenciar os inputs e estado de carregamento
import React, { useRef, useState } from "react";
//importa funçoes para criar layouts responsivos com base no tamanho da tela
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
//importa o componente  StatusBar para controlar a barra de status
import { StatusBar } from "expo-status-bar";
//imoporta icones do pacote expo, como icone de email e cadeado paraa senha
import { Octicons } from '@expo/vector-icons'
//importa o hook de navegação de expo-router para navegação entre telas 
import { useRouter } from "expo-router";
//importa componentes personalizados, como carregamento (loading) e o gerenciamento de teclado customizado
import Loading from '../components/Loading';
import CustomKeyboardView from '../components/CustomKeyboardView';
//importa o contexto de autenticação para gerenciar o login 
import { useAuth } from '../context/authContext';


//função de componente para a tela de login
export default function SignIn() {
    //Hook de navegação para redirecionar o usuario apos o login
    const router = useRouter();
    //useState para gerenciar o estado de carregamento (loading) enquanto o login é processado
    const [loading, setLoading] = useState(false);
    //Hook do contexto de autenticação, que inclui a função de login 
    const { login } = useAuth();

    //useRef cria referencias para os inputs de email e senha
    const emailRef = useRef("");
    const passWordRef = useRef("");

    //função que lida com processo de login 
    const handleLogin = async () => {
        //verifica se os campos de email e senha estão preenchidos 
        if (!emailRef.current || !passWordRef.current) {
            Alert.alert('Sing In', "Por favor preecha todos os campos");
            return;

        }
        //ativa o estado de carregamento e tenta fazer o login com os dados fornecidos
        setLoading(true);
        const response = await login(emailRef.current, passWordRef.current);
        setLoading(false);

        //se o login falhar, exibe uma mensagem de erro
        if (!response.success) {
            Alert.alert('Sing In', response.msg)
        }

    }
    return (
        //View customizada para ajustar o layout do teclado ao campo de entrada de texto
        <CustomKeyboardView>
            <StatusBar style="dark" />
            <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }} classname="flex-1 gap-12">
                <View classname="items-center">
                    <Imagem style={{ height: hp(25) }} rizeMode='contain' source={require('../assets/images/login.png')} />
                </View>
                <View classname="gap-10">
                    <Text style={{ fontSize: hp(4) }} classname="font-bold tracking-winder text-center text-neutral-800">Login</Text>
                    <View classname="gap-4">
                        <View style={{ fontSize: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-x1">
                            <Octions name="mail" size={hp(2.7)} color="gray" />
                            <TextInput
                                onChangeText={value => emailRef.current = value}
                                style={{ fontSize: hp(2) }}
                                className="flex-1 font-semibold text-neutral-700"
                                placeholder='Email addres'
                                placeholderTextColor={'gray'}
                            />
                        </View>
                        <View className="gap-3">
                            <View style={{ fontSize: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-x1">
                                <Octions name="Password" size={hp(2.7)} color="gray" />
                                <TextInput
                                    onChangeText={value => passWordRef.current = value}
                                    style={{ fontSize: hp(2) }}
                                    className="flex-1 font-semibold text-neutral-700"
                                    placeholder='Password'
                                    secureTextEntry
                                    placeholderTextColor={'gray'}
                                />
                            </View>
                        </View>
                        <View>
                            {
                                loading ? (
                                    <View className="flex-row justify-center">
                                        <Loading size={hp(6.5)} />
                                    </View>
                                ) : (
                                    <TouchableOpacity onPress={handleLogin} style={{ height: hp(6.5) }} className="bg-indig-500 rounded">
                                        <Text style={{ fontSize: hp(2.7) }} className="text-white font-bold tracking-wider">Login</Text>
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                        <View className="flex-row justify-center">
                            <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-neutral-500">Não possui uma conta?</Text>
                            <Pressable onPress={() => router.push('singUp')}>
                                <Text style={{ fontSize: (1.8) }} className="font-bold text-indigno-500">Criar conta</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </CustomKeyboardView>
    )
};
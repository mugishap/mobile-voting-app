import { registerUser } from '@/services/user';
import { IRegisterData } from '@/types';
import { AntDesign } from '@expo/vector-icons';
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Controller, Resolver, SubmitHandler, useForm } from "react-hook-form";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

export default function SignupScreen() {

    const [loading, setLoading] = useState<boolean>(false)

    const toast = useToast()
    const dispatch = useDispatch()

    const SignupSchema = yup.object({
        names: yup.string().required().label("Names"),
        email: yup.string().email("This email is not valid").required("Email is required").label("Email"),
        telephone: yup.string().required().label("Telephone").matches(/^\+250\d{9}$/, { message: "Mobile number must start with '+250' and have 9 digits after that." }),
        password: yup.string().matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,}$/, { message: "Password must have at least 6 characters, one symbol, one number, and one uppercase letter." }).label("Password")
    })

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IRegisterData>({
        resolver: yupResolver(SignupSchema) as Resolver<IRegisterData, any>,
        mode: "onTouched"
    })

    const onSubmit: SubmitHandler<IRegisterData> = async (data) => {
        await registerUser({ toast, setLoading, data, dispatch, reset })
    }

    return (
        <ScrollView className='w-full flex-1'>
            <SafeAreaView className='w-full flex-1 flex flex-col bg-white items-center'>
                <Image
                    source={require("../../assets/images/nec-logo.jpeg")}
                    // resizeMode='contain'
                    className='w-24 h-24'
                />
                <Text className='font-semibold text-xl'>NEC Voting App</Text>
                <View className='w-full flex flex-col rounded-lg p-4 items-center'>
                    <Text> Already have an account?
                        &nbsp;
                        <Link href="/login">
                            <Text className='text-primary'>Login</Text>
                        </Link>
                    </Text>
                    <View className='my-2 w-full'>
                        <View className='w-full flex flex-col my-2'>
                            <Text className='mb-1'>Names</Text>
                            <Controller
                                control={control}
                                rules={{
                                    required: true
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        placeholder="e.g: Precieux Mugisha"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        className='border w-full p-2 rounded-lg border-slate-400'
                                    />
                                )}
                                name="names"
                            />
                            <Text className=' text-red-500'>{errors?.names?.message}</Text>
                        </View>
                        <View className='w-full flex flex-col my-2'>
                            <Text className='mb-1'>Email</Text>
                            <Controller
                                control={control}
                                rules={{
                                    required: true
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        placeholder="e.g: test@gmail.com"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        className='border w-full p-2 rounded-lg border-slate-400'
                                        autoCapitalize='none'
                                    />
                                )}
                                name="email"
                            />
                            <Text className=' text-red-500'>{errors?.email?.message}</Text>
                        </View>
                        <View className='w-full flex flex-col my-2'>
                            <Text className='mb-1'>Telephone</Text>
                            <Controller
                                control={control}
                                rules={{
                                    required: true
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        placeholder="e.g: +250782307144"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        className='border w-full p-2 rounded-lg border-slate-400'
                                    />
                                )}
                                name="telephone"
                            />
                            <Text className=' text-red-500'>{errors?.telephone?.message}</Text>
                        </View>
                        <View className='w-full flex flex-col my-2'>
                            <Text className='mb-1'>Password</Text>
                            <Controller
                                control={control}
                                rules={{
                                    required: true
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        placeholder="**********"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        className='border w-full p-2 rounded-lg border-slate-400'
                                        autoCapitalize='none'
                                        secureTextEntry={true}
                                    />
                                )}
                                name="password"
                            />
                            <Text className=' text-red-500'>{errors?.password?.message}</Text>
                        </View>
                    </View>
                    <TouchableOpacity className="w-10/12 bg-primary text-white rounded-lg p-2 my-2" onPress={handleSubmit(onSubmit)}>
                        <Text className='text-center text-white text-lg font-semibold'>
                            {
                                loading ?
                                    <AntDesign name="loading1" size={20} color="white" className='animate-spin' />
                                    :
                                    "Continue"
                            }
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

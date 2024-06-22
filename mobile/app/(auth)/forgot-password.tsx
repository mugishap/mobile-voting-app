import { forgotPassword } from '@/services/auth';
import { IForgotPasswordData } from '@/types';
import { AntDesign } from '@expo/vector-icons';
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Stack } from 'expo-router';
import React, { useState } from 'react';
import { Controller, Resolver, SubmitHandler, useForm } from "react-hook-form";
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';
import * as yup from 'yup';

export default function ForgotPasswordScreen() {

    const [loading, setLoading] = useState<boolean>(false)
    const toast = useToast()

    const ForgotPasswordSchema = yup.object({
        email: yup.string().email("This email is not valid").required("Email is required")
    })

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IForgotPasswordData>({
        resolver: yupResolver(ForgotPasswordSchema) as Resolver<IForgotPasswordData, any>,
        mode: "onTouched"
    })

    const onSubmit: SubmitHandler<IForgotPasswordData> = async (data) => {
        await forgotPassword({ setLoading, data, toast })
    }

    return (
        <SafeAreaView className='w-full flex-1 flex flex-col bg-white items-center'>
            <Image
                source={require("../../assets/images/nec-logo.jpeg")}
                resizeMode='contain'
                className='w-24 h-24'
            />
            <Text className='font-semibold text-xl'>NEC Voting App</Text>
            <View className='w-full flex flex-col rounded-lg p-4 items-center'>
                <Text> Let's get you back in the game </Text>
                <View className='my-2 w-full'>
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
                </View>
                <Text> Already have you code?
                    &nbsp;
                    <Link href="/reset-password">
                        <Text className='text-primary'>Enter it here</Text>
                    </Link>
                </Text>
                <TouchableOpacity className="w-10/12 bg-primary text-white rounded-lg p-2 my-2" onPress={handleSubmit(onSubmit)}>
                    <Text className='text-center text-white text-lg font-semibold'>
                        {
                            loading ?
                                <AntDesign name="loading1" size={20} color="white" className='animate-spin' />
                                :
                                "Send Code"
                        }
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

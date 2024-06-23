import { forgotPassword, resetPassword } from '@/services/auth';
import { IResetPasswordData } from '@/types';
import { AntDesign } from '@expo/vector-icons';
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Stack, router } from 'expo-router';
import React, { useState } from 'react';
import { Controller, Resolver, SubmitHandler, useForm } from "react-hook-form";
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';
import * as yup from 'yup';

export default function ResetPasswordScreen() {

    const [loading, setLoading] = useState<boolean>(false)
    const toast = useToast()

    const ResetPasswordSchema = yup.object({
        passwordResetCode: yup.string().length(6, "Code must be 6 characters").required("Code is required").label("Code"),
        newPassword: yup.string().matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,}$/, { message: "Password must have at least 6 characters, one symbol, one number, and one uppercase letter." })
    })

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IResetPasswordData>({
        resolver: yupResolver(ResetPasswordSchema) as Resolver<IResetPasswordData, any>,
        mode: "onTouched"
    })

    const onSubmit: SubmitHandler<IResetPasswordData> = async (data) => {
        await resetPassword({ setLoading, data, toast })
    }

    return (
        <SafeAreaView className='w-full flex-1 flex flex-col bg-white items-center pt-20'>
            <TouchableOpacity onPress={() => router.back()} className='absolute top-14 left-4'>
                <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <Image
                source={require("../../assets/images/nec-logo.jpeg")}
                resizeMode='contain'
                className='w-24 h-24'
            />
            <Text className='font-semibold text-xl'>NEC Voting App</Text>
            <View className='w-full flex flex-col rounded-lg p-4 items-center'>
                <Text> Let's get you back in the game
                </Text>
                <View className='my-2 w-full'>
                    <View className='w-full flex flex-col my-2'>
                        <Text className='mb-1'>Code</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    placeholder="e.g: 000000"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    className='border w-full p-2 rounded-lg border-slate-400'
                                    autoCapitalize='none'
                                />
                            )}
                            name="passwordResetCode"
                        />
                        <Text className=' text-red-500'>{errors?.passwordResetCode?.message}</Text>
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
                            name="newPassword"
                        />
                        <Text className=' text-red-500'>{errors?.newPassword?.message}</Text>
                    </View>
                </View>
                <Text> Forgot your password?
                    &nbsp;
                    <Link href="/forgot-password">
                        <Text className='text-primary'></Text>
                    </Link>
                </Text>
                <TouchableOpacity className="w-10/12 bg-primary text-white rounded-lg p-2 my-2" onPress={handleSubmit(onSubmit)}>
                    <Text className='text-center text-white text-lg font-semibold'>
                        {
                            loading ?
                                <AntDesign name="loading1" size={20} color="white" className='animate-spin' />
                                :
                                "Change Password"
                        }
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

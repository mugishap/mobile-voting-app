import { signIn } from '@/services/auth';
import { ILoginData } from '@/types';
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Controller, Resolver, SubmitHandler, useForm } from "react-hook-form";
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

export default function Login() {

  const [loading, setLoading] = useState<boolean>(false)

  const toast = useToast()
  const dispatch = useDispatch()

  const LoginSchema = yup.object({
    email: yup.string().email("This email is not valid").required("Email is required"),
    password: yup.string().matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,}$/, { message: "Password must have at least 6 characters, one symbol, one number, and one uppercase letter." })
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>({
    resolver: yupResolver(LoginSchema) as Resolver<ILoginData, any>,
    mode: "onTouched"
  })

  const onSubmit: SubmitHandler<ILoginData> = async (data) => {
    await signIn({ setLoading, data, toast, dispatch })
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
        <Text> Don't have an account yet?
          &nbsp;
          <Link href="/signup">
            <Text className='text-primary'>Register</Text>
          </Link>
        </Text>
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
        <Text> Forgot your password?
          &nbsp;
          <Link href="/forgot-password">
            <Text className='text-primary'>Reset Here</Text>
          </Link>
        </Text>
        <TouchableOpacity className="flex items-center justify-center w-10/12 bg-primary text-white rounded-lg p-2 my-2" onPress={handleSubmit(onSubmit)}>
          <Text className='text-center text-white text-lg font-semibold'>
            {
              loading ?
                <ActivityIndicator size='small' color='white' />
                :
                "Login"
            }
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

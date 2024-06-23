import { registerCandidate } from '@/services/candidate';
import { IRegisterCandidateData } from '@/types';
import { AntDesign } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, router } from 'expo-router';
import React, { useState } from 'react';
import { Controller, Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { ActivityIndicator, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

export default function CreateCandidate() {


  const [loading, setLoading] = useState<boolean>(false)

  const toast = useToast()
  const dispatch = useDispatch()

  const RegisterCandidateSchema = yup.object({
    names: yup.string().required().label("Names"),
    email: yup.string().email("This email is not valid").required("Email is required").label("Email"),
    telephone: yup.string().required().label("Telephone").matches(/^\+250\d{9}$/, { message: "Mobile number must start with '+250' and have 9 digits after that." }),
    mission: yup.string().required().label("Mission"),
  })

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IRegisterCandidateData>({
    resolver: yupResolver(RegisterCandidateSchema) as Resolver<IRegisterCandidateData, any>,
    mode: "onTouched"
  })

  const onSubmit: SubmitHandler<IRegisterCandidateData> = async (data) => {
    await registerCandidate({ toast, setLoading, data, dispatch, reset })
  }


  return (
    <SafeAreaView className='w-full flex-1 pt-24 bg-white'>
      <TouchableOpacity onPress={() => router.back()} className='absolute top-14 left-4'>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView className='w-full p-4'>
        <Text className='text-xl font-bold'>Create Candidate</Text>
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
            <Text className='mb-1'>Mission</Text>
            <Controller
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Enter your mission here"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  multiline
                  numberOfLines={4}
                  textAlignVertical='top'
                  className='border w-full p-2 rounded-lg border-slate-400'
                />
              )}
              name="mission"
            />
            <Text className=' text-red-500'>{errors?.mission?.message}</Text>
          </View>

        </View>
        <TouchableOpacity className="flex items-center justify-center mx-auto w-10/12 bg-primary text-white rounded-lg p-2 my-2" onPress={handleSubmit(onSubmit)}>
          <Text className='text-center text-white text-lg font-semibold'>
            {
              loading ?
                <ActivityIndicator size='small' color='white' />
                :
                "Save"
            }
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

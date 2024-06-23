import CustomButton from '@/components/CustomButton';
import { useGlobal } from '@/context';
import { logout } from '@/redux/slices/userReducer';
import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

export default function Profile() {

  const { user } = useGlobal()
  const dispatch = useDispatch()

  return (
    <SafeAreaView className='w-full flex-1 pt-24 bg-white'>
      <View className='w-full flex flex-row items-center justify-center'>
        <View className='w-20 h-20 rounded-full bg-gray-200 mr-4'>
          <Image className='w-full h-full rounded-full' source={{ uri: user.profilePicture ?? "https://picsum.photos/250/250" }} />
        </View>
        <View className='ml-3'>
          <Text className='text-lg font-bold'>{user.names}</Text>
          <Text className='text-sm text-gray-500'>{user.email}</Text>
        </View>
      </View>
      <CustomButton
        title='Sign Out'
        handlePress={() => dispatch(logout({}))}
        containerStyles='mt-4 w-9/12 mx-auto mt-8'
      />
    </SafeAreaView>
  );
}

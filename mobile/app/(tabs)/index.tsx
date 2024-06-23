import { useGlobal } from '@/context';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {

  const { user } = useGlobal()

  return (
    <ScrollView className='w-full flex-1 bg-white'>
      <SafeAreaView className='w-full flex flex-col p-2 pt-8'>
        <Text className='font-semibold text-xl'>Hello 👋, <Text className='text-primary'>{user.names}</Text></Text>
      </SafeAreaView>
    </ScrollView>
  );
}

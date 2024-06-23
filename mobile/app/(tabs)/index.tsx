import { useGlobal } from '@/context';
import { getMyVotes } from '@/services/user';
import { IVote } from '@/types';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';

export default function Index() {

  const { user } = useGlobal()
  const [votes, setVotes] = useState<IVote[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const toast = useToast()

  const getVotes = async () => {
    await getMyVotes({ toast, setVotes, setLoading })
  }

  useEffect(() => {
    getVotes()
  }, [])

  return (
    <ScrollView className='w-full flex-1 bg-white'>
      <SafeAreaView className='w-full flex flex-col p-2 pt-8'>
        <Text className='font-semibold text-xl'>Hello 👋, <Text className='text-primary'>{user.names}</Text></Text>
        {loading && <View className='flex-1 justify-center items-center'>
          <ActivityIndicator size='large' color='blue' />
        </View>}

        {!loading && <View className='flex-1'>
          <Text className='font-semibold text-lg mt-8'>My Votes</Text>
          <FlatList
            data={votes}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={getVotes} />
            }
            ListEmptyComponent={() => (
              <View className='h-full justify-center items-center bg-gray-50 rounded-lg'>
                <View className='flex-1 justify-center items-center'><Text>You have not voted for any candidate yet</Text></View>
              </View>
            )}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className='flex flex-row justify-between items-center p-2 border-b border-gray-200'>
                <Text>{item?.candidate?.user?.names}</Text>
                <Text>{item?.createdAt}</Text>
              </View>
            )}
          />
        </View>}
      </SafeAreaView>
    </ScrollView>
  );
}

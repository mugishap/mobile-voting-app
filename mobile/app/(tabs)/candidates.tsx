import CustomButton from '@/components/CustomButton';
import { getCandidates } from '@/services/candidate';
import { ICandidate, IPaginationMeta } from '@/types';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';
import { FlatList, Image, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';

export default function Candidates() {

    const [candidates, setCandidates] = useState<ICandidate[]>([]);
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(5);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchKey, setSearchKey] = useState<string>("");
    const [meta, setMeta] = useState<IPaginationMeta>();

    const toast = useToast()

    const fetchCandidates = async () => {
        await getCandidates({ toast, setCandidates, page, limit, searchKey, setLoading, setMeta })

    }

    const fetchMoreData = () => {
        if (meta?.currentPage === meta?.lastPage) {
            return
        }
        setPage(page + 1)
    }

    useEffect(() => {
        fetchCandidates()
    }, [page, limit, searchKey]);

    return (
        <SafeAreaView className='flex-1 bg-white flex flex-col pt-4'>
            <Text className='text-center text-2xl font-bold'>Candidates</Text>
            <TextInput
                placeholder="Search here..."
                onChangeText={(e: string) => setSearchKey(e)}
                value={searchKey}
                className='border w-11/12 bg-slate-100 mx-auto p-2 rounded-lg border-slate-200 py-3 my-2'
                autoCapitalize='none'
            />
            <FlatList
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={fetchCandidates} />
                }
                data={candidates}
                ListEmptyComponent={() => (
                    <View className='h-full justify-center items-center bg-gray-50 rounded-lg'>

                        <Text className='text-lg text-gray-700 pt-3 '>No candidates available</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View className='p-3 w-11/12 mx-auto rounded-lg my-3 border border-gray-200 shadow-sm'>
                        <View className='w-full flex flex-row items-center'>
                            <Image
                                source={{ uri: "https://picsum.photos/250/250" }}
                                className='rounded-full object-cover w-16 h-16'
                            />
                            <Text className='ml-4 text-lg font-semibold'>{item.user.names}</Text>
                        </View>
                        <CustomButton
                            handlePress={() => router.push(`/candidate/${item.id}`)}
                            title='View Candidate'
                            containerStyles='mt-3'
                            variant='outline'
                            titleStyles='text-base'
                        />
                    </View>
                )}
                onEndReachedThreshold={0.2}
                onEndReached={fetchMoreData}
            />
        </SafeAreaView>
    );
}

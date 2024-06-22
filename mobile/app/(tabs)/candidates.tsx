import CustomButton from '@/components/CustomButton';
import { getCandidates } from '@/services/candidate';
import { ICandidate, IPaginationMeta } from '@/types';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';

export default function Candidates() {

    const [candidates, setCandidates] = useState<ICandidate[]>([]);
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchKey, setSearchKey] = useState<string>("");
    const [meta, setMeta] = useState<IPaginationMeta>();

    const toast = useToast()

    const fetchCandidates = async () => {
        await getCandidates({ toast, setCandidates, page, limit, searchKey, setLoading, setMeta })
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
                data={candidates}
                ListEmptyComponent={() => (
                    <View className='h-full justify-center items-center bg-gray-50 rounded-lg'>
                        <Image
                            source={require('../../assets/images/no-data.png')}
                            style={{ width: 200, height: 200 }}
                            className='rounded-lg'
                        />
                        <Text className='text-lg text-gray-700 pt-3 '>No candidates available</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View className='p-3  rounded-lg mb-3 border border-gray-200 shadow-sm'>
                        <Text className='text-lg font-semibold'>{item.user.names}</Text>
                        <CustomButton
                            handlePress={() => router.push(`/product/${item.id}`)}
                            title='View Candidate'
                            containerStyles='mt-3'
                            variant='outline'
                            titleStyles='text-base'
                        />
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

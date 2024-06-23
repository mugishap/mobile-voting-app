import CustomButton from '@/components/CustomButton';
import { getCandidateById, voteCandidate } from '@/services/candidate';
import { ICandidate } from '@/types';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

export default function CandidateDetails() {

    const { id } = useLocalSearchParams();
    const [candidate, setCandidate] = useState<ICandidate>()
    const [loading, setLoading] = useState<boolean>(true)
    const toast = useToast()

    const fetchCandidateDetails = async () => {
        await getCandidateById({ id: id as string, setCandidate, setLoading, toast })
    }

    const vote = async () => {
        await voteCandidate({ candidateId: id as string, setLoading, toast })
    }

    useEffect(() => {
        fetchCandidateDetails()
    }, [id])

    return (
        <SafeAreaView className='w-full flex flex-col bg-white flex-1'>
            <Stack.Screen options={{ title: 'Candidate Details' }} />
            <ScrollView className='w-full'>
                <View className='w-full flex flex-row items-center justify-center'>
                    <View className='w-20 h-20 rounded-full bg-gray-200 mr-4'>
                        <Image className='w-full h-full rounded-full' source={{ uri: candidate?.user?.profilePicture ?? "https://picsum.photos/250/250" }} />
                    </View>
                    <View className='ml-3'>
                        <Text className='text-lg font-bold'>{candidate?.user?.names}</Text>
                        <Text className='text-sm text-gray-500'>{candidate?.user?.email}</Text>
                    </View>
                </View>
                <Text className='w-8/12 mx-auto my-4'>{candidate?.mission}</Text>
                <CustomButton
                    title='Vote'
                    handlePress={vote}
                    containerStyles='my-4 w-9/12 mx-auto mt-8'
                />
            </ScrollView>
        </SafeAreaView>
    );
}

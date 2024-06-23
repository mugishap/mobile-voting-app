import CustomButton from '@/components/CustomButton'
import { useGlobal } from '@/context'
import { logout } from '@/redux/slices/userReducer'
import { Stack, useRouter } from 'expo-router'
import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'

const Onboarding = () => {
    const { user, isLogged } = useGlobal();
    const router = useRouter();
    const dispatch = useDispatch()
    return (
        <SafeAreaView
            className='bg-white'
        >
            <Stack.Screen options={{ headerShown: false }} />
            <ScrollView
                contentContainerStyle={{
                    height: "100%"
                }}
            >
                <View className='h-full items-center justify-center px-6 font-rubik'>
                    <Image
                        source={require("../assets/images/nec-logo.jpeg")}
                        resizeMode='contain'
                        className='w-[240px] h-[240px]'
                    />
                    <Text className='text-2xl font-bold font-rubik'>Welcome to NEC Voting App</Text>
                    {
                        isLogged
                            ?
                            <Text className='text-center text-lg text-gray-500 py-4 '>
                                Already logged in as <Text className='font-semibold'>{user?.names}</Text>
                            </Text>
                            :
                            <Text className='text-center text-lg text-gray-500 py-4 '>
                                You are not logged in
                            </Text>
                    }
                    {
                        isLogged ?
                            <View className='w-full mt-6'>
                                <CustomButton
                                    title='Go to Home'
                                    handlePress={() => router.navigate("(tabs)")}
                                    containerStyles='mb-3'
                                />
                                <CustomButton
                                    title='Logout'
                                    handlePress={() => dispatch(logout({}))}
                                    variant='outline'
                                    containerStyles='mt-3 border-red-500'
                                    titleStyles=' text-red-500'
                                />
                            </View>
                            :
                            <View className='w-full mt-6'>
                                <CustomButton
                                    title='Login'
                                    handlePress={() => router.push("/login")}
                                />
                                <CustomButton
                                    title='Create Account'
                                    handlePress={() => router.push("/signup")}
                                    variant='outline'
                                    containerStyles='mt-5'
                                />
                            </View>
                    }
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default Onboarding
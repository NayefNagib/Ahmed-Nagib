 import React, { useEffect } from 'react'
  import { Slot, SplashScreen, Stack, Tabs } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

  SplashScreen.preventAutoHideAsync() ;
const RootLayout = () => {
useEffect(() => {
  SplashScreen.hideAsync();
  
}, []);

  return (
    <>

    <SafeAreaProvider >
 
 
   <Stack >

   
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  
   </Stack>
     </SafeAreaProvider>
 
     {/* <StatusBar animated={true} style='light'  /> */}
    </>
  )
}
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

export default RootLayout
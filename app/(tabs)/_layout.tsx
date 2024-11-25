 import React, { useEffect } from 'react'
  import { Slot, SplashScreen, Stack, Tabs } from 'expo-router';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
 import TabIcon from '../../components/Icon/TabIcon';
import { StatusBar } from 'expo-status-bar';
  


const RootLayout = () => {

//SplashScreen.preventAutoHideAsync() ;
//
const insets = useSafeAreaInsets();
  return (
    <>
 
    <SafeAreaProvider className='flex-1 bg-primary   ' >
    
 
  <Tabs
  
  screenOptions={{
    tabBarShowLabel:false,
    tabBarActiveTintColor:"#fff",
    tabBarInactiveTintColor:"gray",
         tabBarHideOnKeyboard:true,
      tabBarStyle:{
  
    backgroundColor: 'transparent',
    borderTopWidth: 0,
elevation: 0,
     },
   
    
  }}>

        <Tabs.Screen name="index"
    
    options={{
        title:"home",
        headerShown:false,
        
        tabBarIcon:({color,focused})=>(  <TabIcon color={color} focused={focused} name={"Home"}/> )
    }} />
    
    <Tabs.Screen name="history"
    
    options={{
        title:"History",
        headerShown:false,
        
        tabBarIcon:({color,focused})=>(  <TabIcon color={color} focused={focused} name={"History"}/> )
    }} />
  </Tabs>
  
     </SafeAreaProvider>
 {/* <StatusBar animated={true} style='light'  /> */}
    
   </>
  )
}
 
export default RootLayout
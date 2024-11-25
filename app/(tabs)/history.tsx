import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { deleteData } from '../../settings/storeData'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { historyDataT } from './Type'
import moment from "moment";
import { Path, Svg } from 'react-native-svg'
import { useFocusEffect } from 'expo-router'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { StatusBar } from 'expo-status-bar'
 
const history = () => {
  const [data, setData] = useState<historyDataT[]>([]);
   const [Load, setLoad] = useState<boolean>(true);


    const fetchData =  () => { 
             AsyncStorage.getItem("history").then((res) => {
               
               if (res != null) setData([...JSON.parse(res)]);
               setLoad(false);
             });
    } ;
 
    useFocusEffect(
      useCallback(() => {
     
           fetchData();
   
      }, []),
    );

  return (
    <>
      <SafeAreaView
        className="flex-1 p-4   bg-primary "
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {Load ? (
          <>
            <Animated.View
              entering={FadeIn}
              exiting={FadeOut}
              className=" flex  justify-center  items-center   "
            >
              <ActivityIndicator size={50} animating={true} color={"white"} />
            </Animated.View>
          </>
        ) : data.length > 0 ? (
          <>
            <ScrollView>
              {data.map((ele, index) => {
                return (
                  <View
                    key={ele.question + index}
                    className="d-flex flex-row  "
                  >
                    <View
                      className="my-2"
                      key={ele.question + index}
                      style={styles.card}
                    >
                      <Text style={styles.text}>{ele.question}</Text>

                      <Text numberOfLines={3} style={styles.text}>
                        {ele.Answer}
                      </Text>
                      <View style={{ display: "flex", alignItems: "flex-end" }}>
                        <Text style={styles.time}>
                          {moment(ele.creationTime).fromNow()}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: "10%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Pressable
                        className=""
                        onPress={async () => {
                          deleteData(index).then((res) => {
                            fetchData();
                          });
                        }}
                      >
                        <Svg width={30} height={30} viewBox="0 0 24 24">
                          <Path
                            d="M15 4H9a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2zM15 22H9a4 4 0 0 1-4-4V6h14v12a4 4 0 0 1-4 4z"
                            fill={"#e63946"}
                          />
                          <Path
                            d="M20 8H4a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2z"
                            fill={"#c9273a"}
                          />

                          <Path
                            d="M10 18a1 1 0 0 1-1-1v-6a1 1 0 0 1 2 0v6a1 1 0 0 1-1 1zM14 18a1 1 0 0 1-1-1v-6a1 1 0 0 1 2 0v6a1 1 0 0 1-1 1z"
                            fill="#edebea"
                          />
                        </Svg>
                      </Pressable>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </>
        ) : (
          <Image
            style={{
              width: "70%",
              opacity: 0.7,
              height: "100%",
              objectFit: "contain",
            }}
            source={require("./../../assets/hand-drawn-no-data-illustration.png")}
          />
        )}
      </SafeAreaView>
      <StatusBar animated={true} style="light" /> 
    </>
  );
};

export default history;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    width:'90%'
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  time: {
    // color: "d",
    fontSize: 13,
  },
});
import React from 'react';
import {  Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
 import { Resultprops } from './Props';
import { Image } from 'expo-image';
//import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome5 } from '@expo/vector-icons';
import TypeWriter from 'react-native-typewriter'
import Svg, { G, Path } from "react-native-svg"

import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { ActivityIndicator } from 'react-native';
const Result = (props:Resultprops) => {
    const iconMap: any = {
      pdf: ["file-pdf", "#B51308"],
      doc: ["file-word", "#205FC0"],
      docx: ["file-word", "#205FC0"],
      jpg: ["file-image", "#E2DFD0"],
      jpeg: ["file-image", "#E2DFD0"],
      png: ["file-image", "#E2DFD0"],
      mp3: "file-music",
      mp4: "file-video",
      // Add more mappings as needed
      default: "file",
    };
const getIconByExtension = (extension:string) => {
 
  return iconMap[extension][0] || iconMap['default'];
};
    return (
      <View
        className=" h-full w-full justify-center flex items-center  relative   py-3  "
        style={{ borderRadius: 25, backgroundColor: "rgba(255,255,255,0.1)" }}
      >
        {props.LoadAnswer ? (
          <>
            <Animated.View
              entering={FadeIn}
              exiting={FadeOut}
              className=" flex  justify-center  items-center   "
            >
              {props.fileDetails ? (
                <View className="flex flex-row items-center w-full  justify-start">
                  <FontAwesome5
                    name={getIconByExtension(
                      props.fileDetails.FileType.includes("image")
                        ? props.fileDetails.FileType.replace("image/", "")
                        : props.fileDetails.FileType.includes("application")
                        ? props.fileDetails.FileType.replace("application/", "")
                        : "",
                    )}
                    size={25}
                    color={
                      iconMap[
                        props.fileDetails.FileType.includes("image")
                          ? props.fileDetails.FileType.replace("image/", "")
                          : props.fileDetails.FileType.includes("application")
                          ? props.fileDetails.FileType.replace(
                              "application/",
                              "",
                            )
                          : ""
                      ][1] || "white"
                    }
                  />
                  <Text className="text-white mx-3">
                    {props.fileDetails.FileName}
                  </Text>
                </View>
              ) : (
                ""
              )}
              <ActivityIndicator size={100} animating={true} color={"white"} />
            </Animated.View>
          </>
        ) : (
          <>
            {props.fileDetails?.FileName ? (
              <>
                <View className="absolute inset-x-0 top-5  w-full 	 flex flex-row items-end justify-end  px-5    ">
                  <Pressable
                    style={{zIndex:9999}}
                    onPress={() => props.HandleReset()}
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
              </>
            ) : (
              ""
            )}

            {props.FileError ? (
              <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                className=" flex  justify-center  items-center   "
              >
                <Svg width={150} height={150} viewBox="0 0 640 640">
                  <G transform={"translate(35,0)"}>
                    <Path
                      d="M300.586 101.45 285.277 0H60.676C26.856 0 0 27.555 0 61.371V486.09c0 33.816 26.855 60.812 60.676 60.812H273.73L427.223 314.5V148.766zm0 0"
                      fill={"#00acea"}
                      opacity="1"
                    />
                    <Path
                      fill="#00efd1"
                      d="m285.277.14 141.528 148.626h-94.211c-26.164 0-47.317-21.153-47.317-47.317zm0 0"
                      opacity="1"
                      data-original="#00efd1"
                    ></Path>
                    <G fill="#083863">
                      <Path
                        d="M279.852 318.676H98.527c-7.652 0-13.918 6.265-13.918 13.918 0 7.656 6.266 13.914 13.918 13.914h181.325c7.652 0 13.918-6.258 13.918-13.914 0-7.653-6.122-13.918-13.918-13.918zM98.527 276.93h140.97c7.651 0 13.917-6.262 13.917-13.918 0-7.653-6.266-13.914-13.918-13.914H98.527c-7.652 0-13.918 6.261-13.918 13.914 0 7.656 6.266 13.918 13.918 13.918zM234.066 389.648H98.527c-7.652 0-13.918 6.266-13.918 13.914 0 7.657 6.266 13.918 13.918 13.918h135.54c7.656 0 13.917-6.261 13.917-13.918 0-7.648-6.261-13.914-13.918-13.914zm0 0"
                        fill="#083863"
                        opacity="1"
                        data-original="#083863"
                      />
                    </G>
                    <Path
                      fill="#fedb41"
                      d="M426.805 286.813c86.28 12.101 152.656 86.136 152.656 175.753 0 97.97-79.457 177.434-177.426 177.434-67.351 0-126.078-37.574-156-92.96-13.637-25.188-21.43-53.993-21.43-84.61 0-97.97 79.461-177.43 177.43-177.43 8.352.14 16.559.7 24.77 1.813zm0 0"
                      opacity="1"
                      data-original="#fedb41"
                    ></Path>
                    <Path
                      fill="#083863"
                      d="M411.914 359.867c-2.64-2.781-6.262-4.453-10.156-4.453-3.899 0-7.516 1.672-10.16 4.453l-81.551 87.535c-5.285 5.567-4.867 14.473.7 19.618 2.64 2.507 6.124 3.761 9.464 3.761 3.754 0 7.648-1.535 10.434-4.453l57.613-61.652v151.969c0 7.652 6.262 13.918 13.914 13.918 7.656 0 13.918-6.266 13.918-13.918v-151.97l57.195 61.653c5.29 5.567 13.918 5.98 19.621.692 5.567-5.286 5.844-14.051.696-19.618zm0 0"
                      opacity="1"
                      data-original="#083863"
                    ></Path>
                  </G>
                </Svg>

                <Text className="text-red-400 text-xl font-bold">
                  Please Upload Relevant Documents
                </Text>
                <Text className="text-center text-stone-300 mt-2 px-5">
                  To help us address your queries effectively, please upload
                  documents that directly answer or provide information related
                  to the questions we've asked. Thank you!
                </Text>
              </Animated.View>
            ) : props.Answer ? (
              <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                className={"h-full w-full justify-start flex items-start p-3"}
              >
                {props.fileDetails ? (
                  <View className="flex flex-row items-center w-full  justify-start">
                    <FontAwesome5
                      name={getIconByExtension(
                        props.fileDetails.FileType.includes("image")
                          ? props.fileDetails.FileType.replace("image/", "")
                          : props.fileDetails.FileType.includes("application")
                          ? props.fileDetails.FileType.replace(
                              "application/",
                              "",
                            )
                          : "",
                      )}
                      size={25}
                      color={
                        iconMap[
                          props.fileDetails.FileType.includes("image")
                            ? props.fileDetails.FileType.replace("image/", "")
                            : props.fileDetails.FileType.includes("application")
                            ? props.fileDetails.FileType.replace(
                                "application/",
                                "",
                              )
                            : ""
                        ][1] || "white"
                      }
                    />
                    <Text className="text-white mx-3">
                      {props.fileDetails.FileName}
                    </Text>
                  </View>
                ) : (
                  ""
                )}
                <View className="p-3">
                  <Text
                    className="my-2 p-3 w-full  text-lg"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.5)",
                      borderRadius: 25,
                    }}
                  >
                    {props.Question}
                  </Text>

                  <TypeWriter
                    initialDelay={10}
                    maxDelay={10}
                    minDelay={10}
                    typing={1}
                    className="text-white  text-lg"
                  >
                    {props.Answer}
                  </TypeWriter>
                </View>
              </Animated.View>
            ) : (
              <View className=" flex justify-center  items-center    ">
                {props.fileDetails?.FileName ? (
                  <Animated.View entering={FadeIn} exiting={FadeOut}>
                    <Text className="text-white text-center text-xl px-5 text-wrap font-bold opacity-75">
                      Feel free to ask any questions.
                    </Text>
                  </Animated.View>
                ) : (
                  <Animated.View entering={FadeIn} exiting={FadeOut}>
                    <Text className="text-white text-center text-xl px-5 text-wrap font-bold opacity-75">
                      Upload your document here and{"\n"}feel free to ask any
                      questions.
                    </Text>
                  </Animated.View>
                )}

                {props.fileDetails?.FileName ? (
                  <Animated.View
                    entering={FadeIn}
                    exiting={FadeOut}
                    className=" p-4"
                  >
                    <View className="flex flex-col items-center w-full  justify-start">
                      <FontAwesome5
                        name={getIconByExtension(
                          props.fileDetails.FileType.includes("image")
                            ? props.fileDetails.FileType.replace("image/", "")
                            : props.fileDetails.FileType.includes("application")
                            ? props.fileDetails.FileType.replace(
                                "application/",
                                "",
                              )
                            : "",
                        )}
                        size={150}
                        color={
                          iconMap[
                            props.fileDetails.FileType.includes("image")
                              ? props.fileDetails.FileType.replace("image/", "")
                              : props.fileDetails.FileType.includes(
                                  "application",
                                )
                              ? props.fileDetails.FileType.replace(
                                  "application/",
                                  "",
                                )
                              : "default"
                          ][1] || "white"
                        }
                      />
                      <Text className="text-white mx-3">
                        {props.fileDetails.FileName}
                      </Text>
                    </View>
                  </Animated.View>
                ) : (
                  <Animated.View entering={FadeIn} exiting={FadeOut}>
                    <Image
                      className="my-4"
                      source={require("../assets/document.svg")}
                      style={{ width: 150, height: 150, opacity: 0.7 }}
                    />
                  </Animated.View>
                )}

                {props.fileDetails?.FileName ? (
                  ""
                ) : (
                  <Animated.View entering={FadeIn} exiting={FadeOut}>
                    <Text className="text-white text-center text-md   px-5 text-wrap  opacity-75">
                      I'll provide you with the answers and support you need.
                    </Text>
                  </Animated.View>
                )}
              </View>
            )}
          </>
        )}
      </View>
    );
}

const styles = StyleSheet.create({})

export default Result;

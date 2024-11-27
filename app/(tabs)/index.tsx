import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ActivityIndicator,
} from "react-native";
 



import {
  SafeAreaView,
 
} from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";
import FileSystem from "expo-file-system";
const { GoogleGenerativeAI } = require("@google/generative-ai");
import React, { useEffect, useState } from "react";
import { Link, SplashScreen, useRouter } from "expo-router";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Path, Svg } from "react-native-svg";
import Result from "../../components/Result/Result";
import { StatusBar } from "expo-status-bar";
import { fileDetails } from "./Type";
import axios from "axios";
import { API_KEY, OPENAI_API_URL } from "../../settings/API";
import { extractText } from "../../settings/extractTextFromPDF";
import { storeData } from "../../settings/storeData";
import SummarizeButton from '../../components/summarizebutton';


 
const index = () => {
 
  const router = useRouter();

  const [question, setquestion] = useState<string>();
  const [Text, setText] = useState<string>();
  const [Load, setLoad] = useState<boolean>(false);
  const [LoadAnswer, setLoadAnswer] = useState<boolean>(false);
  const [Answer, setAnswer] = useState<string>();
  const [isFocused, setisFocused] = useState<boolean>();
  const [File, setFile] = useState<fileDetails | undefined>();
  const [FileError, setFileError] = useState<boolean>(false);
  const [QuestionError, setQuestionError] = useState<boolean>(false);

  const pickDocument = async () => {
  
    let result: any = await DocumentPicker.getDocumentAsync({
      type: "*/*",
    });

    let file: fileDetails = {
      uri: result.assets ? result.assets[0].uri : "",
      FileName: result.assets ? result.assets[0].name : "",
      FileType:
        result.assets && result.assets[0].mimeType
          ? result.assets[0].mimeType
          : "",
    };
 
    if (file) {
      setFile(file);
      setFileError(false);
        setLoad(true);
         extractText(file).then((res) => {
           setText(res + "");
           setLoad(false);
         });
    }
    //file.FileName=result.assets[0].name;
  };
  const onSubmit = async() => {
    
    Keyboard.dismiss();
    if (!File) {
      setFileError(true);
      return;
    }
    if (!question) {
      setQuestionError(true);
      return;
    }
    setLoadAnswer(true);
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(
      `Context: ${Text}\n\nQ: ${question}\nA:`,
    );
    const response = await result.response;
    const text = response.text();
    setLoadAnswer(false)
    setAnswer(text);
 
 await storeData({
   FileName: File.FileName,
   FileType: File.FileType,
   Text: Text ? Text : "",
   question: question,
   Answer: text,
   creationTime:new Date(),
 });
  };
  const HandleReset = () => {
    console.log(112)
    setFile(undefined);

        setFileError(false);
        setLoadAnswer(false);
    setAnswer(undefined);
    setquestion(undefined);
    setLoad(false)
    router.push('/');

  };


  
  return (
    <>
   
      <SafeAreaView className="px-4 py-2 bg-primary  ">
        <KeyboardAvoidingView style={{ width: "100%", alignItems: "center" }}>
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <View className=" h-full w-full bg-primary flex    ">
              <ScrollView
                automaticallyAdjustKeyboardInsets
                centerContent={true}
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: "center",
                }}
              >
                <View className=" h-full w-full flex justify-center  items-center  pb-3 ">
                  
                  <Result
                    Answer={Answer}
                    Question={question}
                    fileDetails={File}
                    HandleReset={HandleReset}
                    FileError={FileError}
                    LoadAnswer={LoadAnswer}
                  />
                
<View style={{ alignSelf: "flex-start", marginBottom: 10 }}>
  <SummarizeButton extractedText={Text || "Sample text for testing"} />
</View>


                </View>
              </ScrollView>
              <View className="flex flex-row  items-center ">
                <View className="absolute flex flex-row items-center  px-2 z-10">
                  <Pressable
                    className="  mx-2 "
                    onTouchStart={() => pickDocument()}
                  >
                    <Svg width={25} height={25} viewBox="0 0 24 24">
                      <Path
                        d="M6.739 21.95a5.749 5.749 0 0 1-4.065-9.816l8.485-8.486a.75.75 0 1 1 1.061 1.061l-8.486 8.485A4.25 4.25 0 1 0 9.745 19.2l10.96-10.96a2.751 2.751 0 0 0-3.89-3.89l-8.838 8.844a1.25 1.25 0 1 0 1.768 1.768L15.4 9.306a.75.75 0 1 1 1.061 1.06l-5.656 5.657a2.75 2.75 0 0 1-3.89-3.889l8.84-8.834a4.25 4.25 0 1 1 6.011 6.01l-10.96 10.956a5.715 5.715 0 0 1-4.067 1.684z"
                        fill={"white"}
                      />
                    </Svg>
                  </Pressable>
                </View>
                <TextInput
                  className="  w-full rounded-3xl  p-1      text-white   "
                  // blurOnSubmit={true}
                  // mode={"outlined"}
                  //auto

                  onFocus={(ele: any) => {
                    if (ele) setisFocused(true);
                  }}
                  onSubmitEditing={(ele: any) => {
                    if (ele) setisFocused(false);
                  }}
                  style={{
                    height: 50,
                    paddingLeft: 60,
                    paddingRight: 60,

                    borderWidth: 1,

                    borderColor: QuestionError
                      ? "#D32F2F"
                      : isFocused
                      ? "rgba(255,255,255,1)"
                      : "rgba(255,255,255,0.2)",
                  }}
                  placeholderTextColor={
                    QuestionError ? "#D32F2F" : "rgba(255,255,255,0.2)"
                  }
                  onChangeText={(e) => {
                    setquestion(e);
                    if (e.length > 3) {
                      setQuestionError(false);
                    } else {
                      setQuestionError(true);
                    }
                  }}
                  value={question}
                  placeholder="Enter your question?"
                  keyboardType="default"
                />
                <View
                  className="absolute flex flex-row items-center  px-2 z-10"
                  style={{ right: 0 }}
                >
                  
                  {Load ? (
                    <ActivityIndicator
                      className="  mx-2"
                      animating={true}
                      color={"white"}
                    />
                  ) : (
                    <Pressable className="  mx-2" onTouchStart={onSubmit}>
                      <Svg width={25} height={25} viewBox="0 0 24 24">
                        <Path
                          d="M11.162 12.838 2.114 9.822a1.264 1.264 0 0 1 .012-2.401l18.973-6.11a1.265 1.265 0 0 1 1.59 1.59l-6.11 18.973a1.263 1.263 0 0 1-2.401.012zM3.273 8.627l8.719 2.907c.224.074.4.25.474.474l2.907 8.719L21.12 2.88z"
                          fill={"white"}
                        />
                      </Svg>
                    </Pressable>
                    
                  )}
                </View>
              </View>

              {/* <TouchableHighlight style={{alignItems:'center',justifyContent:'center'}} onPress = {()=>{this._fetchResults()}} underlayColor = 'transparent'>
        <View>
            <Text>Verify</Text>
        </View>
    </TouchableHighlight> */}
            </View>

            {/* <TouchableOpacity> */}

            {/* <View
       className='h-full w-full  '
      style={{
            borderWidth: 2,
    borderRadius: 20,
    borderColor:"#37B6E9",
    borderStyle:"dotted",
      }}
            onTouchEnd={pickDocument}
          >
<View className='flex-1 justify-center   align-center'>
  <Text className='text-white text-center'>upload your file</Text>

</View>
          </View> */}
            {/* </TouchableOpacity> */}
          </Animated.View>
        </KeyboardAvoidingView>
        {/* </ScrollView> */}
      </SafeAreaView>
      <StatusBar animated={true} style="light" />
    </>
  );
};
export default index;

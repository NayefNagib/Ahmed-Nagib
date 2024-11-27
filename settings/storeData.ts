import AsyncStorage from "@react-native-async-storage/async-storage";
import { historyDataT } from "../app/(tabs)/Type";



export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("history");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};


export const storeData = async (value: historyDataT) => {
 

  try {
    let data:any= await getData()?[...await getData()]:[];
    data.push(value);
 

data.sort(function (a: any, b: historyDataT)  {
 
  return +new Date(b.creationTime) - +new Date(a.creationTime);
});
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem("history", jsonValue);
  } catch (e) {
console.log(e)  }
};


export const deleteData = async (indexv: number) => {
  try {
    let data: any = (await getData())
      ? [...(await getData())].filter((ele, index) => index !== indexv)
      : [];
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem("history", jsonValue);
  } catch (e) {
    console.log(e);
  }
};

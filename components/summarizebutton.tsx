import React, { useState } from 'react';
import { Button, Text, View, Alert,Pressable,ActivityIndicator,StyleSheet } from 'react-native';
import { API_KEY ,OPENAI_API_URL,ocrspaceAPIKey } from '../settings/API';

const SummarizeButton = ({ extractedText }: { extractedText: string }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  
  const summarizePdf = async (text: string) => {
    try {
      setLoading(true);
      const response = await fetch(API_KEY, {
        method: OPENAI_API_URL,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),  // Send extracted text to API
      });
      const result = await response.json();
      setSummary(result.summary);  // Assume the API returns a 'summary' field
    } catch (error) {
      console.error('Error summarizing PDF:', error);
      Alert.alert('Error', 'Failed to summarize the document.');
    } finally {
      setLoading(false);
    }
  };

  // Button click handler for summarizing PDF
  const handleSummarize = () => {
    if (!extractedText) {
      Alert.alert('Error', 'Please upload PDF first.');
      return;
    }
    summarizePdf(extractedText); 
  };

   return (
    <Pressable
      onPress={handleSummarize}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? "#777777" : "#1a1d22" },
      ]}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={styles.buttonText}>Summarize</Text>
      )}
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    bottom: 30, 
    left: 20, 
    paddingVertical: 6,
    paddingHorizontal: 12, 
    borderRadius: 15, 
    backgroundColor: "#007BFF", 
    alignItems: "center", 
    justifyContent: "center",
    shadowColor: "#000", 
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
});


export default SummarizeButton;

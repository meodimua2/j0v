import React from "react";
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

interface ControlButtonProps {
  title: string;
  onPress: () => void;
  // Thêm dòng này để cho phép nhận style từ bên ngoài truyền vào
  style?: ViewStyle; 
}

export default function ControlButton({ title, onPress, style }: ControlButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.btn,
        style, // Style truyền vào từ HomeScreen sẽ ghi đè style mặc định ở đây
        pressed && styles.pressed
      ]}
      onPress={onPress}
    >
      <Text style={styles.txt}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    // Style mặc định, nếu không truyền gì nó sẽ lấy cái này
    width: 75,
    height: 75,
    borderRadius: 37.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
  } as ViewStyle,
  
  pressed: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    transform: [{ scale: 0.92 }],
  } as ViewStyle,

  txt: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  } as TextStyle,
});
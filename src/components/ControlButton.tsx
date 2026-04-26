import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

export default function ControlButton({
  title,
  onPress
}: any) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.btn,
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
    width: 90,
    height: 90,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,.08)"
  },
  pressed: {
    transform: [{ scale: 0.92 }]
  },
  txt: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700"
  }
});
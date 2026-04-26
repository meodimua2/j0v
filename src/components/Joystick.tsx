import React, { useRef } from "react";
import { View, Text, PanResponder } from "react-native";

export default function Joystick({ send, connected }: any) {
  const joystick = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderMove: (_, g) => {
        let x = Math.max(-1, Math.min(1, g.dx / 60));
        let y = Math.max(-1, Math.min(1, g.dy / 60));

        send({ type: "axis", x, y });
      },

      onPanResponderRelease: () => {
        send({ type: "axis", x: 0, y: 0 });
      }
    })
  ).current;

  return (
    <View
      {...joystick.panHandlers}
      style={{
        width: 160,
        height: 160,
        borderRadius: 80,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,.05)"
      }}
    >
      <Text style={{ color: connected ? "#0f8" : "#666" }}>
        MOVE
      </Text>
    </View>
  );
}
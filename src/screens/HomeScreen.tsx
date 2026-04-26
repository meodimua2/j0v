import React from "react";
import { View } from "react-native";
import { useSocket } from "../hooks/useSocket";
import ControlButton from "../components/ControlButton";
import Joystick from "../components/Joystick";

export default function HomeScreen() {
  const { connected, send } = useSocket();

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <Joystick send={send} connected={connected} />

      <View>
        <ControlButton
          title="Q"
          onPress={() =>
            send({ type: "tap", key: "q" })
          }
        />

        <ControlButton
          title="E"
          onPress={() =>
            send({ type: "tap", key: "e" })
          }
        />
      </View>
    </View>
  );
}
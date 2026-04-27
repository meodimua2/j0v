import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
} from "react-native";

const SIZE = 170;
const KNOB = 72;
const RADIUS = 55;

export default function Joystick({ send, connected }: any) {
  const pos = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const [dir, setDir] = useState("stop");

  const movePlayer = (x: number, y: number) => {
    const angle = Math.atan2(y, x);
    const distance = Math.sqrt(x * x + y * y);

    if (distance < 15) {
      if (dir !== "stop") {
        send({ type: "move", direction: "stop" });
        setDir("stop");
      }
      return;
    }

    let next = "right";

    if (angle >= -0.4 && angle <= 0.4) next = "right";
    else if (angle > 0.4 && angle < 1.2) next = "down-right";
    else if (angle >= 1.2 && angle <= 2.0) next = "down";
    else if (angle > 2.0 && angle < 2.8) next = "down-left";
    else if (angle >= 2.8 || angle <= -2.8) next = "left";
    else if (angle > -2.8 && angle < -2.0) next = "up-left";
    else if (angle >= -2.0 && angle <= -1.2) next = "up";
    else if (angle > -1.2 && angle < -0.4) next = "up-right";

    if (next !== dir) {
      setDir(next);
      send({ type: "move", direction: next });
    }
  };

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderMove: (_, g) => {
        let x = g.dx;
        let y = g.dy;

        const dist = Math.sqrt(x * x + y * y);

        if (dist > RADIUS) {
          x = (x / dist) * RADIUS;
          y = (y / dist) * RADIUS;
        }

        pos.setValue({ x, y });
        movePlayer(x, y);
      },

      onPanResponderRelease: () => {
        Animated.spring(pos, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();

        send({ type: "move", direction: "stop" });
        setDir("stop");
      },
    })
  ).current;

  return (
    <View style={styles.wrap}>
      <View style={styles.base} />

      <Animated.View
        {...pan.panHandlers}
        style={[
          styles.knob,
          {
            transform: pos.getTranslateTransform(),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: SIZE,
    height: SIZE,
    justifyContent: "center",
    alignItems: "center",
  },

  base: {
    position: "absolute",
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.15)",
  },

  knob: {
    width: KNOB,
    height: KNOB,
    borderRadius: KNOB / 2,
    backgroundColor: "rgba(255,255,255,0.16)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },
});
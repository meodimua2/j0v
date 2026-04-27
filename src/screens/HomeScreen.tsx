import React from "react";
import { View, StyleSheet } from "react-native";
import { useSocket } from "../hooks/useSocket";
import ControlButton from "../components/ControlButton";
import Joystick from "../components/Joystick";

/**
 * Layout chuẩn kiểu Liên Quân:
 * LEFT:
 *  - Joystick dưới trái
 *
 * RIGHT:
 *  - Attack to
 *  - 3 skill chính Q W E
 *  - 2 phép bổ trợ F G
 *  - 3 nút phụ R T Y
 */

const ATTACK = 96;
const SKILL = 64;
const SMALL = 48;
const MINI = 40;

export default function HomeScreen() {
  const { connected, send } = useSocket();

  const tap = (key: string) => send({ type: "tap", key });

  return (
    <View style={styles.container}>
      {/* LEFT */}
      <View style={styles.leftZone}>
        <Joystick send={send} connected={connected} />
      </View>

      {/* RIGHT */}
      <View style={styles.rightZone}>
        {/* Attack */}
        <View style={styles.attack}>
          <ControlButton
            title="⚔️"
            onPress={() => tap("space")}
            style={styles.attackBtn}
          />
        </View>

        {/* Main Skills */}
        <View style={styles.q}>
          <ControlButton title="Q" onPress={() => tap("q")} style={styles.skillBtn} />
        </View>

        <View style={styles.w}>
          <ControlButton title="W" onPress={() => tap("w")} style={styles.skillBtn} />
        </View>

        <View style={styles.e}>
          <ControlButton title="E" onPress={() => tap("e")} style={styles.skillBtn} />
        </View>

        

        {/* Extra buttons */}
        <View style={styles.r}>
          <ControlButton title="R" onPress={() => tap("r")} style={styles.miniBtn} />
        </View>

        <View style={styles.t}>
          <ControlButton title="T" onPress={() => tap("t")} style={styles.miniBtn} />
        </View>

        <View style={styles.y}>
          <ControlButton title="Y" onPress={() => tap("y")} style={styles.miniBtn} />
        </View>
      </View>
    </View>
  );
}

const circle = (
  size: number,
  bg: string,
  border = "rgba(255,255,255,0.15)"
) => ({
  width: size,
  height: size,
  borderRadius: size / 2,
  backgroundColor: bg,
  borderWidth: 1,
  borderColor: border,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  leftZone: {
    position: "absolute",
    left: 40,
    bottom: 50,
  },

  rightZone: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 400,
    height: 320,
  },

  attackBtn: circle(ATTACK, "rgba(255,255,255,0.2)"),
  skillBtn: circle(SKILL, "rgba(255,255,255,0.15)"),
  smallBtn: circle(SMALL, "rgba(255,255,255,0.12)"),
  miniBtn: circle(MINI, "rgba(255,255,255,0.1)"),

  /* MAIN BUTTONS */

 q: {
    position: "absolute",
    right: 150, 
    bottom: 15, // Cùng hàng với Attack (bottom: 15)
  },

  /**
   * Căn T, Y, R ngang hàng với Q (cùng bottom: 15)
   * Và nằm bên trái của Q (right > 150)
   * Mỗi nút cách nhau khoảng 50-60 đơn vị
   */

  r: {
    position: "absolute",
    right: 240, // Tăng từ 210 -> 240
    bottom: 15,
  },

  t: {
    position: "absolute",
    right: 295, // Tăng từ 260 -> 295
    bottom: 15,
  },

  y: {
    position: "absolute",
    right: 350, // Tăng từ 310 -> 350
    bottom: 15,
  },

  // Các nút khác giữ nguyên để tạo vòng cung
  w: {
    position: "absolute",
    right: 135,
    bottom: 110,
  },

  e: {
    position: "absolute",
    right: 35,
    bottom: 150,
  },

  attack: {
    position: "absolute",
    right: 15,
    bottom: 15,
  },
});
import { ThemedText } from "@/components/ThemedText";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ThemedText style={{ textAlign: "center", fontSize: 24 }}>
        Home
      </ThemedText>
    </View>
  );
}

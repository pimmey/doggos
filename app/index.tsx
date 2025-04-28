import { ThemedText } from "@/components/ThemedText";
import { useAuthentication } from "@/hooks/useAuthentication";
import { router } from "expo-router";
import { Button, View } from "react-native";

export default function LoginScreen() {
  async function login() {
    useAuthentication().then(() => {
      router.navigate("/(tabs)");
    });
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ThemedText
          style={{
            fontSize: 24,
            textAlign: "center",
            marginHorizontal: 32,
            marginTop: 24,
          }}
        >
          Welcome to the Aidn code-case app, login to continue
        </ThemedText>
      </View>
      <View
        style={{
          margin: 32,
        }}
      >
        <Button title="Login" onPress={login} />
      </View>
    </View>
  );
}

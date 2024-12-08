import { Stack, SplashScreen } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useEffect} from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AuthProvider from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GluestackUIProvider>   
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <AuthProvider>
            <QueryProvider>
              <Stack>
                <Stack.Screen name="index" options={{headerShown: false}}/>
                <Stack.Screen name="(tabs)" options={{headerShown: false, animation: 'none'}}/>
                <Stack.Screen name="(auth)" options={{headerShown: false, animation: 'none'}}/>
                <Stack.Screen name="addItem" options={{ presentation: 'modal', title: 'Add Detail' }} />
                <Stack.Screen name="(customer)/makeCustomer" options={{ presentation: 'modal', title: 'Add Customer' }} />
                <Stack.Screen name="+not-found" />
              </Stack>
            </QueryProvider>
          </AuthProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </GluestackUIProvider>
  );
}

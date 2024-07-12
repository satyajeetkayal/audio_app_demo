import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="home" options={ {headerTile:'home'}} />
      <Stack.Screen name="visual" options={ {headerTitle:'visualizer'}} />
    </Stack>
  );
}
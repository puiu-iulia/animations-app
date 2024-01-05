import { NavigationContainer } from "@react-navigation/native";
import RootStackNavigator from './app/navigation/RootStack';

export default function App() {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
}

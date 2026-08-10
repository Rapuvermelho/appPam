import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import Setup from './src/screens/Setup';
import Reveal from './src/screens/Reveal';
import Politics from './src/screens/Politics';

import {AppProvider} from './src/context/AppContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
<AppProvider>
  <NavigationContainer>
    <Stack.Navigator initialRouteName='Setup'>
      <Stack.Screen name = "Setup" component={Setup} options={{headerShown:false}}/>
      <Stack.Screen name = "Reveal" component={Reveal} options={{headerShown:false}}/>
      <Stack.Screen name = "Politics" component={Politics} options={{headerShown:false}}/>
    </Stack.Navigator>
  </NavigationContainer>
</AppProvider>
  );
}

import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Setup from './src/screens/Setup';
import Reveal from './src/screens/Reveal';
import Politics from './src/screens/Politics';
import Table from './src/screens/Table';
import Victory from './src/screens/Victory';

import {AppProvider} from './src/context/AppContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
<GestureHandlerRootView style={{ flex: 1 }}>  
  <AppProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Setup'>
        <Stack.Screen name = "Setup" component={Setup} options={{headerShown:false}}/>
        <Stack.Screen name = "Reveal" component={Reveal} options={{headerShown:false}}/>
        <Stack.Screen name = "Politics" component={Politics} options={{headerShown:false}}/>
        <Stack.Screen name = "Table" component={Table} options={{headerShown:false}}/>
        <Stack.Screen name = "Victory" component={Victory} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  </AppProvider>
</GestureHandlerRootView>
  );
}

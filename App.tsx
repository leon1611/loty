import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from './types'; // Importa los tipos

import Main from './pages/Main';
import Selection from './pages/Selection';
import Draw from './pages/Draw';
import Results from './pages/Results';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
        <Stack.Screen name="Selection" component={Selection} options={{ headerShown: false }} />
        <Stack.Screen name="Draw" component={Draw}options={{ headerShown: false }}  />
        <Stack.Screen name="Results" component={Results} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

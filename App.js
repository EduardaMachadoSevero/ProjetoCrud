import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FlatList from './FlatList'
import Home_page from './Home_page'
     

     function ChamarHome() {
   return(
 
     <Home_page/>   
 )}

      function Listar() {
   return(
    
     <FlatList/>   
    )}
    
     function ExemploAula() {
   return (

<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
<Text>Exemplo de Tela</Text>
</View>
);;
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
return (
<Drawer.Navigator>

<Drawer.Screen name="Manter Contato" component={ChamarHome} />
<Drawer.Screen name="Listar" component={Listar} />
<Drawer.Screen name="Exemplo" component={ExemploAula} />
</Drawer.Navigator>
);
}

export default function App() {
return (
<NavigationContainer>
<MyDrawer />
</NavigationContainer>
);
}
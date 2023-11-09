import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Welcome from "../pages/welcome";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import PetLove from "../pages/PetLove";
import MyAcount from "../pages/Account";
import Historico from "../pages/Historico";
import CadastrarPedido from "../pages/CadastrarPedido";
import modificarPedido from "../pages/ModificarPedido";
import Deletar from "../pages/Deletar";


import PetWalker from "../pages/PeWalker";

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator  initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
            <Stack.Screen name="PetLove" component={PetLove} options={{ headerShown: false }} />
            <Stack.Screen name="MyAcount" component={MyAcount} options={{ headerShown: false }} />
            <Stack.Screen name="Historico" component={Historico} options={{ headerShown: false }} />
            <Stack.Screen name="PetWalker" component={PetWalker} options={{ headerShown: false }} />
            <Stack.Screen name="CadastrarPedido" component={CadastrarPedido} options={{ headerShown: false }} />
            <Stack.Screen name="ModificarPedido" component={modificarPedido} options={{ headerShown: false }} />
            <Stack.Screen name="Deletar" component={Deletar} options={{ headerShown: false }} />

        </Stack.Navigator>
    )
}

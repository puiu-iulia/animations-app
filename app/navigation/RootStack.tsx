import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import { Product } from "../../assets/fake";
import Details from "../screens/Details";
import Home from "../screens/Home";
import List from "../screens/List";

type RootStackParamList = {
    Home: undefined;
    Details: { item: Product };
    List: undefined;
};  

export type HomePageProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type DetailsPageProps = NativeStackScreenProps<RootStackParamList, 'Details'>;
export type ListPageProps = NativeStackScreenProps<RootStackParamList, 'List'>;

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
    return (
        <RootStack.Navigator>
            <RootStack.Screen name="Home" component={Home} />
            <RootStack.Screen name="Details" component={Details} />
            <RootStack.Screen name="List" component={List} />
        </RootStack.Navigator>
    );
}

export default RootStackNavigator;
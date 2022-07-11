import MainNavigator from './navigation/MainNavigator';
import 'react-native-gesture-handler';
import './firebase'
import Toast from "react-native-toast-message";


export default function App() {
  return (
    <>
    <MainNavigator />
    <Toast />
    </>
  );
};

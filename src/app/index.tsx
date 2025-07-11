import { Platform, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Home } from "../pages/Home";

export default function Index() {
    return (
        <SafeAreaProvider>
            <StatusBar 
                backgroundColor="#f5f5f5" 
                barStyle="dark-content" 
                translucent={false} 
            />
            <SafeAreaView 
                style={styles.container} 
                edges={['left', 'right', 'bottom']} 
            >
                <Home />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        paddingBottom: Platform.OS === 'android' ? 16 : 0
    }
});
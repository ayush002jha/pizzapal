import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// helps to avoid components to get into status bar at top or bottom
import { SafeAreaView } from 'react-native-safe-area-context';

// To integrate Top Tabs Navigator with expo-router
import { withLayoutContext } from 'expo-router';

// Top Tabs now has context of layout
export const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function OrderListNavigator(){
    return (

        // Wrapping inside the safearea view keeps screen visibility proper
        // keep flex 1 for it to work and occupy the space
        // we can pass edge prop to apply padding to specific side only
        <SafeAreaView edges={['top']} style={{flex:1, backgroundColor:"white"}}>
        <TopTabs>
            <TopTabs.Screen name='index' options={{title:"Active"}} />
        </TopTabs>
        </SafeAreaView>
    )

}
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { useAuth } from '../context/AuthContext';

import { DashboardScreen } from '../screens/dashboard/DashboardScreen';
import { OrdersScreen } from '../screens/orders/OrdersScreen';
import { NewOrderStep1Screen } from '../screens/orders/NewOrderStep1Screen';
import { NewOrderStep2Screen } from '../screens/orders/NewOrderStep2Screen';
import { NewOrderStep3Screen } from '../screens/orders/NewOrderStep3Screen';
import { OrderDetailScreen } from '../screens/orders/OrderDetailScreen';
import { OrderSuccessScreen } from '../screens/orders/OrderSuccessScreen';
import { ReceiptScreen } from '../screens/orders/ReceiptScreen';
import { ShareReceiptScreen } from '../screens/orders/ShareReceiptScreen';
import { PriceListScreen } from '../screens/prices/PriceListScreen';
import { AddPriceScreen } from '../screens/prices/AddPriceScreen';
import { EditPriceScreen } from '../screens/prices/EditPriceScreen';
import { DeactivatePriceScreen } from '../screens/prices/DeactivatePriceScreen';
import { ReportFiltersScreen } from '../screens/reports/ReportFiltersScreen';
import { ReportSummaryScreen } from '../screens/reports/ReportSummaryScreen';
import { ReportSalesDetailScreen } from '../screens/reports/ReportSalesDetailScreen';
import { ReportPriceRankingScreen } from '../screens/reports/ReportPriceRankingScreen';
import { ProfileScreen } from '../screens/settings/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  const { user } = useAuth();
  const isPatron = user?.role === 'patron';

  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: { name: string } }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.bgCard,
          borderTopColor: Colors.border,
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: Colors.orange,
        tabBarInactiveTintColor: Colors.tabInactive,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarIcon: ({ color, size }: { color: string; size: number }) => {
          const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
            Dashboard: 'home-outline',
            Orders: 'receipt-outline',
            Prices: 'pricetag-outline',
            Reports: 'bar-chart-outline',
            Profile: 'person-outline',
          };
          return (
            <Ionicons
              name={icons[route.name] ?? 'ellipse-outline'}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ tabBarLabel: 'Accueil' }} />
      <Tab.Screen name="Orders" component={OrdersScreen} options={{ tabBarLabel: 'Commandes' }} />
      {isPatron && (
        <Tab.Screen name="Prices" component={PriceListScreen} options={{ tabBarLabel: 'Prix' }} />
      )}
      {isPatron && (
        <Tab.Screen name="Reports" component={ReportFiltersScreen} options={{ tabBarLabel: 'Rapports' }} />
      )}
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profil' }} />
    </Tab.Navigator>
  );
}

export function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="NewOrderStep1" component={NewOrderStep1Screen} />
      <Stack.Screen name="NewOrderStep2" component={NewOrderStep2Screen} />
      <Stack.Screen name="NewOrderStep3" component={NewOrderStep3Screen} />
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
      <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
      <Stack.Screen name="Receipt" component={ReceiptScreen} />
      <Stack.Screen name="ShareReceipt" component={ShareReceiptScreen} />
      <Stack.Screen name="PriceList" component={PriceListScreen} />
      <Stack.Screen name="AddPrice" component={AddPriceScreen} />
      <Stack.Screen name="EditPrice" component={EditPriceScreen} />
      <Stack.Screen name="DeactivatePrice" component={DeactivatePriceScreen} />
      <Stack.Screen name="ReportSummary" component={ReportSummaryScreen} />
      <Stack.Screen name="ReportSalesDetail" component={ReportSalesDetailScreen} />
      <Stack.Screen name="ReportPriceRanking" component={ReportPriceRankingScreen} />
    </Stack.Navigator>
  );
}

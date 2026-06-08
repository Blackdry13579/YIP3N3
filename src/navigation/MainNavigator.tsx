import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

import { DashboardScreen } from '../screens/dashboard/DashboardScreen';
import { OrdersScreen } from '../screens/orders/OrdersScreen';
import { NewOrderScreen } from '../screens/orders/NewOrderScreen';
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
import { BestSellersScreen } from '../screens/reports/BestSellersScreen';
import { NotificationsScreen } from '../screens/notifications/NotificationsScreen';
import { ProfileScreen } from '../screens/settings/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function NewOrderPlaceholder() {
  return <View />;
}

function TabNavigator() {
  const { user } = useAuth();
  const { colors: c } = useTheme();
  const isPatron = user?.role === 'patron';

  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: { name: string } }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: c.bgCard,
          borderTopColor: c.border,
          height: 56,
          paddingBottom: 6,
          paddingTop: 4,
        },
        tabBarActiveTintColor: c.primary,
        tabBarInactiveTintColor: c.tabInactive,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean }) => {
          const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
            Dashboard: focused ? 'home' : 'home-outline',
            Orders: focused ? 'receipt' : 'receipt-outline',
            Reports: focused ? 'bar-chart' : 'bar-chart-outline',
            Profile: focused ? 'person' : 'person-outline',
          };
          if (route.name === 'CreateOrder') {
            return (
              <View style={{
                width: 42, height: 42, borderRadius: 21,
                backgroundColor: c.primary,
                alignItems: 'center', justifyContent: 'center',
                marginBottom: 4,
              }}>
                <Ionicons name="add" size={26} color={c.textOnDark} />
              </View>
            );
          }
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

      {/* "+" tab — intercepts press and navigates to NewOrder */}
      <Tab.Screen
        name="CreateOrder"
        component={NewOrderPlaceholder}
        options={{ tabBarLabel: '' }}
        listeners={({ navigation }) => ({
          tabPress: (e: any) => {
            e.preventDefault();
            navigation.navigate('NewOrder');
          },
        })}
      />

      {isPatron && (
        <Tab.Screen name="Reports" component={ReportFiltersScreen} options={{ tabBarLabel: 'Rapports' }} />
      )}
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profil' }} />
    </Tab.Navigator>
  );
}

export function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right', animationDuration: 220 }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="NewOrder" component={NewOrderScreen} />
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
      <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
      <Stack.Screen name="Receipt" component={ReceiptScreen} />
      <Stack.Screen name="ShareReceipt" component={ShareReceiptScreen} />
      <Stack.Screen name="PriceList" component={PriceListScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="AddPrice" component={AddPriceScreen} />
      <Stack.Screen name="EditPrice" component={EditPriceScreen} />
      <Stack.Screen name="DeactivatePrice" component={DeactivatePriceScreen} />
      <Stack.Screen name="ReportSummary" component={ReportSummaryScreen} />
      <Stack.Screen name="ReportSalesDetail" component={ReportSalesDetailScreen} />
      <Stack.Screen name="ReportPriceRanking" component={ReportPriceRankingScreen} />
      <Stack.Screen name="BestSellers" component={BestSellersScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
}

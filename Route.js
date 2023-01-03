import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import React from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Splash,
  Daily,
  Weekly,
  Monthly,
  Yearly,
  Streak,
  Overdue,
  Stats,
} from './pages';
import yearlyGrey from './assets/yearlyGrey.png';
import yearlyBlack from './assets/yearlyBlack.png';
import Icon from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IconF from 'react-native-vector-icons/FontAwesome5';
import {createDrawerNavigator} from '@react-navigation/drawer';
const screenOptions = {animationEnabled: true, headerShown: false};
import 'react-native-gesture-handler';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Today"
      screenOptions={{
        tabBarStyle: {
          height: 56,
          paddingBottom: 6,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerShown: false,
      }}>
      <Tab.Screen
        name="Today"
        component={Daily}
        options={({route}) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'Today';
          return {
            tabBarIcon: ({focused}) => {
              const color = 'Today' && focused ? 'black' : 'grey';
              return <Icon size={25} name="today" color={color} />;
            },
            tabBarLabel: ({focused}) => (
              <Text
                style={[
                  styles.tabNameLabel,
                  routeName === 'Today' && focused
                    ? styles.tabNameActive
                    : styles.tabNameInactive,
                ]}>
                Today
              </Text>
            ),
          };
        }}
      />
      <Tab.Screen
        name="Weekly"
        component={Weekly}
        options={({route}) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'Weekly';
          return {
            tabBarIcon: ({focused}) => {
              const color = 'Weekly' && focused ? 'black' : 'grey';
              return <IconM name="calendar-week" size={25} color={color} />;
            },
            tabBarLabel: ({focused}) => (
              <Text
                style={[
                  styles.tabNameLabel,
                  routeName === 'Weekly' && focused
                    ? styles.tabNameActive
                    : styles.tabNameInactive,
                ]}>
                Weekly
              </Text>
            ),
          };
        }}
      />
      <Tab.Screen
        name="Monthly"
        component={Monthly}
        options={({route}) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'Monthly';
          return {
            tabBarIcon: ({focused}) => {
              const color = 'Monthly' && focused ? 'black' : 'grey';
              return <IconM size={25} name="calendar-month" color={color} />;
            },
            tabBarLabel: ({focused}) => (
              <Text
                style={[
                  styles.tabNameLabel,
                  routeName === 'Monthly' && focused
                    ? styles.tabNameActive
                    : styles.tabNameInactive,
                ]}>
                Monthly
              </Text>
            ),
          };
        }}
      />
      <Tab.Screen
        name="Yearly"
        component={Yearly}
        options={({route}) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'Yearly';
          return {
            tabBarIcon: ({focused}) => {
              const iconName = 'Yearly' && focused ? yearlyBlack : yearlyGrey;
              return <Image style={styles.tabIcon} source={iconName} />;
            },
            tabBarLabel: ({focused}) => (
              <Text
                style={[
                  styles.tabNameLabel,
                  routeName === 'Yearly' && focused
                    ? styles.tabNameActive
                    : styles.tabNameInactive,
                ]}>
                Yearly
              </Text>
            ),
          };
        }}
      />
      <Tab.Screen
        name="Streaks"
        component={Streak}
        options={({route}) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'Streaks';
          return {
            tabBarIcon: ({focused}) => {
              const color = 'Streaks' && focused ? 'black' : 'grey';
              return <IconF size={25} name="fire" color={color} />;
            },
            tabBarLabel: ({focused}) => (
              <Text
                style={[
                  styles.tabNameLabel,
                  routeName === 'Streaks' && focused
                    ? styles.tabNameActive
                    : styles.tabNameInactive,
                ]}>
                Streaks
              </Text>
            ),
          };
        }}
      />
      <Tab.Screen
        name="Overdue"
        component={Overdue}
        options={({route}) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'Overdue';
          return {
            tabBarIcon: ({focused}) => {
              const color = 'Overdue' && focused ? 'black' : 'grey';
              return <Icon name="alert-circle" size={25} color={color} />;
            },
            tabBarLabel: ({focused}) => (
              <Text
                style={[
                  styles.tabNameLabel,
                  routeName === 'Overdue' && focused
                    ? styles.tabNameActive
                    : styles.tabNameInactive,
                ]}>
                Overdue
              </Text>
            ),
          };
        }}
      />
    </Tab.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Todo's">{() => <TabNavigator />}</Drawer.Screen>
      <Drawer.Screen name="Stats" component={Stats} />
    </Drawer.Navigator>
  );
};

const Route = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="DrawerStack">
            {() => <DrawerNavigator />}
          </Stack.Screen>
          <Stack.Screen name="AppStack">{() => <TabNavigator />}</Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    display: 'flex',
    flex: 1,
  },
  tabNameActive: {
    color: 'black',
  },
  tabNameInactive: {
    color: 'grey',
  },
  tabIcon: {
    height: 30,
    width: 30,
  },
});

export default Route;

import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import React from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Splash, Daily, Weekly, Monthly, Yearly, Streak} from './pages';
import todayBlack from './assets/todayBlack.png';
import todayGrey from './assets/todayGrey.png';
import weekBlack from './assets/weekBlack.png';
import weekGrey from './assets/weekGrey.png';
import monthlyBlack from './assets/monthlyBlack.png';
import monthlyGrey from './assets/monthlyGrey.jpeg';
import fireBlack from './assets/fireBlack.png';
import fireGrey from './assets/fireGrey.png';
import yearlyGrey from './assets/yearlyGrey.png';
import yearlyBlack from './assets/yearlyBlack.png';

const screenOptions = {animationEnabled: true, headerShown: false};
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
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
          fontFamily: 'Inter-Medium',
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
              const iconName = 'Today' && focused ? todayBlack : todayGrey;
              return <Image style={styles.tabIcon} source={iconName} />;
            },
            tabBarLabel: ({focused}) => (
              <Text
                style={[
                  styles.tabNameLabel,
                  routeName === 'Today' && focused
                    ? styles.tabNameActive
                    : styles.tabNameInActive,
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
              const iconName = 'Weekly' && focused ? weekBlack : weekGrey;
              return <Image style={styles.tabIcon} source={iconName} />;
            },
            tabBarLabel: ({focused}) => (
              <Text
                style={[
                  styles.tabNameLabel,
                  routeName === 'Weekly' && focused
                    ? styles.tabNameActive
                    : styles.tabNameInActive,
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
              const iconName =
                'Monthly' && focused ? monthlyBlack : monthlyGrey;
              return (
                <Image
                  style={styles.tabIcon}
                  source={iconName}
                  resizeMethod="resize"
                />
              );
            },
            tabBarLabel: ({focused}) => (
              <Text
                style={[
                  styles.tabNameLabel,
                  routeName === 'Monthly' && focused
                    ? styles.tabNameActive
                    : styles.tabNameInActive,
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
                    : styles.tabNameInActive,
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
              const iconName = 'Streaks' && focused ? fireBlack : fireGrey;
              return <Image style={styles.tabIcon} source={iconName} />;
            },
            tabBarLabel: ({focused}) => (
              <Text
                style={[
                  styles.tabNameLabel,
                  routeName === 'Streaks' && focused
                    ? styles.tabNameActive
                    : styles.tabNameInActive,
                ]}>
                Streaks
              </Text>
            ),
          };
        }}
      />
    </Tab.Navigator>
  );
};

const Route = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name="Splash" component={Splash} />
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

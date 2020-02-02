import React from 'react';
import {View, Text, StyleSheet, Platform, StatusBar} from 'react-native';
import {colors} from '../constants';
import strings from '../locales/strings';
import {HeaderBackButton} from 'react-navigation-stack';
import SafeAreaView from 'react-native-safe-area-view';

interface InnerHeaderProps {
  navigation: any;
  back?: string;
  transparent?: boolean;
  title?: string;
}

const InnerHeader = ({
  navigation,
  back,
  transparent,
  title,
}: InnerHeaderProps) => {
  return (
    <SafeAreaView
      style={[
        styles.container,
        transparent && {backgroundColor: colors.ultraLightGray},
      ]}>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
      <View style={styles.header}>
        <View style={[styles.side, {marginLeft: -15}]}>
          {!!back && (
            <HeaderBackButton
              tintColor={colors.darkGray}
              onPress={() => {
                if (back) {
                  navigation.navigate(back);
                } else {
                  navigation.goBack();
                }
              }}
            />
          )}
        </View>
        <View
          style={[
            styles.headerMiddle,
            !back && {
              paddingVertical: 20,
            },
          ]}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
        <View style={styles.side} />
      </View>
      {!transparent && <View style={styles.border} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.ultraLightGray,
  },
  header: {
    flexDirection: 'row',
    paddingBottom: 10,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  side: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: colors.darkGray,
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerMiddle: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 0.8,
  },
  border: {
    height: 1,
    backgroundColor: colors.extraGray,
    flexDirection: 'row',
    marginHorizontal: 30,
  },
});

export default InnerHeader;

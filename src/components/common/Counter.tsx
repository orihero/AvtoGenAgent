import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../constants';
import strings from '../../locales/strings';

const Counter = ({init = 120}) => {
  const [count, setCount] = useState(init);
  useEffect(() => {
    let interval = window.setInterval(() => {
      setCount(count - 1);
      if (count <= 0) {
        setCount(0);
        window.clearInterval(interval);
      }
    }, 1000);
    return () => {
      window.clearInterval(interval);
    };
  }, [count]);
  return (
    <View style={styles.container}>
      <Text style={styles.countText}>
        {`${Math.floor(count / 60)}:${
          count % 60 < 10 ? '0' + (count % 60).toString() : count % 60
        }`}
      </Text>
      <Text style={styles.counterIndicator}> {strings.seconds}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  countText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.accent,
  },
  counterIndicator: {
    color: colors.darkGray,
    fontSize: 16,
  },
});

export default Counter;

import React from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {FadeIn} from 'react-native-reanimated';

function App(): React.JSX.Element {
  const [isBlueViewVisible, setIsBlueViewVisible] = React.useState(true);
  const [isAnimatedViewVisible, setIsAnimatedViewVisible] =
    React.useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {Platform.OS !== 'android' ? (
          <Text style={styles.warningText}>
            WARNING: This is issue is Android specific. Please run the app on
            Android.
          </Text>
        ) : null}

        <Button
          title="Toggle Blue View Visibility"
          backgroundColor="blue"
          onPress={() => {
            setIsBlueViewVisible(prev => !prev);
          }}
        />

        <Space size={16} />

        {isAnimatedViewVisible ? null : (
          <Button
            title="Trigger Layout Animation"
            backgroundColor="green"
            onPress={() => {
              setIsAnimatedViewVisible(true);
            }}
          />
        )}

        <Space size={16} />

        {isAnimatedViewVisible ? (
          <Animated.View
            entering={FadeIn.duration(2000)}
            style={styles.animatedView}>
            <Text style={styles.whiteText}>
              From now on, the issue is reproducible. Now you can't trust
              z-index after unmounting/remounting.
            </Text>
            <Space size={8} />
            <Text style={styles.whiteText}>
              Toggle the blue view visibility multiple times and after some
              toggles, it won't work as expected.
            </Text>
            <Space size={8} />
            <Text style={styles.whiteText}>
              The only way to make it work again is to restart the app.
            </Text>
          </Animated.View>
        ) : (
          <View style={styles.infoView}>
            <Text style={styles.whiteText}>
              Z-Index should be working fine now.
            </Text>
            <Space size={8} />
            <Text style={styles.whiteText}>
              If you toggle the blue View visibility multiple times, it should
              consistently be on top of the red View
            </Text>
            <Space size={8} />
            <Text style={styles.whiteText}>
              As soon as you trigger the layout animation, it won't work anymore
              until you restart the app.
            </Text>
          </View>
        )}

        {isBlueViewVisible ? (
          <View style={styles.blueView}>
            <Text style={styles.whiteTextCentered}>Blue View - zIndex = 2</Text>
          </View>
        ) : null}

        <View style={styles.redView}>
          <Text style={styles.whiteTextCentered}>Red View - zIndex = 1</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  blueView: {
    backgroundColor: 'blue',
    width: '100%',
    height: 100,
    position: 'absolute',
    bottom: 0,
    zIndex: 2,
  },
  redView: {
    backgroundColor: 'red',
    width: '100%',
    height: 200,
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 100,
    paddingHorizontal: 24,
  },
  animatedView: {
    backgroundColor: '#722F37',
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  infoView: {
    backgroundColor: 'green',
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
  whiteText: {
    color: 'white',
  },
  whiteTextCentered: {
    color: 'white',
    textAlign: 'center',
  },
  warningText: {
    fontSize: 28,
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 24,
  },
});

const Button = ({
  title,
  onPress,
  backgroundColor = 'blue',
  style,
}: {
  title: string;
  onPress?: () => void;
  backgroundColor?: string;
  style?: ViewStyle;
}): React.JSX.Element => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[buttonStyles.touchable, {backgroundColor}, style]}>
      <Text style={buttonStyles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const buttonStyles = StyleSheet.create({
  touchable: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 16,
    elevation: 4,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

const Space = ({size}: {size: number}) => {
  return (
    <View
      style={{
        height: size,
      }}
    />
  );
};

export default App;

import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
  } from 'react-native-reanimated';
  
import { FontAwesome } from '@expo/vector-icons'
  
  const BlinkingDot = () => {
    const opacity = useSharedValue(0);
  
    // Set the opacity value to animate between 0 and 1
    opacity.value = withRepeat(
      withTiming(1, { duration: 1000, easing: Easing.ease }),
      -1,
      true
    );
  
    const style = useAnimatedStyle(() => ({ opacity: opacity.value }), []);
  
    return (
      <Animated.View style={style}>
        <FontAwesome name="sticky-note-o" color="#f97316" size={25}/>
      </Animated.View>
    );
  }
  
  export default BlinkingDot
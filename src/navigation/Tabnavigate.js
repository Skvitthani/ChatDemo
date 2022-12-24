import React, {useState} from 'react';
import Homescreen from '../screen/Homescreen';
import Groupchatscreen from '../screen/Groupchatscreen';
import Callscreen from '../screen/Callscreen';
import {TabView, SceneMap} from 'react-native-tab-view';
import Customheader from '../component/Customheader';
import {Platform, SafeAreaView, StyleSheet, Text} from 'react-native';
import {View, StatusBar, TouchableOpacity, Animated} from 'react-native';

const renderScene = SceneMap({
  first: Homescreen,
  second: Groupchatscreen,
  thired: Callscreen,
});

// const renderTabBar = props => {
//  let state = {
//     index: 0,
//     routes: [
//       {key: 'first', title: 'First'},
//       {key: 'second', title: 'Second'},
//     ],
//   };

//   const handleIndexChange = index => this.setState({index:index});

//   const inputRange = props.navigationState.routes.map((x, i) => i);

//   return (
//     <View style={{flexDirection: 'row', paddingTop: StatusBar.currentHeight}}>
//       {props.navigationState.routes.map((route, i) => {
//         const opacity = props.position.interpolate({
//           inputRange,
//           outputRange: inputRange.map(inputIndex =>
//             inputIndex === i ? 1 : 0.5,
//           ),
//         });

//         return (
//           <TouchableOpacity
//             style={{
//               flex: 1,
//               alignItems: 'center',
//               padding: 16,
//             }}
//             onPress={() => this.setState({index: i})}>
//             <Animated.Text style={{opacity}}>{route.title}</Animated.Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// };

const Tabnavigate = () => {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {key: 'first', title: 'Chat'},
    {key: 'second', title: 'Group'},
    {key: 'thired', title: 'Call'},
  ]);

  const handletextChange = index => setIndex(index);

  const renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    // console.log('inputRange==>', inputRange);
    return (
      <View style={style.tabBar}>
        {props.navigationState.routes.map((routes, i) => {
          // console.log('i==>', i);
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(inputText =>
              inputText === i ? 1 : 0.5,
            ),
          });
          return (
            <TouchableOpacity style={style.tabItem} onPress={() => setIndex(i)}>
              <Animated.Text style={{opacity, fontSize: 20, color: 'white'}}>
                {routes?.title}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <>
      <Customheader />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={handletextChange}
        renderTabBar={renderTabBar}
      />
    </>
  );
};

const style = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#2B2D5E',
    
    
  },
});

export default Tabnavigate;

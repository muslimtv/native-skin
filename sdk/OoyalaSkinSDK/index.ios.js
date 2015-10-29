/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var React = require('react-native');
var {
  ActivityIndicatorIOS,
  AppRegistry,
  DeviceEventEmitter,
  StyleSheet,
  View,
} = React;

var Constants = require('./constants');
var {
  SCREEN_TYPES
} = Constants;
var OoyalaSkinCore = require('./ooyalaSkinCore');
var eventBridge = require('NativeModules').OOReactBridge;

var OoyalaSkinCoreInstance;
var OoyalaSkin = React.createClass({
  // note/todo: some of these are more like props, expected to be over-ridden/updated
  // by the native bridge, and others are used purely on the non-native side.
  // consider using a leading underscore, or something?
  getInitialState: function() {
    return {
      // states from react
      screenType: SCREEN_TYPES.LOADING_SCREEN,
      // states from native
      title: '',
      description: '',
      promoUrl: '',
      hostedAtUrl: '',
      playhead: 0,
      duration: 1,
      rate: 0,
      fullscreen: false,
      lastPressedTime: (new Date).getTime(),
      upNextDismissed: false,
      showPlayButton: true,
      // things which default to null and thus don't have to be stated:
      // selectedLanguage: null,
      // availableClosedCaptionsLanguages: null,
      // captionJSON: null,
      buttonSelected: "None",
      alertTitle: '',
      alertMessage: '',
      error: null
    };
  },

  componentWillMount: function() {
    console.log("componentWillMount");
    OoyalaSkinCoreInstance = new OoyalaSkinCore(this, eventBridge);
    OoyalaSkinCoreInstance.mount(DeviceEventEmitter);
  },

  componentDidMount: function() {
    eventBridge.queryState();
  },

  componentWillUnmount: function() {
    console.log("componentWillUnmount");
    OoyalaSkinCoreInstance.unmount();
  },
  
  renderLoadingScreen: function() {
    return (
      <View style={styles.loading}>
        <ActivityIndicatorIOS
          animating={true}
          size="large">
        </ActivityIndicatorIOS>
      </View>);
  },

  render: function() {
    console.log("screentype:"+this.state.screenType);
    switch (this.state.screenType) {
      case SCREEN_TYPES.START_SCREEN: 
        return OoyalaSkinCoreInstance.renderStartScreen(); 
        break;
      case SCREEN_TYPES.END_SCREEN:   
        return OoyalaSkinCoreInstance.renderEndScreen();   
        break;
      case SCREEN_TYPES.LOADING_SCREEN: 
        return this.renderLoadingScreen(); 
        break;
      case SCREEN_TYPES.MOREOPTION_SCREEN:  
        return OoyalaSkinCoreInstance.renderMoreOptionScreen();  
        break;
      case SCREEN_TYPES.ERROR_SCREEN: 
        return OoyalaSkinCoreInstance.renderErrorScreen(); 
        break;
      default:      
        return OoyalaSkinCoreInstance.renderVideoView();   
        break;
    }
  }
});

var styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200
  },
});
AppRegistry.registerComponent('OoyalaSkin', () => OoyalaSkin);

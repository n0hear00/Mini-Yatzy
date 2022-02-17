import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      position: 'absolute',
      flex:0.1,
      left: 0,
      paddingTop: '20px',
      right: 0,
      top: 0,
      backgroundColor:'#87ceea',
      height: 60,
      alignItems:'center',
    },
    footer: {
      position: 'absolute',
      flex:0.1,
      left: 0,
      paddingTop: '20px',
      right: 0,
      bottom: -10,
      backgroundColor:'#87ceea',
      height: 50,
      alignItems:'center',
    },
    button: {
      backgroundColor: '#74ced6',
      borderRadius: 10,
      width: '100px',
      textAlign: 'center',
      paddingTop: '10px',
      paddingBottom: '10px',
    },
    stats: {
      marginHorizontal: 20,
    }
  });

export default styles;
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    tooltipPopup: {
      position:'absolute',
      zIndex:3 ,
      alignSelf: "flex-start",
      left:1,
      backgroundColor: 'yellow',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: "fit-content",
      borderRadius: 1,
      padding: '10px',
    },
    selectRowContainer: {
      flexDirection: 'row',
      width:'100%',
      paddingRight: '5%',
      padding: 3,
      maxWidth: '100%',
      // backgroundColor: 'orange',
    },
    selectBox: {
      width:'50%',  
      borderRadius: 8,
      borderWidth: 2,
      borderColor: '#444',
    },
    queryDescriptionBox: {
      justifyContent:"space-around", 
      padding:2, 
      margin: 10,
      marginTop: 5, 
      marginBottom:5, 
      backgroundColor:"#F5F5DC"
    },

    queryDescriptionText: {
      fontSize:20, 
      textAlign:'center',  
      marginTop: 5, 
      marginBottom:5,
      color: 'black',
    },

    table: {
      flex: 1,
      flexDirection: 'column',
      display:'flex',
      borderWidth: 3,
      margin:"2%",
      marginTop:0,
      borderColor: 'black',
      marginBottom: 10,
      fontFamily:'sans-serif',
    },
    headerRow: {
      flexDirection: 'row',
      backgroundColor: 'lightgray',
      height:40,
      adjustsFontSizeToFit:true,
      numberOfLines:1,
    },
    headerCell: {
      flex: 1,
      padding: 5,
      color:"black",
      fontWeight: 'bold',
      textAlign:'center',
    },
    secondColumnHeaderCell: {
      // flex: 0.7,
      // padding: 5,
      // fontWeight: 'bold',
      // textAlign: 'center', // Center-align text within header cell
    },
    row: {
      flexDirection: 'row',
      verticalAlign: 'middle',
      textAlign:'center',
    },
    cell: {
      display:'flex',
      flex:1,
      height: 70,
      borderWidth: 1,
      borderColor:"green",
      fontSize:25,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex:0,
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    cellText: {
      // flex: 1,
      // textAlign: 'center',
      // textAlignVertical: 'center',
    },
    tooltipButton:{
      fontSize:25,
    },
    evenRow: {
      backgroundColor: '#37932f',
      color: '#f6f7f9',
      borderColor: 'black',
    },
    oddRow: {
      backgroundColor: '#c5c5c2',
      borderColor: 'black',
    },
    image: {
      flex:1,
      width:65,
      display:'flex',
      height: 65,
      borderWidth: 1,
      // borderColor:"green",
      justifyContent:'center',
      alignContent:'center'
    },
  }
);
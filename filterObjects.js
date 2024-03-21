// import { styles } from './styles';
// import { StyleSheet, View, ScrollView, Text, Image} from "react-native";
// import { useCallback, useEffect, useState } from "react";
// import { currentYear, selectedTeamsFilter, setTeamsFilter, selectedSort, setSort, selectedOppConf, setOppConf, selectedOppRank, setOppRank, selectedYears, setYears, selectedField, setField, selectedConfAlignment, setConfAlignment, selectedGamesMinimum, setGamesMinimum } from "./App";


// export function displayPrepositions(trueFalse) {
//     if (trueFalse == true){
//       setVersusPrepostion(' vs');
//       setOpponentPreposition(' opponents');
//     } else {
//       setVersusPrepostion('');
//       setOpponentPreposition('');
//     }
//   }
// export const handleTeamsFilter = (selectedItem, index) => {
//     values = ["power","acc","big-12","big-ten","pac","sec","G5"];
//     setTeamsFilter(values[index]);

//     var displayText = <Text style={{ color: 'blue' }}>{selectedItem} teams</Text>;

//     if (selectedItem == "All Teams"){
//         displayText = "teams";
//     }
//     if (selectedItem == "Include G5"){
//         displayText = "FBS teams";
//     }
//     setDisplayConference(displayText);
//   };
// export const handleSortSelection = (selectedItem, index) => {
//     values=["average","total"]
//     setSort(values[index]);
//     labels = ['win rate', 'total wins']
//     var displayText = <Text style={{color:'blue'}} >{labels[index]}</Text>;
//     setDisplaySort(displayText);
//   };
// export const handleOppConf = (selectedItem, index) => {
//     values = ['select',"acc","big-12","big-ten","pac","sec","ooc","power","G5","FCS"];
//     setOppConf(values[index]);
//     var displayText = <Text style={{ fontWeight:"bold", color: 'blue' }}> {selectedItem.toUpperCase()}</Text>;
//     if (selectedItem.includes("Any")){
//         displayText = "";
//     } else {
//       showPrepositions = true;
//       displayPrepositions(true);
//     }
//     setDisplayOppConf(displayText);
//   };
// export const handleOppRank = (selectedItem, index) => {
//     values = ["select",'unranked',25,15,10,5,1,"higher","lower"]
//     setOppRank(values[index]);
//     if (index == 7){
//       selectedItem = "higher ranked"}
//     if (index == 8){
//       selectedItem = "lower ranked"}
//     var displayText = <Text style={{ fontWeight:"bold", color: 'red' }}> {selectedItem.toLowerCase()}</Text> ;
//     if (selectedItem.includes('25')){
//       displayText = <Text style={{ fontWeight:"bold", color: 'red' }}> ranked</Text> ;
//     }
//     if (selectedItem.includes("Any")){
//       displayText = "";
//     } else{
//       displayPrepositions(true);
//     }
//     setDisplayOppRank(displayText)
    
//   };
// export  const handleYears = (selectedItem, index) => {
// var yearSelection = <Text> since <Text style = {{color:'blue'}}>{currentYear - index} </Text></Text>;
// setDisplayYears(yearSelection)
// setYears(index);
// };
// export const getYearsButtonText = (selectedItem, index) => {
//     if (index === 0) {
//       return `This year`;
//     } else {
//       return `Since ${currentYear - index}`;
//     }
// };
// export const handleField = (selectedItem, index) => {
// setField(index);
// if (selectedItem.includes("Any Field")){
// selectedItem = "";
// } else 
// if (index == 1){
//     selectedItem = "home ";
// } else 
// if (index == 2){
//     selectedItem = "road game ";
// } else {
//     selectedItem = "neutral site ";
// }
// var displayText = <Text style={{ fontWeight:"bold", color: 'brown' }}>{selectedItem}</Text>;
// setDisplayField(displayText)
// };
// export const handleConfAlignment = (selectedItem, index) => {
// setConfAlignment(values[index]);
// };
// export const handleGamesMinimum = (selectedItem, index) => {
// values = [0,2,3,5,10]
// setGamesMinimum(values[index]);
// }; 
// export const yearsOptions = Array.from({ length: 31 }, (_, index) => {
//   if (index == 0){
//     return 'This year';
//   }else if ((currentYear-index)%10 ==0){
//     return 'Since ' + String(currentYear - index);
//   }else{
//     return `${index} year${index > 1 ? 's' : ''}`;
//   }
// });
import { useState, useEffect } from "react";
import { View, ScrollView, Text} from "react-native";
import {styles} from './styles';
import SelectDropdown from 'react-native-select-dropdown';
import CreateTable from './whenTable';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const [selectedTeamConf, setTeamConf] = useState('power');
  const [selectedTeamRank, setTeamRank] = useState('select');

  const [selectedOppConf, setOppConf] = useState('select');
  const [selectedOppRank, setOppRank] = useState('select');

  const [selectedResult, setResult] = useState('win');
  const [selectedMargin, setMargin] = useState('select');
  const [selectedField, setField] = useState('select');
  const [selectedConfAlignment, setConfAlignment] = useState('0');


  const [displayTeamConf, setDisplayTeamConf] = useState("each team ");
  const [displayTeamRank, setDisplayTeamRank] = useState(null);
  const [displayResult, setDisplayResult] = useState(<Text style={{ color: 'blue' }}>won </Text>);
  const [displayOppConf, setDisplayOppConf] = useState(null);
  const [displayOppRank, setDisplayOppRank] = useState('any ');
  const [displayMargin, setDisplayMargin] = useState(null);
  const [displayField, setDisplayField] = useState(null);
  const [displayStringVersus, setDisplayStringVersus] = useState('vs ');



  const handleTeamConf = (selectedItem, index) => {
    values = ["power","acc","big-12","big-ten","pac","sec","G5"];
    setTeamConf(values[index]);


    if (selectedItem == "G5"){
        selectedItem = "FBS"}
    if (selectedItem == "All Teams"){
        selectedItem = ""}
    var textVariable = <Text style={{color:'blue'}}>{selectedItem}</Text>;
    var displayText = <Text>each {textVariable} team </Text>;
    setDisplayTeamConf(displayText);
  };
  const handleTeamRank = (selectedItem, index) => {
    values = ['select','unranked',25,15,10,5,1,"higher","lower"]
    setTeamRank(values[index]);
    const display = ['', 'unranked', 'ranked', 'top15', 'top10', 'top5', '#1', 'higher ranked', 'lower ranked']
    var displayText = <Text>was <Text style={{color:'blue'}}>{display[index]}</Text> and </Text>;

    if (index == 0){
          displayText = ""}
    setDisplayTeamRank(displayText);
  };

  const handleOppConf = (selectedItem, index) => {
    values = ['select',"acc","big-12","big-ten","pac-","sec","ooc",'power',"G5","FCS"];
    queryTextValues = ['-', 'ACC', 'Big-12', 'Big Ten', 'Pac-12', 'SEC', "non-conference",'Power 5',"mid-major","FCS"]
    setOppConf(values[index]);

    var displayText = <Text style={{ fontWeight:"bold", color: 'blue' }}>{queryTextValues[index]} </Text>;
    if (selectedItem.includes("Any")){
        displayText = "";
        if (checkOppRankDisplay == 'select'){
          displayPrepositions(false)
        }
    } else {
      displayPrepositions(true);
    }
    setDisplayOppConf(displayText);
  };

  const handleOppRank = (selectedItem, index) => {
    values = ['select','unranked','25','15','10','5','1',"higher","lower"]
    const displayThis = ['','unranked','ranked','top15','top10','top5','#1 ranked',"higher ranked","lower ranked"]
    setOppRank(values[index]); 
    var aOrAn = 'a'
    if (index==1){aOrAn='an'};
    var displayText = <Text>{aOrAn} <Text style={{ fontWeight:"bold", color: 'red' }}>{displayThis[index]} </Text></Text> ;
    if (index == 0){
        displayText = "any "
        if (selectedOppConf == 'select'){
            displayPrepositions(false);
        }
    } else{
      displayPrepositions(true);
    }
    setDisplayOppRank(displayText);
  };

  const handleResultSelection = (selectedItem, index) => {
    const checkMargin = selectedMargin
    values=["win","loss",'select']
    setResult(values[index])
    if (index == 2){
        selectedItem ="played"};
    if (index == 0){
        if (checkMargin == 'shutout'){
            selectedItem='shutout'
            displayPrepositions(false)
        } else{
            selectedItem="won"
            displayPrepositions(true)
    }}
    if (index == 1){
        selectedItem = "lost"
        displayPrepositions(true)
        if (checkMargin == 'shutout'){
            selectedItem = 'was shutout by'
            displayPrepositions(false)
    }}
    var displayText = <Text style={{color:'blue'}} >{selectedItem} </Text>
    setDisplayResult(displayText)
  };
  const reCalculateResultString = (selectedMargin) =>{
    var displayString = ''
    const currentResult = selectedResult
    if (selectedMargin =='shutout'){
        if (currentResult =='win'){
            displayString = 'shutout'
            displayPrepositions(false)
        } else {
             displayString = 'was shutout';
        }
    } else {
        displayPrepositions(true)
        if (currentResult=='win'){
            displayString =  'won';
        } else {
            displayString =  'lost';
        }
    }
    return <Text style={{color:'blue'}}>{displayString} </Text>
  }
  useEffect(() => {
    const newResult = reCalculateResultString(selectedMargin);
    setDisplayResult(newResult);
  }, [selectedMargin]);

  const handleMarginSelection = (selectedItem, index) => {
    values=["select", "10", '14', '20', '30', 'shutout']
    setMargin(values[index])

    if ([0,5].includes(index)){
        displayText = ""
    }else {
        displayText = <Text style={{color:'blue'}}>{selectedItem} </Text>
    };
    setDisplayMargin(displayText)
    setDisplayResult(displayResult)
  };
  const handleField = (selectedItem, index) => {
    setField(index)
    values = ["", ' at home', ' on the road', ' at a neutral site']
    var displayText = <Text style={{ fontWeight:"bold", color: 'brown' }}>{values[index]}</Text>;
    setDisplayField(displayText)
  };
  const handleConfAlignment = (selectedItem, index) => {
    setConfAlignment(index);
  };
  function displayPrepositions(trueFalse) {
    if (trueFalse == true){
        setDisplayStringVersus('vs ');
        // setOpponentPreposition(' opponent');
    } else {
        setDisplayStringVersus('')
        // setOpponentPreposition('')
    }
  }
 
  return (
    <ScrollView style = {{backgroundColor: '#9ACD32'}}><View name = "Top Banner" style={{ height: 20}}/>  

    <View name = "1st row" style={styles.selectRowContainer}>
      <SelectDropdown  name = "Team conference"
        dropdownOverlayColor = 'transparent' data={['All Teams', 'ACC', 'Big 12', 'Big Ten', 'Pac-12', 'SEC', 'Include G5']}
        onSelect={handleTeamConf} defaultValueByIndex={0} buttonStyle = {styles.selectBox} />
      <Text>   </Text>
      <SelectDropdown  name = "Team rank"
        dropdownOverlayColor = 'transparent'  data={['Any Rank', 'Unranked','Top 25', 'Top 15', 'Top 10', 'Top 5', '#1', 'Higher rank', 'Lower rank']}
        onSelect={handleTeamRank} defaultValueByIndex = {0} buttonStyle = {styles.selectBox}/>
    </View>

    <View name="2nd row" style={styles.selectRowContainer}>
      <SelectDropdown name = "Opp conference"
        dropdownOverlayColor = 'transparent' data={['Vs Any Team', 'Vs ACC', 'Vs Big 12', 'Vs Big Ten', 'VS Pac-12', 'Vs SEC', "Non-conference",'Vs Power Conference',"Vs Mid-major","All FCS"]}
        onSelect={handleOppConf} defaultValueByIndex={0} buttonStyle = {styles.selectBox} />
      <Text>   </Text>

      <SelectDropdown  name = "Opp rank"
        dropdownOverlayColor = 'transparent'  data={['Vs Any Rank', 'Vs Unranked','Vs Top 25', 'Vs Top 15', 'Vs Top 10', 'Vs Top 5', 'Vs #1', 'Vs Higher rank', 'Vs Lower rank']}
        onSelect={handleOppRank} defaultValueByIndex = {0} buttonStyle = {styles.selectBox}/>
    </View>

    <View name = "3rd row" style={styles.selectRowContainer} >
      <SelectDropdown   name = "Margin of Victory"
        dropdownOverlayColor = 'transparent' data={['Any margin', 'by 10', 'by 14', 'by 20', 'by 30', 'shutout']}
        onSelect={handleMarginSelection}  defaultValueByIndex = {0} buttonStyle = {styles.selectBox} />   
      <Text>   </Text>

      <SelectDropdown name="Field"
        dropdownOverlayColor = 'transparent'  data={['Any Field', 'Home','Away', 'Neutral' ]}
        onSelect={handleField} defaultValue = {'Any Field'} buttonStyle = {styles.selectBox} />
    </View>

    <View name = "4th row" style={styles.selectRowContainer}>
      <SelectDropdown name = "Conference Alignment"
        dropdownOverlayColor = 'transparent' data={['Current Conferences', 'Historic Conf.']}
        onSelect={handleConfAlignment} buttonStyle={[styles.selectBox]} rowTextStyle={{fontSize:16}} defaultValueByIndex={0} />  
      <Text>   </Text>


      <SelectDropdown  name = "win/loss"
        dropdownOverlayColor = 'transparent' data={['Result: Win', 'Result: Loss', 'Result: Any']}
        onSelect={handleResultSelection} defaultValueByIndex={0} buttonStyle={styles.selectBox}/>
    </View>

    <View  name = "Description of query as prose"
      style = {styles.queryDescriptionBox}>
        <Text style = {styles.queryDescriptionText}>
            When's the last time {displayTeamConf}
            {displayTeamRank}
            {displayResult}
            {displayMargin}
            {displayStringVersus}
            {displayOppRank}
            {displayOppConf}
            opponent
            {displayField}?
        </Text>
    </View>

    <View>
      <CreateTable 
        selectedMargin = {selectedMargin}
        selectedTeamConf = {selectedTeamConf} 
        selectedTeamRank = {selectedTeamRank}
        selectedResult = {selectedResult} 
        selectedOppConf = {selectedOppConf} 
        selectedOppRank = {selectedOppRank} 
        selectedField= {selectedField} 
        selectedConfAlignment= {selectedConfAlignment} 
      />
    </View>
    </ScrollView>
  );
}

import { useState } from "react";
import { View, ScrollView, Text} from "react-native";
import {styles} from './styles';
import SelectDropdown from 'react-native-select-dropdown';
import CreateTable from './createTable';


export default function App() {
  const currentYear = new Date().getFullYear();
  const [selectedTeamsFilter, setTeamsFilter] = useState('power');
  const [selectedSort, setSort] = useState('average');
  const [selectedOppConf, setOppConf] = useState('select');
  const [selectedOppRank, setOppRank] = useState('select');
  const [selectedYears, setYears] = useState('10');
  const [selectedField, setField] = useState('select');
  const [selectedConfAlignment, setConfAlignment] = useState('0');
  const [selectedGamesMinimum, setGamesMinimum] = useState('0');

  const [displayConference, setDisplayConference] = useState("teams");
  const [displaySort, setDisplaySort] = useState(<Text style={{ color: 'blue' }}>win rate</Text>);
  const [displayOppConf, setDisplayOppConf] = useState(null);
  const [displayOppRank, setDisplayOppRank] = useState(null);
  const yearsOptions = Array.from({ length: 31 }, (_, index) => {
    if (index == 0){
      return 'This year';
    }else if ((currentYear-index)%10 ==0){
      return 'Since ' + String(currentYear - index);
    }else{
      return `${index} year${index > 1 ? 's' : ''}`;
    }
  });
  const [displayYears, setDisplayYears] = useState(<Text> since <Text style = {{color:'blue'}}>{currentYear - selectedYears}</Text></Text>);
  const [displayField, setDisplayField] = useState(null);
  var showPrepositions = false;
  const [versusPreposition, setVersusPrepostion] = useState(null);
  const [opponentPreposition, setOpponentPreposition] = useState(null);



  function displayPrepositions(trueFalse) {
    if (trueFalse == true){
      setVersusPrepostion(' vs');
      setOpponentPreposition(' opponents');
    } else {
      setVersusPrepostion('');
      setOpponentPreposition('');
    }
  }
  const handleTeamsFilter = (selectedItem, index) => {
    values = ["power","acc","big-12","big-ten","pac","sec","G5"];
    setTeamsFilter(values[index]);

    var displayText = <Text style={{ color: 'blue' }}>{selectedItem} teams</Text>;

    if (selectedItem == "All Teams"){
        displayText = "teams";
    }
    if (selectedItem == "Include G5"){
        displayText = "FBS teams";
    }
    setDisplayConference(displayText);
  };
  const handleSortSelection = (selectedItem, index) => {
    values=["average","total"]
    setSort(values[index]);
    labels = ['win rate', 'total wins']
    var displayText = <Text style={{color:'blue'}} >{labels[index]}</Text>;
    setDisplaySort(displayText);
  };
  const handleOppConf = (selectedItem, index) => {
    values = ['select',"acc","big-12","big-ten","pac","sec","ooc","power","G5","FCS"];
    setOppConf(values[index]);
    var displayText = <Text style={{ fontWeight:"bold", color: 'blue' }}> {selectedItem.toUpperCase()}</Text>;
    if (selectedItem.includes("Any")){
        displayText = ""
        if (selectedOppRank == 'select'){
          displayPrepositions(false);
        }
    } else {
      showPrepositions = true;
      displayPrepositions(true);
    }
    setDisplayOppConf(displayText);
  };
  const handleOppRank = (selectedItem, index) => {
    values = ['select','unranked',25,15,10,5,1,"higher","lower"]
    setOppRank(values[index]);
    if (index == 7){
      selectedItem = "higher ranked"}
    if (index == 8){
      selectedItem = "lower ranked"}
    var displayText = <Text style={{ fontWeight:"bold", color: 'red' }}> {selectedItem.toLowerCase()}</Text> ;
    if (selectedItem.includes('25')){
      displayText = <Text style={{ fontWeight:"bold", color: 'red' }}> ranked</Text> ;
    }
    if (selectedItem.includes("Any")){
      displayText = ""
      if (selectedOppConf == 'select'){
        displayPrepositions(false);
      }
    } else{
      displayPrepositions(true);
    }
    setDisplayOppRank(displayText)
    
  };
  const handleYears = (selectedItem, index) => {
    var yearSelection = <Text> since <Text style = {{color:'blue'}}>{currentYear - index} </Text></Text>;
    setDisplayYears(yearSelection)
    setYears(index);
  };
  const getYearsButtonText = (selectedItem, index) => {
    if (index === 0) {
      return `This year`;
    } else {
      return `Since ${currentYear - index}`;
    }
  };
  const handleField = (selectedItem, index) => {
    setField(index);
    if (selectedItem.includes("Any Field")){
    selectedItem = "";
    } else 
    if (index == 1){
      selectedItem = "home ";
    } else 
    if (index == 2){
      selectedItem = "road game ";
    } else {
      selectedItem = "neutral site ";
    }
    var displayText = <Text style={{ fontWeight:"bold", color: 'brown' }}>{selectedItem}</Text>;
    setDisplayField(displayText)
  };
  const handleConfAlignment = (selectedItem, index) => {
    setConfAlignment(index);
  };
  const handleGamesMinimum = (selectedItem, index) => {
    values = [0,2,3,5,10]
    setGamesMinimum(values[index]);
  };


  return (
  <ScrollView style = {{backgroundColor: '#9ACD32'}}>
    <View name = "Top Banner" style={{ height: 20}} />   
    <View style={styles.selectRowContainer} name = "1st row">
      <SelectDropdown  name = "Teams filter"
      buttonStyle = {styles.selectBox}
      dropdownOverlayColor = 'transparent'
        data={['All Teams', 'ACC', 'Big 12', 'Big Ten', 'Pac-12', 'SEC', 'Include G5']}
        onSelect={handleTeamsFilter}
        defaultButtonText="Filter Teams"  />


      <Text>   </Text>
      <SelectDropdown   
        name = "Sort type"
        buttonStyle = {styles.selectBox}
        dropdownOverlayColor = 'transparent'
        data={['Win %', 'Win Total']}
        onSelect={handleSortSelection}
        defaultValueByIndex={0}
        // defaultValue = {'Sort by Win Rate'}   
        />
    </View>
    <View style={styles.selectRowContainer} name = "2nd row">
      <SelectDropdown     name = "Opp conference"
      buttonStyle = {styles.selectBox}
      dropdownOverlayColor = 'transparent'
        data={['VS Any Team', 'VS ACC', 'VS Big 12', 'VS Big Ten', 'VS Pac-12', 'VS SEC', 'Include G5']}
        onSelect={handleOppConf}
        defaultValueByIndex={0}   
        />
      <Text>   </Text>
      <SelectDropdown     name = "Opp rank"
        buttonStyle = {styles.selectBox}
        dropdownOverlayColor = 'transparent'
        data={['Any Rank', 'Unranked','Top 25', 'Top 15', 'Top 10', 'Top 5', '#1', 'Higher rank', 'Lower rank']}
        onSelect={handleOppRank}
        defaultValueByIndex = {0}
        />
    </View>
    <View style={styles.selectRowContainer}  name = "3rd row">
      <SelectDropdown   name = "Years"
        buttonStyle = {styles.selectBox}
        dropdownOverlayColor = 'transparent'
        data={yearsOptions}
        onSelect={handleYears}
        buttonTextAfterSelection={getYearsButtonText}
        defaultValueByIndex = {10}
      />   
      <Text>   </Text>
      <SelectDropdown   name = "Field"
        buttonStyle = {styles.selectBox}
        dropdownOverlayColor = 'transparent'
        data={['Any Field', 'Home','Away', 'Neutral' ]}
        onSelect={handleField}
        defaultValue = {'Any Field'}
          />
    </View>
    <View style={styles.selectRowContainer}  name = "4th row">
      <SelectDropdown   name = "Conference Alignment"
        buttonStyle = {styles.selectBox}
        dropdownOverlayColor = 'transparent'
        data={['Current', 'Historic']}
        onSelect={handleConfAlignment}
        defaultValueByIndex = {0}
      />  
      <Text>   </Text>
      <SelectDropdown
        name = "Minimum games"
        buttonStyle = {styles.selectBox}
        dropdownOverlayColor = 'transparent'
        data={['Min games: N/A', 'Min games: ≥2', 'Min games: ≥3', 'Min games: ≥5', 'Min games: ≥10']}
        onSelect={handleGamesMinimum}
        defaultValueByIndex = {0}
      />   
    </View>
    <View  name = "Description of query as prose"
      style = {styles.queryDescriptionBox}
        >
      <Text 
        style = {styles.queryDescriptionText}>
        Rank {displayConference} by {displayField}{displaySort}{versusPreposition}{displayOppRank}{displayOppConf}{opponentPreposition}{displayYears}
    </Text>
    </View>

    <View>
      <CreateTable currentYear = {currentYear} selectedTeamsFilter = {selectedTeamsFilter} selectedSort = {selectedSort} selectedOppConf = {selectedOppConf} selectedOppRank = {selectedOppRank} selectedYears = {selectedYears} selectedField= {selectedField} selectedConfAlignment= {selectedConfAlignment} selectedGamesMinimum= {selectedGamesMinimum} />
    </View>
    </ScrollView>

  );
}


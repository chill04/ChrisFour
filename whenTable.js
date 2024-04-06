import React from 'react';
import { View, Text, ScrollView} from 'react-native';
import {styles} from './styles';
import { teams_list, short_names_list, conferenceLookup} from './justLists';
import {imageTooltip, whenTooltip } from './myTooltip';


const jsonData = require('./games_data/CFB_games_data.json')

function get_if_team(input){
    if (input < teams_list.length){
      return teams_list[input];
    }  else {
      return input;
    }
  }


const get_short = Object.assign(...teams_list.map((k, i) => ({[k]: short_names_list[i]})));

function check_for_short(team_name_index){
    if (!(team_name_index >=0 )){  
        return team_name_index;
    } else
    if (team_name_index < short_names_list.length){
        return short_names_list[team_name_index];
    }else {
        return teams_list[team_name_index];
    }
}

const CreateTable = ({
  selectedTeamConf, selectedTeamRank, selectedResult, selectedOppConf, selectedOppRank, selectedMargin, selectedField, selectedConfAlignment
  }) => {

  const conference_selection = selectedTeamConf;
  const team_rank_cutoff = selectedTeamRank
  const opp_rank_cutoff = selectedOppRank;
  const opp_conference = selectedOppConf;
  const home_field = selectedField;
  const gameOutcome = selectedResult
  const winLossMargin = selectedMargin
  const allignment = selectedConfAlignment;

//   console.log()
//   console.log('whenTable()')
//   console.log("teamCONF:", selectedTeamConf, 'teamRANK:', selectedTeamRank,  "oppCONF:",selectedOppConf, "oppRANK:",selectedOppRank)
//   console.log('sortBY:', selectedResult, "FIELD:",selectedField, "ALIGN:",selectedConfAlignment, 'MARGIN:', selectedMargin)


  function statFilter(table_data){
    const games = table_data;
    const game_found ={};   // Track games if found, to make sure ONLY latest game is displayed
    const yesTeams = new Set();  //These are teams/games that meet the filter
    const noTeams = new Set();  //These will become "Secret teams"
    const winsDict = {};

    function filterById(obj) {     // read through each game in the file.  If it meets the requirements, adds the game to the filtered_games list
        var trueOrFalse = true;
        
        obj = { 
          'season' : obj[0], 
          'date' : parseInt(obj[1]),
          'team_long' : String(teams_list[obj[2]]), 
          'team_name' : String(get_short[teams_list[obj[2]]]),
          'team_conf' : String(conferenceLookup[obj[4]]), 
          'team_rank' : obj[3],
          'field' : String(obj[5]), 
          'opp_name' : String(get_if_team(obj[6])),
          'opp_short' : String(get_short[teams_list[obj[6]]]),
          'opp_conf' : String(conferenceLookup[obj[8]]), 
          'opp_rank' : obj[7],
          'result' : obj[11],
          'team_pts' : obj[9],
          'opp_pts' : obj[10]
        };
        
    
        if ((obj.team_rank == null)|(obj.team_rank == "")){
          obj.team_rank = 'none';
        };
        if ((obj.opp_rank == null)|(obj.opp_rank == "")){
          obj.opp_rank = 'none';
        }; 
        if (game_found[obj.team_long] > obj.date){       // Don't use if later game found
          trueOrFalse = false;
        };
    
    
        function conferenceMembership(team, default_conference, type) {
          var conference_id = default_conference;
          var acc_conference = ['UNC', 'WAKE', 'BC', 'PITT', 'CLEM', 'DUKE', 'FSU', 'GT', 'NCST', 'CUSE', 'LOU', 'VT', 'MIA', 'UVA'];
          var pac_conference = ['UO', 'OSU', 'WSU', 'UW', 'STAN', 'CAL', 'USC', 'UCLA', 'Ariz', 'ASU', 'Colo', 'UTAH'];
          var big_10_conference = ['ILL', 'IND', 'IOWA', 'UMD', 'UM', 'MSU', 'tOSU', 'NW', 'PUR', 'RUTG', 'PSU', 'Wisc', 'NEB', 'MINN'];
          var big_12_conference = ['WVU', 'OU', 'TEX', 'OkSt', 'KU', 'TTU', 'TCU', 'KSU', 'ISU', 'Bay','HOU', 'BYU', 'UCF', 'CINN'];
          var sec_conference = ['LSU', 'Aub', 'BAMA', 'MISS', 'MsSt', 'ARK', 'UK', 'Vandy', 'SCar', 'TAMU', 'Tenn', 'UGA', 'UF', 'Mizz'];
          var independents = ['ND','ARMY', 'UMASS', 'CONN'];
    
          if (type == 1){   //HISTORICAL conferences; listed for each game (ex: Colorado was Big12 in 1995, PAC12 in 2020)
            return default_conference;
          } else 
          if (type == 0){  //2024 Conference reallignment 
            pac_conference = ['OSU', 'WSU'];
            big_10_conference.push('USC', 'UO', 'UCLA', 'UW');
            acc_conference.push('STAN', 'CAL', 'SMU');
            sec_conference.push('TEX', 'OU');
            big_12_conference = ['UTAH', 'Ariz', 'ASU', 'Colo', 'WVU', 'OkSt', 'KU', 'TTU', 'TCU', 'KSU', 'ISU', 'Bay', 'HOU', 'BYU', 'UCF', 'Cinn'];
          }
          if (acc_conference.includes(team)){
            conference_id = 'acc'} else 
             if (big_12_conference.includes(team)){
              conference_id = 'big-12'} else 
            if (big_10_conference.includes(team)){
              conference_id = 'big-ten'} else 
            if (pac_conference.includes(team)){
              conference_id = 'pac-12'} else 
            if (sec_conference.includes(team)){
              conference_id = 'sec'} else{
            if (independents.includes(team)){
              conference_id = 'independent'} 
              else conference_id = "G5"};
            return conference_id;
        };
     
        // filter by conference
        var conference_name = obj.team_conf;
        conference_name = conferenceMembership(obj.team_name, obj.team_conf, allignment);
        if (!(conference_selection == 'G5')){
          if ((conference_selection == 'power')){
            if (!(['pac-12', 'pac-10', 'acc', 'big-ten', 'big-12', 'sec', 'big-east'].includes(conference_name))&&(obj.team_name != 'ND')){
              return false};
          } else {
            if (!(conference_name.toUpperCase().includes(conference_selection.toUpperCase()))){
              return false};
          };
        };
        noTeams.add(obj.team_long);  //NO teams is all teams of the conference filter

        if (opp_conference != "select"){   // filter by opponent conference
            if ((opp_conference == 'power')){
              if (!(['pac-12', 'pac-10', 'acc', 'big-ten', 'big-12', 'sec', 'swc','big-8'].includes(obj.opp_conf))){
                return false;
              };
            } else if (opp_conference == "ooc"){
              if ((obj.team_conf == 'independent') | (obj.opp_conf == obj.team_conf)){
                return false;
              };
            } else if(opp_conference == 'G5'){
              if (!(['american','mwc','mac','cusa','sun-belt','wac','big-west'].includes(obj.opp_conf))){
                return false;
              };
            } else if(!(obj.opp_conf.includes(opp_conference))){
              return false;
            };
        };
        if (home_field != 0){   // filter by home or away
          if ((home_field == 1)){
            if (obj.field != 'h'){
              return false};
          } else if (
            home_field == 2){
            if (obj.field != 'a'){
              return false};
          } else if (
            home_field == 3){
            if (obj.field != 'n'){
              return false};
            };
        };
        if (gameOutcome != 'select'){       // filter by Win or LOSS
          if (gameOutcome == "win"){
              if (obj.result != 'w'){
                return false;};
            } else 
            if (gameOutcome == "loss"){
              if (obj.result != 'l'){
                return false};
          }
        };
        if (opp_rank_cutoff != "select"){   // filter by opponent rank
          if (opp_rank_cutoff == 'unranked'){
            if (!(obj.opp_rank == 'none')){
              return false;
            }
          } else
          if(opp_rank_cutoff == 'underdog'){  //Find games where Opp had better rank
            if (obj.opp_rank == 'none'){
              return false;
            }
            if (obj.team_rank <= obj.opp_rank){
              return false;
            }
          } else
          if(opp_rank_cutoff == 'lower'){  //Find games where Opp had worse rank
            if (obj.team_rank == 'none'){
              return false;
            }
            if (obj.team_rank >= obj.opp_rank){
              return false;
            }
          } else
          if(opp_rank_cutoff == 'higher'){  //Find games where Opp had worse rank
            if (obj.opp_rank == 'none'){
              return false;
            }
            if (obj.team_rank <= obj.opp_rank){
              return false;
            }
          } else
          if (!(obj.opp_rank <= opp_rank_cutoff)){
            return false;
          };
        };
        if (winLossMargin != "select"){       // filter by margin
    
          if (winLossMargin == "shutout"){
            if (Math.min(obj.team_pts, obj.opp_pts) != 0){
              return false}
          }else
          var margin = Math.max(obj.team_pts, obj.opp_pts) - Math.min(obj.team_pts, obj.opp_pts);
          if (margin < winLossMargin){
              return false}
        };
        if (team_rank_cutoff != "select"){       // filter by team rank
          if (team_rank_cutoff == 'unranked'){
            if (!(obj.team_rank == 'none')){
              return false;
            }
          } else
          if(team_rank_cutoff == 'lower'){
            if (obj.opp_rank == 'none'){
              return false;
            }
            if (obj.team_rank <= obj.opp_rank){
              return false;
            }
          } else
          if(team_rank_cutoff == 'higher'){  //Find games where Opp had worse rank
            if (obj.team_rank == 'none'){
              return false;
            }
            if (obj.team_rank >= obj.opp_rank){
              return false;
            }
          } else
          if (!(obj.team_rank <= team_rank_cutoff)){
            return false;
          };
        };   
        
        if (trueOrFalse == true){  //  Anything still alive here should meet the filters
          game_found[obj.team_long] = obj.date;  // FLAG to not add more games
          yesTeams.add(obj.team_long);    //Log teams that satisfy filters; won't be in SecretTeams list
        }
    
        if (get_short[obj.opp_name]){    //Use team abbreviation if exists
          opp_short = get_short[obj.opp_name];
        } else {
          opp_short = obj.opp_name;
        };
    
        //Create a log for each team for each past game.
        var shortYear = String(obj.season).slice(2, 4);
        opp_rank_string = ""
        if(!(obj.opp_rank == 'none')){
          opp_rank_string = '#' + obj.opp_rank;
        };
        var gameDictEntry = opp_rank_string + ' ' +  opp_short + ' \'' + shortYear + '<br>';
        if (!(obj.team_long in winsDict)){
          winsDict[obj.team_long] = [];
        };
        var newList = winsDict[obj.team_long].concat(gameDictEntry);
        winsDict[obj.team_long] = newList;
       
        return trueOrFalse;
      };
    
      var filtered_games =   games.filter(filterById);

      for (const value of yesTeams){     //If teams meet the filter, they're on the list and can't be on the SecretTeams list.
        noTeams.delete(value)};
    
      return [filtered_games, noTeams, winsDict];
  }


  function dateFormatting(dateData){
    var date = new Date(((dateData - 25568) * 86400 * 1000)-1);   //The JSON has the dates off by 1 day; this fixes it
    var dateString = date.toISOString();
    var myDate = dateString.slice(5,7) + "/" + dateString.slice(8,10) + "/\n" + dateString.slice(0,4);
    // 2022-09-04
    const year = date.getFullYear().toString()
    var month = date.getMonth()+1
    month = month.toString()
    const day = date.getDate().toString()
    myDate =  month+"-"+day+'\n'+year

    // console.log(myDate)
    return myDate;
  };

  function displayPositionTable(data) {
    data = statFilter(data);   // Uses the stateFilter function to pare down the JSON to only games that meet the criterea.  
    var [games, secretTeams, winsDict] = [data[0], data[1], data[2]];
    var table
    var columns = ["Date","Team", "Game", 'Score'];
    var tableAsArray = [columns];
      
    // Build the rows with game data
    var rankCounter = 0;
    for (var i = 0; i < games.length; i++) {   
      rankCounter++;
      obj = games[i];
      obj = { 
        'season' : obj[0], 
        'date' : obj[1], 
        'team_long' : String(teams_list[obj[2]]), 
        'team_conf' : String(conferenceLookup[obj[4]]), 
        'team_rank' : obj[3],
        'field' : String(obj[5]), 
        'opp_name' : [obj[6]], 
        'opp_conf' : String(conferenceLookup[obj[8]]), 
        'opp_rank' : obj[7],
        'result' : obj[11],
        'opp_pts' : obj[10],
        'team_pts' : obj[9]
      };
  
      team_long = obj.team_long;
      if (obj.opp_name <400){
        obj.opp_name = String(teams_list[obj.opp_name])
      }
      var opp_name = obj.opp_name;
      dateString = dateFormatting(obj.date);
  
      if (get_short[team_long]){
        team_short = get_short[team_long];
      } else {
        team_short = team_long;
      };
      if (get_short[opp_name]){
        opp_name_short = get_short[opp_name];
      } else {
        opp_name_short = opp_name;
      };
  
      var opp_pts = obj.opp_pts;
      var team_pts = obj.team_pts;
  
      var rankNumber = "";
      if (obj.team_rank){
        rankNumber = '#' + obj.team_rank + ' ';
      };
  
      oppRankAndName = opp_name_short;
      if (obj.opp_rank){
        oppRankAndName = "#" + obj.opp_rank + " " + opp_name_short;
      };
      gamesList = winsDict[obj.team_long];
      gameListString = gamesList.slice(1).join("");
      const score =team_pts +'-' +opp_pts
      const oppAndTooltip = whenTooltip(oppRankAndName, gameListString)

      var displayName = team_long
      if (!(displayName.includes(' ')) & (displayName.length >9)) {
        displayName = team_short
    }

    //   var rowArray = [rankCounter, dateString, displayName, oppAndTooltip,score];
      const teamLogoWithToolTip = imageTooltip(team_long)
      const rankAndTeamName = rankNumber + displayName

      var rowArray = [dateString, rankAndTeamName, oppAndTooltip,score];
      tableAsArray.push(rowArray);
    };
  
    for (const element of secretTeams) { // Teams NOT found in filter; show in table as 'NEVER' or N/A
      rankCounter++;
      var displayName = element
      if (!(displayName.includes(' ')) & (displayName.length >9)) {
        displayName = get_short[element]
      }
      var rowArray =  ['Never', displayName, <Text>-</Text>,'-']
      tableAsArray.push(rowArray);
    };
    return tableAsArray;
  }
  
  const mytableAsArray = displayPositionTable(jsonData);

  const convertDataFormat = (tableData) => {
    const headers = tableData[0];
    const convertedData = tableData.slice(1).map(row => {
      const rowData = {};
      headers.forEach((header, index) => {
        rowData[header] = row[index];
      });
      return rowData;
    });
      return convertedData;
  };

  const convertedData = convertDataFormat(mytableAsArray);

            //columns = ["Rank","Date","Team", "Game", 'Score'];
  function BuildTable(convertedData){
       rows = convertedData.map((rowData, index) => (
        <View key={index} style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>        
            {/* <Text style={[styles.cell, {flex:0.75}]}>{rowData.Rank}</Text> */}
            <Text style={[styles.cell, {flex:1.5, fontSize:20}]}>{rowData.Date}</Text>
            <Text style={[styles.cell, {flex:3, fontSize:22, fontFamily:'Tahoma', fontWeight:'bold'}]}>{rowData.Team}</Text>
            <View style={[styles.cell, {flex:2.25}]}>{rowData.Game}</View>
            <Text style={[styles.cell, {flex:1.5, fontSize:20}]}>{rowData.Score}</Text>
        </View>
        )
      );

      return (
        <View style={styles.table}>
          <View style={[styles.cell, styles.headerRow]}>
            {/* <Text style={[styles.headerCell, {flex:1}]}></Text> */}
            <Text style={[styles.headerCell, {flex:1.5}]}>Date</Text>
            <Text style={[styles.headerCell, {flex:3, fontWeight:'bold'}]}>Team</Text>
            <Text style={[styles.headerCell, {flex:2.25}]}>Game</Text>
            <Text style={[styles.headerCell, {flex:1.5}]}>Score</Text>
          </View>
          <View>
            {rows}
          </View>
        </View>
      )
    }


    const finalTable = BuildTable(convertedData);
    return finalTable;
  };

export default CreateTable;


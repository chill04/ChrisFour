import React from 'react';
import { View, Text, ScrollView} from 'react-native';
import {styles} from './styles';
import { teams_list, short_names_list, conferenceLookup} from './justLists';
import {imageTooltip, tooltip } from './myTooltip';


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
  currentYear, selectedTeamsFilter, selectedSort, selectedOppConf, selectedOppRank, selectedYears, selectedField, selectedConfAlignment, selectedGamesMinimum
  }) => {

  const conference_selection = selectedTeamsFilter;
  const years_selection = selectedYears;
  const opp_rank_cutoff = selectedOppRank;
  const opp_conference = selectedOppConf;
  const home_field = selectedField;
  const allignment = selectedConfAlignment;

  function statFilter(table_data){
    const games = table_data;
    function filterById(obj) {     // read through each game in the file.  If it meets the requirements, adds the game to the filtered_games list
      var trueOrFalse = true;

      const game = { 
        'season' : obj[0], 
        'date' : parseInt(obj[1]),
        'team_long' : String(teams_list[obj[2]]), 
        'team_name' : String(get_short[teams_list[obj[2]]]),
        'team_conf' : String(conferenceLookup[obj[4]]), 
        'team_rank' : obj[3],
        'field' : String(obj[5]), 
        'opp_name' : String(get_if_team(obj[6])),
        'opp_short': check_for_short(obj[6]),
        'opp_conf' : String(conferenceLookup[obj[8]]), 
        'opp_rank' : obj[7],
        'result' : obj[11],
        'team_pts' : obj[9],
        'opp_pts' : obj[10]
      };

      if ((game.team_rank == null)|(game.team_rank == "")){
        game.team_rank = 'none';
      }
      if ((game.opp_rank == null)|(game.opp_rank == "")){
        game.opp_rank = 'none';
      }

      function conferenceMembership(team, default_conference, type) {
        var conference_id = default_conference;
        // var acc_conference = ['UNC', 'WAKE', 'BC', 'PITT', 'CLEM', 'DUKE', 'FSU', 'GT', 'NCST', 'CUSE', 'LOU', 'VT', 'MIA', 'UVA'];
        // var pac_conference = ['UO', 'OSU', 'WSU', 'UW', 'STAN', 'CAL', 'USC', 'UCLA', 'Ariz', 'ASU', 'Colo', 'UTAH'];
        // var big_10_conference = ['ILL', 'IND', 'IOWA', 'UMD', 'UM', 'MSU', 'tOSU', 'NW', 'PUR', 'RUTG', 'PSU', 'Wisc', 'NEB', 'MINN'];
        // var big_12_conference = ['WVU', 'OU', 'TEX', 'OkSt', 'KU', 'TTU', 'TCU', 'KSU', 'ISU', 'Bay','HOU', 'BYU', 'UCF', 'CINN'];
        // var sec_conference = ['LSU', 'Aub', 'BAMA', 'MISS', 'MsSt', 'ARK', 'UK', 'Vandy', 'SCar', 'TAMU', 'Tenn', 'UGA', 'UF', 'Mizz'];
        // var independents = ['ND','ARMY', 'UMASS', 'CONN'];
        var acc_conference = ['STAN', 'CAL', 'SMU', 'UNC', 'WAKE', 'BC', 'PITT', 'CLEM', 'DUKE', 'FSU', 'GT', 'NCST', 'CUSE', 'LOU', 'VT', 'MIA', 'UVA'];
        var pac_conference = ['OSU', 'WSU'];
        var big_10_conference = ['USC', 'UO', 'UCLA', 'UW', 'ILL', 'IND', 'IOWA', 'UMD', 'UM', 'MSU', 'tOSU', 'NW', 'PUR', 'RUTG', 'PSU', 'Wisc', 'NEB', 'MINN'];
        var big_12_conference = ['UTAH', 'Ariz', 'ASU', 'Colo', 'WVU', 'OkSt', 'KU', 'TTU', 'TCU', 'KSU', 'ISU', 'Bay', 'HOU', 'BYU', 'UCF', 'CINN'];
        var sec_conference = ['TEX', 'OU', 'LSU', 'Aub', 'BAMA', 'MISS', 'MsSt', 'ARK', 'UK', 'Vandy', 'SCar', 'TAMU', 'Tenn', 'UGA', 'UF', 'Mizz'];
        var independents = ['ND','ARMY', 'UMASS', 'CONN'];


        if (type == 1){   //HISTORICAL conferences; listed for each game (ex: Colorado was Big12 in 1995, PAC12 in 2020)
          return default_conference;
        // } else 
        // if (type == 1){  //2024 Conference reallignment
        //   pac_conference = ['OSU', 'WSU'];
        //   big_10_conference.push('USC', 'UO', 'UCLA', 'UW');
        //   acc_conference.push('STAN', 'CAL', 'SMU');
        //   sec_conference.push('TEX', 'OU');
        //   big_12_conference = ['UTAH', 'Ariz', 'ASU', 'Colo', 'WVU', 'OkSt', 'KU', 'TTU', 'TCU', 'KSU', 'ISU', 'Bay', 'HOU', 'BYU', 'UCF', 'Cinn'];
        } else {
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
              conference_id = 'ind'} 
              else conference_id = "G5"}
                    return conference_id;
            }
      }
    
    // var conference_name = game.team_conf;
      var conference_name = conferenceMembership(game.team_name, game.team_conf, allignment);
      if (!(conference_selection == 'G5')){    // filter by conference
        if ((conference_selection == 'power')){
          if (!(['pac-12', 'pac-10', 'acc', 'big-ten', 'big-12', 'sec', 'big-east'].includes(conference_name))&&(game.team_name != 'ND')){
            return false;
          }
        } else {
          if (!(conference_name.toUpperCase().includes(conference_selection.toUpperCase()))){
            return false;
          }
        }
      }

      if (!(years_selection == 'select')){      // filter by years
          var endDate =  2023;
          var startDate = (endDate - years_selection);

        if (!(game.season >= startDate)){
          return false;
        }
      }

      if (opp_conference != "select"){   // filter by opponent conference
        if ((opp_conference == 'power')){
          if (!(['pac-12', 'pac-10', 'acc', 'big-ten', 'big-12', 'sec', 'swc','big-8'].includes(game.opp_conf))){
            return false}
          } else if (opp_conference == "ooc"){
            if ((game.team_conf == 'independent') | (game.opp_conf == game.team_conf)){
              return false;
            }
          } else if(opp_conference == 'G5'){
            if (!(['american','mwc','mac','cusa','sun-belt','wac','big-west'].includes(game.opp_conf))){
              return false;
            }
          } else if(!(game.opp_conf.includes(opp_conference))){
                  return false;
          }
      }

      if (home_field !== 0){   // filter by home or away
        if ((home_field == 1)){
          if (game.field !== 'h'){
            return false}
        } else if (
          home_field == 2){
          if (game.field != 'a'){
            return false}
        } else if (
          home_field == 3){
          if (game.field != 'n'){
            return false}
          }
      }

    if (opp_rank_cutoff != "select"){   // filter by opponent rank
      if (opp_rank_cutoff == 'unranked'){
        if (!(game.opp_rank == 'none')){
          return false;
        }
      } else
      if(opp_rank_cutoff == 'underdog'){  //Find games where Opp had better rank
        if (game.opp_rank == 'none'){
          return false;
        }
        if (game.team_rank <= game.opp_rank){
          return false;
        }
      } else
      if(opp_rank_cutoff == 'lower'){  //Find games where Opp had worse rank
        if (game.team_rank == 'none'){
          return false;
        }
        if (game.team_rank >= game.opp_rank){
          return false;
        }
      } else
      if(opp_rank_cutoff == 'higher'){  //Find games where Opp had worse rank
        if (game.opp_rank == 'none'){
          return false;
        }
        if (game.team_rank <= game.opp_rank){
          return false;
        }
      } else
      if (!(game.opp_rank <= opp_rank_cutoff)){
        return false;
      }
    }
    return trueOrFalse;
  }

  var filtered_games =  games.filter(filterById);
  return filtered_games;
  }

  function displayPositionTable(data) {
    var startTime = performance.now()
    games = statFilter(data);   
    var table;
    var wins = {};
    var winsList = {};
    var lossList = {};
    var count = {};
    var winAverage = {};
    var totalOrAverageString = "Average";
    if (selectedSort == 'total'){
      totalOrAverageString = 'Total';
    }
    var columns = ["Rank","Team", "Wins", 'Losses', "Games", totalOrAverageString];
    var tableAsArray = [columns];

    // Calculate total wins and count for each position
    for (var i = 0; i < games.length; i++) {

      obj = games[i];
      obj = { 
        'season' : obj[0], 
        'date' : obj[1], 
        'team_long' : String(teams_list[obj[2]]), 
        'team_conf' : String(conferenceLookup[obj[4]]), 
        'team_rank' : obj[3],
        'field' : String(obj[5]), 
        'opp_name' : String(get_if_team(obj[6])),
        'opp_short': check_for_short(obj[6]),
        'opp_conf' : String(conferenceLookup[obj[8]]), 
        'opp_rank' : obj[7],
        'result' : obj[11],
        'opp_pts' : obj[10],
        'team_pts' : obj[9]
      };
      var team_name = obj.team_long;
      winsList[team_name] = (winsList[team_name] || "");

      var opponent = obj.opp_short;
      var oppRank = "";
      if (obj.opp_rank > 0){
        oppRank = "(" + obj.opp_rank + ")";
      }

      var gameDictEntry = oppRank + ' ' +  opponent + ' ' + obj.season + '<br>';  

      // Increment the total wins for the position
      if (obj.result == 'w'){
        wins[team_name] = (wins[team_name] || 0) + 1;
        //track list of wins for mouseover display
        var newList = winsList[team_name].concat(gameDictEntry);
        winsList[team_name] = newList;
      }
      else {lossList[team_name] = ([lossList[team_name]]) + (oppRank + opponent + "-" + obj.season +'<br>');
      }

      // Increment the games count for the position
      count[team_name] = (count[team_name] || 0) + 1;
    }

    // filter out teams with few games (Coastal Carolina is 1/1 vs top10 teams!)
    var minimumGames = 0;
    minimumGames = selectedGamesMinimum;

    // Calculate average wins for each position
    for (team_name in count) {
      if (count[team_name] >= minimumGames){
        wins[team_name] = (wins[team_name] || 0); 
        winAverage[team_name] = wins[team_name] / count[team_name];
      }
    }

    // Convert winAverage object to an array of [team_name, winAverage] pairs
    totalOrAverage = selectedSort;
    var rankedArray
    if (totalOrAverage == 'total'){
      rankedArray = Object.entries(wins);
    } else {
      rankedArray = Object.entries(winAverage);
    }

    // Sort the positionArray based on the winAverage in descending order
    rankedArray.sort(function(a, b) {
      return b[1] - a[1];
    });

    // Build the table
    var tableHTML = ""
    for (i = 0; i < columns.length; i++) {
      tableHTML += "<th>" + columns[i] + "</th>";
    }

    rankCounter = 0;
    for (i = 0; i < rankedArray.length; i++) {
      team_name = rankedArray[i][0];
      rankCounter++;

      var losses  = count[team_name] - wins[team_name];
      if (losses == 0){
        winAverage[team_name] = 1;
      }
      var lossString = " " + lossList[team_name];
      lossString = lossString.slice(0, -2);     
      if (lossString == ' undefin'){
        lossString = '';
      }
      var DisplayTotalorAverage
      if (totalOrAverage== 'total'){
        DisplayTotalorAverage = wins[team_name];
      } else {
        DisplayTotalorAverage = winAverage[team_name].toFixed(3);
        if (DisplayTotalorAverage[0] == '1'){
          DisplayTotalorAverage = DisplayTotalorAverage.slice(0,-1);
        } else {
          DisplayTotalorAverage = DisplayTotalorAverage.slice(1);
        }
      }

      const teamLogoWithToolTip = imageTooltip(team_name)

      var rowArray = [rankCounter, teamLogoWithToolTip, [wins[team_name], winsList[team_name]], [losses, lossString], count[team_name],DisplayTotalorAverage];
      tableAsArray.push(rowArray);
    }
    // console.log(tableAsArray)
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
  
  function BuildTable(convertedData){
    // const rows
    console.log("buildTable()", totalOrAverage)
    if (totalOrAverage == 'average'){
      rows = convertedData.map((rowData, index) => (
        <View key={index} style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>        
          <Text style={styles.cell}>{rowData.Rank}</Text>
          {rowData.Team}
          {tooltip(rowData.Wins[0], rowData.Wins[1])}
          {tooltip(rowData.Losses[0], rowData.Losses[1])}
          <Text style={styles.cell}>{rowData.Games}</Text>
          <Text style={styles.cell}>{rowData.Average}</Text>
        </View>
      ));

      return (
        <View style={styles.table}>
          <View style={[styles.cell, styles.headerRow]}>
            <Text style={styles.headerCell}>Rank</Text>
            <Text style={styles.headerCell}>Team</Text>
            <Text style={styles.headerCell}>Wins</Text>
            <Text style={styles.headerCell}>Losses</Text>
            <Text style={styles.headerCell}>Games</Text>
            <Text style={styles.headerCell}>Avg</Text>
          </View>
          <View>
            {rows}
          </View>
        </View>
      )
    } else {
      rows = convertedData.map((rowData, index) => (
        <View key={index} style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>        
          <Text style={styles.cell}>{rowData.Rank}</Text>
          {rowData.Team}
          <View style={styles.cell}>{tooltip(rowData.Wins[0], rowData.Wins[1])}</View>
          <View style={styles.cell}>{tooltip(rowData.Losses[0], rowData.Losses[1])}</View>
          <Text style={styles.cell}>{rowData.Games}</Text>
        </View>
      ));
      return (
        <View style={styles.table}>
          <View style={[styles.cell, styles.headerRow]}>
            <Text style={styles.headerCell}>Rank</Text>
            <Text style={styles.headerCell}>Team</Text>
            <Text style={styles.headerCell}>Wins</Text>
            <Text style={styles.headerCell}>Losses</Text>
            <Text style={styles.headerCell}>Games</Text>
          </View>
          <View>
            {rows}
          </View>
        </View>
      )


    }
  }
  const finalTable = BuildTable(convertedData);
  return finalTable;
  };
export default CreateTable;


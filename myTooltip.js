import Tooltip from 'rn-tooltip';
import { styles } from './styles';
import { Text, Image, View} from "react-native";
import { imagePaths, pathStrings} from './justLists';



function getLogo(teamName){
    teamName = String(teamName);
    // https://i.turner.ncaa.com/sites/default/files/images/logos/schools/bgd/arizona.svg
    teamName = teamName.toLowerCase().replace(')','').replace('(','').replaceAll(" ", '-').replace('&',"").replace('state','st').replace('cal', 'california').replace('essee-st','');
    teamName = teamName.replace('lorida-international','iu').replace('nc-','north-carolina-').replace('usc','southern-california').replace('connecticut','uconn');
    trickyNames = ['central-michigan','coastal-carolina','eastern-michigan','florida-atlantic','georgia-southern','louisiana-lafayette','louisiana-monroe','northern-illinois','south-alabama','south-florida','southern-mississippi','western-kentucky','western-michigan'];
    if (trickyNames.includes(teamName)){
      teamName = teamName.replace('ouisian','').replace('orid','').replace('igan','').replace('issippi','').replace('inois','').replace('entuck','').replace('eorgi','').replace('carolina','caro').replace('bama','');
    }
    var logoURL = './pnglogos/' + teamName + '.png';
    // console.log(logoURL)
    return logoURL;
}

export function tooltip(buttonText, popupText){
    popupText = popupText.replaceAll('<br>', "\n")
    return (
     
        <Tooltip
        withPointer={false}
        withOverlay={false}
        containerStyle = {styles.tooltipPopup}
        popover={
        <Text>{popupText}</Text>}>
        <Text style={[styles.tooltipButton]}>{buttonText}</Text>
      </Tooltip>
      
    );
}

export function imageTooltip(name_of_team){
    // const popupText = name_of_team
    const pathIndex = pathStrings.indexOf(getLogo(name_of_team))
    const imgSource = imagePaths[pathIndex]
    // console.log(name_of_team, getLogo(name_of_team), pathIndex)
    return (
        <View>
        <Tooltip
        withPointer={false}
        withOverlay={false}
        containerStyle = {{      
            position:'absolute',
            zIndex:30,
            // top: "-50px",
            top:400,
            // alignSelf: "auto",
            left:1,
            backgroundColor: 'yellow',
            // display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: "fit-content",
            borderRadius: 1,
            padding: '10px'}}
            popover={
            <Text>{name_of_team}</Text>}>
            <Image style={styles.image} source = {imgSource} />
        </Tooltip>
        </View>
    );
}

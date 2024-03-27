import Tooltip from 'rn-tooltip';
import { styles } from './styles';
import { Text, Image, View, ScrollView} from "react-native";
import { imagePaths, pathStrings} from './justLists';


export function tooltip(buttonText, popupText){
    popupText = popupText.replaceAll('<br>', "\n").replace('<b','')
    return (
    <View style={styles.cell}> 
    <Tooltip
        closeOnlyOnBackdropPress={true}
        withPointer={false}
        withOverlay={false}
        containerStyle = {styles.tooltipPopup}
       
        popover={
            <Text style = {{color:'black', fontSize:20, fontWeight:'normal', padding:3}}>{popupText}</Text>}>
        <Text style={styles.tooltipButton}>{buttonText}</Text>
    </Tooltip>
      </View>
    );
}

export function imageTooltip(name_of_team){
    const pathIndex = pathStrings.indexOf(getLogo(name_of_team))
    const imgSource = imagePaths[pathIndex]
    return (
        <View>
        <Tooltip
        withPointer={false}
        withOverlay={false}
        containerStyle = {styles.tooltipPopup}
            popover={
            <Text style = {{fontSize:20, color:'black'}} >{name_of_team}</Text>}>
            <Image style={styles.image} source = {imgSource} />
        </Tooltip>
        </View>
    );
}


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

import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableNativeFeedback, TouchableHighlight, Button } from 'react-native';
import firebase from '@firebase/app';
import "@firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCs5AfLDY0g9306B1yp7W1DzDj2wJkhwqo",
    authDomain: "swweb-f7b67.firebaseapp.com",
    databaseURL: "https://swweb-f7b67.firebaseio.com",
    projectId: "swweb-f7b67",
    storageBucket: "swweb-f7b67.appspot.com",
    messagingSenderId: "624196455015",
    appId: "1:624196455015:web:a6b40fdb25701eb7a7a2c2",
    measurementId: "G-549CBLCS3L"
  };

  // Initialize Firebase
firebase.default.initializeApp(firebaseConfig);
let db = firebase.default.database();

//
// function writeMonsterData(com2us_id, name, imgUrl) {
//   firebase.database().ref('Monsters/' + com2us_id).set({
//     name: name,
//     imgUrl : imgUrl
//   });
// }
//
// function writeSecondMon(firstMon){
//   firebase.database().ref('Monsters/results/' + firstMon).set({
//     secondMon: Array.from(Array(97).keys()),
//   });
// }

// function updateClick(){
//   var updates = {};
//   var newClicks = 0;
//   var clickUpdater = firebase.database().ref('/totalClicks');
//   clickUpdater.on('value', function(clicks){
//
//     // alert(JSON.stringify(clicks));
//     newClicks = JSON.stringify(clicks)
//   });
//   updates['/totalClicks'] = newClicks;
//   firebase.database().ref().update(updates);
//   alert(newClicks)
//   return newClicks;
// }


function getFreq(firstMonId, secondMonId){
    var firstFreq = 0;
    var secondFreq = 0;
    if(firstMonId < secondMonId){
      var firstFreqCount = firebase.database().ref('/Monsters/results/' + firstMonId + '/secondMon/' + secondMonId + '/firstFreq/');
      var secondFreqCount = firebase.database().ref('/Monsters/results/' + firstMonId + '/secondMon/' + secondMonId + '/secondFreq/');
      firstFreqCount.on('value', function(frequency) {
        firstFreq = frequency;
      });
      secondFreqCount.on('value', function(frequency) {
        secondFreq = frequency;
      });
    }
    else if(firstMonId > secondMonId){
      var firstFreqCount = firebase.database().ref('/Monsters/results/' + secondMonId + '/secondMon/' + firstMonId + '/firstFreq/');
      var secondFreqCount = firebase.database().ref('/Monsters/results/' + secondMonId + '/secondMon/' + firstMonId + '/secondFreq/');
      firstFreqCount.on('value', function(frequency) {
        secondFreq = frequency;
      });
      secondFreqCount.on('value', function(frequency) {
        firstFreq = frequency;
      });
    }

    return [firstFreq, secondFreq];
}

function updateFreq(firstMonId, secondMonId, newFirstFreq, newSecondFreq){
  // alert(newFirstFreq, newSecondFreq)
  var updates = {};
  if(firstMonId < secondMonId){
    var newFreqData = {
      firstFreq: newFirstFreq,
      secondFreq: newSecondFreq
    }
    updates['/Monsters/results/' + firstMonId + '/secondMon/' + secondMonId] = newFreqData;
  }
  else if(firstMonId > secondMonId){
    var newFreqData = {
      firstFreq: newSecondFreq,
      secondFreq: newFirstFreq
    }
    updates['/Monsters/results/' + secondMonId + '/secondMon/' + firstMonId] = newFreqData;
  }
  firebase.database().ref().update(updates);
}

function writeSecondMon(firstMonId, secondMonId, firstMonFreq, secondMonFreq) {
  // A post entry.
  var secondMonData = {
    firstFreq: firstMonFreq,
    secondFreq: secondMonFreq
  };

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/Monsters/results/' + firstMonId + '/secondMon/' + secondMonId] = secondMonData;
  // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
  if(firstMonId < secondMonId){
    return firebase.database().ref().update(updates);
  }
  else{
    return;
    // return firebase.database().ref('/Monsters/results/' + firstMonId + '/secondMon/' + id).remove();
  }
}


class App extends React.Component {
    constructor(props){
    super(props);
    this.state = {
      firstMonId : "",
      firstMonImg : "",
      firstMonName : "",
      firstMonFreq : 0,
      secondMonId : "",
      secondMonImg : "",
      secondMonName : "",
      secondMonFreq : 0,
      numMon : 97,
      allMonPage : "https://swarfarm.com/api/bestiary",
      monsterPage : "https://swarfarm.com/api/v2/monsters/?id__in=&com2us_id=&family_id=&base_stars=6&base_stars__lte=&base_stars__gte=&natural_stars=5&natural_stars__lte=&natural_stars__gte=&obtainable=&fusion_food=&homunculus=false&name=&element=pure&element=fire&element=wind&element=water&awaken_level=1&order_by=",
      pressed : false
    }
  }

    incFirstFreq(){
      // alert("TouchableTouched");
      if(!this.state.pressed){

        this.setState({pressed: true, firstMonFreq : this.state.firstMonFreq+1})
      // alert(this.state.firstMonFreq)
        updateFreq(this.state.firstMonId, this.state.secondMonId, this.state.firstMonFreq+1, this.state.secondMonFreq);


      }
    }

    incSecondFreq(){

      if(!this.state.pressed){
        this.setState({pressed: true, secondMonFreq : this.state.secondMonFreq+1})
        updateFreq(this.state.firstMonId, this.state.secondMonId, this.state.firstMonFreq, this.state.secondMonFreq+1);
      }
    }

    updateMonster(numMon, url){
      this.setState({pressed : false});
      const invalidFamily = [19200, 17100, 24600, 23600, 24100, 24200, 24000];
      const invalidIndividuals = [13813, 14511, 21212, 22612];
      //TODO: store back into database
      // var firstRandNum = Math.floor(Math.random() * numMon);
      // var secondRandNum = Math.floor(Math.random() * numMon);
      var firstRandNum = 75;
      var secondRandNum = 91;
      while(secondRandNum == firstRandNum){
        secondRandNum = Math.floor(Math.random() * numMon);
      }


      //TODO: Use database instead of url
      fetch(this.state.monsterPage)
        .then(response => response.json())
        .then(data => {
          while((invalidFamily.indexOf(data.results[firstRandNum].family_id) != -1) || (invalidIndividuals.indexOf(data.results[firstRandNum].com2us_id) != -1) ){
            firstRandNum = Math.floor(Math.random() * numMon);
          }
          while((invalidFamily.indexOf(data.results[secondRandNum].family_id) != -1) || (invalidIndividuals.indexOf(data.results[secondRandNum].com2us_id) != -1) ){
            secondRandNum = Math.floor(Math.random() * numMon);
          }

          var freq = getFreq(firstRandNum, secondRandNum);
          var s = JSON.stringify(freq);
          var d = JSON.parse(s);
          if(firstRandNum < secondRandNum){
            this.setState({firstMonFreq : d[0], secondMonFreq: d[1]})

          }
          else{
            this.setState({firstMonFreq : d[1], secondMonFreq: d[0]})

          }
          var firstMon = data.results[firstRandNum]
          var secondMon = data.results[secondRandNum]
          this.setState({
            firstMonId: firstRandNum,
            firstMonImg: firstMon.image_filename,
            firstMonName: firstMon.name,
            secondMonId: secondRandNum,
            secondMonImg: secondMon.image_filename,
            secondMonName: secondMon.name
          });
        });
      }


  componentDidMount() {
    // updateClick();
    // for(var i = 0; i < 97; i++){
    //   for(var j = 0; j < 97; j++){
    //     writeSecondMon(i, j, 0, 0);
    //   }
    // }
    this.updateMonster(this.state.numMon, this.state.monsterPage);
  }


  render(){
    const {numMon, monsterPage, firstMonFreq, secondMonFreq} = this.state;

    var firstMonPercentage = 0;
    var secondMonPercentage = 0;

    if(firstMonFreq+secondMonFreq!=0){
      firstMonPercentage = (firstMonFreq/(firstMonFreq+secondMonFreq)*100).toFixed(2);
      secondMonPercentage = (secondMonFreq/(firstMonFreq+secondMonFreq)*100).toFixed(2);
    }

    return (
      <View style={styles.container}>
        <View style = {styles.comparisonContainer}>
          <View style = {styles.monsterContainer}>

          <TouchableHighlight
            onPress = {()=>{this.incFirstFreq()}}>
            <Image
              fadeDuration = {1000}
              source={{
                uri: "https://swarfarm.com/static/herders/images/monsters/" + this.state.firstMonImg,
              }}
              style={{ width: 128, height: 128 }}/>
            </TouchableHighlight>
            <Text>{firstMonPercentage} %</Text>
          </View>

          <Text> vs. </Text>

          <View style = {styles.monsterContainer}>

            <TouchableHighlight
              onPress = {()=>{this.incSecondFreq()}}>
                <Image
                fadeDuration = {1000}
                source={{
                  uri: "https://swarfarm.com/static/herders/images/monsters/" + this.state.secondMonImg,
                }}
                style={{ width: 128, height: 128 }}/>
            </TouchableHighlight>
            <Text>{secondMonPercentage} %</Text>

          </View>
        </View>
        <View style = {styles.comparisonContainer}>
          <Text>{firstMonFreq}</Text>
          <Text> vs. </Text>
          <Text>{secondMonFreq}</Text>
        </View>
        <Button
          onPress = {() => {this.updateMonster(numMon, monsterPage)}}
          title = "Show Me Two Other Monsters!"
          color = '#DB8E71'
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  comparisonContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },

  monsterContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
});

export default App;

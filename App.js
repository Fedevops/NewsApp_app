import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator, FlatList, Image, Dimensions, TouchableWithoutFeedback, Linking, Share, LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
const window = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    news: [],
    loading: true

  }
  fetchnews = () => {
    fetch ('https://newsapi.org/v2/top-headlines?country=us&apiKey=e607b05af2d04db89f47761c712a2c8e')

    .then((res)=>res.json())
    .then((response)=>{
      this.setState({
        news : response.articles,
        loading: false
      })
    })
  }
  componentDidMount(){
    this.fetchnews()
  }
  
  render (){
    if(this.state.loading){
      return(
        <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'#333'}}>
          <ActivityIndicator size="large" color="#fff"/>
        </View>

      );
    }
    else{ 
      return(
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{fontSize: 25, color:'#fff'}}>Word</Text>
          <Text style={{fontSize: 25, color: '#fff'}}>News for Fernando Silva</Text>
        </View>
        <View style={styles.news}>
        

          <FlatList
          data={this.state.news}
          renderItem={({item})=> {
            return (
            
              <TouchableWithoutFeedback onPress={()=>Linking.openURL(item.url)}>
                <View style={{width:window.width-50, height:200, backgroundColor:'#333', marginBottom:15}}>
                    <Image source={{uri: item.urlToImage}} style={[StyleSheet.absoluteFill,{borderRadius:15}]}/>
                    <View style={styles.gradient}>
                      <Text style={{position:'absolute', bottom:0,color:'#fff', fontSize:18, padding:15}}>{item.title}</Text>
                    </View>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        
          />

        </View>

      </View>
    );
  }   
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333'
  }, 
  header:{
    padding: 30

  },
  news: {
    alignSelf: 'center'
  },
  gradient:{
    width: '100%',
    height: '100%',
    opacity:30,
    borderRadius: 15,
    backgroundColor : 'rgba(0,0,0,0.5)'
    
  }
})




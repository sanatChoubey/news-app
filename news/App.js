import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { Card, CardItem, Text, Body ,Item,Icon,Input} from 'native-base';
import axios from 'axios'


export default function App() {
  var { height, width } = Dimensions.get('window');
  const [data, setdata] = useState(null)
  useEffect(() => {
    axios.get('https://newsapi.org/v2/top-headlines?country=in&apiKey=413d01bd4f8742a391ba56a4f6e535a7').then((dev) => {
      console.log(dev.data.articles)
      setdata(dev.data.articles)
    })
  }, [])
  const redata = (data)=>{
    axios.get(`https://newsapi.org/v2/everything?q=${data}&apiKey=413d01bd4f8742a391ba56a4f6e535a7`).then((dev) => {
      console.log(dev.data.articles)
      setdata(dev.data.articles)})
  }
  const newsdata = () => {
    if (!data) {
      return (<View style={{ height: height, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator size="large" color="#f3a683" /></View>)
    } else {
      return (
        <View
          style={{ height: height, }}
        >
          <FlatList data={data} renderItem={({ item }) => {
            return (<Card >
              <CardItem header>
                <Text>{item.title}</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>
                    {item.description}
                  </Text>
                </Body>
              </CardItem>
              <CardItem footer>
                <Text>Source:{item.source.name}</Text>
              </CardItem>
            </Card>)

          }} /></View>
      )
    }
  }
  const newss = () => {
    return (
      <View style={{ width: Dimensions.get('window').width, height: 150, marginTop: 20, backgroundColor: '#303952', }}>
        <View style={{ width: Dimensions.get('window').width, marginLeft: 20, marginTop: 15, alignItems: 'center', justifyContent: 'center', flex: 1, flexDirection: 'column' }}>
          <Text
            style={{ width: Dimensions.get('window').width, color: '#f7f1e3', fontSize: 20, }}>
            NEWS APP
          </Text>
        </View>
        <FlatList
          horizontal={true}
          data={[{ title: 'USA', data: 'us' }, { title: 'India', data: 'in' },{title:'Sports',data:'sports'},{title:'Amazon',data:'amazon'},{title:'Google',data:'google'},{title:'Apple',data:'apple'}]}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>{
                console.log('hello',item)
                setdata(null)
                redata(item.data)
            }}>
              <View style={{
                margin: 5, marginTop: 25, width: 150, height: 40, backgroundColor: '#f3a683', alignItems: 'center',
                justifyContent: 'center', borderRadius: 10
              }}>
                <Text style={{ color: '#ffffff' }}>{item.title}</Text>
              </View>
              </TouchableOpacity>
                )}
            />

            
            <Item>
            <Icon style={{ color: '#ffffff' }} name="ios-search" />
            <Input onChangeText={(e)=>{
              console.log('yo',e)
              setdata(null)
              console.log(data)
              redata(e)
            }} style={{ color: '#ffffff' }} placeholder="Search" />
            
          </Item>
          
      </View>)
          }
  const defaultindicator = () => {
    return (
    <ActivityIndicator 
    size="large" 
    color="#ffffff" 
    />)
            }
  
    return (
      <View style={{ backgroundColor: '#bdc3c7' }}>
                {newss()}
                {newsdata()}
              </View>)
          }
        
        
const styles = StyleSheet.create({
                container: {
                flex: 1,
              backgroundColor: '#dfe6e9',
              alignItems: 'center',
              justifyContent: 'center',
            },
          
          });

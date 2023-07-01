import React, {useState,useEffect,useContext} from 'react'

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Card'

import {Link} from 'react-router-dom'

import MySpinner from '../components/MySpinner';
import PageCard from '../components/PageCard';

import {PAGE_ROUTE} from '../utils/consts'

import {Context} from '../index'

import {getTags} from '../http/pageAPI'
import {getScores} from '../http/scoreAPI'

const MainPage = () => {

  const [tags, setTags] = useState(undefined)
  const [scores, setScores] = useState(undefined)
  const {userStorage} = useContext(Context)

  useEffect(() => {
    getTags(5).then(data => {
      setTags(data)
    })
    getScores().then(data => {
      setScores(data)
    })
  }, [])
	return(
		<Container className="mt-3">
      <Card body>
      <h4 className="m-2">Актуальні питання</h4>
      <hr/>
      {scores == undefined || scores.length == 0
      ?
      <p className="m-2">Питань ще не має<br/><br/></p>
      :
      scores.map((elem, index) => {
        if(elem.page != undefined){
        return (
          <PageCard
            key={elem.page.id}
            page={elem.page}
            own={elem.page.userId === undefined ||
            elem.page.userId === userStorage.user.id
          }
          />
        )
      }else{
        return(<div/>)
      }
      })}
      <h4 className="m-2">Останні теги</h4>
      <hr/>
      {tags == undefined || tags.length == 0
      ?
      <p className="m-2">Тегів ще не має<br/><br/></p>
      :
      tags.map((elem, index) => {
        return(
          <div key={index}>
          <h5 className="m-2" style={{fontWeight: 'normal'}}>
          <b>/</b> {elem.name}
          </h5>
          {elem.pages.map((elem, index)=>{
            return <PageCard key={index} page={elem} own={elem.user.id === userStorage.user.id}/>
          })
          }
          </div>
        )
      })
      }
      </Card>
		</Container>
	)
}

export default MainPage
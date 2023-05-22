import React, { Component } from 'react'
import Relationship from '../pages/relationship'
import Mode from '../pages/mode'
import Entity from '../pages/entity'
import { Route, BrowserRouter, Routes } from 'react-router-dom'

export default class index extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route element={<Relationship />} path='/' exact></Route>
          <Route element={<Mode />} path='/mode'></Route>
          <Route element={<Entity />} path='/entity'></Route>
        </Routes>
      </BrowserRouter>
    )
  }
}
import * as React from "react"
import * as ReactDom from "react-dom/client"
import {createBrowserRouter, RouterProvider,} from "react-router-dom"
import {View, Text} from "react-native"
import Root from "./routes/root.jsx"
import {RegisterRootComponent} from "expo"

function App(){
  return(
    <Root /> 
  );
}
RegisterRootComponent(App);

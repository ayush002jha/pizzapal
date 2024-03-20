import { Redirect, Tabs } from "expo-router";

export default function TabIndex(){

    return( <Redirect href={'/(user)/menu'} /> );// (tabs) path is optional we can also use /menu instead 
}
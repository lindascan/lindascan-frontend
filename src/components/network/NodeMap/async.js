import React from "react";
import {LindaLoader} from "../../common/loaders";
import {tu} from "../../../utils/i18n";
import loadable from "@/utils/loadable"


export const NodeMapAsync = 
  loadable(() => import(/* webpackChunkName: "NodeMap" */ './NodeMap'), () =>{
    return (<div className="card">
    <LindaLoader>
      {tu("loading_map")}
    </LindaLoader>
  </div>)
  })

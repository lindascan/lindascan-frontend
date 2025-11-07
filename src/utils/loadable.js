import React from 'react';
import Loadable from 'react-loadable';
import { LindaLoader } from "components/common/loaders";

export default (loader,loading = LindaLoader)=>{
    return Loadable({
        loader: loader,
        loading
    });
}
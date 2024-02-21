import React, { useEffect } from 'react';
import './App.css';
import AppNavBar from './view/widgets/Custom_appbar';
import HomePage from './view/screen/Homepage';
import { InitStats } from './view/screen/Statistics';
import {
  BrowserRouter as Router, Routes, Route
} from "react-router-dom";
import * as ReactDOM from 'react-dom';
//import SVGViewModel from './view_models/SVG_viewModel';

import { SVGViewModelProvider } from './view_models/SVG_viewModel';
import { StatsViewModelProvider } from './view_models/Stats_VoltViewModel';
import { SettingsPage } from './view/screen/Settings';

function App() {

  //const { loading, svgDataList, setLoadingState } = SVGViewModel();
  return (
    <>

      {/* This is the alias of BrowserRouter i.e. Router */}
      <SVGViewModelProvider>
        <StatsViewModelProvider>
          <Router>
            <Routes>

              <Route path="/" element={<HomePage />} />

              <Route path="/statistics" element={<InitStats />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </Router>
        </StatsViewModelProvider>
      </SVGViewModelProvider>


    </>
  );
}

export default App;

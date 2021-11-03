import React from "react";
import { Switch, Route } from "react-router-dom";
import { TimeBoard } from "./components/TimeBoard";
import { ChapterView } from "./components/ChapterView";

const App: React.FC = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/chapter/:id">
          <ChapterView />
        </Route>
        <Route path="/">
          <TimeBoard />
        </Route>
      </Switch>
    </div>
  );
};

export default App;

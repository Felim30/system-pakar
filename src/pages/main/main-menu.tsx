import React from 'react';
import { 
  IonTabs, 
  IonTabBar, 
  IonTabButton, 
  IonIcon, 
  IonLabel, 
  IonRouterOutlet 
} from '@ionic/react';
import { home, person, reader } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import Dashboard from './tabs-page/Dashboard';
import History from './tabs-page/History';
import Profile from './tabs-page/Profile';
import { IonReactRouter } from '@ionic/react-router';
import ListPenyakit from './tabs-page/list-penyakit';
import Pencegahan from './tabs-page/pencegahan';
import CekKondisi from './tabs-page/cek-kondisi';
import Hasil from '../hasil';

const MainTabs: React.FC = () => {
  return (
    <IonReactRouter>
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/main/dashboard">
          <Dashboard />
        </Route>
        <Route path="/main/history">
          <History />
        </Route>
        <Route path="/main/hasil/:diagnosa">
            <Hasil />
        </Route>
        <Route path="/main/listpenyakit">
          <ListPenyakit />
        </Route>
        <Route path="/main/cek-kondisi">
          <CekKondisi />
        </Route>
        <Route path="/main/pencegahan/:id">
          <Pencegahan />
        </Route>
        <Route path="/main/profile">
          <Profile />
        </Route>
        <Route exact path="/main">
          <Redirect to="/main/dashboard" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="dashboard" href="/main/dashboard">
          <IonIcon icon={home} />
          <IonLabel>Dashboard</IonLabel>
        </IonTabButton>
        <IonTabButton tab="history" href="/main/history">
          <IonIcon icon={reader} />
          <IonLabel>History</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/main/profile">
          <IonIcon icon={person} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
    </IonReactRouter>
  );
};

export default MainTabs;
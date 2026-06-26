import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import AuthLayout from './layouts/auth.layout'
import { Route, Routes } from 'react-router-dom'
import SignInPage from './pages/auth/sign-in'
import MainLayout from './layouts/main.layout'
import MemberListPage from './pages/members/member.list'
import DatasetListPage from './pages/dataset/dataset.list'
import IntentsListPage from './pages/intents/intents.list'
import NersListPage from './pages/ners/ners.list'
import DashboardAnalysisPage from './pages/dashboard/dashboard.analysis'

function App() {
  return (
    <Routes>
      <Route path='/auth' element={<AuthLayout />}>
        <Route path='sign-in' element={<SignInPage />} />
      </Route>
      <Route path='/' element={<MainLayout />}>
        <Route path='dashboard' element={<DashboardAnalysisPage />} />
        <Route path='dataset' element={<DatasetListPage />} />
        <Route path='intents' element={<IntentsListPage />} />
        <Route path='ners' element={<NersListPage />} />
        <Route path='members' element={<MemberListPage />} />
      </Route>
    </Routes>
  )
}

export default App

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import AuthLayout from './layouts/auth.layout'
import { Route, Routes } from 'react-router-dom'
import SignInPage from './pages/auth/sign-in'
import MainLayout from './layouts/main.layout'
import MemberListPage from './pages/members/member.list'

function App() {
  return (
    <Routes>
      <Route path='/auth' element={<AuthLayout />}>
        <Route path='sign-in' element={<SignInPage />} />
      </Route>
      <Route path='/' element={<MainLayout />}>
        <Route path='members' element={<MemberListPage />} />
      </Route>
    </Routes>
  )
}

export default App

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WebSite from '../layouts/WebSite'
import DefultError from '../component/Errors/DefultError'
import AuthPage from '../pages/auth/AuthPage'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<WebSite />} >
                    <Route path='*' element={<DefultError />} />
                    <Route index element={<AuthPage /> } />
                </Route>

                {/* <Route path='/dashboard/' element={<PrivateRoute roles={['super_admin', 'lecturer', 'student', 'staff']} ><Dashboard /></PrivateRoute>}>
                    <Route path='*' element={<PrivateRoute roles={['super_admin', 'lecturer', 'student', 'staff']} ><DashError /></PrivateRoute>} />
                
                    <Route index element={<PrivateRoute roles={['super_admin', 'lecturer', 'student', 'staff']} ><DashHome /></PrivateRoute> } />


                </Route> */}


            </Routes>
        </BrowserRouter>
    )
}

export default App

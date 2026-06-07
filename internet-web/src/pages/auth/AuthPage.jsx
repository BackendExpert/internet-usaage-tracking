import React, { useState } from 'react'
import { BsLightning, BsShieldLockFill } from "react-icons/bs";
import { FaKey, FaUser } from 'react-icons/fa';
import DefaultInput from '../../component/Form/DefaultInput';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import useForm from '../../hooks/useForm';
import Toast from '../../component/Toast/Toast';

const AuthPage = () => {
    const [clickform, setClickForm] = useState('login')
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const { login } = useForm()

    const headleClickForm = (value) => {
        setClickForm(value)
    }

    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const { loginvalues, loginhandleChange } = useForm({
        email: '',
        password: '',
    })

    const { regvalues, reghandleChange } = useForm({
        username: '',
        region: '',
        email: '',
        password: '',
    })

    const headleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await API.post('/auth/login', values)

            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message
                })
                login(res.data.accessToken);
                setTimeout(() => {
                    navigate('/dashboard', { replace: true })
                }, 1000);
            }
            else {
                setToast({
                    success: false,
                    message: res.data.message
                })
            }
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }



    return (
        <div className="min-h-screen bg-[#F5F7FB] text-[#1E293B] overflow-x-hidden">
            {toast && (
                <div className="fixed top-6 right-6 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}
            <div className="flex flex-col xl:flex-row min-h-screen">

                <div className="hidden xl:flex xl:w-2/3 items-center justify-center bg-white">
                    <div className="px-4 sm:px-10 xl:px-20 max-w-4xl w-full">

                        <h1 className="text-2xl sm:text-4xl md:text-5xl xl:text-6xl font-black text-[#0F172A] leading-tight tracking-tight">
                            Monitor the infastrcatuer for tommorw
                        </h1>

                        <div className="mt-8 sm:mt-10 max-w-xl">

                            <div className="inline-flex items-center gap-3 px-4 sm:px-5 py-2 rounded-full border bg-[#F1F5F9] mb-6 sm:mb-8">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.35em] text-[#334155]">
                                    Advanced Network Intelligence
                                </span>
                            </div>

                            <div className="space-y-3 sm:space-y-4">
                                <p className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-light text-[#0F172A] tracking-tight">
                                    Internet telemetry reimagined
                                </p>

                                <p className="text-[#475569] text-sm sm:text-base md:text-lg leading-relaxed border-l-2 border-[#CBD5E1] pl-3 sm:pl-4 md:pl-6">
                                    Secure access to high-
                                    <br />
                                    perfomance analytics and real-
                                    <br />
                                    time network streams
                                </p>
                            </div>

                        </div>

                        <div className="mt-10 sm:mt-16 xl:mt-20 flex flex-col md:flex-row gap-5 sm:gap-6 xl:gap-10">

                            <div className="bg-white border border-[#E2E8F0] rounded-3xl p-5 sm:p-8 xl:p-10 w-full md:w-[360px] shadow-sm hover:shadow-lg transition">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 xl:w-14 xl:h-14 rounded-2xl bg-[#F1F5F9] flex items-center justify-center text-lg sm:text-xl xl:text-2xl text-[#0F172A]">
                                    <BsLightning />
                                </div>

                                <div className="mt-5 sm:mt-6">
                                    <h1 className="text-[#0F172A] text-base sm:text-lg xl:text-xl font-bold">
                                        latency_core
                                    </h1>

                                    <p className="text-[#64748B] mt-2 sm:mt-3 leading-relaxed text-xs sm:text-sm md:text-base">
                                        Sub-milisecond processing for massive telemetry throughput.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white border border-[#E2E8F0] rounded-3xl p-5 sm:p-8 xl:p-10 w-full md:w-[360px] shadow-sm hover:shadow-lg transition">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 xl:w-14 xl:h-14 rounded-2xl bg-[#F1F5F9] flex items-center justify-center text-lg sm:text-xl xl:text-2xl text-[#0F172A]">
                                    <BsShieldLockFill />
                                </div>

                                <div className="mt-5 sm:mt-6">
                                    <h1 className="text-[#0F172A] text-base sm:text-lg xl:text-xl font-bold">
                                        neural_enecrypt
                                    </h1>

                                    <p className="text-[#64748B] mt-2 sm:mt-3 leading-relaxed text-xs sm:text-sm md:text-base">
                                        zero-knowladge proof authentication for ultimet privacy.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="w-full xl:w-1/3 min-h-screen bg-white flex items-center justify-center p-4 sm:p-6 md:p-10">

                    <div className="w-full max-w-md">

                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>

                                <h1 className="uppercase font-extrabold tracking-[0.2em] sm:tracking-[0.35em] text-[#0F172A] text-sm sm:text-base md:text-lg">
                                    neon_trace
                                </h1>
                            </div>

                            <div className="pl-3 sm:pl-4 border-l border-[#E2E8F0]">
                                <p className="uppercase text-[#64748B] text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em]">
                                    command center authentication
                                </p>
                            </div>
                        </div>

                        <div className="mt-5 sm:mt-6">
                            <div className="bg-[#F1F5F9] rounded p-1 sm:p-2 flex justify-between uppercase">
                                <div
                                    onClick={() => headleClickForm('login')}
                                    className={`w-1/2 p-2 rounded font-bold text-center cursor-pointer transition text-xs sm:text-sm ${clickform === 'login'
                                        ? 'bg-white text-[#0F172A] shadow'
                                        : 'text-[#64748B]'
                                        }`}
                                >
                                    login
                                </div>

                                <div
                                    onClick={() => headleClickForm('register')}
                                    className={`w-1/2 p-2 rounded font-bold text-center cursor-pointer transition text-xs sm:text-sm ${clickform === 'register'
                                        ? 'bg-white text-[#0F172A] shadow'
                                        : 'text-[#64748B]'
                                        }`}
                                >
                                    register
                                </div>
                            </div>
                        </div>

                        <div className="mt-5">
                            {clickform === 'login' ? (
                                <div>
                                    <form>
                                        <DefaultInput
                                            label={"Email_Address"}
                                            type='email'
                                            icon={FaUser}
                                            placeholder={"username@example.com"}
                                        />

                                        <div className="mt-4">
                                            <DefaultInput
                                                label={"Access_key"}
                                                icon={FaKey}
                                                type='password'
                                                placeholder={"************"}
                                            />
                                        </div>

                                        <div className="mt-6 sm:mt-8">
                                            <button
                                                type="submit"
                                                className="w-full h-12 sm:h-14 bg-[#0F172A] rounded-lg text-white font-bold uppercase tracking-wider hover:bg-[#1E293B] transition text-xs sm:text-sm"
                                            >
                                                initialize_access
                                            </button>
                                        </div>
                                    </form>

                                    <div className="mt-4 text-center">
                                        <a href="/password-reset">
                                            <p className="uppercase text-[#2563EB] font-bold text-xs sm:text-sm">
                                                Forget_password ?
                                            </p>
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <form>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <DefaultInput
                                                label={"alias"}
                                                type='text'
                                                icon={FaUser}
                                                placeholder={"John"}
                                            />

                                            <DefaultInput
                                                label={"region"}
                                                type='text'
                                                icon={FaUser}
                                                placeholder={"region"}
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <DefaultInput
                                                label={"Email_Address"}
                                                type='email'
                                                icon={FaUser}
                                                placeholder={"username@example.com"}
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <DefaultInput
                                                label={"create_access_key"}
                                                type='password'
                                                icon={FaKey}
                                                placeholder={"*************"}
                                            />
                                        </div>

                                        <div className="mt-6">
                                            <button
                                                type="submit"
                                                className="w-full h-12 sm:h-14 bg-[#A078FF] rounded-lg text-white font-bold uppercase tracking-wider hover:bg-[#8b5cf6] transition text-xs sm:text-sm"
                                            >
                                                create_indentity
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 sm:mt-10 border-t border-[#E2E8F0] pt-5 sm:pt-6">
                            <p className="uppercase tracking-[0.15rem] sm:tracking-[0.2rem] text-[10px] sm:text-xs md:text-sm text-center text-[#64748B]">
                                ver: 1.0.0-stable | enecryption: aes-512-gcm
                            </p>
                        </div>

                        <div className="mt-6 sm:mt-10 text-center text-xs sm:text-sm text-[#64748B]">
                            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-[#E2E8F0] bg-white shadow-sm">
                                <span className="text-[#94A3B8]">
                                    &copy; {new Date().getFullYear()}
                                </span>

                                <span>|</span>

                                <span>
                                    Developed and engineered by
                                </span>

                                <a
                                    href="https://www.blackalphalabs.com/"
                                    target="_blank"
                                    className="text-[#2563EB] font-semibold hover:underline hover:text-[#1D4ED8] transition"
                                >
                                    Blackalphalabs
                                </a>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default AuthPage
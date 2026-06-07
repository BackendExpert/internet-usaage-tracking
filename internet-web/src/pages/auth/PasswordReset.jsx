import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import DefaultInput from '../../component/Form/DefaultInput'
import Toast from '../../component/Toast/Toast'
import useForm from '../../hooks/useForm'
import DefaultButton from '../../component/Buttons/DefaultButton'
import LoginButton from '../../component/Buttons/LoginButton'

const PasswordReset = () => {
    const { values, handleChange } = useForm({
        email: '',
    })

    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)

    return (
        <div className="min-h-screen bg-[#F5F7FB] flex items-center justify-center p-4">
            {toast && (
                <div className="fixed top-6 right-6 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div className="w-full max-w-md bg-white rounded-3xl border border-[#E2E8F0] p-8 shadow-sm">
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>

                        <h1 className="uppercase font-extrabold tracking-[0.35em] text-[#0F172A] text-lg">
                            neon_trace
                        </h1>
                    </div>

                    <div className="pl-4 border-l border-[#E2E8F0]">
                        <p className="uppercase text-[#64748B] text-xs tracking-[0.25em]">
                            password recovery portal
                        </p>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-black text-[#0F172A]">
                        Reset Password
                    </h2>

                    <p className="text-sm text-[#64748B] mt-2">
                        Enter your account email address to request a password reset link.
                    </p>
                </div>

                <form className="mt-8">
                    <DefaultInput
                        label={"Email_Address"}
                        name={'email'}
                        type="email"
                        icon={FaUser}
                        value={values.email}
                        placeholder={"username@example.com"}
                        required
                        onChange={handleChange}
                    />

                    <div className="mt-6">
                        <LoginButton
                            type="submit"
                            disabled={loading}
                            label={loading ? 'PROCESSING...' : 'REQUEST_RESET'}
                        />
                    </div>
                </form>

                <div className="mt-4">
                    <a href="/" className='text-blue-600 hover:ml-2 duration-500'>
                        Back to Login
                    </a>
                </div>

                <div className="mt-8 border-t border-[#E2E8F0] pt-6">
                    <p className="uppercase tracking-[0.2rem] text-xs text-center text-[#64748B]">
                        ver: 1.0.0-stable | encryption: aes-512-gcm
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PasswordReset
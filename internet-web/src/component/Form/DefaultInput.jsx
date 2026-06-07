import React from 'react';

const DefaultInput = ({
    label,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    required = false,
    icon: Icon,
}) => {
    return (
        <div>
            {label && (
                <p className="uppercase tracking-[0.25rem] font-bold text-[#64748B] text-xs">
                    {label}
                </p>
            )}

            <div className="flex items-center p-4 bg-white rounded-xl mt-2 border border-[#E2E8F0] shadow-sm focus-within:ring-2 focus-within:ring-[#CBD5E1] transition">
                {Icon && <Icon className="h-5 w-auto text-[#64748B]" />}

                <input
                    type={type}
                    name={name}
                    id={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    placeholder={placeholder}
                    className="ml-4 w-full bg-transparent outline-none text-[#0F172A] placeholder:text-[#94A3B8]"
                />
            </div>
        </div>
    );
};

export default DefaultInput;
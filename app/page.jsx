"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FormRegistrasi() {
    const router = useRouter();

    const [form, setForm] = useState({
        nama: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!form.nama) newErrors.nama = "Nama wajib diisi.";
        else if (/\d/.test(form.nama)) newErrors.nama = "Nama tidak boleh mengandung angka.";

        if (!form.email) newErrors.email = "Email wajib diisi.";
        else if (!form.email.includes("@")) newErrors.email = "Alamat email harus mengandung '@'.";

        if (!form.password) newErrors.password = "Password wajib diisi.";
        else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)/.test(form.password))
            newErrors.password = "Password harus kombinasi huruf besar, kecil, angka, dan simbol.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Simpan ke localStorage, tapi pastikan kode hanya jalan di client
            if (typeof window !== "undefined") {
                localStorage.setItem("formData", JSON.stringify(form));
                router.push("/hasil"); // navigasi ke halaman hasil
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-purple-200">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-[350px]">
                <h1 className="text-2xl font-bold text-center text-purple-700 mb-6">Form Registrasi</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nama */}
                    <div>
                        <label className="block font-medium mb-1 text-gray-700">Nama Lengkap</label>
                        <input
                            type="text"
                            name="nama"
                            value={form.nama}
                            onChange={handleChange}
                            placeholder="Masukkan nama lengkap"
                            className={`w-full border rounded-md px-3 py-2 focus:outline-none ${errors.nama ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-purple-400"
                                }`}
                        />
                        {errors.nama && <p className="text-red-500 text-sm mt-1">{errors.nama}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block font-medium mb-1 text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Masukkan email aktif"
                            className={`w-full border rounded-md px-3 py-2 focus:outline-none ${errors.email ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-purple-400"
                                }`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block font-medium mb-1 text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Masukkan password"
                            className={`w-full border rounded-md px-3 py-2 focus:outline-none ${errors.password ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-purple-400"
                                }`}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 rounded-md hover:opacity-90 transition"
                    >
                        Daftar Sekarang
                    </button>
                </form>
            </div>
        </div>
    );
}

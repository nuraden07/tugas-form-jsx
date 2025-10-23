"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HasilRegistrasi() {
    const router = useRouter();
    const [data, setData] = useState(null);
    const [edit, setEdit] = useState(false);
    const [form, setForm] = useState({ nama: "", email: "", password: "" });

    useEffect(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("formData");
            if (saved) {
                const parsed = JSON.parse(saved);
                setData(parsed);
                setForm(parsed);
            }
        }
    }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSave = () => {
        localStorage.setItem("formData", JSON.stringify(form));
        setData(form);
        setEdit(false);
    };

    if (!data)
        return (
            <div className="flex min-h-screen items-center justify-center bg-purple-100">
                <div className="bg-white p-6 rounded-lg shadow">
                    <p className="text-gray-600 mb-4">Data tidak ditemukan.</p>
                    <button
                        onClick={() => router.push("/")}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:opacity-90"
                    >
                        Kembali ke Form Awal
                    </button>
                </div>
            </div>
        );

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-purple-200">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-[350px]">
                <h1 className="text-2xl font-bold text-center text-purple-700 mb-6">Hasil Registrasi</h1>

                {!edit ? (
                    <>
                        <p className="mb-2">
                            <strong>Nama Lengkap:</strong> {data.nama}
                        </p>
                        <p className="mb-2">
                            <strong>Email:</strong> {data.email}
                        </p>
                        <p className="mb-6">
                            <strong>Password:</strong> {data.password}
                        </p>

                        <button
                            onClick={() => setEdit(true)}
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-md mb-3 hover:opacity-90"
                        >
                            Edit Data
                        </button>
                        <button
                            onClick={() => router.push("/")}
                            className="w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200"
                        >
                            Kembali ke Form Awal
                        </button>
                    </>
                ) : (
                    <>
                        <div className="space-y-3 mb-4">
                            <div>
                                <label className="block text-gray-700 mb-1">Nama Lengkap</label>
                                <input
                                    type="text"
                                    name="nama"
                                    value={form.nama}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleSave}
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-md mb-3 hover:opacity-90"
                        >
                            Simpan Perubahan
                        </button>
                        <button
                            onClick={() => setEdit(false)}
                            className="w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200"
                        >
                            Batal
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

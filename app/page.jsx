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
        else if (!form.email.includes("@")) newErrors.email = "Email harus mengandung '@'.";

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
            localStorage.setItem("formData", JSON.stringify(form));
            alert("Form berhasil disubmit!");
            router.push("/hasil");
        } else {
            alert("Masih ada kesalahan, periksa inputan Anda!");
        }
    };

    return (
        <div>
            <h1>Form Registrasi</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nama Lengkap:</label><br />
                    <input
                        type="text"
                        name="nama"
                        value={form.nama}
                        onChange={handleChange}
                    />
                    {errors.nama && <p>{errors.nama}</p>}
                </div>

                <div>
                    <label>Email:</label><br />
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p>{errors.email}</p>}
                </div>

                <div>
                    <label>Password:</label><br />
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p>{errors.password}</p>}
                </div>

                <button type="submit">Daftar</button>
            </form>

        </div>
    );
}

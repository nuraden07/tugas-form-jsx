"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HasilRegistrasi() {
    const router = useRouter();
    const [data, setData] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem("formData");
        if (saved) setData(JSON.parse(saved));
    }, []);

    if (!data) {
        return (
            <div>
                <h1>Data Tidak Ditemukan</h1>
                <button onClick={() => router.push("/")}>Kembali ke Form</button>
            </div>
        );
    }

    return (
        <div>
            <h1>Hasil Registrasi</h1>
            <p><strong>Nama:</strong> {data.nama}</p>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Password:</strong> {data.password}</p>
            <button onClick={() => router.push("/")}>Kembali ke Form</button>
        </div>
    );
}

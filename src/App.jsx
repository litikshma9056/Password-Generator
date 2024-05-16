import React, { useState, useCallback, useEffect, useRef } from "react";
import { ClipboardCopyIcon } from "@heroicons/react/outline";

function App() {
    const [length, setLength] = useState(12);
    const [includeNumbers, setIncludeNumbers] = useState(false);
    const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
    const [password, setPassword] = useState("");

    const passwordRef = useRef(null);

    const generatePassword = useCallback(() => {
        let pass = "";
        let charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if (includeNumbers) charSet += "0123456789";
        if (includeSpecialChars) charSet += "!@#$%^&*()_+-=[]{}|;:,.<>?";

        for (let i = 0; i < length; i++) {
            let char = Math.floor(Math.random() * charSet.length);
            pass += charSet.charAt(char);
        }

        setPassword(pass);
    }, [length, includeNumbers, includeSpecialChars]);

    const copyToClipboard = useCallback(() => {
        passwordRef.current.select();
        document.execCommand("copy");
    }, []);

    useEffect(() => {
        generatePassword();
    }, [length, includeNumbers, includeSpecialChars, generatePassword]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-800 to-indigo-800 text-white">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full sm:max-w-md">
                <h1 className="text-center text-3xl font-semibold mb-6">Password Generator</h1>
                <div className="relative mb-6">
                    <input
                        type="text"
                        value={password}
                        readOnly
                        ref={passwordRef}
                        className="w-full bg-gray-700 text-gray-200 py-3 px-4 rounded-md outline-none"
                        placeholder="Generated Password"
                    />
                    <button
                        onClick={copyToClipboard}
                        className="absolute top-1 right-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md text-lg"
                    >
                        <ClipboardCopyIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="flex items-center mb-6">
                    <label className="mr-4 text-lg">Length:</label>
                    <input
                        type="range"
                        min={6}
                        max={20}
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        className="w-full"
                    />
                    <span className="ml-4 font-bold bg-blue-600 text-white py-1 px-3 rounded-md text-lg">{length}</span>
                </div>
                <div className="mb-6">
                    <label className="text-lg">Include:</label>
                    <label className="inline-flex items-center mx-4">
                        <input
                            type="checkbox"
                            checked={includeNumbers}
                            onChange={() => setIncludeNumbers((prev) => !prev)}
                            className="mr-2 h-5 w-5 text-blue-500"
                        />
                        <span className="text-lg">Numbers</span>
                    </label>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            checked={includeSpecialChars}
                            onChange={() => setIncludeSpecialChars((prev) => !prev)}
                            className="mr-2 h-5 w-5 text-blue-500"
                        />
                        <span className="text-lg">Special Characters</span>
                    </label>
                </div>
            </div>
        </div>
    );
}

export default App;

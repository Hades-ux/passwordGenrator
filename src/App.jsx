import React, { useState, useRef, useEffect, useCallback } from "react";

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const passwordRef = useRef (null);

  const generatePassword = useCallback(() => {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@$%^&*-_+=`~";

    let temp = "";
    for (let i = 0; i < length; i++) {
      temp += chars[Math.floor(Math.random() * chars.length)];
    }
    setPassword(temp);
  }, [length, includeNumbers, includeSymbols]);

  const handleCopy = () => {
    passwordRef.current?.select();
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-700 via-indigo-900 to-gray-900 p-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-950/80 backdrop-blur-lg ring-1 ring-white/10 shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-white select-none">
          🔐 Password&nbsp;Generator
        </h1>

        <div className="flex">
          <input
            ref={passwordRef}
            readOnly
            aria-label="Generated password"
            value={password}
            className="flex-1 rounded-l-lg bg-slate-800 px-4 py-3 text-lg font-mono text-lime-300 placeholder:text-slate-400 focus:outline-none"
            placeholder="Click regenerate…"
          />
          <button
            onClick={handleCopy}
            className={`rounded-r-lg px-4 py-3 text-sm font-semibold transition active:scale-95 ${
              copied ? "bg-emerald-600" : "bg-indigo-600 hover:bg-indigo-500"
            } text-white`}
            aria-live="polite"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="mt-6 space-y-4 text-white">
          
          <label className="block">
            <span className="mb-1 block text-sm font-medium">
              Length: {length}
            </span>
            <input
              type="range"
              min="4"
              max="32"
              value={length}
              onChange={(e) => setLength(+e.target.value)}
              className="w-full accent-indigo-600"
            />
          </label>

          
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers((prev) => !prev)}
              className="h-4 w-4 accent-indigo-600"
            />
            <span className="text-sm">Include numbers (0‑9)</span>
          </label>

          
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols((prev) => !prev)}
              className="h-4 w-4 accent-indigo-600"
            />
            <span className="text-sm">Include symbols (!, @, #…)</span>
          </label>

          
          <button
            onClick={generatePassword}
            className="mt-4 w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-500 active:scale-95"
          >
            Regenerate
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;

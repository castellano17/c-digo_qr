import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { Qr } from "./components/Qr";
import { SketchPicker } from "react-color";
import { toPng } from "html-to-image";

function App() {
  const [dato, setDato] = useState("");
  const [color, setColor] = useState("#000000");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef(null);
  const qrRef = useRef(null);
  const [size, setSize] = useState(120);
  const [level, setLevel] = useState("M");

  const handleInputChange = (event) => {
    setDato(event.target.value);
  };

  const handleColorChange = (color) => {
    setColor(color.hex);
  };

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
    // if (!showColorPicker) {
    //   document.body.classList.add("overflow-hidden");
    // } else {
    //   document.body.classList.remove("overflow-hidden");
    // }
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleLevelChange = (event) => {
    setLevel(event.target.value);
  };

  const handleClickOutside = (event) => {
    if (
      colorPickerRef.current &&
      !colorPickerRef.current.contains(event.target)
    ) {
      setShowColorPicker(false);
      document.body.classList.remove("overflow-hidden");
    }
  };

  const downloadQr = () => {
    const svgElement = qrRef.current.querySelector("svg");
    if (svgElement) {
      toPng(svgElement)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "qr.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.error("No se pudo convertir el SVG en PNG", error);
        });
    } else {
      console.error("No se pudo encontrar el elemento SVG");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <h1 className="text-2xl text-blue-600 font-bold italic text-center">
        QR
      </h1>
      <div className="flex justify-between m-5 w-3/4 h-auto mx-auto gap-8">
        <div className="flex flex-col items-start flex-grow">
          <label htmlFor="qrInput" className="mb-2">
            Escribe tu texto:
          </label>
          <input
            id="qrInput"
            className="border border-gray-300 p-2 w-full"
            type="text"
            value={dato}
            onChange={handleInputChange}
          />

          <button
            onClick={toggleColorPicker}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Cambiar el color
          </button>
          {showColorPicker && (
            <div ref={colorPickerRef}>
              <SketchPicker color={color} onChange={handleColorChange} />
              <button
                onClick={toggleColorPicker}
                className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Cerrar
              </button>
            </div>
          )}

          <label htmlFor="qrSize" className="mb-2">
            Tamaño:
          </label>
          <input
            id="qrSize"
            className="border border-gray-300 p-2 w-full"
            type="number"
            value={size}
            onChange={handleSizeChange}
          />
          <label htmlFor="qrLevel" className="mb-2">
            Nivel de corrección de errores:
          </label>
          <select
            id="qrLevel"
            className="border border-gray-300 p-2 w-full"
            value={level}
            onChange={handleLevelChange}
          >
            <option value="L">L</option>
            <option value="M">M</option>
            <option value="Q">Q</option>
            <option value="H">H</option>
          </select>
        </div>
        <div className="flex-shrink" ref={qrRef}>
          <Qr dato={dato} color={color} size={size} level={level} />
          <button
            onClick={downloadQr}
            className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Descargar
          </button>
        </div>
      </div>
    </>
  );
}

export default App;

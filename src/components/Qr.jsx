import QRCode from "qrcode.react";

export const Qr = ({ dato, color, size = 120, level = "M", logoURL }) => {
  return (
    <>
      <div className="h-auto mx-auto max-w-[124px] w-full border border-blue-500 ">
        <QRCode
          value={dato}
          size={size}
          fgColor={color}
          level={level}
          includeMargin={true}
          renderAs={"svg"}
          //   imageSettings={{
          //     src: logoURL,
          //     height: size * 0.2,
          //     width: size * 0.2,
          //     excavate: true, // this will "cut out" the logo shape from the QR code
          //   }}
        />
      </div>
    </>
  );
};

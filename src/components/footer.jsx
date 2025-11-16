import React from "react";

export default function Footer(){
  return (
    <footer className="footer">
      © {new Date().getFullYear()} StancuBYT · Contract: <code>0x44Cf220399be798baeaE45fd7C4fF44623713833</code> · <a href="mailto:stancubyt@gmail.com">stancubyt@gmail.com</a>
    </footer>
  )
}


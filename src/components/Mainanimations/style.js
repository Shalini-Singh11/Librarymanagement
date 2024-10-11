export const containerFluidStyles = {
    position: "relative",
    height: "100vh", 
    width: "100%",   
    overflow: "hidden", 
  };
  
  export const upStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    height: "60vh",
    width: "10%",
    backgroundImage: "linear-gradient(80deg, #2b4284, #5b448f)",
    borderRadius: "50%",
    filter: "blur(80px)",
    animation: "down 20s infinite",
  };
  
  export const downStyles = {
    position: "absolute",
    bottom: 0,
    right: 0,
    height: "50vh",
    width: "30%",
    backgroundImage: "linear-gradient(80deg, #ae3d8e, #864193)",
    borderRadius: "50%",
    filter: "blur(80px)",
    animation: "up 10s infinite",
  };
  
  export const leftStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    height: "50vh",
    width: "30%",
    backgroundImage: "linear-gradient(80deg, #864193, #d13981)",
    borderRadius: "50%",
    filter: "blur(80px)",
    animation: "left 10s 1s infinite",
  };
  
  export const rightStyles = {
    position: "absolute",
    top: 0,
    right: 0,
    height: "50vh",
    width: "30%",
    backgroundImage: "linear-gradient(80deg, #d13981, #5b448f)",
    borderRadius: "50%",
    filter: "blur(80px)",
    animation: "right 20s 0.5s infinite",
  };
  
  export const keyframes = `
    @keyframes down {
      0%, 100% { top: -100px; }
      70% { top: 700px; }
    }
  
    @keyframes up {
      0%, 100% { bottom: -100px; }
      70% { bottom: 700px; }
    }
  
    @keyframes left {
      0%, 100% { left: -100px; }
      70% { left: 1300px; }
    }
  
    @keyframes right {
      0%, 100% { right: -100px; }
      70% { right: 700px; }
    }
  `;
  
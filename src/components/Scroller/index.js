import { useEffect, useRef, useState, useCallback } from "react";

const ChatMessage = ({ message }) => {
  return (
    <div
      style={{
        padding: "8px 20px 8px 8px",
      }}
    >
      <div
        style={{
          padding: "8px",
          backgroundColor: "#047857",
          color: "#FFFFFF",
        }}
      >
        {message}
      </div>
    </div>
  );
};

const ScrollContainer = ({ children }) => {
  const outerDiv = useRef(null);
  const innerDiv = useRef(null);

  const prevInnerDivHeight = useRef(null);

  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const outerDivHeight = outerDiv.current.clientHeight;
    const innerDivHeight = innerDiv.current.clientHeight;
    const outerDivScrollTop = outerDiv.current.scrollTop;

    console.log({ outerDivScrollTop });
    console.log({ outerDivHeight });

    if (
      !prevInnerDivHeight.current ||
      outerDivScrollTop === prevInnerDivHeight.current - outerDivHeight
    ) {
      outerDiv.current.scrollTo({
        top: innerDivHeight - outerDivHeight,
        left: 0,
        behavior: prevInnerDivHeight.current ? "smooth" : "auto",
      });
    } else {
      setShowScrollButton(true);
    }

    prevInnerDivHeight.current = innerDivHeight;

    console.log({ innerDivHeight: innerDivHeight });
    console.log({ prevInnerDivHeight: prevInnerDivHeight.current });
  }, [children]);

  const handleScrollButtonClick = useCallback(() => {
    const outerDivHeight = outerDiv.current.clientHeight;
    const innerDivHeight = innerDiv.current.clientHeight;

    outerDiv.current.scrollTo({
      top: innerDivHeight - outerDivHeight,
      left: 0,
      behavior: "smooth",
    });

    setShowScrollButton(false);
  }, []);
  return (
    <div
      style={{
        position: "relative",
        height: "100%",
      }}
    >
      <div
        className="relative overflow-scroll h-[400px] w-full bg-red-900"
        ref={outerDiv}
      >
        <div className="relative bg-yellow-800" ref={innerDiv}>
          {children}
        </div>
      </div>
      <button
        style={{
          position: "absolute",
          backgroundColor: "red",
          color: "white",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: showScrollButton ? 1 : 0,
          pointerEvents: showScrollButton ? "auto" : "none",
        }}
        onClick={handleScrollButtonClick}
      >
        New message!
      </button>
    </div>
  );
};

function Scroller() {
  const [numItems, setNumItems] = useState(5);
  return (
    <div>
      <ScrollContainer>
        {Array.from(Array(numItems).keys()).map((n) => (
          <ChatMessage message={`Message ${n + 1}`} key={`message-${n}`} />
        ))}
      </ScrollContainer>
      <div
        style={{
          marginTop: "8px",
        }}
      >
        <button onClick={() => setNumItems(numItems + 1)}>Add Item</button>
      </div>
    </div>
  );
}

export default Scroller;
